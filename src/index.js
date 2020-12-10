import * as Phaser from 'phaser';
import scenes from './scenes/scenes';

const config = {
  type: Phaser.AUTO,
  scene: scenes,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
  scale: {
    width: 1200,
    height: 800,
    mode: Phaser.Scale.FIT,
  },
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
