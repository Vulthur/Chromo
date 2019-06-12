/*jshint esversion: 6 */

// - IMPORT -
import MidiElement from '../../../core/MidiElement.js';
import Config from '../Config.js';

// - MAIN -
export default function (currentScene, scenes, midiEventHandler) {
    let midiElement = new MidiElement(
        "MidiSequencerAbleton",
        ["DrumFromAbleton"],
        [0],
        function (event, currentScene, scenes) {
2
            let type = event.data[0] & 0xF0;
            let channel = event.data[0] & 0x0F;
            let keyNumber = event.data[1];
            let velocity = event.data[2];

            switch (type) {
                // Note On
                case Config.midiType.noteOn:
                    if (velocity !== 0) {  // if velocity != 0, this is a note-on message
                        if (currentScene.keys[keyNumber] !== undefined) {
                            for (let i = 0; i < currentScene.keys[keyNumber].length; i++) {
                                if (Date.now() > currentScene.keys[keyNumber][i].lastPress + currentScene.keys[keyNumber][i].delayPress) {
                                    currentScene.keys[keyNumber][i].isPressed = true;
                                    currentScene.keys[keyNumber][i].lastPress = Date.now();
                                    currentScene.keys[keyNumber][i].onpress(velocity);
                                }
                            }
                        }
                    }
                    break;
                // Note off
                case Config.midiType.noteOff:
                    if (currentScene.keys[keyNumber] !== undefined) {
                        for (let i = 0; i < currentScene.keys[keyNumber].length; i++) {
                            if (currentScene.keys[keyNumber] !== undefined) {
                                currentScene.keys[keyNumber][i].isPressed = false;
                                currentScene.keys[keyNumber][i].onrelease();
                            }
                        }
                    }
                    break;
            }
        },
        [],
        false,
        currentScene,
        scenes,
        midiEventHandler
    );
    return midiElement;
}