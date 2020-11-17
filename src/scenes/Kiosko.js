import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class Kiosko extends Phaser.Scene {
  constructor() {
    super('Kiosko');
  }

  init() {
    this.scene.launch('Ui');
  }

  create() {
    // Cargo la info. del Jugador.
    this.playerData = JSON.parse(localStorage.getItem('myPlayerData'));
    console.log('Bug');

    // Create Game Title
    this.titleText1 = this.add.text(this.scale.width / 2, this.scale.height / 2 - 160, 'El Honesto Mike', { fontSize: '48px', fill: '#fff' });
    this.titleText2 = this.add.text(this.scale.width / 2, this.scale.height / 2 - 80, 'Kiosko', { fontSize: '48px', fill: '#fff' });
    this.titleText1.setOrigin(0.5);
    this.titleText2.setOrigin(0.5);

    // Creat Start button
    this.addSpeedButton = new UiButton(
      this,
      this.scale.width / 4,
      this.scale.height * 0.6,
      'button1',
      'button2',
      ' + Speed $200',
      this.improveSpeed.bind(this),
    );

    this.addJumpButton = new UiButton(
      this,
      this.scale.width / 4,
      this.scale.height * 0.7,
      'button1',
      'button2',
      ' + Jump $500',
      this.improveJump.bind(this),
    );

    this.addTermoButton = new UiButton(
      this,
      this.scale.width / 4,
      this.scale.height * 0.8,
      'button1',
      'button2',
      ' + Termo $350',
      this.improveTermo.bind(this),
    );

    this.nextStageButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.9,
      'button1',
      'button2',
      'Next Stage',
      this.startScene.bind(this, 'Game'),
    );
  }

  update() {
    // sessionName();
    const username =  "Joe";
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
    localStorage.setItem('myPlayerData', JSON.stringify(this.playerData));
    console.log('to next Stage!!');
    this.scene.start(targetScene);
  }

  improveSpeed() {
    if (this.playerData.propina >= 200) {
      this.playerData.velocity += 20;
      this.playerData.propina -= 200;
    }
  }

  improveJump() {
    if (this.playerData.propina >= 500) {
      this.playerData.jumps += 1;
      this.playerData.propina -= 500;
    }
  }

  improveTermo() {
    if (this.playerData.propina >= 350) {
      this.playerData.termo += 0.5;
      this.playerData.propina -= 350;
    }
  }
}
