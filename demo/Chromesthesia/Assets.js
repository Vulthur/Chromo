/*jshint esversion: 6 */

// - IMPORTS -
import Element from "../../core/Element.js";
import Particle from "../../core/Particle.js";
import StepAnimation from "../../core/StepAnimation.js";
import Animation from "../../core/Animation.js";
import Config from "./Config.js";
import '../../lib/pixi.js';

// - MAIN -
// Asset graphics for all the scenes.
export default class Asset {
    constructor(renderer) {

        // - COLORS -
        this.arrayColors = [
            '0XFE3143',
            '0XF621EA',
            '0X813CFF',
            '0X3F53E9',
            '0X21B5FF',
            '0X13FFDD',
            '0X3EFE89',
            '0X59FF20',
            '0XFFFC15',
            '0XFFDA48',
            '0XFFAF00',
            '0XFF6829',
        ];
        this.colors = {
            'noteC': '0XFE3143',
            'noteCd': '0XF621EA',
            'noteD': '0X813CFF',
            'noteDd': '0X3F53E9',
            'noteE': '0X21B5FF',
            'noteF': '0X13FFDD',
            'noteFd': '0X3EFE89',
            'noteG': '0X59FF20',
            'noteGd': '0XFFFC15',
            'noteA': '0XFFDA48',
            'noteAd': '0XFFAF00',
            'noteB': '0XFF6829',
        };

        // - GRAPHICS -
        let square = this.createRectangle('0xFFFFFF', 10, 10, 1, 0, 0, 0);
        let squareKick = this.createRectangle('0xFFFFFF', 250, 250, 1, 0, 0, 0);         
        let squareSnare = this.createRectangle('0xFFFFFF', 50, 400, 1, 0, 0, 0);      
        let ellispeHihat = this.createEllipse(16, 20, 0xFFFFFF);
       
        let circleC = this.createCircle(this.colors.noteC, 50, 0, 0, 0);
        let circleCd = this.createCircle(this.colors.noteCd, 50, 0, 0, 0);
        let circleD = this.createCircle(this.colors.noteD, 50, 0, 0, 0);
        let circleDd = this.createCircle(this.colors.noteDd, 50, 0, 0, 0);
        let circleE = this.createCircle(this.colors.noteE, 50, 0, 0, 0);
        let circleF = this.createCircle(this.colors.noteF, 50, 0, 0, 0);
        let circleFd = this.createCircle(this.colors.noteFd, 50, 0, 0, 0);
        let circleG = this.createCircle(this.colors.noteG, 50, 0, 0, 0);
        let circleGd = this.createCircle(this.colors.noteGd, 50, 0, 0, 0);
        let circleA = this.createCircle(this.colors.noteA, 50, 0, 0, 0);
        let circleAd = this.createCircle(this.colors.noteAd, 50, 0, 0, 0);
        let circleB = this.createCircle(this.colors.noteB, 50, 0, 0, 0);
        let whiteLineFall = this.createLine(0, 10, 1, 0xFFFFFF, 1);

        let squareQuater1 = this.createRectangle('0xFFFFFF', 100, 100, 1, 0, 0, 0);
        let squareQuater2 = this.createRectangle('0xFFFFFF', 100, 100, 1, 0, 0, 0);
        let squareQuater3 = this.createRectangle('0xFFFFFF', 100, 100, 1, 0, 0, 0);
        let squareQuater4 = this.createRectangle('0xFFFFFF', 100, 100, 1, 0, 0, 0);

        let circleWater = this.createCircle('0xFFFFFF', 180, 0, 0, 0);
        let circleWater2 = this.createCircle('0x000000', 180, 0, 0, 0);
        let circleBubble = this.createCircle(0, 20, 4, '0xFFFFFF', 1);
        let backGroundGodRay = this.createRectangle('0xFFFFFF', renderer.width, renderer.height, 0, 0, 0, 0);

        this.graphics = {
            'square': square,
            'squareKick': squareKick,
            'squareSnare': squareSnare,
            'ellispeHihat': ellispeHihat,
            'circleC': circleC,
            'circleCd': circleCd,
            'circleD': circleD,
            'circleDd': circleDd,
            'circleE': circleE,
            'circleF': circleF,
            'circleFd': circleFd,
            'circleG': circleG,
            'circleGd': circleGd,
            'circleA': circleA,
            'circleAd': circleAd,
            'circleB': circleB,
            'whiteLineFall': whiteLineFall,
            'squareQuater1': squareQuater1,
            'squareQuater2': squareQuater2,
            'squareQuater3': squareQuater3,
            'squareQuater4': squareQuater4,
            'circleWater': circleWater,
            'circleWater2': circleWater2,
            'circleBubble': circleBubble,
            'backGroundGodRay': backGroundGodRay,
        };
        
        // - TEXTS -
        this.texts = {
            'CHROMESTHESIA': new PIXI.Text(
                'CHROMESTHESIA.',
                {
                    fontFamily: 'RigSolid',
                    fontSize: 150,
                    fill: 0xFFFFFF,
                    align: 'center'
                }
            ),
            'pressAnyKey': new PIXI.Text(
                'Press spacebar or your midi control to go the next scene',
                {
                    fontFamily: 'Futura',
                    fontSize: 40,
                    fill: 0xFFFFFF,
                    align: 'center'
                }
            ),  
        };
        this.texts.CHROMESTHESIA.updateText();
        this.texts.pressAnyKey.updateText();
        
        // - TEXTURES -
        this.textures = {
            'girl': new PIXI.Texture.fromImage('./img/falling.png'),
            'particleGirl': new PIXI.Texture.fromImage('./img/particle-girl.png'),
            'pixelSquare': new PIXI.Texture.fromImage('./img/pixelSquare.png'),
            'pixelTriangle': new PIXI.Texture.fromImage('./img/pixelTriangle.png'),
            'pixelCircle': new PIXI.Texture.fromImage('./img/pixelCircle.png'),
            'eyes': new PIXI.Texture.fromImage('./img/eyes.png'),
            'pupil': new PIXI.Texture.fromImage('./img/pupil.png'),
            'girlFront': new PIXI.Texture.fromImage('./img/girlFront.png'),
            'particleGirlFront': new PIXI.Texture.fromImage('./img/particle-girlFront.png'),
            'water': new PIXI.Texture.fromImage('./img/water.png'),
            'door': new PIXI.Texture.fromImage('./img/door.png'),
            'particleDoor': new PIXI.Texture.fromImage('./img/particleDoor.png'),
            'tutorial': new PIXI.Texture.fromImage('./img/tutorial.png'),
            'end': new PIXI.Texture.fromImage('./img/end.png'),
            'square': renderer.generateTexture(this.graphics.square),
            'squareKick': renderer.generateTexture(this.graphics.squareKick),
            'squareSnare': renderer.generateTexture(this.graphics.squareSnare),
            'ellispeHihat': renderer.generateTexture(this.graphics.ellispeHihat, PIXI.SCALE_MODES.NEAREST, 10),
            'circleC': renderer.generateTexture(this.graphics.circleC, PIXI.SCALE_MODES.NEAREST, 10),
            'circleCd': renderer.generateTexture(this.graphics.circleCd, PIXI.SCALE_MODES.NEAREST, 10),
            'circleD': renderer.generateTexture(this.graphics.circleD, PIXI.SCALE_MODES.NEAREST, 10),
            'circleDd': renderer.generateTexture(this.graphics.circleDd, PIXI.SCALE_MODES.NEAREST, 10),
            'circleE': renderer.generateTexture(this.graphics.circleE, PIXI.SCALE_MODES.NEAREST, 10),
            'circleF': renderer.generateTexture(this.graphics.circleF, PIXI.SCALE_MODES.NEAREST, 10),
            'circleFd': renderer.generateTexture(this.graphics.circleFd, PIXI.SCALE_MODES.NEAREST, 10),
            'circleG': renderer.generateTexture(this.graphics.circleG, PIXI.SCALE_MODES.NEAREST, 10),
            'circleGd': renderer.generateTexture(this.graphics.circleGd, PIXI.SCALE_MODES.NEAREST, 10),
            'circleA': renderer.generateTexture(this.graphics.circleA, PIXI.SCALE_MODES.NEAREST, 10),
            'circleAd': renderer.generateTexture(this.graphics.circleAd, PIXI.SCALE_MODES.NEAREST, 10),
            'circleB': renderer.generateTexture(this.graphics.circleB, PIXI.SCALE_MODES.NEAREST, 10),
            'whiteLineFall': renderer.generateTexture(this.graphics.whiteLineFall, PIXI.SCALE_MODES.NEAREST, 10),
            'CHROMESTHESIA': this.texts.CHROMESTHESIA.texture,
            'pressAnyKey': this.texts.pressAnyKey.texture,
            'circleWater': renderer.generateTexture(this.graphics.circleWater, PIXI.SCALE_MODES.NEAREST, 10),
            'circleWater2': renderer.generateTexture(this.graphics.circleWater2, PIXI.SCALE_MODES.NEAREST, 10),
            'circleBubble': renderer.generateTexture(this.graphics.circleBubble, PIXI.SCALE_MODES.NEAREST, 10),
            'backGroundGodRay': renderer.generateTexture(this.graphics.backGroundGodRay, PIXI.SCALE_MODES.NEAREST, 10),
        };

        // - ELEMNETS -
        this.elements = {
            'girl': new Element(
                'girl',
                [this.textures.girl]
            ),
            'door': new Element(
                'door',
                [this.textures.door]
            ),
            'end': new Element(
                'end',
                [this.textures.end]
            ),
            'particleDoor': new Element(
                'particleDoor',
                [this.textures.particleDoor]
            ),
            'circleWater': new Element(
                'circleWater',
                [this.textures.circleWater]
            ),
            'circleWater2': new Element(
                'circleWater2',
                [this.textures.circleWater2]
            ),
            'girlFront': new Element(
                'girlFront',
                [this.textures.girlFront]
            ),
            'square': new Element(
                'square',
                [this.textures.square]
            ),
            'water': new Element(
                'water',
                [this.textures.water]
            ),
            'tutorial': new Element(
                'tutorial',
                [this.textures.tutorial]
            ),
            'squareQuater1': new Element(
                'squareQuater1',
                [this.graphics.squareQuater1.clone()]
            ),
            'squareQuater2': new Element(
                'squareQuater2',
                [this.graphics.squareQuater2.clone()]
            ),
            'squareQuater3': new Element(
                'squareQuater3',
                [this.graphics.squareQuater3.clone()]
            ),
            'squareQuater4': new Element(
                'squareQuater4',
                [this.graphics.squareQuater4.clone()]
            ),
            'eyes': new Element(
                'eyes',
                [this.textures.eyes]
            ),
            'pupil': new Element(
                'pupil',
                [this.textures.pupil]
            ),
            'squareKick': new Element(
                'squareKick',
                [this.textures.squareKick]
            ),
            'ellispeHihat': new Element(
                'ellispeHihat',
                [this.textures.ellispeHihat]
            ),
            'squareSnare': new Element(
                'squareSnare',
                [this.textures.squareSnare]
            ),
            'circleC': new Element(
                'circleC',
                [this.textures.circleC]
            ),
            'circleCd': new Element(
                'circleCd',
                [this.textures.circleCd]
            ),
            'circleD': new Element(
                'circleD',
                [this.textures.circleD]
            ),
            'circleDd': new Element(
                'circleDd',
                [this.textures.circleDd]
            ),
            'circleE': new Element(
                'circleE',
                [this.textures.circleE]
            ),
            'circleF': new Element(
                'circleF',
                [this.textures.circleF]
            ),
            'circleFd': new Element(
                'circleFd',
                [this.textures.circleFd]
            ),
            'circleG': new Element(
                'circleG',
                [this.textures.circleG]
            ),
            'circleGd': new Element(
                'circleGd',
                [this.textures.circleGd]
            ),
            'circleA': new Element(
                'circleA',
                [this.textures.circleA]
            ),
            'circleAd': new Element(
                'circleAd',
                [this.textures.circleAd]
            ),
            'circleB': new Element(
                'circleB',
                [this.textures.circleB]
            ),
            'whiteLineFall': new Element(
                'whiteLineFall',
                [this.textures.whiteLineFall]
            ),
            'CHROMESTHESIA': new Element(
                'CHROMESTHESIA',
                [this.textures.CHROMESTHESIA]
            ),
            'pressAnyKey': new Element(
                'pressAnyKey',
                [this.textures.pressAnyKey]
            ),
            'backGroundGodRay': new Element(
                'backGroundGodRay',
                [this.textures.backGroundGodRay]
            ),
        };

        // - STEP ANIMATION -
        this.stepAnimations = {
            'animateUp': new StepAnimation(
                'up',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.position.set(elem.position.x, elem.position.y + this.speed);
                        return true;
                    } else {
                        return false;
                    }
                },
                1000,
                0.1,
                function () { }
            ),
            'animateRight': new StepAnimation(
                'right',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.position.set(elem.position.x + this.speed, elem.position.y);
                        return true;
                    } else {
                        return false;
                    }
                },
                1000,
                0.1,
                function () { }
            ),
            'animateDown': new StepAnimation(
                'down',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.position.set(elem.position.x, elem.position.y - this.speed);
                        return true;
                    } else {
                        return false;
                    }
                },
                1000,
                0.1,
                function () { }
            ),
            'animateLeft': new StepAnimation(
                'left',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.position.set(elem.position.x - this.speed, elem.position.y);
                        return true;
                    } else {
                        return false;
                    }
                },
                1000,
                0.1,
                function () { }
            ),
            'stepAnimateRightCube': new StepAnimation(
                'rightCube',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.position.set(elem.position.x + this.speed, elem.position.y);
                        return true;
                    } else {
                        return false;
                    }
                },
                2000,
                1.1,
                function () {
                    this.speed = this.speed * 1.05;
                }
            ),
            'animateStepLayer': new StepAnimation(
                'rotateLayer',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.rotation += this.speed;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat,
                Math.PI / 4096,
                function () {
                    this.speed += 0.001;
                }
            ),
            'animationStepCircle': new StepAnimation(
                'animationStepCircle',
                function(elem){
                    if (Date.now() < this.startTime + this.duration) {
                        elem.scale.x = elem.scale.x + this.speed;
                        elem.scale.y = elem.scale.y + this.speed;
                        elem.alpha = elem.alpha - (this.speed / 1);
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 2,
                0.05,
                function(){}
            ),
            'animationStepLine': new StepAnimation(
                'animationStepLine',
                function (elem) {
                    if (elem.position.y > -50) {
                        elem.position.y = elem.position.y - this.speed;
                    } else {
                        elem.position.y = renderer.height + 100;
                        elem.position.x = Math.random() * renderer.width;
                    }
                    return true;
                },
                null,
                5,
                function(){}
            ),
            'animationStepKick': new StepAnimation(
                'animationStepKick',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.scale.x = elem.scale.x + this.speed;
                        elem.scale.y = elem.scale.y + this.speed;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 3,
                0.01,
                function () { }
            ),
            'animationStepSnareScale': new StepAnimation(
                'animationStepSnareScale',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.scale.x = elem.scale.x - this.speed;
                        elem.scale.y = elem.scale.y - this.speed;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 2,
                0.03,
                function () {}
            ),
            'animationStepSnareLeftPos': new StepAnimation(
                'animationStepSnareLeftPos',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.position.set(elem.position.x - this.speed, elem.position.y);
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 4,
                10,
                function () {}
            ),
            'animationStepSnareRightPos': new StepAnimation(
                'animationStepSnareRightPos',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.position.set(elem.position.x + this.speed, elem.position.y);
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 4,
                10,
                function () {}
            ),
            'animationStepHihat': new StepAnimation(
                'animationStepHihat',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.rotation += this.speed;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 8,
                Math.PI / 4,
                function () {}
            ),
            'animationStepLayerHihat': new StepAnimation(
                'animationStepLayerHihat',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.rotation -= this.speed;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat,
                Math.PI / 2048,
                function () {
                    this.speed += 0.001;
                }
            ),
            'animationStepRotationGirl': new StepAnimation(
                'animationStepRotationGirl',
                function (elem) {
                    elem.rotation -= this.speed;
                    return true;
                },
                0,
                0,
                function () {}
            ),
            'animationStepOutroOpacity': new StepAnimation(
                'animationStepOutroOpacity',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        if (elem.alpha > 0)
                            elem.alpha -= this.speed;            
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat,
                0.02,
                function () {
                    this.speed += 0.001;
                }
            ),
            'animationStepIntroOpacity': new StepAnimation(
                'animationStepIntroOpacity',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        if (elem.alpha < 1)
                            elem.alpha += this.speed;            
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat,
                0.1,
                function () {
                    this.speed += 0.001;
                }
            ),
            'animationStepIntroTemp': new StepAnimation(
                'animationStepIntroTemp',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        //elem.alpha += this.speed;            
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat,
                0.1,
                function () {
                    this.speed += 0.001;
                }
            ),
            'animationStepOutroTemp': new StepAnimation(
                'animationStepOutroTemp',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        //elem.alpha += this.speed;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat,
                0.02,
                function () {
                    this.speed += 0.001;
                }
            ),
            'animationStepLFO': new StepAnimation(
                'animationStepLFO',
                function (elem) {
                    elem.position.y += this.speed;
                },
                Config.beat,
                0.02,
                function () {
                }
            ),
            'animationStepLeadIn': new StepAnimation(
                'animationStepLeadIn',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.position.y -= this.speed * 100;
                        elem.alpha += this.speed * 2;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 2,
                0.02,
                function () {
                }
            ),
            'animationStepLeadOut': new StepAnimation(
                'animationStepLeadIn',
                function (elem) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.position.y -= this.speed * 100;
                        elem.alpha -= this.speed * 2;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat,
                0.02,
                function () {
                }
            ),
            'animationStepLeadLFO': new StepAnimation(
                'animationStepLeadLFO',
                function (elem) {
                    elem.position.x += this.speed;
                },
                Config.beat,
                0,
                function () {
                }
            ),
            'animationStepPupilLeft': new StepAnimation(
                'animationStepPupilLeft',
                function (elem, delta) {
                    if (Date.now() < this.startTime + this.duration) {
                        if (elem.position.x > renderer.width / 2 - 350 && elem.position.y < renderer.height / 2 + 150) {
                            elem.position.x -= (this.speed) * delta;
                            elem.position.y += (this.speed / 1.5) * delta;
                        }
                        return true;
                    } else {         
                        return false;
                    }
                },
                Config.beat / 8,
                45,
                function () {
                }
            ),
            'animationStepPupilRight': new StepAnimation(
                'animationStepPupilRight',
                function (elem, delta) {
                    if (Date.now() < this.startTime + this.duration) {
                        if (elem.position.x < renderer.width / 2 && elem.position.y > renderer.height / 2 - 50) {
                            elem.position.x += (this.speed) * delta;
                            elem.position.y -= (this.speed / 1.5) * delta;
                        }
                        return true;
                    } else {        
                        return false;
                    }
                },
                Config.beat / 8,
                45,
                function () {
                }
            ),
            'animationScalePupilUp': new StepAnimation(
                'animationScalePupilUp',
                function (elem, delta) {
                    if (Date.now() < this.startTime + this.duration) {
                        if (elem.scale.x < 1.25 && elem.scale.x < 1.25) {
                            elem.scale.x += this.speed * delta;
                            elem.scale.y += this.speed * delta;
                        }  
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 16,
                0.05,
                function () {
                }
            ),
            'animationScalePupilDown': new StepAnimation(
                'animationScalePupilDown',
                function (elem, delta) {
                    if (Date.now() < this.startTime + this.duration) {
                        if (elem.scale.x > 1.0 && elem.scale.x > 1.0) {
                            elem.scale.y -= this.speed * delta; 
                            elem.scale.x -= this.speed * delta; 
                        }
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 16,
                0.05,
                function () {
                }
            ),
            'animationScaleEyeUp': new StepAnimation(
                'animationScaleEyeUp',
                function (elem, delta) {
                    if (Date.now() < this.startTime + this.duration) {
                        if (elem.scale.x < 1.25 && elem.scale.x < 1.25) {
                            elem.scale.x += this.speed * delta;
                            elem.scale.y += this.speed * delta;
                        }  
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 16,
                0.001,
                function () {
                }
            ),
            'animationScaleEyeDown': new StepAnimation(
                'animationScaleEyeDown',
                function (elem, delta) {
                    if (Date.now() < this.startTime + this.duration) {
                        if (elem.scale.x > 1.0 && elem.scale.x > 1.0) {
                            elem.scale.y -= this.speed * delta; 
                            elem.scale.x -= this.speed * delta; 
                        }
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat / 16,
                0.001,
                function () {
                }
            ),
            'animationRotateNoise': new StepAnimation(
                'animationRotateNoise',
                function (elem, delta) {
                    elem.position.x = window.innerWidth / 2 + 400 * Math.cos(this.speed);
                    elem.position.y = window.innerHeight / 2 + 400 * Math.sin(this.speed);
                    return true;
                },
                0,
                Math.PI / 150,
                function () {
                    this.speed += Math.PI / 500;
                }
            ),
            'animationAlphaNoise': new StepAnimation(
                'animationAlphaNoise',
                function (elem, delta) {
                    if (Date.now() < this.startTime + this.duration) {
                        if (elem.alpha < 1.0) {
                            elem.alpha += this.speed;
                        }
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat * 2,
                0.01,
                function () {
                    this.speed = this.speed + 0.001;
                }
            ),
            'animationScaleUpPress': new StepAnimation(
                'animationScaleUpPress',
                function (elem, delta) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.scale.x += this.speed;
                        elem.scale.y += this.speed;
                        elem.alpha += this.speed;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat,
                0.0001,
                function () {
                    this.speed = this.speed + 0.00005;
                }
            ),
            'animationScaleDownPress': new StepAnimation(
                'animationScaleDownPress',
                function (elem, delta) {
                    if (Date.now() < this.startTime + this.duration) {
                        elem.scale.x -= this.speed;
                        elem.scale.y -= this.speed;
                        elem.alpha -= this.speed;
                        return true;
                    } else {
                        return false;
                    }
                },
                Config.beat,
                0.0001,
                function () {
                    this.speed = this.speed + 0.00005;
                }
            ),
            'animateStepSpiralRotation': new StepAnimation(
                'animateStepSpiralRotation',
                function (elem) {
                    elem.rotation += this.speed;
                },
                Config.beat,
                Math.PI / 4096,
                function () { }
            ),
            'animateStepSpiralScale': new StepAnimation(
                'animateStepSpiralScale',
                function (elem) {
                    if (elem.scale.x < 2.4){
                        elem.scale.x += this.speed;
                        elem.scale.y += this.speed;
                    }
                },
                Config.beat,
                0.0015,
                function () { }
            ),
            'animationStepLeadSpiralLFO': new StepAnimation(
                'animationStepLeadSpiralLFO',
                function (elem) {
                    elem.scale.x = 1.05 + this.speed;
                    elem.scale.y = 1.05 + this.speed;
                },
                Config.beat,
                0,
                function () {
                }
            ),
            'animationStepRotateCircle': new StepAnimation(
                'animationStepRotateCircle',
                function (elem, delta) {
                    elem.position.x = (renderer.width / 2 + 250 * Math.cos(this.speed));
                    elem.position.y = (renderer.height / 2 + 250 * Math.sin(this.speed) / 1.5);
                    return true;
                },
                0,
                Math.PI / 50,
                function () {
                    this.speed += Math.PI / 50;
                }
            ),
        };

        // - ANIMATIONS -
        this.animations = {
            'animateLayer': new Animation(
                'animateLayer',
                [this.stepAnimations.animateStepLayer.clone()],
                true,
                false
            ),
            'animationGirl': new Animation(
                'animationGirl',
                [
                    this.stepAnimations.animateUp.clone(),
                    this.stepAnimations.animateRight.clone(),
                    this.stepAnimations.animateDown.clone(),
                    this.stepAnimations.animateLeft.clone()
                ],
                true,
                false
            ),
            'animateRightCube': new Animation(
                'animateRightCube',
                [this.stepAnimations.stepAnimateRightCube.clone()],
                false,
                false
            ),
            'animationCircle': new Animation(
                'animationCircle',
                [this.stepAnimations.animationStepCircle.clone()],
                false,
                true
            ),
            'animationLine': new Animation(
                'animationLine',
                [this.stepAnimations.animationStepLine.clone()],
                true,
                false
            ),
            'animateKick': new Animation(
                'animateKick',
                [this.stepAnimations.animationStepKick.clone()],
                false,
                true
            ),
            'animationSnareLeft': new Animation(
                'animationSnareLeft',
                [this.stepAnimations.animationStepSnareScale.clone(), this.stepAnimations.animationStepSnareLeftPos.clone()],
                false,
                true
            ),
            'animationSnareRight': new Animation(
                'animationSnareRight',
                [this.stepAnimations.animationStepSnareScale.clone(), this.stepAnimations.animationStepSnareRightPos.clone()],
                false,
                true
            ),
            'animationHiHat': new Animation(
                'animationHiHat',
                [this.stepAnimations.animationStepHihat.clone()],
                false,
                true
            ),
            'animationLayerHiHat': new Animation(
                'animationLayerHiHat',
                [this.stepAnimations.animationStepLayerHihat.clone()],
                true,
                false
            ),
            'animateRotationGirl': new Animation(
                'animateRotationGirl',
                [this.stepAnimations.animationStepRotationGirl.clone()],
                true,
                false
            ),
            'animateOutroOpacity': new Animation(
                'animateOutroOpacity',
                [this.stepAnimations.animationStepOutroOpacity.clone()],
                false,
                false
            ),
            'animateIntroOpacity': new Animation(
                'animateIntroOpacity',
                [this.stepAnimations.animationStepIntroOpacity.clone()],
                false,
                false
            ),
            'animateOutroTemp': new Animation(
                'animateOutroTemp',
                [this.stepAnimations.animationStepOutroTemp.clone()],
                false,
                false
            ),
            'animateIntroTemp': new Animation(
                'animateIntroTemp',
                [this.stepAnimations.animationStepIntroTemp.clone()],
                false,
                false
            ),
            'animationLFO': new Animation(
                'animationLFO',
                [this.stepAnimations.animationStepLFO.clone()],
                false,
                false
            ),
            'animationLead': new Animation(
                'animationLead',
                [this.stepAnimations.animationStepLeadIn.clone(), this.stepAnimations.animationStepLeadOut.clone()],
                false,
                true
            ),
            'animationLeadLFO': new Animation(
                'animationLeadLFO',
                [this.stepAnimations.animationStepLeadLFO.clone()],
                true,
                false
            ),
            'animationPupilLeft': new Animation(
                'animationPupilLeft',
                [
                    this.stepAnimations.animationStepPupilLeft.clone(),
                ],
                false,
                false
            ),
            'animationPupilRight': new Animation(
                'animationPupilRight',
                [
                    this.stepAnimations.animationStepPupilRight.clone(),
                ],
                false,
                false
            ),
            'animationScalePupil': new Animation(
                'animationScalePupil',
                [
                    this.stepAnimations.animationScalePupilUp.clone(),
                    this.stepAnimations.animationScalePupilDown.clone(),
                ],
                false,
                false
            ),
            'animationScaleEye': new Animation(
                'animationScaleEye',
                [
                    this.stepAnimations.animationScaleEyeUp.clone(),
                    this.stepAnimations.animationScaleEyeDown.clone(),
                ],
                false,
                false
            ),
            'animationRotationNoise': new Animation(
                'animationRotationNoise',
                [
                    this.stepAnimations.animationRotateNoise.clone(),
                ],
                true,
                false
            ),
            'animationAlphaNoise': new Animation(
                'animationAlphaNoise',
                [
                    this.stepAnimations.animationAlphaNoise.clone(),
                ],
                false,
                false
            ),
            'animationScalePress': new Animation(
                'animationScalePress',
                [
                    this.stepAnimations.animationScaleUpPress.clone(),
                    this.stepAnimations.animationScaleDownPress.clone(),
                ],
                true,
                false
            ),
            'animationSpiralRotation': new Animation(
                'animationSpiralRotation',
                [
                    this.stepAnimations.animateStepSpiralRotation.clone(),
                ],
                true,
                false
            ),
            'animationSpiralScale': new Animation(
                'animationSpiralScale',
                [
                    this.stepAnimations.animateStepSpiralScale.clone(),
                ],
                true,
                false
            ),
            'animationLeadSpiralLFO': new Animation(
                'animationLeadSpiralLFO',
                [this.stepAnimations.animationStepLeadSpiralLFO.clone()],
                true,
                false
            ),
            'animationRotateCircle': new Animation(
                'animationRotateCircle',
                [this.stepAnimations.animationStepRotateCircle.clone()],
                true,
                false
            ),
        };

        // - PARTICLES -
        this.particles = {
            'flyingCube': new Particle(
                'flyingCube',
                [this.textures.pixelSquare],
                {
                    "alpha": {
                        "start": 1,
                        "end": 0
                    },
                    "scale": {
                        "start": 0.1,
                        "end": 0.01,
                        "minimumScaleMultiplier": 1
                    },
                    "color": {
                        "start": "#ffffff",
                        "end": "#ffffff"
                    },
                    "speed": {
                        "start": 10,
                        "end": 100,
                        "minimumSpeedMultiplier": 1
                    },
                    "acceleration": {
                        "x": 0,
                        "y": 0
                    },
                    "maxSpeed": 0,
                    "startRotation": {
                        "min": 260,
                        "max": 280
                    },
                    "noRotation": false,
                    "rotationSpeed": {
                        "min": 0,
                        "max": 0
                    },
                    "lifetime": {
                        "min": 0.2,
                        "max": 0.8
                    },
                    "blendMode": "normal",
                    "frequency": 0.001,
                    "emitterLifetime": -1,
                    "maxParticles": 75,
                    "pos": {
                        "x": 0,
                        "y": 0
                    },
                    "addAtBack": false,
                    "spawnType": "circle",
                    "spawnCircle": {
                        "x": renderer.width / 2,
                        "y": renderer.height / 2,
                        "r": 900
                    }
                },
                true
            ),
            'blurBassGirl': new Particle(
                'blurBassGirl',
                [this.textures.particleGirl],
                {
                    "alpha": {
                        "start":1,
                        "end": 0
                    },
                    "scale": {
                        "start": 1,
                        "end": 1,
                        "minimumScaleMultiplier": 1
                    },
                    "color": {
                        "start": "#e4f9ff",
                        "end": "#3fcbff"
                    },
                    "speed": {
                        "start": 10,
                        "end": 100,
                        "minimumSpeedMultiplier": 1
                    },
                    "acceleration": {
                        "x": 0,
                        "y": 0
                    },
                    "maxSpeed": 0,
                    "startRotation": {
                        "min": 0,
                        "max": 360
                    },
                    "noRotation": true,
                    "rotationSpeed": {
                        "min": 0,
                        "max": 0
                    },
                    "lifetime": {
                        "min": 0.1,
                        "max": 0.38
                    },
                    "blendMode": "normal",
                    "frequency": 0.01,
                    "emitterLifetime": -1,
                    "maxParticles": 20,
                    "pos": {
                        "x": renderer.width / 2,
                        "y": renderer.height / 2,
                    },
                    "addAtBack": true,
                    "spawnType": "burst",
                    "particlesPerWave": 1,
                    "particleSpacing": 0,
                    "angleStart": 0
                },
                false
            ),
            'blurBassPupil': new Particle(
                'blurBassPupil',
                [this.textures.pupil],
                {
                    "alpha": {
                        "start": 1,
                        "end": 0
                    },
                    "scale": {
                        "start": 1,
                        "end": 1,
                        "minimumScaleMultiplier": 1
                    },
                    "color": {
                        "start": "#e4f9ff",
                        "end": "#3fcbff"
                    },
                    "speed": {
                        "start": 10,
                        "end": 100,
                        "minimumSpeedMultiplier": 1
                    },
                    "acceleration": {
                        "x": 0,
                        "y": 0
                    },
                    "maxSpeed": 0,
                    "startRotation": {
                        "min": 0,
                        "max": 360
                    },
                    "noRotation": true,
                    "rotationSpeed": {
                        "min": 0,
                        "max": 0
                    },
                    "lifetime": {
                        "min": 0.1,
                        "max": 0.38
                    },
                    "blendMode": "normal",
                    "frequency": 0.01,
                    "emitterLifetime": -1,
                    "maxParticles": 20,
                    "pos": {
                        "x": renderer.width / 2,
                        "y": renderer.height / 2,
                    },
                    "addAtBack": true,
                    "spawnType": "burst",
                    "particlesPerWave": 1,
                    "particleSpacing": 0,
                    "angleStart": 0
                },
                false
            ),
            'blurBassGirlFront': new Particle(
                'blurBassGirlFront',
                [this.textures.particleGirlFront],
                {
                    "alpha": {
                        "start": 1,
                        "end": 0
                    },
                    "scale": {
                        "start": 1,
                        "end": 1,
                        "minimumScaleMultiplier": 1
                    },
                    "color": {
                        "start": "#e4f9ff",
                        "end": "#3fcbff"
                    },
                    "speed": {
                        "start": 10,
                        "end": 100,
                        "minimumSpeedMultiplier": 1
                    },
                    "acceleration": {
                        "x": 0,
                        "y": 0
                    },
                    "maxSpeed": 0,
                    "startRotation": {
                        "min": 0,
                        "max": 360
                    },
                    "noRotation": true,
                    "rotationSpeed": {
                        "min": 0,
                        "max": 0
                    },
                    "lifetime": {
                        "min": 0.1,
                        "max": 0.38
                    },
                    "blendMode": "normal",
                    "frequency": 0.01,
                    "emitterLifetime": -1,
                    "maxParticles": 20,
                    "pos": {
                        "x": renderer.width / 2,
                        "y": renderer.height / 2,
                    },
                    "addAtBack": true,
                    "spawnType": "burst",
                    "particlesPerWave": 1,
                    "particleSpacing": 0,
                    "angleStart": 0
                },
                false
            ),
            'blurDoorParticle': new Particle(
                'blurDoorParticle',
                [this.textures.particleDoor],
                {
                    "alpha": {
                        "start": 1,
                        "end": 0
                    },
                    "scale": {
                        "start": 1,
                        "end": 1,
                        "minimumScaleMultiplier": 1
                    },
                    "color": {
                        "start": "#e4f9ff",
                        "end": "#3fcbff"
                    },
                    "speed": {
                        "start": 20,
                        "end": 100,
                        "minimumSpeedMultiplier": 1
                    },
                    "acceleration": {
                        "x": 0,
                        "y": 0
                    },
                    "maxSpeed": 0,
                    "startRotation": {
                        "min": 0,
                        "max": 360
                    },
                    "noRotation": true,
                    "rotationSpeed": {
                        "min": 0,
                        "max": 0
                    },
                    "lifetime": {
                        "min": 0.1,
                        "max": 0.38
                    },
                    "blendMode": "normal",
                    "frequency": 0.01,
                    "emitterLifetime": -1,
                    "maxParticles": 40,
                    "pos": {
                        "x": 0,
                        "y": 0,
                    },
                    "addAtBack": true,
                    "spawnType": "burst",
                    "particlesPerWave": 1,
                    "particleSpacing": 0,
                    "angleStart": 0
                },
                false
            ),
            'blurBassWater': new Particle(
                'blurBassWater',
                [this.textures.circleWater],
                {
                    "alpha": {
                        "start": 1,
                        "end": 0
                    },
                    "scale": {
                        "start": 1.05,
                        "end": 1.2,
                        "minimumScaleMultiplier": 1
                    },
                    "color": {
                        "start": "#e4f9ff",
                        "end": "#3fcbff"
                    },
                    "speed": {
                        "start": 10,
                        "end": 100,
                        "minimumSpeedMultiplier": 1
                    },
                    "acceleration": {
                        "x": 0,
                        "y": 0
                    },
                    "maxSpeed": 0,
                    "startRotation": {
                        "min": 0,
                        "max": 360
                    },
                    "noRotation": true,
                    "rotationSpeed": {
                        "min": 0,
                        "max": 0
                    },
                    "lifetime": {
                        "min": 0.1,
                        "max": 0.38
                    },
                    "blendMode": "normal",
                    "frequency": 0.01,
                    "emitterLifetime": -1,
                    "maxParticles": 20,
                    "pos": {
                        "x": renderer.width / 2,
                        "y": renderer.height / 2,
                    },
                    "addAtBack": true,
                    "spawnType": "burst",
                    "particlesPerWave": 1,
                    "particleSpacing": 0,
                    "angleStart": 0
                },
                false
            ),
            'bubbleWater': new Particle(
                'bubbleWater',
                [this.textures.circleBubble],
                {
                    "alpha": {
                        "start": 1,
                        "end": 0.16
                    },
                    "scale": {
                        "start": 0.3,
                        "end": 0.4,
                        "minimumScaleMultiplier": 0.5
                    },
                    "color": {
                        "start": "#ffffff",
                        "end": "#ffffff"
                    },
                    "speed": {
                        "start": 100,
                        "end": 200,
                        "minimumSpeedMultiplier": 1
                    },
                    "acceleration": {
                        "x": 0,
                        "y": 0
                    },
                    "maxSpeed": 0,
                    "startRotation": {
                        "min": 240,
                        "max": 300
                    },
                    "noRotation": false,
                    "rotationSpeed": {
                        "min": 0,
                        "max": 20
                    },
                    "lifetime": {
                        "min": 6,
                        "max": 8
                    },
                    "blendMode": "normal",
                    "frequency": 0.05,
                    "emitterLifetime": -1,
                    "maxParticles": 400,
                    "pos": {
                        "x": 0,
                        "y": 0
                    },
                    "addAtBack": false,
                    "spawnType": "rect",
                    "spawnRect": {
                        "x": 0,
                        "y": 0,
                        "w": renderer.width,
                        "h": 0
                    }
                },
                true
            )
        };

        // - GENERATED GRAPHICS -

        // Generation of the spiral 
        let nbPolySpiral = 12;
        let radiusFirstSpiral = 100;
        let nbDivSpiral = 6;
        let stepRadiusSpiral = 20;
        let stepLineWidth = 0.1;
        for (let i = 0; i < nbPolySpiral; i++) {
            let color = this.createSpiral(
                this.arrayColors[i % this.arrayColors.length],
                radiusFirstSpiral,
                nbDivSpiral,
                0,
                0,
                0
            );

            let shape = this.createSpiral(
                '0x000000',
                radiusFirstSpiral,
                nbDivSpiral,
                1 * (stepLineWidth * i),
                '0xFFFFFF',
                1
            );       

            this.graphics['spiralShape' + i] = shape;
            this.graphics['spiralColor' + i] = color;
            this.elements['spiralShape' + i] = new Element(
                'spiralShape' + i,
                [this.graphics['spiralShape' + i]]
            );           
            this.elements['spiralColor' + i] = new Element(
                'spiralColor' + i,
                [this.graphics['spiralColor' + i]]
            );

            radiusFirstSpiral += stepRadiusSpiral;
        }

        // Split perlin noise by color for the door background
        noise.seed(Math.random());
        let nbPointX = renderer.width / 2;
        let nbPointY = renderer.height / 2; 
        let sizeSquareX = 2;
        let sizeSquareY = 2;

        let graphicNoiseByColor = {};
        for (let i = 0; i < this.arrayColors.length; i++) {
            graphicNoiseByColor['noise' + i] = new PIXI.Graphics();
        }

        for (let x = 0; x < nbPointX; x++) {
            for (let y = 0; y < nbPointY; y++) {
                let color = (Math.floor(((noise.perlin2(x / 200, y / 200) + 1) / 2) * 100) % this.arrayColors.length);

                graphicNoiseByColor['noise' + color].lineStyle(0);
                graphicNoiseByColor['noise' + color].beginFill(
                    this.arrayColors[color]
                );
                graphicNoiseByColor['noise' + color].drawRect(x * sizeSquareX, y * sizeSquareY, sizeSquareX, sizeSquareY);
                graphicNoiseByColor['noise' + color].endFill();
            }
        }

        for (let graphic in graphicNoiseByColor) {
            this.graphics[graphic] = graphicNoiseByColor[graphic];
            this.elements[graphic] = new Element(
                graphic,
                [this.graphics[graphic]]
            );
        }
    }
    
    // - FUNCTIONS -
    // Create a circle from PIXI
    createCircle(color, size, lineWidth, lineColor, lineAlpha) {
        let circle = new PIXI.Graphics();
        circle.lineStyle(lineWidth, lineColor, lineAlpha, 0);

        if (color === 0) {
            circle.drawCircle(0, 0, size);
        } else {
            circle.beginFill(color);
            circle.drawCircle(0, 0, size);
            circle.endFill();
        }

        return circle;
    }

    // Create a rectangle from PIXI
    createRectangle(color, sizeX, sizeY, alpha, lineWidth, lineColor, lineAlpha) {
        let rectangle = new PIXI.Graphics();
        rectangle.lineStyle(lineWidth, lineColor, lineAlpha);
        
        rectangle.beginFill(color, alpha);
        rectangle.drawRect(0, 0, sizeX, sizeY);
        rectangle.endFill();

        return rectangle;
    }

    // Create a line from PIXI
    createLine(distX, distY, width, color, alpha) {
        let line = new PIXI.Graphics();

        line.lineStyle(width, color, alpha);
        line.moveTo(0, 0);
        line.lineTo(distX, distY);

        return line;
    }

    // Create a ellipse from PIXI
    createEllipse(x, y, color) {
        let ellipse = new PIXI.Graphics();

        ellipse.lineStyle(0);
        ellipse.beginFill(color);
        ellipse.drawEllipse(0, 0, x, y);
        ellipse.endFill();

        return ellipse;
    }

    // Create a spiral from PIXI
    createSpiral(color, radius, nbDiv, lineWidth, lineColor, lineAlpha) {
        let spiral = new PIXI.Graphics();

        spiral.lineStyle(lineWidth, lineColor, lineAlpha, 1);
        spiral.beginFill(color);
        spiral.drawPolygon(this.splitCircle(new PIXI.Point(0, 0), radius, nbDiv));
        spiral.endFill();

        return spiral;
    }

    // Split a circle in a number of point around it
    // Return array of coordonate
    splitCircle(orign, radius, nbDiv) {
        let arrPoint = [];
        let angle = 2 * Math.PI / nbDiv;

        for (let i = 0; i < nbDiv; i++) {
            let x = orign.x + radius * Math.cos(angle * i);
            let y = orign.y + radius * Math.sin(angle * i);
            arrPoint.push(new PIXI.Point(x, y));
        }
        arrPoint.push(arrPoint[0]);

        return arrPoint;
    }
}