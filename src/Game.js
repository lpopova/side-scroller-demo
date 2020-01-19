import * as PIXI from 'pixi.js';
import GameScene from './scenes/GameScene';

// Simple game, only one gameplay scene
export default class Game {

    constructor (resources) {

        this.resources = resources;

        this.app = new PIXI.Application({
            width: 800, height: 520, backgroundColor: 0x1099bb, // resolution: window.devicePixelRatio || 1,
        });
        document.body.appendChild(this.app.view);

        // no need for scene manager 
        this.gameScene = new GameScene(resources);
        this.app.stage.addChild(this.gameScene);

        this.app.ticker.add((delta) => {
            this.gameScene.update(delta);
        });
    }

}