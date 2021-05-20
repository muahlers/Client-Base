import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class Kiosko extends Phaser.Scene {
  constructor() {
    super('Kiosko');
  }

  create() {
    // Cargo la info. del Jugador.
    this.playerData = JSON.parse(localStorage.getItem('myPlayerData'));

    // Create Game Title
    this.titleText1 = this.add.text(this.scale.width / 2, this.scale.height / 2 - 260, 'El Honesto Mike', { fontSize: '48px', fill: '#fff' });
    this.titleText2 = this.add.text(this.scale.width / 2, this.scale.height / 2 - 180, 'Kiosko', { fontSize: '48px', fill: '#fff' });
    this.titleText3 = this.add.text((this.scale.width / 4) * 3, this.scale.height / 2 - 80, `Proxima Etapa: ${this.playerData.nextLevel}`, { fontSize: '24px', fill: '#fff' });
    this.titleText4 = this.add.text(this.scale.width / 2, this.scale.height / 2 - 80, `Servicio: ${this.playerData.totalHeatLS} %`, { fontSize: '24px', fill: '#fff' });
    this.titleText5 = this.add.text(this.scale.width / 4, this.scale.height / 2 - 80, `Propina: ${this.playerData.propinaLS}`, { fontSize: '24px', fill: '#fff' });
    this.titleText1.setOrigin(0.5);
    this.titleText2.setOrigin(0.5);
    this.titleText3.setOrigin(0.5);
    this.titleText4.setOrigin(0.5);
    this.titleText5.setOrigin(0.5);

    // Create Game Attributes
    this.titleText6 = this.add.text(this.scale.width / 2, this.scale.height * 0.6, `Actual Speed: ${this.playerData.velocity}`, { fontSize: '24px', fill: '#fff' });
    this.titleText7 = this.add.text(this.scale.width / 2, this.scale.height * 0.7, `Actual Jumps: ${this.playerData.jumps}`, { fontSize: '24px', fill: '#fff' });
    this.titleText8 = this.add.text(this.scale.width / 2, this.scale.height * 0.8, `Actual Termo: ${this.playerData.termo}`, { fontSize: '24px', fill: '#fff' });
    this.titleText9 = this.add.text(this.scale.width * (7 / 8), this.scale.height * 0.75, `${this.playerData.propina}`, { fontSize: '32px', fill: '#fff' });
    this.titleText10 = this.add.text(this.scale.width / 2, this.scale.height * 0.9, `Actual Coins: ${this.playerData.coinValues}`, { fontSize: '24px', fill: '#fff' });
    this.titleText6.setOrigin(0.5);
    this.titleText7.setOrigin(0.5);
    this.titleText8.setOrigin(0.5);
    this.titleText9.setOrigin(0.5);
    this.titleText10.setOrigin(0.5);

    this.coinIcon = this.add.image(
      this.scale.width * (3 / 4),
      this.scale.height * 0.7,
      'items',
      3,
    );
    this.coinIcon.setOrigin(0);
    this.coinIcon.setScale(2.5, 2.5);

    // Creat Start button
    this.addSpeedButton = new UiButton(
      this,
      this.scale.width / 4,
      this.scale.height * 0.6,
      'button1',
      'button2',
      ' + Speed $250',
      this.improveSpeed.bind(this),
    );

    this.addJumpButton = new UiButton(
      this,
      this.scale.width / 4,
      this.scale.height * 0.7,
      'button1',
      'button2',
      ' + Jump $600',
      this.improveJump.bind(this),
    );

    this.addTermoButton = new UiButton(
      this,
      this.scale.width / 4,
      this.scale.height * 0.8,
      'button1',
      'button2',
      ' + Termo $300',
      this.improveTermo.bind(this),
    );

    this.addCoinButton = new UiButton(
      this,
      this.scale.width / 4,
      this.scale.height * 0.9,
      'button1',
      'button2',
      ' + Coins $500',
      this.improveCoins.bind(this),
    );

    this.nextStageButton = new UiButton(
      this,
      this.scale.width * (3 / 4),
      this.scale.height * 0.9,
      'button1',
      'button2',
      'Next Stage',
      this.startScene.bind(this, 'Game'),
    );
  }

  startScene(targetScene) {
    localStorage.setItem('myPlayerData', JSON.stringify(this.playerData));
    this.scene.stop('UiKiosko');
    console.log('to next Stage!!');
    this.scene.start(targetScene);
  }

  improveSpeed() {
    if (this.playerData.propina >= 250) {
      this.playerData.velocity += 20;
      this.playerData.propina -= 250;
    }
    this.titleText6.setText(`Actual Speed: ${this.playerData.velocity}`);
    this.titleText9.setText(`${this.playerData.propina}`);
  }

  improveJump() {
    if (this.playerData.propina >= 600) {
      this.playerData.jumps += 1;
      this.playerData.propina -= 600;
    }
    this.titleText7.setText(`Actual Jumps: ${this.playerData.jumps}`);
    this.titleText9.setText(`${this.playerData.propina}`);
  }

  improveTermo() {
    if (this.playerData.propina >= 300) {
      this.playerData.termo += 0.5;
      this.playerData.propina -= 300;
    }
    this.titleText8.setText(`Actual Termo: ${this.playerData.termo}`);
    this.titleText9.setText(`${this.playerData.propina}`);
  }

  improveCoins() {
    if (this.playerData.propina >= 500) {
      this.playerData.coinValues += 25;
      this.playerData.propina -= 500;
    }
    this.titleText10.setText(`Actual Coins: ${this.playerData.coinValues}`);
    this.titleText9.setText(`${this.playerData.propina}`);
  }
}
