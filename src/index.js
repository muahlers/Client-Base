import * as Phaser from 'phaser';
import scenes from './scenes/scenes';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: scenes,
};

class GameApp extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.start('Boot');
  }
}

window.onload = () => {
  window.game = new GameApp();
};
