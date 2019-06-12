/*jshint esversion: 6 */

/* - IMPORTS - */
import StepAnimation from './StepAnimation.js';
import '../lib/pixi.js';

/*
* Manage a list of step animation to animate elements
*/
/* - MAIN - */
export default class Animation {
    /**
     * @constructor
     * @param  {string} name
     * @param  {Array<StepAnimation} stepAnimations
     * @param  {boolean} looping
     * @param  {boolean} cleanAtEnd
     */
    constructor(name, stepAnimations, looping, cleanAtEnd) {
        if (arguments.length !== 4) {
            throw new Error('Invalid constructor (name, stepAnimations, looping, cleanAtEnd)');
        }

        if (typeof (name) !== 'string')
            throw new Error('name is not a string');
        
        // Animation Controle
        if (!(stepAnimations instanceof Array) || stepAnimations.length === 0) {
            throw new Error('stepAnimations is not an array or is empty');
        }
        
        this.stepAnimations = [];
        for (let i = 0; i < stepAnimations.length; i++) {
            if (!(stepAnimations[i] instanceof StepAnimation)) {
                throw new Error('stepAnimations[' + i + '] ' + stepAnimations[i] + ' is not an StepAnimation');
            }
            this.stepAnimations.push(stepAnimations[i]);
        }

        if (typeof (cleanAtEnd) !== 'boolean')
            throw new Error('cleanAtEnd is not a boolean');

        this.name = name;
        this.looping = looping;
        this.cleanAtEnd = cleanAtEnd;
        
        this.elements = [];

        this.currentAnimation = 0;
        this.isEnded = false;
    }

    clone(){

        let stepAnimations = [];
        for (let i = 0; i < this.stepAnimations.length; i++) {
            stepAnimations.push(this.stepAnimations[i].clone());
        }

        let animation = new Animation(
            this.name,
            stepAnimations,
            this.looping,
            this.cleanAtEnd
        );
        return animation;
    }

    // Add elements to the animation
    /**
     * @param  {Array<PIXI.Container>} elements
     */
    addElements(elements){
        if (!(elements instanceof Array)){
            console.log('element is not an array');
            return false;
        }
        for (let i = 0; i < elements.length; i++) {
            if (!(elements[i] instanceof PIXI.Container)) {
                throw new Error('elements[' + i + '] ' + elements[i] + ' is not an animable');
            } 
            this.elements.push(elements[i]);
        }
    }

    // Animates the elemnents and switch beetween the step animations
    /**
     * @param  {number} delta
     */
    animate(delta) {
        if (this.stepAnimations.length !== 0) {
            for (let i = 0; i < this.elements.length; i++) {

                // Animation need to be removed
                if (this.currentAnimation === this.stepAnimations.length) {
                    this.isEnded = true;
                    break;
                }

                // First time animation
                if (this.stepAnimations[this.currentAnimation].startTime === null)
                    this.stepAnimations[this.currentAnimation].startTime = Date.now();

                // Animation return false at the end
                if (this.stepAnimations[this.currentAnimation].animate(this.elements[i], delta) === false) {

                    this.stepAnimations[this.currentAnimation].init();

                    if (this.looping)
                        this.currentAnimation = (this.currentAnimation + 1) % this.stepAnimations.length;
                    else
                        this.currentAnimation += 1;

                } else {
                    this.stepAnimations[this.currentAnimation].changeSpeed();
                }
            }
        }
    }

    end(){
        if (this.cleanAtEnd){
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].destroy();
            }
        }
        for (let i = 0; i < this.stepAnimations.length; i++) {
            this.stepAnimations[i].init();
        }
        this.elements = [];
        this.currentAnimation = 0;
        this.isEnded = false;
    }
}