/*jshint esversion: 6 */

// - IMPORTS -
import '../lib/pixi.js';

/*
*   Equivalent of a toggle button in midi
*   Allow to on/off elements on the scene
*   with the 2 functions in parameters.
*/
// - MAIN -
export default class Switch {
    /**
     * @constructor 
     * @param  {string} name
     * @param  {string} midiNote
     * @param  {number} keyCode
     * @param  {function} onpresson
     * @param  {function} onpressoff
     */
    constructor(name, midiNote, keyCode, onpresson, onpressoff) {
        if (arguments.length !== 5) {
            throw new Error('Invalid constructor (name, midiNote, keyCode, onpresson, onpressoff)');
        }

        // - CONTROLES -
        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        if (typeof (midiNote) !== 'string')
            throw new Error('midiNote is not a string');

        if (keyCode !== null && typeof (keyCode) !== 'number')
            throw new Error('keyCode is not a number');

        if (typeof (onpresson) !== 'function')
            throw new Error('onpresson is not a function');
        
        if (typeof (onpressoff) !== 'function')
            throw new Error('onpressoff is not a function');

        // - CONSTRUCTION -
        this.name = name;
        this.midiNote = midiNote;
        this.keyCode = keyCode;
        this.onpresson = onpresson;
        this.onpressoff = onpressoff;
        this.IsOn = false;
        
        this.container = new PIXI.Container();
    }

    init(){
        this.IsOn = false;
    }

    clone(){
        var togglePad = new TogglePad(
            this.name,
            this.midiNote,
            this.keyCode,
            this.onpresson,
            this.onpressoff
        );
        return togglePad;
    }

    end(){
        this.container.children = [];
    }
}