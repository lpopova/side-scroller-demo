import * as PIXI from 'pixi.js';

const BAR_WIDTH = 200;
const BAR_HEIGHT = 20;

const BAR_INNER_WIDTH = 196;
const BAR_INNER_HEIGHT = 16;

export default class FuelUI extends PIXI.Container {

    constructor(x, y) {
        super();

        this.position.set(x, y);

        const background = new PIXI.Graphics();
        this.addChild(background);
        background.lineStyle(2, 0x000000, 1);
        background.drawRect(0, -BAR_HEIGHT/2, BAR_WIDTH, BAR_HEIGHT);

        this.fill = new PIXI.Graphics();
        this.addChild(this.fill);
        this.fill.beginFill(0x32a852);
        this.fill.drawRect(2, -BAR_INNER_HEIGHT/2, BAR_INNER_WIDTH, BAR_INNER_HEIGHT);
    }

    setBar(amount) {
        this.fill.scale.x = amount;
    }

}