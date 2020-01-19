import Obstacle from './Obstacle';

export default class ObstaclePool {
    constructor(obstacleTexture) {
        this.obstacleTexture = obstacleTexture;

        this.obstacles = [];
    }

    getDead() {
        for(var i = 0; i < this.obstacles.length; i++) {
            if(!this.obstacles[i].visible) {
                return this.obstacles[i];
            }
        }
        return null;
    }

    update() {
        for(var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].update();
        }
    }
}