import Movable from './Movable';

const SPEED = 2;

const INITIAL_X = 850;

const MIN_Y = 50;
const MAX_Y = 380;

export default class Obstacle extends Movable {
    
    constructor(texture) {
        super(texture);      

        this.speedX = -SPEED;
    }

    reset() {
        // no need for this, enough is visible = true;
        Movable.prototype.reset.call(this);
        this.x = INITIAL_X;
        this.y = Math.random() * (MAX_Y - MIN_Y) + MIN_Y;
    }

}