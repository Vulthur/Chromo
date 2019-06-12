/*jshint esversion: 6 */

// - IMPORT -
import Layer from '../../../core/Layer.js';
import Scene from '../../../core/Scene.js';

// - MAIN -
export default function create(assets, app) {
    // - ELEMENTS -
    let end = assets.elements.end;
    end.container.position.set(app.renderer.width / 2, app.renderer.height / 2);
    end.container.scale.set(0.35, 0.35);

    // - LAYERS -
    let layerEnding = new Layer(
        'layerEnding',
        [end],
        [],
        {
            'pivot': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'position': new PIXI.Point(window.innerWidth / 2, window.innerHeight / 2),
            'rotation': 0
        }
    );

    // - SCENE -
    let scene = new Scene(
        'SceneEight',
        [],
        [],
        [],
        [],
        [layerEnding],
        assets.animations.animateOutroOpacity.clone(),
        assets.animations.animateIntroOpacity.clone(),
        {
            'alpha': 0,
        },
        []
    );
    return scene;
}