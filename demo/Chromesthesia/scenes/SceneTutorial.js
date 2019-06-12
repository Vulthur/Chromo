/*jshint esversion: 6 */

// - IMPORTS
import Layer from '../../../core/Layer.js';
import Scene from '../../../core/Scene.js';

// - MAIN -
export default function(assets, app) {
    // - ELEMENTS -
    let tutorial = assets.elements.tutorial;
    tutorial.container.position.set(app.renderer.width / 2, app.renderer.height / 2);
    tutorial.container.scale.set(0.75, 0.75);

    // - LAYERS -
    let layerTutorial = new Layer(
        'layerTutorial',
        [tutorial],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0
        }
    );

    // - SCENE -
    let scene = new Scene(
        'SceneTwo',
        [],
        [],
        [],
        [],
        [layerTutorial],
        assets.animations.animateOutroOpacity.clone(),
        assets.animations.animateIntroOpacity.clone(),
        {
            'alpha': 0,
        },
        []
    );

    return scene;
}