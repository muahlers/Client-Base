import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Create Game Title
    this.titleText1 = this.add.text(this.scale.width / 2, this.scale.height / 2 - 160, 'El Honesto Mike', { fontSize: '48px', fill: '#fff' });
    this.titleText2 = this.add.text(this.scale.width / 2, this.scale.height / 2 - 80, 'Delivery Game', { fontSize: '48px', fill: '#fff' });
    this.titleText3 = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Version: 0.2.6', { fontSize: '48px', fill: '#fff' });
    this.titleText1.setOrigin(0.5);
    this.titleText2.setOrigin(0.5);
    this.titleText3.setOrigin(0.5);

    this.video = this.add.video(300, 300, 'intro');
    this.video.setScale(0.5);
    this.video.play(true);

    // Creat Start button
    this.startGameButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.7,
      'button1',
      'button2',
      'Start',
      this.startScene.bind(this, 'Game'),
    );

    this.setupGameButton = new UiButton(
      this, this.scale.width / 2,
      this.scale.height * 0.8,
      'button1',
      'button2',
      'Options',
      this.startScene.bind(this, 'Setup'),
    );

    // Guardo la info del jugador
    const myPlayerData = {
      x: window.game.config.width / 5,
      y: window.game.config.height / 2,
      velocity: 160,
      jumps: 1,
      termo: 1,
      totalHeat: 100,
      propina: 0,
      distance: 0,
      totalDistance: 0,
      level: 1,
      nextLevel: 'city',
      levels: ['city', 'walkingLane', 'highway', 'protesta', 'callejon'],
      propinaLS: 0,
      totalHeatLS: 0,
      road: ['c'],
    };
    localStorage.setItem('myPlayerData', JSON.stringify(myPlayerData));
  }

  startScene(targetScene) {
    console.log('to GameScene');
    this.scene.start(targetScene);
  }
}
