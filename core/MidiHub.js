/* jshint esversion: 8*/

// - IMPORTS -
import MidiElement from "./MidiElement.js";

/*
* Manage all the midi element
* Control if all the element are present
* Also open the connection with all the midi device
*/
// - MAIN -
export default class MidiHub {
    /**
     * @constructor
     * @param  {Array<MidiElement} midiElements
     */
    constructor(midiElements) {
        // midiElements Control
        if (!(midiElements instanceof Array) || midiElements.length === 0) {
            throw new Error('midiElements is not an array or is empty');
        }
        this.midiElements = {};
        for (let i = 0; i < midiElements.length; i++) {
            if (!(midiElements[i] instanceof MidiElement)) {
                throw new Error('midiElements[' + i + '] ' + midiElements[i] + ' is not an MidiElement');
            }
            if (this.midiElements[midiElements[i].name] !== undefined){
                throw new Error('Duplicate midiElement ' + midiElements[i].name);
            }
            this.midiElements[midiElements[i].name] = midiElements[i];
        }
    }
    /**
     * @param  {MIDIAccess} midi
     */
    async onMIDIInit(midi){
        // Controles Mapping and save all the usefull MIDIPort
        let errorMapping = [];
        for (let midiElement in this.midiElements) {

            this.midiElements[midiElement].reset();
            
            let inputs = midi.inputs.values();
            let outputs = midi.outputs.values();

            for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                if (this.midiElements[midiElement].midiNamesIn.indexOf(input.value.name) !== -1) {
                    this.midiElements[midiElement].midiInMapped[input.value.name] = input.value;
                }
            }
            for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
                if (this.midiElements[midiElement].midiNamesOut.indexOf(output.value.name) !== -1) {
                    this.midiElements[midiElement].midiOutMapped[output.value.name] = output.value;
                }
            }

            if (this.midiElements[midiElement].checkMapping()){
                errorMapping.push(this.midiElements[midiElement]);
            }
        }

        // Return error to stop the application at the beginning
        if (errorMapping.length !== 0) {
            return (errorMapping);
        }

        // Opening and map every midi connection
        // Link also the handler for onmidimessage
        let arrayPromises = [];
        for (let midiElement in this.midiElements) {
            for (const midiIn in this.midiElements[midiElement].midiInMapped) {
                if (this.midiElements[midiElement].midiInMapped.hasOwnProperty(midiIn)) {
                    arrayPromises.push(
                        this.midiElements[midiElement].midiInMapped[midiIn].open()
                            .then((midiInput) => {
                                midiInput.onmidimessage = this.midiElements[midiElement].handler;
                                return (midiInput);
                            }).catch((err) => {
                                throw new Error("Error opening midi connection for " + midiElement + " : " + err);
                            })
                    );
                }
            }
            for (const midiOut in this.midiElements[midiElement].midiOutMapped) {
                if (this.midiElements[midiElement].midiOutMapped.hasOwnProperty(midiOut)) {
                    arrayPromises.push(
                        this.midiElements[midiElement].midiOutMapped[midiOut].open()
                            .then((midiOut) => {
                                midiOut.onmidimessage = this.midiElements[midiElement].handler;
                                return (midiOut);
                            }).catch((err) => {
                                throw new Error("Error opening midi connection for " + midiElement + " : " + err);
                            })
                    );
                }
            }
        }

        // Start and wait for async opening of the midi connection
        await Promise.all(arrayPromises)
            .then((allMidiConnection) => {})
            .catch((err) => {
                throw new Error("Error opening midi connection" + err);
            });
    }

    // Update reference of the current scene in all the midi element
    /**
     * @param  {Scene} currentScene
     */
    updateCurrentScene(currentScene){
        for (const midiElement in this.midiElements) {
            if (this.midiElements.hasOwnProperty(midiElement)) {
                this.midiElements[midiElement].currentScene = currentScene;
            }
        }
    }
    
    // Check if the midi port is present in every MidiElement
    /**
     * @param  {String} name
     */
    isAMidiPortByName(name){
        for (const midiElement in this.midiElements) {
            let elem = this.midiElements[midiElement].isAMidiElementByName(name);
            if (this.midiElements.hasOwnProperty(midiElement) && elem) {
                return (elem);
            }
        }
    }
}