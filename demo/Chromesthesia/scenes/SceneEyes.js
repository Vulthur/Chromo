/*jshint esversion: 6 */

// - IMPORT -
import Key from '../../../core/Key.js';
import Layer from '../../../core/Layer.js';
import Scene from '../../../core/Scene.js';
import Config from '../Config.js';

// - MAIN -
export default function create(assets, app) {

    let pupilSide = true;

    // - ELEMENTS -
    let eyes = assets.elements.eyes.clone();
    let pupil = assets.elements.pupil.clone();
    eyes.container.position.set(app.renderer.width / 2, app.renderer.height / 2);
    pupil.container.position.set(app.renderer.width / 2, app.renderer.height / 2);
    let layerEyes = new Layer(
        'layerEyes',
        [eyes],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0
        }
    );

    // - LAYERS -
    let layerPupil = new Layer(
        'layerPupil',
        [pupil],
        [assets.particles.blurBassPupil.clone()],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0
        }
    );

    let layerCircle = new Layer(
        'layerCircle',
        [],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0
        }
    );
    layerCircle.container.scale.set(0.25, 0.25);

    // - KEYS -
    let keyKick = new Key(
        'kick',
        Config.drumKit.kick.midi,
        Config.drumKit.kick.keyCode,
        function (velocity) { 
            if (pupilSide){
                scene.addAnimations([assets.animations.animationPupilLeft.clone()], [layerPupil.container]);
            } else {
                scene.addAnimations([assets.animations.animationPupilRight.clone()], [layerPupil.container]);
            }
            pupilSide = !pupilSide;
            scene.addAnimations([assets.animations.animationScalePupil.clone()], [layerPupil.container]);
            scene.addAnimations([assets.animations.animationScaleEye.clone()], [layerEyes.container]);
        },
        function () {},
        function () {},
        Config.beat / 16,
        Config.beat / 16,
        layerPupil.container
    );

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

    // Mapping Key for bass, eye particles
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

                layerPupil.particles.blurBassPupil.particles.startColor = [R, G, B];
                layerPupil.particles.blurBassPupil.particles.endColor = [R, G, B];
                layerPupil.particles.blurBassPupil.particles.maxLifetime = indiceVel;
                layerPupil.particles.blurBassPupil.particles.endSpeed = 100 + velocity / 2;

                layerPupil.particles.blurBassPupil.activate();
            },
            function () {
                layerPupil.particles.blurBassPupil.activate();
            },
            function () { 
                layerPupil.particles.blurBassPupil.stop();
            },
            0,
            Config.beat / 16,
            layerPupil.container
        );
        keyBass.push(key);
    }

    // Keys lead
    let elementsLead = [
        {
            'name': 'keyC5',
            'element': assets.elements.circleC,
            'midiNote': Config.keyboardLead.keyC.midi,
            'keyCode': Config.keyboardLead.keyC.keyCode
        },
        {
            'name': 'keyCd5',
            'element': assets.elements.circleCd,
            'midiNote': Config.keyboardLead.keyCd.midi,
            'keyCode': Config.keyboardLead.keyCd.keyCode
        },
        {
            'name': 'keyD5',
            'element': assets.elements.circleD,
            'midiNote': Config.keyboardLead.keyD.midi,
            'keyCode': Config.keyboardLead.keyD.keyCode
        },
        {
            'name': 'keyDd5',
            'element': assets.elements.circleDd,
            'midiNote': Config.keyboardLead.keyDd.midi,
            'keyCode': Config.keyboardLead.keyDd.keyCode
        },
        {
            'name': 'keyE5',
            'element': assets.elements.circleE,
            'midiNote': Config.keyboardLead.keyE.midi,
            'keyCode': Config.keyboardLead.keyE.keyCode
        },
        {
            'name': 'keyF5',
            'element': assets.elements.circleF,
            'midiNote': Config.keyboardLead.keyF.midi,
            'keyCode': Config.keyboardLead.keyF.keyCode
        },
        {
            'name': 'keyFd5',
            'element': assets.elements.circleFd,
            'midiNote': Config.keyboardLead.keyFd.midi,
            'keyCode': Config.keyboardLead.keyFd.keyCode
        },
        {
            'name': 'keyG5',
            'element': assets.elements.circleG,
            'midiNote': Config.keyboardLead.keyG.midi,
            'keyCode': Config.keyboardLead.keyG.keyCode
        },
        {
            'name': 'keyGd5',
            'element': assets.elements.circleGd,
            'midiNote': Config.keyboardLead.keyGd.midi,
            'keyCode': Config.keyboardLead.keyGd.keyCode
        },
        {
            'name': 'keyA5',
            'element': assets.elements.circleA,
            'midiNote': Config.keyboardLead.keyA.midi,
            'keyCode': Config.keyboardLead.keyA.keyCode
        },
        {
            'name': 'keyAd5',
            'element': assets.elements.circleAd,
            'midiNote': Config.keyboardLead.keyAd.midi,
            'keyCode': Config.keyboardLead.keyAd.keyCode
        },
        {
            'name': 'keyB5',
            'element': assets.elements.circleB,
            'midiNote': Config.keyboardLead.keyB.midi,
            'keyCode': Config.keyboardLead.keyB.keyCode
        }
    ];

    // Mapping Key for Lead, circle
    let keyLead = [];
    for (let i = 0; i < elementsLead.length; i++) {
        let key = new Key(
            elementsLead[i].name,
            elementsLead[i].midiNote,
            elementsLead[i].keyCode,
            function (velocity) {
                var indiceVel = (velocity / 128) * 25;

                let circle = elementsLead[i].element.clone();
                circle.init();

                circle.container.alpha = 0;
                circle.container.position.set(Math.random() * app.renderer.width, Math.random() * app.renderer.height);
                circle.container.scale = new PIXI.Point(indiceVel, indiceVel);
                this.container.addChild(circle.container);

                scene.addAnimations(
                    [assets.animations.animationLead.clone()],
                    [circle.container]
                );
            },
            function () {
                var indiceVel = (this.lastVelocity / 128) * 25;

                let circle = elementsLead[i].element.clone();
                circle.init();

                circle.container.alpha = 0;
                circle.container.position.set(Math.random() * app.renderer.width, Math.random() * app.renderer.height);
                circle.container.scale = new PIXI.Point(indiceVel, indiceVel);
                this.container.addChild(circle.container);

                scene.addAnimations(
                    [assets.animations.animationLead.clone()],
                    [circle.container]
                );
            },
            function () { },
            Config.beat,
            Config.beat,
            layerCircle.container
        );
        keyLead.push(key);
    }

    // - SCENE -
    let scene = new Scene(
        'SceneFour',
        [keyKick].concat(keyLead).concat(keyBass),
        [],
        [],
        [],
        [layerCircle, layerEyes, layerPupil],
        assets.animations.animateOutroOpacity.clone(),
        assets.animations.animateIntroOpacity.clone(),
        {
            'alpha': 0,
            'pupilSide': false,
        },
        []
    );

    return scene;
}
