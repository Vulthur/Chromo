/*jshint esversion: 6 */
import Key from '../../../core/Key.js';
import Knob from '../../../core/Knob.js';
import Pad from '../../../core/Pad.js';
import Switch from '../../../core/Switch.js';
import LFO from '../../../core/LFO.js';
import Layer from '../../../core/Layer.js';
import Scene from '../../../core/Scene.js';
import Config from '../Config.js';

export default function create(assets, app) {
    // - ELEMENTS -
    let girl = assets.elements.girl;
    girl.container.position.set(app.renderer.width / 2, app.renderer.height / 2);

    let layerGirl = new Layer(
        'layerGirl',
        [girl],
        [assets.particles.blurBassGirl.clone()],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0,
            'scale': new PIXI.Point(0.5, 0.5),
        }
    );

    // - LAYERS -
    let layerParticles = new Layer(
        'layerParticles',
        [],
        [assets.particles.flyingCube.clone()],
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
            'rotation': 0,
            'scale': new PIXI.Point(0.5, 0.5),
        }
    );

    let layerDrum = new Layer(
        'layerDrum',
        [],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0,
            'scale': new PIXI.Point(0.5, 0.5),
        }
    );

    let layerHihat = new Layer(
        'layerHihat',
        [],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0,
            'scale': new PIXI.Point(0.5, 0.5),
        }
    );

    // - KEYS -
    // Key drum
    let keyKick = new Key(
        'kick',
        Config.drumKit.kick.midi,
        Config.drumKit.kick.keyCode,
        function (velocity) {
            var indiceVel = (velocity / 128) * 2.5;

            let squareKick = assets.elements.squareKick.clone();
            squareKick.init();

            squareKick.container.position = new PIXI.Point(app.renderer.width / 2, app.renderer.height / 2);
            squareKick.container.scale = new PIXI.Point(indiceVel, indiceVel);
            this.container.addChild(squareKick.container);

            scene.addAnimations([assets.animations.animateKick.clone()], [squareKick.container]);

        },
        function () {},
        function () {},
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

            let snare = assets.elements.squareSnare.clone();
            snare.init();
            snare.container.position = new PIXI.Point(app.renderer.width / 4, app.renderer.height / 2);
            snare.container.scale = new PIXI.Point(indiceVel, indiceVel);

            this.container.addChild(snare.container);
            scene.addAnimations([assets.animations.animationSnareLeft.clone()], [snare.container]);

            let snare2 = assets.elements.squareSnare.clone();
            snare2.init();
            snare2.container.position = new PIXI.Point(app.renderer.width / 4 * 3, app.renderer.height / 2);
            snare2.container.scale = new PIXI.Point(indiceVel, indiceVel);

            this.container.addChild(snare2.container);
            scene.addAnimations([assets.animations.animationSnareRight.clone()], [snare2.container]);
        },
        function () {},
        function () {},
        Config.beat / 8,
        Config.beat / 8,
        layerDrum.container
    );

    let keyHiHat = new Key(
        'hihat',
        Config.drumKit.hihat.midi,
        Config.drumKit.hihat.keyCode,
        function (velocity) {
            var indiceVel = (velocity / 128) * 4;

            let points = assets.splitCircle({ x: 0, y: 0 }, app.renderer.width / 3, 5);

            for (let i = 0; i < points.length - 1; i++) {
                let ellipse = assets.elements.ellispeHihat.clone();
                ellipse.init();

                ellipse.container.position.set(points[i].x + app.renderer.width / 2, points[i].y + app.renderer.height / 2);
                ellipse.container.scale = new PIXI.Point(indiceVel, indiceVel);

                this.container.addChild(ellipse.container);
                scene.addAnimations([assets.animations.animationHiHat.clone()], [ellipse.container]);
            }
        },
        function () {},
        function () {},
        Config.beat / 8,
        Config.beat / 8,
        layerHihat.container
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

    // Mapping Key bass, color poarticle girl
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
                
                layerGirl.particles.blurBassGirl.particles.startColor = [R, G, B];
                layerGirl.particles.blurBassGirl.particles.endColor = [R, G, B];
                layerGirl.particles.blurBassGirl.particles.maxLifetime = indiceVel;
                layerGirl.particles.blurBassGirl.particles.endSpeed = 100 + velocity / 2;

                layerGirl.particles.blurBassGirl.activate();
            },
            function () {
                layerGirl.particles.blurBassGirl.activate();
            },
            function () {
                layerGirl.particles.blurBassGirl.stop();
            },
            0,
            Config.beat / 16,
            layerCircle.container
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

    // Mapping Key for Lead, color circle
    let keyLead = [];
    for (let i = 0; i < elementsLead.length; i++) {
        let key = new Key(
            elementsLead[i].name,
            elementsLead[i].midiNote,
            elementsLead[i].keyCode,
            function (velocity) {
                var indiceVel = (velocity / 128) * 4;
      
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
                
                var indiceVel = (this.lastVelocity / 128) * 4;
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

    // - KNOBS -
    let knobDepth = new Knob(
        'knobDepth',
        Config.knobs.knob1.midi,
        null,
        function(velocity){
            var indiceVel = (velocity / 128) / 2 + 0.25;            
            layerGirl.container.scale.x = 1 - indiceVel;
            layerGirl.container.scale.y = 1 - indiceVel;

            layerCircle.container.scale.x = 1 - indiceVel;
            layerCircle.container.scale.y = 1 - indiceVel;

            layerDrum.container.scale.x = 1 - indiceVel;
            layerDrum.container.scale.y = 1 - indiceVel;

            layerHihat.container.scale.x = 1 - indiceVel;
            layerHihat.container.scale.y = 1 - indiceVel;
        }
    );

    let knobParticule = new Knob(
        'knobParticule',
        Config.knobs.knob2.midi,
        null,
        function (velocity) {
            for (let i = 0; i < layerParticles.particles.length; i++) {               
                layerParticles.particles[i].particles.maxParticles = 
                    assets.particles.flyingCube.particles.maxParticles + velocity * 4;
                layerParticles.particles[i].particles.startScale =
                    assets.particles.flyingCube.particles.startScale + (velocity / 256);    
                layerParticles.particles[i].particles.endScale =
                    assets.particles.flyingCube.particles.endScale + (velocity / 256);    
            }
        }
    );

    let knobRotation = new Knob(
        'knobRotation',
        Config.knobs.knob3.midi,
        null,
        function (velocity) {
            var indiceVel = (velocity / 127) * (Math.PI / 128);
            stepRotationRotationGirl.speed = indiceVel;
        }
    );
    
    let knobLeadLFO = new Knob(
        'knobLeadLFO',
        Config.knobs.knob4.midi,
        null,
        function (velocity) {
            var indiceVel = (velocity / 127) * 10;
            lfoLead.frequencie = indiceVel;  
        }
    );

    // - SWITCHS -
    let switchParticle = new Switch(
        'switchParticle',
        Config.switchs.switch1.midi,
        null,
        function(){
            layerParticles.container.visible = true;
        },
        function(){
            layerParticles.container.visible = false;
        }
    );

    // - PADS -
    let padParticule = new Pad(
        'padParticule',
        Config.pads.pad1.midi,
        null,
        function(){
            let texture = layerParticles.particles.flyingCube.particles.particleImages[0];           
            if (texture === assets.textures.pixelCircle){
                layerParticles.particles.flyingCube.particles.particleImages[0] = assets.textures.pixelTriangle;
            } else if (texture === assets.textures.pixelSquare) {
                layerParticles.particles.flyingCube.particles.particleImages[0] = assets.textures.pixelCircle;
            } else {
                layerParticles.particles.flyingCube.particles.particleImages[0] = assets.textures.pixelSquare;
            }            
        }
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
        10,
        'triangle',
        10
    );

    // - SCENE -
    let scene = new Scene(
        'SceneFive',
        [keyKick, keySnare, keyHiHat].concat(keyLead).concat(keyBass),
        [knobDepth, knobParticule, knobRotation, knobLeadLFO],
        [padParticule],
        [switchParticle],
        [layerParticles, layerCircle, layerDrum, layerHihat, layerGirl],
        assets.animations.animateOutroOpacity.clone(),
        assets.animations.animateIntroOpacity.clone(),
        {
            'alpha': 0,
        },
        [lfoGirl, lfoLead]
    );
    
    // Access to rotation step for the lfo girl
    let rotationRotationGirl = assets.animations.animateRotationGirl.clone();
    let stepRotationRotationGirl = rotationRotationGirl.stepAnimations[0];

    // Connection animation to LFO
    let animationLFOGirl = assets.animations.animationLFO.clone();
    let animationStepLFOGirl = animationLFOGirl.stepAnimations[0];  
    animationStepLFOGirl.changeSpeed = function(){
        this.speed = lfoGirl.value();
    };
    
    let animationLeadLFO = assets.animations.animationLeadLFO.clone();
    let animationStepLeadLFO = animationLeadLFO.stepAnimations[0];  
    animationStepLeadLFO.changeSpeed = function(){    
        this.speed = lfoLead.value();
    };

    // Adding animation to the scene
    scene.addAnimations([animationLeadLFO], [layerCircle.container]);
    scene.addAnimations([rotationRotationGirl], [layerGirl.container]);
    scene.addAnimations([animationLFOGirl], [layerGirl.container]);
    scene.addAnimations([assets.animations.animationGirl.clone()], [layerGirl.container]);
    scene.addAnimations([assets.animations.animateLayer.clone()], [layerDrum.container]);
    scene.addAnimations([assets.animations.animationLayerHiHat.clone()], [layerHihat.container]);

    return scene;
}