import * as Phaser from 'phaser';

export default class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    // grab a reference of the Game Scene
    this.gameScene = this.scene.get('Game');
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  }

  setupUiElements() {
    console.log(this);
    if (this.gameScene) {
    // Create Hud
      this.hud = this.add.image(0, window.game.config.height * (8.4 / 10), 'hud');
      this.hud.setOrigin(0);
      this.hud.setScale(0.65, 0.65);

      // Create player distance indicator in hud
      this.playerImage = this.add.tileSprite(
        window.game.config.width * (3 / 10),
        window.game.config.height * (8.9 / 10),
        64,
        72,
        'bike',
        0,
      );
      this.playerImage.setOrigin(0);
      this.playerImage.setScale(1, 1);

      // Create Coins Text Score
      this.scoreText = this.add.text(
        window.game.config.width * (5.3 / 10),
        window.game.config.height * (8.7 / 10),
        ': 0',
        { fontSize: '28px' },
      );
      // Create Coin Icon
      this.coinIcon = this.add.image(
        window.game.config.width * (4.8 / 10),
        window.game.config.height * (8.6 / 10),
        'items',
        3,
      );
      this.coinIcon.setOrigin(0);
      this.coinIcon.setScale(1.5, 1.5);

      // Create Jumps Text count.
      this.jumpText = this.add.text(
        window.game.config.width * (4.8 / 10),
        window.game.config.height * (9.2 / 10),
        'Jumps: 0',
        { fontSize: '28px' },
      );
    }

    // Create Level Text indicator.
    this.levelText = this.add.text(
      window.game.config.width * (6.3 / 10),
      window.game.config.height * (8.7 / 10),
      'Lv.: 1',
      { fontSize: '28px' },
    );

    // Create Hamburger Temperature indicator.
    this.termoText = this.add.text(
      window.game.config.width * (3.85 / 10),
      window.game.config.height * (9 / 10),
      '',
      { fontSize: '30px' },
    );

    this.hambState = this.add.image(
      window.game.config.width * (3.63 / 10),
      window.game.config.height * (8.4 / 10),
      'burger1',
    );
    this.hambState.setOrigin(0);
    this.hambState.setScale(0.7, 0.7);

    this.distance = 0;

    this.speedText = this.add.text(400, 0, 'Speed: 0', { fontSize: '16px' });
    this.nameText = this.add.text(880, 0, 'name: ', { fontSize: '16px' });
  }

  setupEvents() {
    // grab events form GameScene

    this.gameScene.events.on('updatePlayer', (speed, dist, levelDist, propina, level, jump, name, heat) => {
      this.speedText.setText(`Speed: ${speed}`);
      this.scoreText.setText(`: ${propina}`);
      this.levelText.setText(`Lv.: ${level}`);
      this.jumpText.setText(`Jumps: ${jump}`);
      this.nameText.setText(`name: ${name}`);
      this.termoText.setText(`${heat} %`);
      this.playerImage.setX(window.game.config.width * ((0.35 + (2.65 * (dist / levelDist))) / 10));

      if (heat === 80) {
        this.hambState = this.add.image(
          window.game.config.width * (3.63 / 10),
          window.game.config.height * (8.4 / 10),
          'burger2',
        );
        this.hambState.setOrigin(0);
        this.hambState.setScale(0.7, 0.7);
      } else if (heat === 60) {
        this.hambState = this.add.image(
          window.game.config.width * (3.63 / 10),
          window.game.config.height * (8.4 / 10),
          'burger3',
        );
        this.hambState.setOrigin(0);
        this.hambState.setScale(0.7, 0.7);
      } else if (heat === 40) {
        this.hambState = this.add.image(
          window.game.config.width * (3.63 / 10),
          window.game.config.height * (8.4 / 10),
          'burger4',
        );
        this.hambState.setOrigin(0);
        this.hambState.setScale(0.7, 0.7);
      } else if (heat === 20) {
        this.hambState = this.add.image(
          window.game.config.width * (3.63 / 10),
          window.game.config.height * (8.4 / 10),
          'burger5',
        );
        this.hambState.setOrigin(0);
        this.hambState.setScale(0.7, 0.7);
      }
    });
  }
}
