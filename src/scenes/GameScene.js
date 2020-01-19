import * as PIXI from 'pixi.js';
import Player from '../gameobjects/Player';
import Enemy from '../gameobjects/Enemy';
import Obstacle from '../gameobjects/Obstacle';
import Bullet from '../gameobjects/Bullet';
import Pool from '../utils/Pool';
import Fuel from '../gameobjects/Fuel';
import FuelUI from '../gameobjects/FuelUI';

const BACKGROUND_SPEED = 1;

const keyControls = {
    up: false,
    down: false,
    left: false,
    right: false,
    reset: function() {        
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }
}

export default class GameScene extends PIXI.Container {
    constructor (resources) {
        super()

        this.background = new PIXI.TilingSprite(resources.background.texture, 800, 520);
        this.addChild(this.background);

        this.land = new PIXI.Sprite(resources.sprites.textures["land"]);
        this.land.position.set(0, 440);
        this.addChild(this.land);

        this.player = new Player([
            resources.sprites.textures["planeRed1"],
            resources.sprites.textures["planeRed2"],
            resources.sprites.textures["planeRed3"],
            resources.sprites.textures["planeRed2"]
        ], keyControls);
        this.addChild(this.player);

        this.obstaclePool = new Pool(Obstacle, resources.sprites.textures["obstacle"], this);
        this.obstaclePool.startSpawning(300, 1500);
        this.powerUpsPool = new Pool(Fuel, resources.sprites.textures["fuel"], this);
        this.powerUpsPool.startSpawning(300, 1500);
        this.enemiesPool = new Pool(Enemy, resources.sprites.textures["tanks_tankGrey1"], this);
        this.enemiesPool.startSpawning(300, 500);
        this.bulletPool = new Pool(Bullet, resources.sprites.textures["tank_bullet1"], this);

        const style = new PIXI.TextStyle({
            fontFamily: 'Roboto,Arial',
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 5
        });
        
        this.distance = 0;
        this.distanceText = new PIXI.Text("000", style);
        this.distanceText.position.set(10, 10);
        this.addChild(this.distanceText);

        this.fuelUI = new FuelUI(580, 30);
        this.addChild(this.fuelUI);
        this.player.setFuelUI(this.fuelUI);

        window.onkeydown = (e) => {
            if(e.keyCode === 38 || e.keyCode === 87) {
                keyControls.up = true;
            }
            if(e.keyCode === 40 || e.keyCode === 83) {
                keyControls.down = true;
            }
            if(e.keyCode === 37 || e.keyCode === 65) {
                keyControls.left = true;
            }
            if(e.keyCode === 39 || e.keyCode === 68) {
                keyControls.right = true;
            }                             
        }
        window.onkeyup = (e) => {
            if(e.keyCode === 38 || e.keyCode === 87) {
                keyControls.up = false;
            }
            if(e.keyCode === 40 || e.keyCode === 83) {
                keyControls.down = false;
            }
            if(e.keyCode === 37 || e.keyCode === 65) {
                keyControls.left = false;
            }
            if(e.keyCode === 39 || e.keyCode === 68) {
                keyControls.right = false;
            } 
        };
        this.start();
    }

    start() {
        keyControls.reset();
        this.background.tilePosition.x = 0;
        this.obstaclePool.restart();
        this.powerUpsPool.restart();
        this.enemiesPool.restart();
        this.bulletPool.restart();
        this.distance = 0;
        this.distanceText.text = this.distance.toString();
        this.player.reset();
    }

    update(delta) {
        this.background.tilePosition.x -= BACKGROUND_SPEED * delta;
        // some time ago on PIXI 4 there was problem with TilingSprite, 
        // when position became too big, TilingSprite behaves strange, so this was the fix
        // in version 5 it may be fixed, need to check documentation
        if(this.background.tilePosition.x < -this.background.width)
            this.background.tilePosition.x = this.background.tilePosition.x % this.background.width;

        // dont realy need so much pools, it can be achieved with one and objects to change texture and few properties only
        // of course if enemies are composition of several parts we will need separate pool for them
        this.obstaclePool.update(delta);
        this.powerUpsPool.update(delta);
        this.enemiesPool.update(delta);
        this.bulletPool.update(delta);

        this.player.move(delta);

        this.distance += delta/20;
        this.distanceText.text = Math.floor(this.distance).toString();
        
        this.checkCollisions();

        if(this.player.isDead()) {
            this.start();
        }
    }

    shootBullet(x, y, angle) {
        const bullet = this.bulletPool.getItem();
        bullet.shoot(x, y, angle);
        this.addChild(bullet);
    }

    checkCollisions() {
        const fuel = this.powerUpsPool.checkCollision(this.player);
        if(fuel) {
            fuel.kill();
            this.player.addFuel(20); // sorry for the random number
        }
        if(this.obstaclePool.checkCollision(this.player)
            || this.enemiesPool.checkCollision(this.player) 
            || this.bulletPool.checkCollision(this.player)) {
            this.player.kill();     
        }

    }
}