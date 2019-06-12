/*jshint esversion: 6 */

// - IMPORTS -
import '../lib/pixi.js';

/*
* Simulate a knob on a controller with onchange function
*/
// - MAIN -
export default class Knob {
    /**
     * @param  {string} name
     * @param  {string} midiNote
     * @param  {number} keyCode
     * @param  {function} onchange
     */
    constructor(name, midiNote, keyCode, onchange) {
        if (arguments.length !== 4) {
            throw new Error('Invalid constructor (name, midiNote, keyCode, onchange)');
        }

        // - CONTROLES -
        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        if (typeof (midiNote) !== 'string')
            throw new Error('midiNote is not a string');

        if (keyCode !== null && typeof (keyCode) !== 'number')
            throw new Error('keyCode is not a number');

        if (typeof (onchange) !== 'function')
            throw new Error('onchange is not a function');
     
        // - CONSTRUCTION -
        this.name = name;
        this.midiNote = midiNote;
        this.keyCode = keyCode;
        this.onchange = onchange;

        this.container = new PIXI.Container();
    }

    init(){}

    clone(){
        var knob = new Knob(
            this.name,
            this.midiNote,
            this.keyCode,
            this.onchange
        );
        return knob;
    }

    end(){
        this.container.children = [];
    }
}