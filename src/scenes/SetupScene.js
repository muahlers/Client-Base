import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Setup');
  }

  create() {
    this.titleText1 = this.add.text(this.scale.width / 2, (this.scale.height / 2) * 0.2, 'El Honesto Mike', { fontSize: '48px', fill: '#fff' });
    this.titleText2 = this.add.text(this.scale.width / 2, (this.scale.height / 2) * 0.35, 'Delivery Game', { fontSize: '48px', fill: '#fff' });
    this.titleText3 = this.add.text(this.scale.width / 2, (this.scale.height / 2) * 0.5, 'Setup', { fontSize: '48px', fill: '#fff' });
    this.titleText1.setOrigin(0.5);
    this.titleText2.setOrigin(0.5);
    this.titleText3.setOrigin(0.5);

    this.dimenisonGameButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.6,
      'button1',
      'button2',
      'Resolution',
      this.changeDimension.bind(this),
    );

    this.startGameButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.7,
      'button1',
      'button2',
      'Back',
      this.startScene.bind(this, 'Title'),
    );
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }

  changeDimension() {
    if (window.game.config.width === 1400) {
      this.scale.setGameSize(800, 800);
      window.game.config.width = 800;
    }
    if (window.game.config.width === 800) {
      this.scale.setGameSize(1400, 800);
      window.game.config.width = 1400;
    }
    console.log(window.game.config.width);
  }
}
