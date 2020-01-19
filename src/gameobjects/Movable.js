import * as PIXI from 'pixi.js';

const MIN_X = -50;

export default class Movable extends PIXI.Sprite {
    
    constructor(texture, speedX = 0, speedY = 0) {
        super(texture);       
        
        this.anchor.set(0.5);

        this.scale.x = -1;

        this.speedX = speedX;
        this.speedY = speedY;
    }

    reset() {
        this.visible = true;
    }

    kill() {
        this.visible = false;
    }

    update(delta) {
        if(!this.visible) {
            return;
        }
        if(this.x < MIN_X) {
            this.kill();
            return;
        }
        if(this.y < 0) {
            this.kill();
            return;
        }
        this.x += this.speedX * delta;
        this.y += this.speedY * delta;
    }

}