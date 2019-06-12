/*jshint esversion: 6 */

// - IMPORT -
import MidiElement from '../../../core/MidiElement.js';
import Config from '../Config.js';

// - MAIN -
export default function(currentScene, scenes, midiEventHandler) {
    let midiElement = new MidiElement(
        "MidiControllerMpk",
        ["Akai MPK61"],
        [0, 1],
        function (event, currentScene, scenes, midiEventHandler) {

            let type = event.data[0] & 0xF0;
            let channel = event.data[0] & 0x0F;
            let keyNumber = event.data[1];
            let velocity = event.data[2];

            //console.log(event.data, type, keyNumber, velocity, channel);

            // Note pressed
            if(channel === 0){
                switch (type) {
                    // Note On
                    case Config.midiType.noteOn:
                        // if velocity != 0, this is a note-on message
                        if (velocity === 0 || currentScene.keys[keyNumber] === undefined) {
                            break;
                        }
                        // Bass mono Keyboard Pause the other keys
                        if (Config.keyboardBass.keyC.midi <= keyNumber && keyNumber <= Config.keyboardBass.keyB.midi) {
                            for (const key in currentScene.keys) {
                                if (Config.keyboardBass.keyC.midi <= key && key <= Config.keyboardBass.keyB.midi &&
                                    key != keyNumber) {
                                    for (let i = 0; i < currentScene.keys[key].length; i++) {
                                        if (currentScene.keys[key][i].isPressed === true){
                                            currentScene.keys[key][i]
                                            .isPaused = true;
                                            currentScene.keys[key][i].isPressed = false;
                                            //console.log("PAUSE", key, currentScene.keys[key]);
                                        }
                                    }
                                }
                            }
                        }

                        // Press the key
                        let timer = Date.now();
                        for (let i = 0; i < currentScene.keys[keyNumber].length; i++) {
                            if (Date.now() > currentScene.keys[keyNumber][i].lastPress + currentScene.keys[keyNumber][i].delayPress &&
                                    currentScene.keys[keyNumber][i].isPressed === false) {
                                currentScene.keys[keyNumber][i].isPressed = true;
                                currentScene.keys[keyNumber][i].isPaused = false;
                                currentScene.keys[keyNumber][i].lastPress = timer;
                                currentScene.keys[keyNumber][i].lastVelocity = velocity;
                                currentScene.keys[keyNumber][i].onpress(velocity);
                                //console.log("PRESS", keyNumber, currentScene.keys[keyNumber]);
                            }
                        }
                        break;
                    // Note off velocity == 0, fall thru: it's a note-off.
                    case Config.midiType.noteOff:
                        if (velocity !== 0 || currentScene.keys[keyNumber] === undefined) {
                            break;
                        }
                        // Release the key
                        for (let i = 0; i < currentScene.keys[keyNumber].length; i++) {
                            if (currentScene.keys[keyNumber] !== undefined &&
                                    (currentScene.keys[keyNumber][i].isPressed === true ||
                                    (currentScene.keys[keyNumber][i].isPaused === true &&
                                    currentScene.keys[keyNumber][i].isPressed === false))) {
                                currentScene.keys[keyNumber][i].isPressed = false;
                                currentScene.keys[keyNumber][i].isPaused = false;
                                currentScene.keys[keyNumber][i].onrelease();
                                //console.log("RELEASE", keyNumber, currentScene.keys[keyNumber]);
                            }
                        }

                        // Bass mono Keyboard
                        if (Config.keyboardBass.keyC.midi <= keyNumber && keyNumber <= Config.keyboardBass.keyB.midi) {
                            let keyToPlay = null;
                            let lastTimer = -Infinity;
                            let flagOneIsPressed = false;

                            // Control if another is pressed
                            for (const key in currentScene.keys) {
                                if (Config.keyboardBass.keyC.midi <= key && key <= Config.keyboardBass.keyB.midi) {
                                    if (currentScene.keys[key][0].isPressed === true && key != keyNumber) {
                                        flagOneIsPressed = true;
                                        //console.log("ISPRESSED", key, currentScene.keys[key]);
                                        break;
                                    }      
                                }
                            }

                            // Find the last in pause key (timer)          
                            for (const key in currentScene.keys) {
                                if (Config.keyboardBass.keyC.midi <= key && key <= Config.keyboardBass.keyB.midi &&
                                        key != keyNumber && currentScene.keys[key][0].lastPress > lastTimer &&
                                        currentScene.keys[key][0].isPaused === true) {
                                    
                                    lastTimer = currentScene.keys[key][0].lastPress;
                                    keyToPlay = key;
                                    //console.log("INPAUSE", key, currentScene.keys[key]);
                                }
                            }

                            // if there is a key in pause and no key other pressed repressa the key.
                            if (keyToPlay !== null && !flagOneIsPressed) {
                                let timer = Date.now();
                                for (let i = 0; i < currentScene.keys[keyToPlay].length; i++) {
                                    currentScene.keys[keyToPlay][i].isPaused = false;
                                    currentScene.keys[keyToPlay][i].isPressed = true;
                                    currentScene.keys[keyToPlay][i].lastPress = timer;
                                    currentScene.keys[keyToPlay][i].onpress(currentScene.keys[keyToPlay][i].lastVelocity);
                                    //console.log("REPRESS", keyToPlay, currentScene.keys[keyToPlay]);
                                }
                            }
                        }
                        break;
                    // CC button
                    case Config.midiType.CC:
                        // Knobs
                        if (currentScene.knobs[keyNumber] === undefined) {
                            break;
                        }
                        for (let i = 0; i < currentScene.knobs[keyNumber].length; i++) {
                            currentScene.knobs[keyNumber][i].onchange(velocity);
                        }
                }
            }

            // Pad/switchOn and nextScene
            if (channel === 1){
                if (type === Config.midiType.noteOn){
                    // Pad on scene
                    if (currentScene.pads[keyNumber] !== undefined) {
                        for (let i = 0; i < currentScene.pads[keyNumber].length; i++) {
                            currentScene.pads[keyNumber][i].onpress(velocity);
                        }
                    }
                    // Switch on scene
                    if (currentScene.switchs[keyNumber] !== undefined) {
                        for (let i = 0; i < currentScene.switchs[keyNumber].length; i++) {
                            currentScene.switchs[keyNumber][i].onpresson(velocity);
                        }
                    }
                    // Pad next scene
                    if (keyNumber === Config.midiNextScene && scenes.indexOf(currentScene) + 1 <= scenes.length &&
                            currentScene.introPlaying === false && currentScene.outroPlaying === false) {                               
                        currentScene.playOutro();
                    }
                    // Pad reset
                    if (keyNumber === Config.midiReset && currentScene.introPlaying === false &&
                            currentScene.outroPlaying === false) {
                        midiEventHandler.dispatchEvent(new Event("reset"));
                    }
                }
                if (type === Config.midiType.noteOff) {
                    // Switch on scene 
                    if (currentScene.switchs[keyNumber] !== undefined) {
                        for (let i = 0; i < currentScene.switchs[keyNumber].length; i++) {
                            currentScene.switchs[keyNumber][i].onpressoff(velocity);
                        }
                    }
                }
            }
        },
        ["MIDILoopChromo"],
        false,
        currentScene,
        scenes,
        midiEventHandler
    );
    return midiElement;
}