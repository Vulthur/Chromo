/*jshint esversion: 6 */

// - IMPORTS -
import '../lib/pixi.js';

/*
*   Simulate the key of the piano
*   with 3 states press pressed and realease 
*   Controle also the "delay" of the key
*/
// - MAIN -
export default class Key {
    /**
     * @param  {string} name
     * @param  {string} midiNote
     * @param  {number} keyCode
     * @param  {function} onpress
     * @param  {function} onpressed
     * @param  {function} onrelease
     * @param  {number} delayPress
     * @param  {number} delayPressed
     * @param  {object} parentContainer
     */
    constructor(name, midiNote, keyCode, onpress, onpressed, onrelease, delayPress, delayPressed, parentContainer) {
        if (arguments.length !== 9) {
            throw new Error('Invalid constructor (name, midiNote, keyCode, onpress, onpressed, onrelease, delayPress, delayPressed, parentContainer)');
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

        if (typeof (onpressed) !== 'function')
            throw new Error('onpressed is not a function');

        if (typeof (onrelease) !== 'function')
            throw new Error('onrelease is not a function');     

        if (typeof (delayPress) !== 'number')
            throw new Error('delayPress is not a number');
        
        if (typeof (delayPressed) !== 'number')
            throw new Error('delayPress is not a number');

        if (!(parentContainer instanceof PIXI.Container)){
            throw new Error('parentContainer is not a PIXI.Container');
        }

        // - CONSTRUCTION -
        this.name = name;
        this.midiNote = midiNote;
        this.keyCode = keyCode;
        this.onpress = onpress;
        this.onrelease = onrelease;
        this.onpressed = onpressed;
        this.delayPress = delayPress;
        this.delayPressed = delayPressed;
        this.parentContainer = parentContainer;

        this.isPressed = false;
        this.isPaused = false;
        this.lastPress = null;
        this.lastVelocity = 0;
        this.container = new PIXI.Container();

    }

    init(){
        this.parentContainer.addChild(this.container);
    }

    clone(){
        var key = new Key(
            this.name,
            this.midiNote,
            this.keyCode,
            this.onpress,
            this.onpressed,
            this.onrelease,
            this.delayPress,
            this.delayPressed,
            this.parentContainer
        );
        return key;
    }

    end(){
        this.parentContainer.removeChild(this.container);
        this.container.children = [];
        this.isPressed = false;
        this.isPaused = false;
        this.lastPress = null;
        this.lastVelocity = 0;
        this.onrelease();
    }
    
    clear(){
        this.container.children = [];
    }
}