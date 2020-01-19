export default class Pool {
    constructor(prefab, texture, scene) {        
        this.prefab = prefab;
        this.texture = texture;
        this.scene = scene;
        this.items = [];

        this.nextCounter = 0;
        this.spawning = false;
    }

    startSpawning(minSpawnTime, maxSpawnTime) {
        this.minSpawnTime = minSpawnTime;
        this.maxSpawnTime = maxSpawnTime;
        this.spawning = true;

        this.nextCounter = Math.random(this.maxSpawnTime - this.minSpawnTime) + this.minSpawnTime;
    }

    create() {
        let item = new this.prefab(this.texture);
        this.scene.addChild(item);
        this.items.push(item);
        return item;
    }

    getItem() {
        for(var i = 0; i < this.items.length; i++) {
            if(!this.items[i].visible) {
                return this.items[i];
            }
        }
        return this.create();
    }

    update(delta) {
        this.nextCounter -= delta;
        if(this.nextCounter <= 0) {
            let item = this.getItem();
            item.reset();
            this.nextCounter = Math.random(this.maxSpawnTime - this.minSpawnTime) + this.minSpawnTime;
        }
        for(let i = 0; i < this.items.length; i++) {
            this.items[i].update(delta);
        }
    }

    checkCollision(player) {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].visible && Math.abs(player.x - this.items[i].x) < player.width/2 + this.items[i].width/2 &&
                    Math.abs(player.y - this.items[i].y) < player.height/2 + this.items[i].height/2) {
                return this.items[i];        
            }
        }
        return false;
    }

    restart() {
        for(let i = 0; i < this.items.length; i++) {
            if(this.items[i].visible) {
                this.items[i].kill();
            }
        }
    }
}