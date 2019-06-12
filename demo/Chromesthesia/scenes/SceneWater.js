/*jshint esversion: 6 */

// - IMPORTS -
import Key from '../../../core/Key.js';
import Layer from '../../../core/Layer.js';
import LFO from '../../../core/LFO.js';
import Scene from '../../../core/Scene.js';
import StepAnimation from '../../../core/StepAnimation.js';
import Animation from '../../../core/Animation.js';
import Config from '../Config.js';

// - MAIN -
export default function(assets, app) {

    // - ELEMENTS -
    let girl = assets.elements.water;
    girl.container.position.set(app.renderer.width / 2, app.renderer.height / 2);
    let circleWater = assets.elements.circleWater2;
    circleWater.container.position.set(app.renderer.width / 2, app.renderer.height / 2);

    let circleC = assets.elements.circleC.clone();
    let circleCd = assets.elements.circleCd.clone();
    let circleD = assets.elements.circleD.clone();
    let circleDd = assets.elements.circleDd.clone();
    let circleE = assets.elements.circleE.clone();
    let circleF = assets.elements.circleF.clone();
    let circleFd = assets.elements.circleFd.clone();
    let circleG = assets.elements.circleG.clone();
    let circleGd = assets.elements.circleGd.clone();
    let circleA = assets.elements.circleA.clone();
    let circleAd = assets.elements.circleAd.clone();
    let circleB = assets.elements.circleB.clone();

    circleC.container.alpha = 0;
    circleCd.container.alpha = 0;
    circleD.container.alpha = 0;
    circleDd.container.alpha = 0;
    circleE.container.alpha = 0;
    circleF.container.alpha = 0;
    circleFd.container.alpha = 0;
    circleG.container.alpha = 0;
    circleGd.container.alpha = 0;
    circleA.container.alpha = 0;
    circleAd.container.alpha = 0;
    circleB.container.alpha = 0;

    // - LAYERS -
    let layerGirl = new Layer(
        'layerGirl',
        [girl],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'scale': new PIXI.Point(-0.25, 0.25),
            'rotation': -0.2
        }
    );
    
    let layerBass = new Layer(
        'layerBass',
        [
            circleWater,
            circleC,
            circleCd,
            circleD,
            circleDd,
            circleE,
            circleF,
            circleFd,
            circleG,
            circleGd,
            circleA,
            circleAd,
            circleB,
        ],
        [assets.particles.blurBassWater.clone()],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
        }
    );
    
    let layerBubble = new Layer(
        'layerBubble',
        [],
        [assets.particles.bubbleWater.clone()],
        {
            'position': new PIXI.Point(0, window.innerHeight),
        }
    );

    // - KEYS -
    // Key bass
    let elementsBass = [
        {
            'name': 'keyC4',
            'color': assets.colors.noteC,
            'midiNote': Config.keyboardBass.keyC.midi,
            'keyCode': Config.keyboardBass.keyC.keyCode
        },
        {
            'name': 'keyCd4',
            'color': assets.colors.noteCd,
            'midiNote': Config.keyboardBass.keyCd.midi,
            'keyCode': Config.keyboardBass.keyCd.keyCode
        },
        {
            'name': 'keyD4',
            'color': assets.colors.noteD,
            'midiNote': Config.keyboardBass.keyD.midi,
            'keyCode': Config.keyboardBass.keyD.keyCode
        },
        {
            'name': 'keyDd4',
            'color': assets.colors.noteDd,
            'midiNote': Config.keyboardBass.keyDd.midi,
            'keyCode': Config.keyboardBass.keyDd.keyCode
        },
        {
            'name': 'keyE4',
            'color': assets.colors.noteE,
            'midiNote': Config.keyboardBass.keyE.midi,
            'keyCode': Config.keyboardBass.keyE.keyCode
        },
        {
            'name': 'keyF4',
            'color': assets.colors.noteF,
            'midiNote': Config.keyboardBass.keyF.midi,
            'keyCode': Config.keyboardBass.keyF.keyCode
        },
        {
            'name': 'keyFd4',
            'color': assets.colors.noteFd,
            'midiNote': Config.keyboardBass.keyFd.midi,
            'keyCode': Config.keyboardBass.keyFd.keyCode
        },
        {
            'name': 'keyG4',
            'color': assets.colors.noteG,
            'midiNote': Config.keyboardBass.keyG.midi,
            'keyCode': Config.keyboardBass.keyG.keyCode
        },
        {
            'name': 'keyGd4',
            'color': assets.colors.noteGd,
            'midiNote': Config.keyboardBass.keyGd.midi,
            'keyCode': Config.keyboardBass.keyGd.keyCode
        },
        {
            'name': 'keyA4',
            'color': assets.colors.noteA,
            'midiNote': Config.keyboardBass.keyA.midi,
            'keyCode': Config.keyboardBass.keyA.keyCode
        },
        {
            'name': 'keyAd4',
            'color': assets.colors.noteAd,
            'midiNote': Config.keyboardBass.keyAd.midi,
            'keyCode': Config.keyboardBass.keyAd.keyCode
        },
        {
            'name': 'keyB4',
            'color': assets.colors.noteB,
            'midiNote': Config.keyboardBass.keyB.midi,
            'keyCode': Config.keyboardBass.keyB.keyCode
        }
    ];

    // Mapping Key for bass blur water bubble
    let keyBass = [];
    for (let i = 0; i < elementsBass.length; i++) {
        let key = new Key(
            elementsBass[i].name,
            elementsBass[i].midiNote,
            elementsBass[i].keyCode,
            function (velocity) {
                var indiceVel = (velocity / 128) / 2;

                let R = parseInt(elementsBass[i].color.substr(2, 2), 16);
                let G = parseInt(elementsBass[i].color.substr(4, 2), 16);
                let B = parseInt(elementsBass[i].color.substr(6, 2), 16);

                layerBass.particles.blurBassWater.particles.startColor = [R, G, B];
                layerBass.particles.blurBassWater.particles.endColor = [R, G, B];
                layerBass.particles.blurBassWater.particles.maxLifetime = indiceVel;
                layerBass.particles.blurBassWater.particles.endSpeed = 100 + velocity / 2;

                layerBass.particles.blurBassWater.activate();
            },
            function () { 
                layerBass.particles.blurBassWater.activate();
            },
            function () {
                layerBass.particles.blurBassWater.stop();
            },
            0,
            Config.beat / 16,
            layerBass.container
        );
        keyBass.push(key);
    }

    // Keys lead
    let elementsLead = [
        {
            'name': 'keyC5',
            'element': circleC,
            'midiNote': Config.keyboardLead.keyC.midi,
            'keyCode': Config.keyboardLead.keyC.keyCode
        },
        {
            'name': 'keyCd5',
            'element': circleCd,
            'midiNote': Config.keyboardLead.keyCd.midi,
            'keyCode': Config.keyboardLead.keyCd.keyCode
        },
        {
            'name': 'keyD5',
            'element': circleD,
            'midiNote': Config.keyboardLead.keyD.midi,
            'keyCode': Config.keyboardLead.keyD.keyCode
        },
        {
            'name': 'keyDd5',
            'element': circleDd,
            'midiNote': Config.keyboardLead.keyDd.midi,
            'keyCode': Config.keyboardLead.keyDd.keyCode
        },
        {
            'name': 'keyE5',
            'element': circleE,
            'midiNote': Config.keyboardLead.keyE.midi,
            'keyCode': Config.keyboardLead.keyE.keyCode
        },
        {
            'name': 'keyF5',
            'element': circleF,
            'midiNote': Config.keyboardLead.keyF.midi,
            'keyCode': Config.keyboardLead.keyF.keyCode
        },
        {
            'name': 'keyFd5',
            'element': circleFd,
            'midiNote': Config.keyboardLead.keyFd.midi,
            'keyCode': Config.keyboardLead.keyFd.keyCode
        },
        {
            'name': 'keyG5',
            'element': circleG,
            'midiNote': Config.keyboardLead.keyG.midi,
            'keyCode': Config.keyboardLead.keyG.keyCode
        },
        {
            'name': 'keyGd5',
            'element': circleGd,
            'midiNote': Config.keyboardLead.keyGd.midi,
            'keyCode': Config.keyboardLead.keyGd.keyCode
        },
        {
            'name': 'keyA5',
            'element': circleA,
            'midiNote': Config.keyboardLead.keyA.midi,
            'keyCode': Config.keyboardLead.keyA.keyCode
        },
        {
            'name': 'keyAd5',
            'element': circleAd,
            'midiNote': Config.keyboardLead.keyAd.midi,
            'keyCode': Config.keyboardLead.keyAd.keyCode
        },
        {
            'name': 'keyB5',
            'element': circleB,
            'midiNote': Config.keyboardLead.keyB.midi,
            'keyCode': Config.keyboardLead.keyB.keyCode
        }
    ];

    // Mapping Key for lead, spinning circle
    let keyLead = [];
    for (let i = 0; i < elementsLead.length; i++) {
        let key = new Key(
            elementsLead[i].name,
            elementsLead[i].midiNote,
            elementsLead[i].keyCode,
            function (velocity) {
                var indiceVel = (velocity / 128) * 1 + 0.5;

                elementsLead[i].element.container.scale = new PIXI.Point(indiceVel, indiceVel);
                elementsLead[i].element.container.alpha = 1;
                
            },
            function () {
 
            },
            function () {
                elementsLead[i].element.container.alpha = 0;
            },
            Config.beat,
            Config.beat,
            layerBubble.container
        );
        keyLead.push(key);
    }

    // - LFO -
    let lfoLead = new LFO(
        'lfo',
        Config.beat / 64,
        'triangle',
        0.05
    );

    let lfoGirl = new LFO(
        'lfo',
        0.1,
        'saw',
        0.5
    );

    // - SCENE -
    let scene = new Scene(
        'SceneSeven',
        [].concat(keyBass).concat(keyLead),
        [],
        [],
        [],
        [layerBubble, layerBass, layerGirl],
        assets.animations.animateOutroOpacity.clone(),
        assets.animations.animateIntroOpacity.clone(),
        {
            'alpha': 0,
        },
        [lfoLead]
    );

    // Connect lead animation speed variation to an LFO
    let animationLeadSpiralLFO = assets.animations.animationLeadSpiralLFO.clone();
    let animationLeadStepSpiralLFO = animationLeadSpiralLFO.stepAnimations[0];
    animationLeadStepSpiralLFO.changeSpeed = function () {
        this.speed = lfoLead.value();
    };

    // Create specific animation to manage
    // the ball in front or behind the bass bubble
    let addBeetweenCircle = 25;
    for (let i = 0; i < elementsLead.length; i++) {
        // Creating the Step Animation
        let animationStepRotateCircle = new StepAnimation(
            'animationStepRotateCircle',
            function (elem, delta) {
                elem.position.x = (app.renderer.width / 2 + (250 + 55 * i) * Math.cos(this.speed));
                elem.position.y = (app.renderer.height / 2 + (250 + 55 * i) * Math.sin(this.speed) / 2);
                if (elem.position.y < circleWater.container.position.y &&
                        layerBass.container.getChildIndex(elem) > layerBass.container.getChildIndex(circleWater.container)) {
                    // Behind
                    layerBass.container.setChildIndex(elem, 0);
                }
                if (elem.position.y > circleWater.container.position.y && 
                        layerBass.container.getChildIndex(elem) < layerBass.container.getChildIndex(circleWater.container)) {
                    layerBass.container.setChildIndex(elem, layerBass.container.children.length - 1);
                }
                return true;
            },
            0,
            (2*Math.PI * Math.random()),
            function () {
                this.speed += Math.PI / 200;
            }
        );
        addBeetweenCircle += addBeetweenCircle;

        // Create the Animation
        let animationRotateCircle = new Animation(
            'animationRotateCircle',
            [animationStepRotateCircle],
            true,
            false
        );

        // Add anmation to the scene
        scene.addAnimations([animationRotateCircle], [elementsLead[i].element.container]);
        scene.addAnimations([animationLeadSpiralLFO], [elementsLead[i].element.container]);
    }

    // Connect girl animation speed variation to an LFO
    let animationLFOGirl = assets.animations.animationLFO.clone();
    let animationStepLFOGirl = animationLFOGirl.stepAnimations[0];
    animationStepLFOGirl.changeSpeed = function () {
        this.speed = lfoGirl.value();
    };
    scene.addAnimations([animationLFOGirl], [girl.container, circleWater.container, layerBass.particles.blurBassWater.container]);
    
    return scene;
}