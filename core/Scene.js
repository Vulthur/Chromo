/*jshint esversion: 6 */

// - IMPORTS -
import Key from './Key.js';
import Knob from './Knob.js';
import Pad from './Pad.js';
import Switch from './Switch.js';
import LFO from './LFO.js';
import Animation from './Animation.js';
import Layer from './Layer.js';
import '../lib/pixi.js';

/*
* Top level object handle every element of the current scene
* Have an outro/intro animation
* Do all the animations, init and ending of all the element in it
*/

// - MAIN -
export default class Scene {
    /**
     * @constructor
     * @param  {string} name
     * @param  {Array<Key>} keys
     * @param  {Array<Knob>} knobs
     * @param  {Array<Pad>} pads
     * @param  {Array<Switch>} switchs
     * @param  {Array<Layer>} layers
     * @param  {Animation} outroAnimation
     * @param  {Animation} introAnimation
     * @param  {Object} propContainer
     * @param  {Array<LFO>} lfos
     */
    constructor(name, keys, knobs, pads, switchs, layers, outroAnimation, introAnimation, propContainer, lfos) {
        if (arguments.length !== 10){
            throw new Error('Invalid constructor (name, keys, knobs, pads, switchs, layers, outroAnimation, introAnimation, propContainer, lfos)');
        }

        // - CONTROLES -
        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        // keys Controle
        if (!(keys instanceof Array)) {
            throw new Error('keys is not an array');
        }
        for (let i = 0; i < keys.length; i++) {
            if (!(keys[i] instanceof Key)) {
                throw new Error('keys[' + i + '] ' + keys[i] + ' is not an Key');
            }
        }

        // controls Controle
        if (!(knobs instanceof Array)) {
            throw new Error('controls is not an array');
        }
        for (let i = 0; i < knobs.length; i++) {
            if (!(knobs[i] instanceof Knob)) {
                throw new Error('knobs[' + i + '] ' + knobs[i] + ' is not an Knob');
            }
        }

        // pads Controle
        if (!(pads instanceof Array)) {
            throw new Error('pads is not an array');
        }
        for (let i = 0; i < pads.length; i++) {
            if (!(pads[i] instanceof Pad)) {
                throw new Error('pads[' + i + '] ' + pads[i] + ' is not an Pad');
            }
        }
        
        // switchs Controle
        if (!(switchs instanceof Array)) {
            throw new Error('switchs is not an array');
        }
        for (let i = 0; i < switchs.length; i++) {
            if (!(switchs[i] instanceof Switch)) {
                throw new Error('switchs[' + i + '] ' + switchs[i] + ' is not an Switch');
            }
        }

        // Elements Controle
        if (!(layers instanceof Array)) {
            throw new Error('layers is not an array');
        }
        if (layers.length === 0) {
            throw new Error('layers is not an array');
        }
        for (let i = 0; i < layers.length; i++) {
            if (!(layers[i] instanceof Layer)) {
                throw new Error('layers[' + i + '] ' + layers[i] + ' is not an Layer');
            }
        }

        // introAnimation and outroAnimation Animation Control
        if(!(outroAnimation instanceof Animation)){
            throw new Error('outroAnimation is not an Animation');
        }
        if(!(introAnimation instanceof Animation)){
            throw new Error('introAnimation is not an Animation');
        }        

        if (typeof (propContainer) !== 'object') {
            throw new Error('propContainer is not an Object');
        }

        // lfos Controle
        if (!(lfos instanceof Array)) {
            throw new Error('lfos is not an array');
        }
        for (let i = 0; i < lfos.length; i++) {
            if (!(lfos[i] instanceof LFO)) {
                throw new Error('lfos[' + i + '] ' + lfos[i] + ' is not a LFO');
            }
        }

        // - CONSTRUCTION -
        this.container = new PIXI.Container();

        this.name = name;
        this.animations = [];
        
        this.layers = {};
        for (let i = 0; i < layers.length; i++) {
            this.layers[layers[i].name] = layers[i];
        }

        this.keys = {};
        this.keyCodes = {};
        for (let key in keys) {
            if (this.keyCodes[keys[key].keyCode] === undefined && keys[key].keyCode !== null) {
                this.keyCodes[keys[key].keyCode] = keys[key].midiNote;
            }           
            if (this.keys[keys[key].midiNote] === undefined) {
                this.keys[keys[key].midiNote] = [];
            }
            this.keys[keys[key].midiNote].push(keys[key]);
        }

        this.knobs = {};
        for (let knob in knobs) {
            
            if (this.keyCodes[knobs[knob].keyCode] === undefined && knobs[knob].keyCode !== null) {
                this.keyCodes[knobs[knob].keyCode] = knobs[key].midiNote;
            }
            if (this.knobs[knobs[knob].midiNote] === undefined) {
                this.knobs[knobs[knob].midiNote] = [];
            }
            this.knobs[knobs[knob].midiNote].push(knobs[knob]);
        }

        this.pads = {};
        for (let pad in pads) {

            if (this.keyCodes[pads[pad].keyCode] === undefined && pads[pad].keyCode !== null) {
                this.keyCodes[pads[pad].keyCode] = pads[key].midiNote;
            }
            if (this.pads[pads[pad].midiNote] === undefined) {
                this.pads[pads[pad].midiNote] = [];
            }
            this.pads[pads[pad].midiNote].push(pads[pad]);
        }
        
        this.switchs = {};
        for (let switchElem in switchs) {

            if (this.keyCodes[switchs[switchElem].keyCode] === undefined && switchs[switchElem].keyCode !== null) {
                this.keyCodes[switchs[switchElem].keyCode] = switchs[key].midiNote;
            }
            if (this.switchs[switchs[switchElem].midiNote] === undefined) {
                this.switchs[switchs[switchElem].midiNote] = [];
            }
            this.switchs[switchs[switchElem].midiNote].push(switchs[switchElem]);
        }       

        this.outroAnimation = outroAnimation;
        this.introAnimation = introAnimation;

        this.propContainer = propContainer;
        for (let prop in this.propContainer) {
            this.container[prop] = this.propContainer[prop];
        }

        this.lfos = {};
        for (let i = 0; i < lfos.length; i++) {
            this.lfos[lfos[i].name] = lfos[i];
        }

        this.outroAnimation.addElements([this.container]);
        this.introAnimation.addElements([this.container]);

        this.outroPlaying = false;
        this.introPlaying = false;
    }

    // Update flag outro
    playOutro(){ 
        if (this.introPlaying === false) {
            this.outroPlaying = true;
        }
    }

    // Update flag intro
    playIntro(){
        if(this.outroPlaying === false){
            this.introPlaying = true;
        }
    }

    // Add an multiple Animation to muliple container
    /**
     * @param  {Array<Animation>} animations
     * @param  {Array<PIXI.Container>} containers
     */
    addAnimations(animations, containers){
        if (!(animations instanceof Array)) {
            console.log('element is not an array');
            return false;
        }
        
        for (let i = 0; i < animations.length; i++) {
            if (!(animations[i] instanceof Animation)) {
                throw new Error('animations[' + i + '] ' + animations[i] + ' is not an Animation');
            } 
            animations[i].addElements(containers);
            
            this.animations.push(animations[i]);
        }
    }

    init() {     
        for (let key in this.keys) {
            for (let i = 0; i < this.keys[key].length; i++) {
                this.keys[key][i].init();
            }
        }
        for (let knob in this.knobs) {
            for (let i = 0; i < this.knobs[knob].length; i++) {
                this.knobs[knob][i].init();
            }
        }
        for (let pad in this.pads) {
            for (let i = 0; i < this.pads[pad].length; i++) {
                this.pads[pad][i].init();
            }
        }
        for (let switchElem in this.switchs) {
            for (let i = 0; i < this.switchs[switchElem].length; i++) {
                this.switchs[switchElem][i].init();
            }
        }
        for (let layer in this.layers) {
            this.container.addChild(this.layers[layer].container);
            this.layers[layer].init();    
        }
        for (let lfo in this.lfos) {
            this.lfos[lfo].init();
        }

        this.playIntro();
        
        this.ended = false;
    }

    // Animate all the element of the scene if it not ended
    // handle the keys still pressed
    /**
     * @param  {number} delta
     */
    animate(delta) {
        if(!this.ended){
            // Keys
            for (let key in this.keys) {
                for (let i = 0; i < this.keys[key].length; i++) {
                    if (Date.now() > this.keys[key][i].lastPress + this.keys[key][i].delayPressed &&
                        this.keys[key][i].isPressed && !this.keys[key][i].isPaused) {
                        this.keys[key][i].lastPress = Date.now();
                        this.keys[key][i].onpressed();
                    }
                }
            }
  
            // Particules
            for (let layer in this.layers) {
                for (let particle in this.layers[layer].particles) {
                    this.layers[layer].particles[particle].animate();
                }
            }

            // Animations
            let j = this.animations.length;
            while (j--) {
                if (!this.animations[j].isEnded){
                    this.animations[j].animate(delta);
                } else {
                    this.animations[j].end();
                    this.animations.splice(j, 1);
                }
            }

            // LFO
            for (let lfo in this.lfos) {
                this.lfos[lfo].update();
            }
        }

        // Transition INTRO/OUTRO Animation
        if (this.introPlaying === true) {
            if (!this.introAnimation.isEnded) {
                this.introAnimation.animate();
            } else {
                this.introPlaying = false;
            }
        }
        if (this.outroPlaying === true) {     
            if (!this.outroAnimation.isEnded) {
                this.outroAnimation.animate();      
            } else {
                this.outroPlaying = false;
                return false;
            } 
        }
    }

    end() {
        this.container.children = [];

        this.ended = true;

        this.introAnimation.end();
        this.outroAnimation.end();

        this.outroAnimation.addElements([this.container]);
        this.introAnimation.addElements([this.container]);

        for(let key in this.keys) {
            for (let i = 0; i < this.keys[key].length; i++) {
                this.keys[key][i].end();
            }
        }
        for (let knob in this.knobs) {
            for (let i = 0; i < this.knobs[knob].length; i++) {
                this.knobs[knob][i].end();
            }
        }
        for (let pad in this.pads) {
            for (let i = 0; i < this.pads[pad].length; i++) {
                this.pads[pad][i].end();
            }
        }
        for (let switchElem in this.switchs) {
            for (let i = 0; i < this.switchs[switchElem].length; i++) {
                this.switchs[switchElem][i].end();
            }
        }
        for (let layer in this.layers) {
            this.layers[layer].end();
        }
        for (let prop in this.propContainer) {
            this.container[prop] = this.propContainer[prop];
        }
    }
}