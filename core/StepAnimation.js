/*jshint esversion: 6 */

/*
* Describe one step of an animation
* Have a speed parameter and changeSpeed which is call every 
* tick of the animation step
*/
// - MAIN -
export default class StepAnimation {
    /**
     * @constructor
     * @param  {string} name
     * @param  {function} animate
     * @param  {number} duration
     * @param  {function} changeSpeed
     * @param  {number} speed
     */
    constructor(name, animate, duration, speed, changeSpeed) {
        if(arguments.length !== 5){
            throw new Error('Invalid constructor (name, animate, duration, speed, changeSpeed)');
        }
        
        // - CONTROLES -
        // Name Controle
        if (typeof (name) !== 'string')
            throw new Error('name is not a string');

        if (typeof (animate) !== 'function')
            throw new Error('animate is not a function');

        if (duration !== null && typeof (duration) !== 'number')
            throw new Error('duration is not a number');

        if (typeof (changeSpeed) !== 'function')
            throw new Error('changeSpeed is not a function');

        if (typeof (speed) !== 'number')
            throw new Error('duration is not a number');
            
        // - CONSTRUCTION -
        this.name = name;
        this.animate = animate;
        this.duration = duration;
        this.speed = speed;
        this.changeSpeed = changeSpeed;
        this.baseSpeed = speed;
        this.startTime = null;
    }

    init(){
        this.speed = this.baseSpeed;
        this.startTime = null;
    }

    clone(){
        let stepAnimation = new StepAnimation(
            this.name,
            this.animate,
            this.duration,
            this.speed,
            this.changeSpeed
        );
        return stepAnimation;
    }
}