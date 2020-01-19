import * as PIXI from 'pixi.js'
import Game from './Game';

const loader = new PIXI.Loader();
loader.add('background', 'assets/background.png');
loader.add('sprites', 'assets/spritesheet.json');

loader.load((loader, resources) => {
  const game = new Game(resources);
});


