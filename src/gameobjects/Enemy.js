import * as PIXI from 'pixi.js';
import Movable from './Movable';

const INITIAL_X = 850;
const INITIAL_Y = 407;
const SPEED = 1.5;

export default class Enemy extends Movable {

    constructor(texture) {
        super(texture);            
        
        this.scale.x = -1;

        this.anchor.set(0.5);

        this.speedX = -SPEED;
        this.shootCounter = Math.random() * 500 + 100;
    }

    reset() {
        Movable.prototype.reset.call(this);

        this.x = INITIAL_X;
        this.y = INITIAL_Y;
        this.shootCounter = Math.random() * 500 + 100;
    }

    shoot() {
        this.parent.shootBullet(this.x, this.y, Math.PI + Math.PI/10); // angle random with turret rotation
    }
    
    update(delta) {
        if(!this.visible)
            return;
        Movable.prototype.update.call(this, delta);

        this.shootCounter -= delta;
        if(this.shootCounter <= 0) {
            this.shoot();
            this.shootCounter = Math.random() * 500 + 100;
        }
    }

}