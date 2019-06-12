/*jshint esversion: 6 */

// - IMPORTS -
import '../lib/pixi.js';

/*
*   Represent an element of the scene
*   Build with an array of texture that will be transform to sprite
*/
// - MAIN -
export default class Element {
    /**
     * @param  {string} name
     * @param  {Array<PIXI.Texture>} textures
     */
    constructor(name, textures) {
        if(arguments.length !== 2){
            throw new Error('Invalid constructor (name, textures)');
        }
        
        // - CONTROLES -
        // Name Controle
        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        // Textures Controle
        if (!(textures instanceof Array)) {
            throw new Error('textures is not an array');
        }
        if (textures.length === 0) {
            throw new Error('textures is empty');
        }

        this.textures = [];
        for (let i = 0; i < textures.length; i++) {
            if (!(textures[i] instanceof PIXI.Texture) && !(textures[i] instanceof PIXI.Graphics)) {
                throw new Error('textures[' + i + '] ' + textures[i] + ' is not an PIXI.Texture or PIXI.Graphic');
            }
            if (textures[i] instanceof PIXI.Graphics) {
                this.textures.push(textures[i].clone());
            }
            if (textures[i] instanceof PIXI.Texture) {
                this.textures.push(textures[i]);
            }
        }
        
        // - CONSTRUCTION -
        this.name = name;
        this.container =  new PIXI.Container();
        this.filters = [];
    }

    init(){
        for (let i = 0; i < this.textures.length; i++) {
            if (this.textures[i] instanceof PIXI.Graphics) {
                this.container.addChild(this.textures[i]);
            }
            if (this.textures[i] instanceof PIXI.Texture) {
                let sprite = new PIXI.Sprite(this.textures[i]);
                sprite.anchor.set(0.5);
                sprite.position.set(0, 0);
                sprite.filters = this.filters;
                this.container.addChild(sprite);
            }
        }
    }

    clone(){
        var elem = new Element(
            this.name,
            this.textures
        );
        return elem;
    }

    end(){
        this.container.children = [];
    }
}