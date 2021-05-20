import * as Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Loading ...', { fontSize: '48px', fill: '#fff' });
    this.titleText.setOrigin(0.5);
    // load images.
    this.loadImages();
    // load spritesheets
    this.loadSpitesheets();
    // load audio.
    this.loadAudio();
    // load videos.
    this.loadVideos();
  }

  loadImages() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');
    this.load.image('background0', 'assets/fondos/fondo3.png');
    this.load.image('background1', 'assets/fondos/fondo2.png');
    this.load.image('background2', 'assets/fondos/areaJugable.png');
    this.load.image('hud', 'assets/images/ui/hud.png');
    this.load.image('burger1', 'assets/images/ui/brg1.png');
    this.load.image('burger2', 'assets/images/ui/brg2.png');
    this.load.image('burger3', 'assets/images/ui/brg3.png');
    this.load.image('burger4', 'assets/images/ui/brg4.png');
    this.load.image('burger5', 'assets/images/ui/brg5.png');
  }

  loadSpitesheets() {
    // Enemigos
    this.load.spritesheet('algodon', 'assets/images/enemigos/algodonSheet.png', { frameWidth: 92, frameHeight: 100 });
    this.load.spritesheet('carpa', 'assets/images/enemigos/carpa1.png', { frameWidth: 142, frameHeight: 74 });
    this.load.spritesheet('carpaAlt', 'assets/images/enemigos/carpa2.png', { frameWidth: 142, frameHeight: 74 });
    this.load.spritesheet('oficinista', 'assets/images/enemigos/oficinistaSheet.png', { frameWidth: 48, frameHeight: 72 });
    this.load.spritesheet('perro', 'assets/images/enemigos/perroSheet.png', { frameWidth: 32, frameHeight: 24 });
    this.load.spritesheet('mataPaco', 'assets/images/enemigos/perroMatapacoSheet.png', { frameWidth: 32, frameHeight: 24 });
    this.load.spritesheet('telefono', 'assets/images/enemigos/telefono.png', { frameWidth: 32, frameHeight: 68 });
    this.load.spritesheet('camioneta', 'assets/images/enemigos/camionetaSheet.png', { frameWidth: 195, frameHeight: 85 });
    this.load.spritesheet('vieja', 'assets/images/enemigos/viejaPerro.png', { frameWidth: 50, frameHeight: 65 });
    this.load.spritesheet('moncho', 'assets/images/enemigos/monchoSheet.png', { frameWidth: 30, frameHeight: 65 });
    this.load.spritesheet('skater', 'assets/images/enemigos/skaterSheet.png', { frameWidth: 40, frameHeight: 56 });
    this.load.spritesheet('carrito', 'assets/images/enemigos/carretaSheet.png', { frameWidth: 72, frameHeight: 64 });
    this.load.spritesheet('motoPaco', 'assets/images/enemigos/motoPacosSheet.png', { frameWidth: 80, frameHeight: 65 });
    this.load.spritesheet('sedan', 'assets/images/enemigos/sedanSheet.png', { frameWidth: 155, frameHeight: 65 });
    this.load.spritesheet('sedanAlt', 'assets/images/enemigos/sedanAltSheet.png', { frameWidth: 155, frameHeight: 65 });
    this.load.spritesheet('vago', 'assets/images/enemigos/vago.png', { frameWidth: 74, frameHeight: 24 });
    this.load.spritesheet('retenMovil', 'assets/images/enemigos/retenmovilSheet.png', { frameWidth: 160, frameHeight: 85 });
    this.load.spritesheet('bus', 'assets/images/enemigos/transantiagoSheet.png', { frameWidth: 180, frameHeight: 85 });
    this.load.spritesheet('people', 'assets/images/enemigos/multitudSheet.png', { frameWidth: 119, frameHeight: 94 });
    this.load.spritesheet('moto', 'assets/images/enemigos/motoSheet.png', { frameWidth: 80, frameHeight: 65 });
    this.load.spritesheet('patrulla', 'assets/images/enemigos/patrullaSheet.png', { frameWidth: 155, frameHeight: 65 });

    // Others
    this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('powerUp', 'assets/images/power-up.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('bike', 'assets/images/mc_3.png', { frameWidth: 64, frameHeight: 72 });
    this.load.spritesheet('final', 'assets/images/goalGirl2Sheet.png', { frameWidth: 52, frameHeight: 84 });
    this.load.spritesheet('final2', 'assets/images/goalGirl1Sheet.png', { frameWidth: 52, frameHeight: 76 });
  }

  loadAudio() {
    this.load.audio('battle', ['assets/audio/sci-fi_platformer12.mp3', 'assets/audio/sci-fi_platformer12.ogg']);
  }

  loadVideos() {
    this.load.video('intro', './assets/videos/paperboy.mp4');
  }

  create() {
    console.log('starting game ...');
    this.scene.start('Title'); // Voy hacia TitleScene.
  }
}
