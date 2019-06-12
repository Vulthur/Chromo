/*jshint esversion: 6 */

// - IMPORTS -
import '../lib/pixi.js';
/*
*   On time press button on the app
*/
// - MAIN -
export default class Pad {
    /**
     * @param  {string} name
     * @param  {string} midiNote
     * @param  {number} keyCode
     * @param  {function} onpress
     */
    constructor(name, midiNote, keyCode, onpress) {
        if (arguments.length !== 4) {
            throw new Error('Invalid constructor (name, midiNote, keyCode, onpress)');
        }

        // - CONTROLES -
        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        if (typeof (midiNote) !== 'string')
            throw new Error('midiNote is not a string');

        if (keyCode !== null && typeof (keyCode) !== 'number')
            throw new Error('keyCode is not a number');

        if (typeof (onpress) !== 'function')
            throw new Error('onpress is not a function');

        // - CONSTRUCTION -
        this.name = name;
        this.midiNote = midiNote;
        this.keyCode = keyCode;
        this.onpress = onpress;
        
        this.container = new PIXI.Container();
    }

    init(){}

    clone(){
        var pad = new Pad(
            this.name,
            this.midiNote,
            this.keyCode,
            this.onpress
        );
        return pad;
    }

    end(){
        this.container.children = [];
    }
}