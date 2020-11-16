import * as Phaser from 'phaser';

function preload() {
  console.log('this is the preload method');
}

function create() {
  this.add.text(0, 0, 'Hello World 11');
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: {
    preload,
    create,
  },
};

const game = new Phaser.Game(config);
console.log(game);
