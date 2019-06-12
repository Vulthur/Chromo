/*jshint esversion: 6 */

// - IMPORT -
import Key from '../../../core/Key.js';
import Layer from '../../../core/Layer.js';
import Scene from '../../../core/Scene.js';
import LFO from '../../../core/LFO.js';
import Animation from '../../../core/Animation.js';
import StepAnimation from '../../../core/StepAnimation.js';
import Config from '../Config.js';
import '../../../lib/pixi-filters.js';

// - MAIN -
export default function(assets, app) {

    // - ELEMENTS -
    let noise0 = assets.elements.noise0;
    let noise1 = assets.elements.noise1;
    let noise2 = assets.elements.noise2;
    let noise3 = assets.elements.noise3;
    let noise4 = assets.elements.noise4;
    let noise5 = assets.elements.noise5;
    let noise6 = assets.elements.noise6;
    let noise7 = assets.elements.noise7;
    let noise8 = assets.elements.noise8;
    let noise9 = assets.elements.noise9;
    let noise10 = assets.elements.noise10;
    let noise11 = assets.elements.noise11;
    
    noise0.container.visible = false;
    noise1.container.visible = false;
    noise2.container.visible = false;
    noise3.container.visible = false;
    noise4.container.visible = false;
    noise5.container.visible = false;
    noise6.container.visible = false;
    noise7.container.visible = false;
    noise8.container.visible = false;
    noise9.container.visible = false;
    noise10.container.visible = false;
    noise11.container.visible = false;

    let door = assets.elements.door.clone();
    door.container.position.set(app.renderer.width / 2, app.renderer.height / 2);

    // - PARTICLES -
    let blurDoorParticle = assets.particles.blurDoorParticle.clone();
    blurDoorParticle.container.position.set(app.renderer.width / 2, app.renderer.height / 2);
    
    // - LAYERS -
    let layerDoor = new Layer(
        'layerDoor',
        [
            door,
        ],
        [blurDoorParticle],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
        }
    );

    let layerBackgroundNoise = new Layer(
        'layerBackgroundNoise',
        [  
            noise0,
            noise1,
            noise2,
            noise3,
            noise4,
            noise5,
            noise6,
            noise7,
            noise8,
            noise9,
            noise10,
            noise11,
        ],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'scale': new PIXI.Point(2, 2),
            'rotation': 0
        }
    );

    // - FILTERS -
    var displacementSprite = PIXI.Sprite.fromImage('img/displaceMap.jpg');
    var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    layerBackgroundNoise.container.filters = [displacementFilter];
    displacementFilter.scale.x = 100;
    displacementFilter.scale.y = 100;

    // - KEY -
    // Keys bass
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

    // Mapping Key for Bass, door particles
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

                layerDoor.particles.blurDoorParticle.particles.startColor = [R, G, B];
                layerDoor.particles.blurDoorParticle.particles.endColor = [R, G, B];
                layerDoor.particles.blurDoorParticle.particles.maxLifetime = indiceVel + 0.5;
                layerDoor.particles.blurDoorParticle.particles.endSpeed = 100 + velocity / 2;
                layerDoor.particles.blurDoorParticle.activate();

            },
            function () {
                layerDoor.particles.blurDoorParticle.activate();
            },
            function () {
                layerDoor.particles.blurDoorParticle.stop();
            },
            0,
            Config.beat / 16,
            layerDoor.container
        );
        keyBass.push(key);
    }

    // Key lead
    let elementsLead = [
        {
            'name': 'keyC5',
            'element': noise0,
            'midiNote': Config.keyboardLead.keyC.midi,
            'keyCode': Config.keyboardLead.keyC.keyCode
        },
        {
            'name': 'keyCd5',
            'element': noise1,
            'midiNote': Config.keyboardLead.keyCd.midi,
            'keyCode': Config.keyboardLead.keyCd.keyCode
        },
        {
            'name': 'keyD5',
            'element': noise2,
            'midiNote': Config.keyboardLead.keyD.midi,
            'keyCode': Config.keyboardLead.keyD.keyCode
        },
        {
            'name': 'keyDd5',
            'element': noise3,
            'midiNote': Config.keyboardLead.keyDd.midi,
            'keyCode': Config.keyboardLead.keyDd.keyCode
        },
        {
            'name': 'keyE5',
            'element': noise4,
            'midiNote': Config.keyboardLead.keyE.midi,
            'keyCode': Config.keyboardLead.keyE.keyCode
        },
        {
            'name': 'keyF5',
            'element': noise5,
            'midiNote': Config.keyboardLead.keyF.midi,
            'keyCode': Config.keyboardLead.keyF.keyCode
        },
        {
            'name': 'keyFd5',
            'element': noise6,
            'midiNote': Config.keyboardLead.keyFd.midi,
            'keyCode': Config.keyboardLead.keyFd.keyCode
        },
        {
            'name': 'keyG5',
            'element': noise7,
            'midiNote': Config.keyboardLead.keyG.midi,
            'keyCode': Config.keyboardLead.keyG.keyCode
        },
        {
            'name': 'keyGd5',
            'element': noise8,
            'midiNote': Config.keyboardLead.keyGd.midi,
            'keyCode': Config.keyboardLead.keyGd.keyCode
        },
        {
            'name': 'keyA5',
            'element': noise9,
            'midiNote': Config.keyboardLead.keyA.midi,
            'keyCode': Config.keyboardLead.keyA.keyCode
        },
        {
            'name': 'keyAd5',
            'element': noise10,
            'midiNote': Config.keyboardLead.keyAd.midi,
            'keyCode': Config.keyboardLead.keyAd.keyCode
        },
        {
            'name': 'keyB5',
            'element': noise11,
            'midiNote': Config.keyboardLead.keyB.midi,
            'keyCode': Config.keyboardLead.keyB.keyCode
        }
    ];

    // Mapping Key for Lead, background perlin noise
    let keyLead = [];
    for (let i = 0; i < elementsLead.length; i++) {
        let key = new Key(
            elementsLead[i].name,
            elementsLead[i].midiNote,
            elementsLead[i].keyCode,
            function(velocity) {
                elementsLead[i].element.container.visible = true;               
            },
            function () {
            },
            function () { 
                elementsLead[i].element.container.visible = false;
            },
            Config.beat / 16,
            Config.beat / 16,
            layerBackgroundNoise.container
        );
        keyLead.push(key);
    }

    // Key drum
    let keyKick = new Key(
        'kick',
        Config.drumKit.kick.midi,
        Config.drumKit.kick.keyCode,
        function (velocity) {
            scene.addAnimations([assets.animations.animationScaleEye.clone()], [layerDoor.container]);
        },
        function () { },
        function () {
            //this.clear();
        },
        Config.beat / 16,
        Config.beat / 16,
        layerBackgroundNoise.container
    );

    // - LFO -
    let lfoNoise = new LFO(
        'lfo',
        0.7,
        'sinus',
        300
    );

    // - SCENE -
    let scene = new Scene(
        'SceneThree',
        [keyKick].concat(keyLead).concat(keyBass),
        [],
        [],
        [],
        [layerBackgroundNoise, layerDoor],
        assets.animations.animateOutroTemp.clone(),
        assets.animations.animateIntroTemp.clone(),
        {
            'alpha': 1,
        },
        [lfoNoise]
    );

    // - ANIMATIONS -
    let animationStepFilter = new StepAnimation(
        'animationStepFilter',
        function (elem, delta) {          
            displacementFilter.scale.x = 400 + this.speed;
            displacementFilter.scale.y = 400 + this.speed;
        },
        0,
        1,
        function () {
            this.speed = lfoNoise.value();
        }
    );

    let animationFilter = new Animation(
        'animationRotateCircle',
        [animationStepFilter],
        true,
        false
    );
    
    // Adding animation to the scene.
    scene.addAnimations([assets.animations.animationRotationNoise.clone()], [layerBackgroundNoise.container]);
    scene.addAnimations([animationFilter],[scene.container]);
    return scene;

}