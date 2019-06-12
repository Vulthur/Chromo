/*jshint esversion: 6 */
// - IMPORTS -
import Layer from '../../../core/Layer.js';
import Scene from '../../../core/Scene.js';

// - MAIN -
export default function(assets, app) {

    // - ELEMENTS -
    let title = assets.elements.CHROMESTHESIA;
    title.container.position.set(app.renderer.width / 2, app.renderer.height / 7 * 3);

    let pressAnyKey = assets.elements.pressAnyKey;
    pressAnyKey.container.position.set(app.renderer.width / 2, app.renderer.height / 7 * 4.5);

    // - LAYERS -
    let layerTitle = new Layer(
        'layerTitle',
        [title, pressAnyKey],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0
        }
    );

    // - SCENE -
    let scene = new Scene(
        'SceneOne',
        [],
        [],
        [],
        [],
        [layerTitle],
        assets.animations.animateOutroOpacity.clone(),
        assets.animations.animateIntroOpacity.clone(),
        {
            'alpha': 0,
        },
        []
    );

    scene.addAnimations([assets.animations.animationScalePress.clone()], [pressAnyKey.container]);

    return scene;
}