import * as Phaser from 'phaser';

export default class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    // grab a reference of the Game Scene
    this.gameScene = this.scene.get('Game');
    this.otherGameScene = this.scene.get('Kiosko');
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  }

  setupUiElements() {
    // Create Coins Text Score
    this.scoreText = this.add.text(35, 0, 'Coins: 0', { fontSize: '16px' });
    // Create Coin Icon
    this.coinIcon = this.add.image(150, 10, 'items', 3);
    this.distance = 0;

    this.xText = this.add.text(200, 0, 'X: 0', { fontSize: '16px' });
    this.yText = this.add.text(300, 0, 'Y: 0', { fontSize: '16px' });
    this.speedText = this.add.text(400, 0, 'Speed: 0', { fontSize: '16px' });
    this.distText = this.add.text(550, 0, 'Dist: 0', { fontSize: '16px' });
    this.levelText = this.add.text(700, 0, 'Lv.: 1', { fontSize: '16px' });
    this.jumpText = this.add.text(780, 0, 'jumps: 0', { fontSize: '16px' });
    this.nameText = this.add.text(880, 0, 'name: ', { fontSize: '16px' });
    this.termoText = this.add.text(1050, 0, 'Heat: ', { fontSize: '16px' });
  }

  setupEvents() {
    // grab events form GameScene

    this.gameScene.events.on('updatePlayer', (x, y, speed, dist, levelDist, propina, level, jump, name, heat) => {
      this.xText.setText(`X: ${x}`);
      this.yText.setText(`Y: ${y}`);
      this.speedText.setText(`Speed: ${speed}`);
      this.distText.setText(`Dist: ${dist}/${levelDist}`);
      this.scoreText.setText(`Coins: ${propina}`);
      this.levelText.setText(`lv.: ${level}`);
      this.jumpText.setText(`jumps: ${jump}`);
      this.nameText.setText(`name: ${name}`);
      this.termoText.setText(`Heat: ${heat}`);
    });

    this.otherGameScene.events.on('updatePlayer', (x, y, speed, dist, propina, level, jump, name, heat) => {
      this.xText.setText(`X: ${x}`);
      this.yText.setText(`Y: ${y}`);
      this.speedText.setText(`Speed: ${speed}`);
      this.distText.setText(`Total Dist: ${dist}`);
      this.scoreText.setText(`Coins: ${propina}`);
      this.levelText.setText(`lv.: ${level}`);
      this.jumpText.setText(`jumps: ${jump}`);
      this.nameText.setText(`name: ${name}`);
      this.termoText.setText(`Heat: ${heat}`);
    });
  }
}
