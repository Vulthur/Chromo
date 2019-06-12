/*jshint esversion: 6 */

// - IMPORTS -
import '../lib/pixi-particles.js';
import '../lib/pixi.js';

/*
*   Handle the pixi particles system
*/
// - MAIN -
export default class Particle {
    /**
     * @param  {string} name
     * @param  {Array<PIXI.Texture} textures
     * @param  {Object} config
     * @param  {boolean} isStart
     */
    constructor(name, textures, config, isStart) {
        if (arguments.length !== 4) {
            throw new Error('Invalid constructor (name, textures, config, isStart)');
        }

        // - CONTROLES -
        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        // Textures Controle
        if (!(textures instanceof Array)) {
            throw new Error('textures is not an array');
        }
        if (textures.length === 0) {
            throw new Error('textures is empty');
        }

        for (let i = 0; i < textures.length; i++) {
            if (!(textures[i] instanceof PIXI.Texture)) {
                throw new Error('textures[' + i + '] ' + textures[i] + ' is not an PIXI.Texture');
            }
        }
        if (!(config instanceof Object)) {
            throw new Error('config is not an Object');
        }

        if (typeof(isStart) !== 'boolean') {
            throw new Error('isStart is not an boolean');
        }

        // - CONSTRUCTION -
        this.name = name;
        this.container = new PIXI.Container();
        this.particles = new PIXI.particles.Emitter(
            this.container,
            textures,
            config
        );
        this.config = config;
        this.textures = textures;
        this.elapsed = 0;
        this.isStart = isStart;
    }

    animate() {
        if(this.particles.emit){
            this.particles.update((Date.now() - this.elapsed) * 0.001);
            this.elapsed = Date.now(); 
        }
    }

    init(){
        this.particles.emit = this.isStart;
        this.elapsed = Date.now();
    }

    activate() {
        this.particles.emit = true;
        this.elapsed = Date.now();
        this.start();
    }

    desactivate() {
        this.particles.emit = false;
    }

    stop() {
        this.particles.maxParticles = 0;
    }

    start() {
        this.particles.maxParticles = this.config.maxParticles;
    }

    clone() {
        var particle = new Particle(
            this.name,
            this.textures,
            this.config,
            this.isStart
        );
        return particle;
    }

    end() {
        this.container.children = [];
        this.particles.emit = false;
    }
}