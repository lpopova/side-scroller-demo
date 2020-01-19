import * as PIXI from 'pixi.js';

const SPEED = 4;
const MIN_Y = 40;
const MAX_Y = 400;
const MIN_X = 50;
const MAX_X = 750;

const INITIAL_X = 150;
const INITIAL_Y = 200;

const MAX_FUEL = 100;
const FUEL_CONSUMPTION_SPEED = 0.02;

export default class Player extends PIXI.AnimatedSprite {

    constructor(textures, keys) {
        super(textures, true);
        this.anchor.set(0.5);
        this.position.set(INITIAL_X, INITIAL_Y);
        this.animationSpeed = 0.5;
        this.play();

        this.keys = keys;

        this.fuel = MAX_FUEL;

        this.alive = true;
    }    

    move(delta) {
        if(!this.alive)
            return;
        if(this.keys.up && this.keys.down) {
            // no need to calculate, lets be lazy
        } else if(this.keys.up) {
            this.y -= SPEED * delta;
            if(this.y < MIN_Y)
                this.y = MIN_Y;
        } else if(this.keys.down) {
            this.y += SPEED * delta;
            if(this.y > MAX_Y) {
                // todo restart game, game over
                this.y = MAX_Y;
            }
        }
        // to get only up and down move comment the bellow part
        // there is a bug that the plane will move faster in diagonal
        // to fix is we can calcualte each time when needed(slower) or use precalculated different speed const for diagonals, works only in this type of game
        // cause we only have fixed number of directions
        if(this.keys.left && this.keys.right) {

        } else if(this.keys.left) {
            this.x -= SPEED * delta;
            if(this.x < MIN_X)
                this.x = MIN_X;
        } else if(this.keys.right) {
            this.x += SPEED * delta;
            if(this.x > MAX_X) {                
                this.x = MAX_X;
            }
        }
        
        this.fuel -= FUEL_CONSUMPTION_SPEED * delta;
        if(this.fuel <= 0) {
            this.fuel = 0;
            this.kill();
        }
        if(this.fuelUI) {
            this.fuelUI.setBar(this.fuel/MAX_FUEL);
        }
    } 

    addFuel(fuel) {
        this.fuel += fuel;
        if(this.fuel > MAX_FUEL)
            this.fuel = MAX_FUEL;        
    }

    reset() {
        this.alive = true;
        this.fuel = MAX_FUEL;
        this.position.set(INITIAL_X, INITIAL_Y);
    }

    setFuelUI(ui) {
        this.fuelUI = ui;
    }

    isDead() {
        return !this.alive;
    }

    kill() {
        // wont hide player here, just set alive
        this.alive = false;
    }

}