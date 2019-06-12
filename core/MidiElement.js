/* jshint esversion: 6 */

/*
* Manage the inputs and outputs of a list of MIDI device
*/
// - MAIN -
export default class MidiElement {
    /**
     * @constructor
     * @param  {string} name
     * @param  {Array<string>} midiNamesIn
     * @param  {Array<number>} channelsIn
     * @param  {function} handlerIn
     * @param  {Array<string>} midiNamesOut
     * @param  {boolean} midiThru
     * @param  {Scenes} currentScene
     * @param  {Array<Scene>} scenes
     * @param  {EventTarget} midiEventHandler
     */
    constructor(name, midiNamesIn, channelsIn, handlerIn, midiNamesOut, midiThru, currentScene, scenes, midiEventHandler) {
        // - CONTROLS -
        if (arguments.length !== 9) {
            throw new Error('Invalid constructor (name, midiNamesIn, channelsIn, handlerIn,' +
                'midiNamesOut, midiThru, currentScene, scenes, midiEventHandler)');
        }

        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        // midiNamesIn Control
        if (!(midiNamesIn instanceof Array) || midiNamesIn.length === 0) {
            throw new Error('midiNamesIn is not an array or is empty');
        }
        this.midiNamesIn = [];
        for (let i = 0; i < midiNamesIn.length; i++) {
            if (typeof(midiNamesIn[i]) !== 'string') {
                throw new Error('midiNamesIn[' + i + '] ' + midiNamesIn[i] + ' is not an string');
            }
            if (this.midiNamesIn.indexOf(midiNamesIn[i]) !== -1){
                throw new Error('Duplicate midiNamesIn ' + midiNamesIn[i]);
            }
            this.midiNamesIn.push(midiNamesIn[i]);
        }
        // channelsIn Control
        this.channelsIn = [];
        for (let i = 0; i < channelsIn.length; i++) {
            if (typeof(channelsIn[i]) !== 'number') {
                throw new Error('channelsIn[' + i + '] ' + channelsIn[i] + ' is not an number');
            }
            this.channelsIn.push(channelsIn[i]);
        }

        // midiNamesOut Control
        if (!(midiNamesOut instanceof Array)) {
            throw new Error('midiNamesOut is not an array or is empty');
        }
        this.midiNamesOut = [];
        for (let i = 0; i < midiNamesOut.length; i++) {
            if (typeof(midiNamesOut[i]) !== 'string') {
                throw new Error('midiNamesOut[' + i + '] ' + midiNamesOut[i] + ' is not an string');
            }
            if (this.midiNamesOut.indexOf(midiNamesOut[i]) !== -1) {
                throw new Error('Duplicate midiNamesOut ' + midiNamesOut[i]);
            }
            this.midiNamesOut.push(midiNamesOut[i]);
        }

        if (typeof (handlerIn) !== 'function')
            throw new Error('handlerIn is not a function');

        if (typeof (midiThru) !== 'boolean')
            throw new Error('midiThru is not a boolean');
        
        if (!(midiEventHandler instanceof EventTarget)) {
            throw new Error('midiEventHandler is not an EventTarget');
        }

        this.handlerIn = handlerIn;
        this.midiThru = midiThru;
        this.midiEventHandler = midiEventHandler;
        this.name = name;

        this.midiInMapped = {};
        this.midiOutMapped = {};
        this.currentScene = currentScene;
        this.scenes = scenes;

        // Handling function build in the constructor for the references
        this.handler = (event) => {
            // Get Midi Channel
            let channel = event.data[0] & 0x0F;

            // Control correct channel and midi thru
            if (this.channelsIn.indexOf(channel) === -1 && !this.midiThru) {
                return;
            }
            
            // Send to Out midi device
            for (const nameMidiOut in this.midiOutMapped) {
                if (this.midiOutMapped.hasOwnProperty(nameMidiOut)) {
                    this.midiOutMapped[nameMidiOut].send(event.data, event.timestamp);
                }
            }
            
            // Handle the event if it's the correct channel
            if (this.channelsIn.indexOf(channel) !== -1) {
                this.handlerIn(event, this.currentScene, this.scenes, this.midiEventHandler);
            }
        };
    }

    //Send midi signal to all the output
    /**
     * @param  {obecjt} data
     */
    sendMidi(data){
        for (const nameMidiOut in this.midiOutMapped) {
            if (this.midiOutMapped.hasOwnProperty(nameMidiOut)) {
                this.midiOutMapped[nameMidiOut].send(data, undefined);
            }
        }
    }

    // Control if everything is connected
    checkMapping(){
        return(Object.keys(this.midiInMapped).toString() !== this.midiNamesIn.toString() ||
            Object.keys(this.midiOutMapped).toString() !== this.midiNamesOut.toString());
    }

    // Html output for mapping error
    errorMappingToHtml() {
        return (
            "<li>Error : '" + this.name + "' midi element connection is not complete</li>" +
            "Expected Input " + this.midiNamesIn.toString() + "<br>" +
            "Result Input " + Object.keys(this.midiInMapped).toString() + "<br>" +
            "Expected Output " + this.midiNamesOut.toString() + "<br>" +
            "Result Output " + Object.keys(this.midiOutMapped).toString() + "<br>"
        );
    }

    // Controle by name if a device is in the midiElement
    isAMidiElementByName(name) {
        return this.midiInMapped[name] || this.midiOutMapped[name] || null;
    }

    reset(){
        this.midiInMapped = {};
        this.midiOutMapped = {};
    }
}