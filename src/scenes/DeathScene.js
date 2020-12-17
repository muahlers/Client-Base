import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class DeathScene extends Phaser.Scene {
  constructor() {
    super('Death');
  }

  init() {
    this.scene.launch('Ui');
  }

  create() {
    this.playerData = JSON.parse(localStorage.getItem('myPlayerData'));
    this.createAnime();

    this.titleText1 = this.add.text(
      this.scale.width / 2,
      this.scale.height / 8,
      'Game Over', { fontSize: '48px', fill: '#fff' },
    );
    this.titleText1.setOrigin(0.5);

    this.setupGameButton = new UiButton(
      this, this.scale.width / 2,
      this.scale.height * 0.8,
      'button1',
      'button2',
      'Title',
      this.startScene.bind(this, 'Title'),
    );
  }

  createAnime() {
    this.anims.create({
      key: 'red',
      frames: this.anims.generateFrameNumbers('powerUp', {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1,
    });
  }

  update() {
    const username = 'Joe'; // sessionName();
    this.events.emit('updatePlayer',
      '-',
      '-',
      this.playerData.velocity,
      this.playerData.totalDistance,
      this.playerData.propina,
      this.playerData.level,
      this.playerData.jumps,
      username,
      this.playerData.termo);
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
