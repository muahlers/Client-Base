import * as Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // load images.
    this.loadImages();
    // load spritesheets
    this.loadSpitesheets();
    // load audio.
    this.loadAudio();
  }

  loadImages() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');
    this.load.image('plataform', 'assets/images/plataform.jpg');
    this.load.image('background0', 'assets/fondos/fondo3.png');
    this.load.image('background1', 'assets/fondos/fondo2.png');
    this.load.image('background2', 'assets/fondos/areaJugable.png');
    this.load.image('ground', 'assets/images/ground.png');
  }

  loadSpitesheets() {
    this.load.spritesheet('grass', 'assets/images/bench.png', { frameWidth: 375, frameHeight: 251 });
    this.load.spritesheet('retenMovil', 'assets/images/RetenmovilSheet.png', { frameWidth: 160, frameHeight: 85 });
    this.load.spritesheet('bus', 'assets/images/busSheet.png', { frameWidth: 180, frameHeight: 85 });
    this.load.spritesheet('people', 'assets/images/protestaSheet.png', { frameWidth: 119, frameHeight: 94 });
    this.load.spritesheet('moto', 'assets/images/motoSheet.png', { frameWidth: 80, frameHeight: 65 });
    this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('powerUp', 'assets/images/power-up.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('bike', 'assets/images/mc_3.png', { frameWidth: 64, frameHeight: 72 });
  }

  loadAudio() {
    // this.load.audio("goldSound", ['assets/audio/Pickup.wav']);
  }

  create() {
    console.log('starting game ...');
    this.scene.start('Title'); // Voy hacia TitleScene.
  }
}
