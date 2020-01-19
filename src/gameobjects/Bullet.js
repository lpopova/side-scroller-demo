import * as PIXI from 'pixi.js';
import Movable from './Movable';

const SPEED = 8;

const INITIAL_OFFSET = 4;

export default class Bullet extends Movable {
    
    constructor(texture) {
        super(texture);      

        this.speedX = -SPEED;
    }

    // tank turret position -20, usually turret will be separate sprite with rotation
    shoot(x, y, angle) {
        this.reset();
        this.rotation = angle - Math.PI; // in radians both
        this.speedX = Math.cos(angle) * SPEED;
        this.speedY = Math.sin(angle) * SPEED;
        // starting point
        this.x = x + this.speedX*INITIAL_OFFSET;
        this.y = y - 20 + this.speedY*INITIAL_OFFSET;
    }

}