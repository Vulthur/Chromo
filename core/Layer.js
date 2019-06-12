/*jshint esversion: 6 */

// - IMPORTS -
import Element from './Element.js';
import Particle from './Particle.js';
import '../lib/pixi.js';

/*
* Layer of the scene, controle the depth visibility (z-index)
* Only element which have particles
* Contain a list of elements
*/
// - MAIN -
export default class Layer {
    /**
     * @param  {string} name
     * @param  {Array<Element>} elements
     * @param  {Array<PIXI.Particles>} particles
     * @param  {object} propContainer Allow the reset
     */
    constructor(name, elements, particles, propContainer) {
        if (arguments.length !== 4) {
            throw new Error('Invalid constructor (name, elements, particles, propContainer)');
        }

        // - CONTROLES -
        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        // Elements Controle
        if (!(elements instanceof Array)) {
            throw new Error('elements is not an array');
        }
        this.elements = {};
        for (let i = 0; i < elements.length; i++) {
            if (!(elements[i] instanceof Element)) {
                throw new Error('elements[' + i + '] ' + elements[i] + ' is not an Element');
            }
            this.elements[elements[i].name] = elements[i];
        }

        // Particles Controle
        if (!(particles instanceof Array)) {
            throw new Error('particles is not an array');
        }

        this.particles = {};
        for (let i = 0; i < particles.length; i++) {
            if (!(particles[i] instanceof Particle)) {
                throw new Error('particles[' + i + '] ' + particles[i] + ' is not an Particle');
            }
            this.particles[particles[i].name] = particles[i];
        }

        if (typeof (propContainer) !== 'object') {
            throw new Error('propContainer is not an Object');
        }

        // - CONSTRUCTION -
        this.propContainer = propContainer;
        this.container = new PIXI.Container();
        for(let prop in this.propContainer){
            this.container[prop] = this.propContainer[prop];
        }        
        this.name = name;

    }

    init(){
        for (let particle in this.particles) {           
            this.particles[particle].init();
            this.container.addChild(this.particles[particle].container);
        }
        for (let elem in this.elements) {
            this.elements[elem].init();
            this.container.addChild(this.elements[elem].container);
        }
    }

    end() {
        this.container.children = [];
        for (let prop in this.propContainer) {
            this.container[prop] = this.propContainer[prop];
        }
        for (let elem in this.elements) {
            this.elements[elem].end();
        }
        for (let particle in this.particles) {
            this.particles[particle].end();
        }
    }
}