/*jshint esversion: 6 */

// - IMPORT -
import Key from '../../../core/Key.js';
import LFO from '../../../core/LFO.js';
import Layer from '../../../core/Layer.js';
import Scene from '../../../core/Scene.js';
import Config from '../Config.js';

// - MAIN -
export default function create(assets, app) {

    // - ELEMENTS -
    // Girl
    let girlFront = assets.elements.girlFront.clone();
    girlFront.container.scale.set(0.5, 0.5);
    girlFront.container.position.set(app.renderer.width / 2, app.renderer.height / 2);

    // Spirals
    // Rotation spiral + animation   
    let arrayAllSpiral = [];
    let arraySpiralColor = [];
    let arraySpiralShape = [];
    for (let i = 11; i >= 0; i--) {
        let color = assets.elements['spiralColor' + i];
        let shape = assets.elements['spiralShape' + i];
             
        color.container.rotation = i * -3 * Math.PI / 4;
        shape.container.rotation = i * -3 * Math.PI / 4;

        color.container.speed = Math.PI / 16000 * i;
        shape.container.speed = Math.PI / 16000 * i;

        color.container.alpha = 0;

        arraySpiralColor.push(color);
        arraySpiralShape.push(shape);
        arrayAllSpiral.push(shape);
        arrayAllSpiral.push(color);
    }

    // Drums
    let squareKick = assets.elements.squareQuater1.clone();
    let squareHihatO = assets.elements.squareQuater2.clone();
    let squareSnare = assets.elements.squareQuater3.clone();
    let squareHiHatC = assets.elements.squareQuater4.clone();

    squareKick.container.position.set(app.renderer.width / 4, app.renderer.height / 4);
    squareSnare.container.position.set(app.renderer.width / 4 * 3, app.renderer.height / 4);
    squareHihatO.container.position.set(app.renderer.width / 4, app.renderer.height / 4 * 3);
    squareHiHatC.container.position.set(app.renderer.width / 4 * 3, app.renderer.height / 4 * 3);

    squareKick.container.rotation = Math.PI / 4; 
    squareHihatO.container.rotation = Math.PI / 4; 
    squareSnare.container.rotation = Math.PI / 4; 
    squareHiHatC.container.rotation = Math.PI / 4; 

    squareKick.container.alpha = 0;
    squareHihatO.container.alpha = 0;
    squareSnare.container.alpha = 0;
    squareHiHatC.container.alpha = 0;

    // - LAYERS -
    let layerSpiral = new Layer(
        'layerSpiral',
        arrayAllSpiral,
        [],
        {
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0
        }
    );

    let layerGirl = new Layer(
        'layerGirl',
        [girlFront],
        [assets.particles.blurBassGirlFront.clone()],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0
        }
    );
    
    let layerDrum = new Layer(
        'layerDrum',
        [squareKick, squareHihatO, squareSnare, squareHiHatC],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2 - 35 , window.innerHeight / 2 - 35),
            'rotation': 0
        }
    );

    // - KEY -
    // Keys lead
    let elementsLead = [
        {
            'name': 'keyB5',
            'midiNote': Config.keyboardLead.keyC.midi,
            'keyCode': Config.keyboardLead.keyC.keyCode
        },
        {
            'name': 'keyAd5',
            'midiNote': Config.keyboardLead.keyCd.midi,
            'keyCode': Config.keyboardLead.keyCd.keyCode
        },
        {
            'name': 'keyA5',
            'midiNote': Config.keyboardLead.keyD.midi,
            'keyCode': Config.keyboardLead.keyD.keyCode
        },
        {
            'name': 'keyGd5',
            'midiNote': Config.keyboardLead.keyDd.midi,
            'keyCode': Config.keyboardLead.keyDd.keyCode
        },
        {
            'name': 'keyG5',
            'midiNote': Config.keyboardLead.keyE.midi,
            'keyCode': Config.keyboardLead.keyE.keyCode
        },
        {
            'name': 'keyFd5',
            'midiNote': Config.keyboardLead.keyF.midi,
            'keyCode': Config.keyboardLead.keyF.keyCode
        },
        {
            'name': 'keyF5',
            'midiNote': Config.keyboardLead.keyFd.midi,
            'keyCode': Config.keyboardLead.keyFd.keyCode
        },
        {
            'name': 'keyE5',
            'midiNote': Config.keyboardLead.keyG.midi,
            'keyCode': Config.keyboardLead.keyG.keyCode
        },
        {
            'name': 'keyDd5',
            'midiNote': Config.keyboardLead.keyGd.midi,
            'keyCode': Config.keyboardLead.keyGd.keyCode
        },
        {
            'name': 'keyD5',
            'midiNote': Config.keyboardLead.keyA.midi,
            'keyCode': Config.keyboardLead.keyA.keyCode
        },
        {
            'name': 'keyCd5',
            'midiNote': Config.keyboardLead.keyAd.midi,
            'keyCode': Config.keyboardLead.keyAd.keyCode
        },
        {
            'name': 'keyC5',
            'midiNote': Config.keyboardLead.keyB.midi,
            'keyCode': Config.keyboardLead.keyB.keyCode
        },
 
    ];

    // Mapping Key for lead, color spiral
    let keyLead = [];
    for (let i = 0, j = elementsLead.length - 1; i < elementsLead.length; i++, j--) {
        let key = new Key(
            elementsLead[i].name,
            elementsLead[i].midiNote,
            elementsLead[i].keyCode,
            function (velocity) {
                arraySpiralColor[j].container.alpha = 1;
            },
            function () {
            },
            function () { 
                arraySpiralColor[j].container.alpha = 0; 
            },
            Config.beat / 8,
            Config.beat / 8,
            layerSpiral.container
        );
        keyLead.push(key);
    }

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

    // Mapping Key for bass blur girl particle
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

                layerGirl.particles.blurBassGirlFront.particles.startColor = [R, G, B];
                layerGirl.particles.blurBassGirlFront.particles.endColor = [R, G, B];
                layerGirl.particles.blurBassGirlFront.particles.maxLifetime = indiceVel;
                layerGirl.particles.blurBassGirlFront.particles.endSpeed = 100 + velocity / 2;

                layerGirl.particles.blurBassGirlFront.activate();
            },
            function () {
                layerGirl.particles.blurBassGirlFront.activate();
            },
            function () {
                layerGirl.particles.blurBassGirlFront.stop();
            },
            0,
            Config.beat / 16,
            layerGirl.container
        );
        keyBass.push(key);
    }

    // Key drum
    let keyKick = new Key(
        'kick',
        Config.drumKit.kick.midi,
        Config.drumKit.kick.keyCode,
        function (velocity) {
            var indiceVel = (velocity / 128) * 2;
            squareKick.container.alpha = 1;
        },
        function () { },
        function () {
            squareKick.container.alpha = 0;
        },
        Config.beat / 8,
        Config.beat / 8,
        layerDrum.container
    );

    let keySnare = new Key(
        'snare',
        Config.drumKit.snare.midi,
        Config.drumKit.snare.keyCode,
        function (velocity) {
            var indiceVel = (velocity / 128) * 2;
            squareSnare.container.alpha = 1;
        },
        function () { },
        function () {
            squareSnare.container.alpha = 0;
        },
        Config.beat / 8,
        Config.beat / 8,
        layerDrum.container
    );

    let keyHiHatC = new Key(
        'hihat',
        Config.drumKit.hihat.midi,
        Config.drumKit.hihat.keyCode,
        function (velocity) {
            squareHiHatC.container.alpha = 1;
        },
        function () { },
        function () {
            squareHiHatC.container.alpha = 0;
        },
        Config.beat / 16,
        Config.beat / 16,
        layerDrum.container
    );

    let keyHiHatO = new Key(
        'hihatO',
        Config.drumKit.hihatc.midi,
        Config.drumKit.hihatc.keyCode,
        function (velocity) {
            squareHihatO.container.alpha = 1;
        },
        function () { },
        function () {
            squareHihatO.container.alpha = 0;
        },
        Config.beat / 16,
        Config.beat / 16,
        layerDrum.container
    );

    // - LFO -
    let lfoGirl = new LFO(
        'lfo',
        0.1,
        'saw',
        0.5
    );

    let lfoLead = new LFO(
        'lfo',
        Config.beat / 64,
        'triangle',
        0.05
    );

    // - SCENE -
    let scene = new Scene(
        'SceneSix',
        [keyKick, keySnare, keyHiHatC, keyHiHatO].concat(keyBass).concat(keyLead),
        [],
        [],
        [],
        [layerSpiral, layerDrum, layerGirl],
        assets.animations.animateOutroOpacity.clone(),
        assets.animations.animateIntroOpacity.clone(),
        {
            'alpha': 1,
        },
        [lfoGirl]
    );

    // Connection animation to LFO
    let animationLFOGirl = assets.animations.animationLFO.clone();
    let animationStepLFOGirl = animationLFOGirl.stepAnimations[0];
    animationStepLFOGirl.changeSpeed = function () {
        this.speed = lfoGirl.value();
    };

    let animationLeadSpiralLFO = assets.animations.animationLeadSpiralLFO.clone();
    let animationLeadStepSpiralLFO = animationLeadSpiralLFO.stepAnimations[0];
    animationLeadStepSpiralLFO.changeSpeed = function () {
        this.speed = lfoLead.value();
    };

    // For each element of the spiral 
    // add the LFO and increase the speed rotation.
    for (let i = 0; i <  arraySpiralColor.length; i++) {
        scene.addAnimations([animationLeadSpiralLFO], [arraySpiralColor[i].container]);
        
        let animationSpiralRotation = assets.animations.animationSpiralRotation.clone();
        let animationStepSpiralRotation = animationSpiralRotation.stepAnimations[0];
        animationStepSpiralRotation.speed = Math.PI / 16000 * i;

        scene.addAnimations([animationSpiralRotation], [arraySpiralColor[i].container]);
        scene.addAnimations([animationSpiralRotation], [arraySpiralShape[i].container]);
    }

    // Adding animation to the scene.
    scene.addAnimations([animationLFOGirl], [layerGirl.container]);
    scene.addAnimations([assets.animations.animationGirl.clone()], [layerGirl.container]);
    scene.addAnimations([assets.animations.animationSpiralRotation.clone()], [layerSpiral.container]);
    scene.addAnimations([assets.animations.animationSpiralScale.clone()], [layerSpiral.container]);

    return scene;
}