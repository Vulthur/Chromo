/* jshint esversion: 9 */
// - IMPORTS -
import Assets from './Assets.js';
import Config from './Config.js';
import MidiHub from '../../core/MidiHub.js';
import '../../lib/pixi.js';

// Midi elements
import MidiControllerMpk from './midiElements/MidiControllerMpk.js';
import MidiSequencerAbleton from './midiElements/MidiSequencerAbleton.js';

// Scenes
import SceneFalling from './scenes/SceneFalling.js';
import SceneEyes from './scenes/SceneEyes.js';
import SceneTitle from './scenes/SceneTitle.js';
import SceneSpiral from './scenes/SceneSpiral.js';
import SceneWater from './scenes/SceneWater.js';
import SceneTutorial from './scenes/SceneTutorial.js';
import SceneDoor from './scenes/SceneDoor.js';
import SceneEnding from './scenes/SceneEnding.js';

// - VARIABLES -
// Creating app containing the canvas
let app = new PIXI.Application( 
    window.innerWidth, // width canvas in pixel 
    window.innerHeight, // Height canvas in pixel 
    { 
        antialias: true, 
        autoResize: true, 
        backgroundColor: 0x000000
    }
);
let assets = new Assets(app.renderer);
let startingScene = 0;
let indexScene;
let currentScene;
let scenes;
let midiHub;
let midiEventHandler;
let error;

// - MAIN -
window.addEventListener('load', async () => {

    // Control if navigator have MIDI
    if (!navigator.requestMIDIAccess) {
        alert("No MIDI support present in your browser. You're gonna have a bad time.");
        return;
    }

    // Get the error list html element.
    error = document.querySelector("#error");

    // Adding Canvas to DOM
    document.body.appendChild(app.view);

    // Create all scenes of the project
    scenes = [
        SceneTitle(assets, app),
        SceneTutorial(assets, app),
        SceneDoor(assets, app),
        SceneEyes(assets, app),
        SceneFalling(assets, app),
        SceneSpiral(assets, app),
        SceneWater(assets, app),
        SceneEnding(assets, app),
    ];
    currentScene = scenes[startingScene];
    
    // Custom Midi Event Handler
    midiEventHandler = new EventTarget();
    midiEventHandler.addEventListener('reset', () => {       
        // Switching Scene
        currentScene.end();
        indexScene = 0;
        currentScene = scenes[indexScene];

        // Update reference of the current scene in all the midi element            
        midiHub.updateCurrentScene(currentScene);

        currentScene.init();
        app.stage.children = [];
        app.stage.addChild(currentScene.container);
    });
    
    // Create MIDI elements in the hub
    midiHub = new MidiHub([
        MidiControllerMpk(currentScene, scenes, midiEventHandler),
        MidiSequencerAbleton(currentScene, scenes, midiEventHandler),
    ]);

    // Async Init MIDI
    await (navigator.requestMIDIAccess())
        .then(onMIDISuccess, onMIDIReject)
        .catch((err) => {
            alert("Error init midi element \n" + err);
            error.innerHTML = "Error init midi element \n" + err;
        });
    
    // - EVENTS KEYBOARDS -
    window.addEventListener('keyup', onkey);
    window.addEventListener('keydown', onkey);
});

// - FUNCTIONS -

// requestMIDIAccess success callback
async function onMIDISuccess(midiAccess){

    // Reset error and midi state handler.
    midiAccess.onstatechange = null;
    error.innerHTML = '';

    // Init All midi Device
    let errorMidiElements = (await midiHub.onMIDIInit(midiAccess));
    if (errorMidiElements){
        for (let i = 0; i < errorMidiElements.length; i++) {
            error.innerHTML += errorMidiElements[i].errorMappingToHtml();
        }
        // Manage state changing to restart the app
        midiAccess.onstatechange = function () {
            onMIDISuccess(midiAccess);
        };
        return;
    }

    // Handle state change of all midi Element
    midiAccess.onstatechange = (midiConnectionEvent) => {
        let name = midiConnectionEvent.port.name;
        let state = midiConnectionEvent.port.state;

        if (midiHub.isAMidiPortByName(name) === midiConnectionEvent.port){
            if (midiConnectionEvent.port instanceof MIDIOutput)
            console.log(name + " is " + state);
        }
    };

    // Send reset to Ableton
    midiHub.midiElements.MidiControllerMpk.sendMidi(Config.midiResetData);

    // Init the first Scene
    currentScene.init();

    // Listen for animate update 
    app.stage.addChild(currentScene.container);

    // Starting main loop
    mainLoop();    
}

// On requestMIDIAccess reject
function onMIDIReject(err){
    throw new Error('Error init MIDI : ' + err);
}

//  Main loop 
function mainLoop(){
    app.ticker.add(function (delta) {
        if (currentScene.animate(delta) === false) {
            // Define the next Scene
            indexScene = scenes.indexOf(currentScene);
            let indexNextScene;
            if (indexScene + 1 === scenes.length) {
                indexNextScene = 0;
            } else {
                indexNextScene = indexScene + 1;
            }
            currentScene = scenes[indexScene];
            let nextScene = scenes[indexNextScene];

            // Init the next scene
            nextScene.init();

            // Apply the status of the keys of the previous scene
            for (var key in currentScene.keys) {
                if (nextScene.keys[key] === undefined) {
                    break;
                }
                for (let i = 0; i < nextScene.keys[key].length; i++) {
                    nextScene.keys[key][i].isPressed = currentScene.keys[key][0].isPressed;
                    nextScene.keys[key][i].isPaused = currentScene.keys[key][0].isPaused;
                    nextScene.keys[key][i].lastPress = currentScene.keys[key][0].lastPress;
                    nextScene.keys[key][i].lastVelocity = currentScene.keys[key][0].lastVelocity;
                    if (nextScene.keys[key][i].isPressed) {
                        nextScene.keys[key][i].onpress(currentScene.keys[key][0].lastVelocity);
                    }
                }
            }

            // End the current scene
            currentScene.end();

            // Upddate the current scene
            indexScene = indexNextScene;
            currentScene = nextScene;

            // Update reference of the current scene in all the midi element            
            midiHub.updateCurrentScene(currentScene);

            // Clean stage and add the new current scene
            app.stage.children = [];
            app.stage.addChild(currentScene.container);
        }
        // Resize the renderer every tick
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });
}

// Handle event from the keyboard
function onkey(event){ 
    // Define channel, key number and type;
    let channel;
    let keyNumber;
    let typeNote;

    switch (event.keyCode) {
        case Config.keyCodeNextScene:
            keyNumber = Config.midiNextScene;
            channel = 1;
            break;
        case Config.keyCodeReset:
            keyNumber = Config.midiReset;
            channel = 1;
            break;
        default:
            keyNumber = currentScene.keyCodes[event.keyCode];
            channel = Config.defaultMidiChannel;
            break;
    }

    // keyup/keydown
    if(event.type === 'keydown') {
        typeNote = Config.midiType.noteOn;
    } else {
        typeNote = Config.midiType.noteOff;
    }

    // TODO Create a proper MIDIMessageEvent if needed
    let fakeMidiEvent = {
        data: [
            (channel | 0xF0) & (typeNote | 0x0F),
            keyNumber,
            Config.defaultVelocity
        ],
        timestamp: 0
    };

    // Sending the midi event to the hub
    midiHub.midiElements.MidiControllerMpk.handler(fakeMidiEvent);
}