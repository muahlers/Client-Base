import * as Phaser from 'phaser';
import { randomNum, randomType } from '../utils/utils';
import { obstaculoData } from '../utils/obstaculoData';

export default class Obstaculo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, height, outlet, type, playerSpeed) {
    super(scene, x, y);
    this.scene = scene;
    this.outletPipeHeightPx = height;
    this.outletNumber = outlet;
    this.type = type;
    this.playerSpeed = playerSpeed;
    // Parto el label tipo en sub tipos.
    const labels = this.type.split('_');
    const outputType = randomType(
      labels[0], // String 1
      labels[1], // porciento 1
      labels[2], // String 2
      labels[3], // porciento 2
      labels[4], // String 3
      labels[5], // porciento 3
      labels[6], // String 4
      labels[7], // porciento 4
      labels[8], // String 5
    );
    // Defino el tipo final.
    this.type = outputType;
  }

  drawObstaculo() {
    this.obstaculos = obstaculoData(this.type, this.playerSpeed);

    // enable Physics
    this.scene.physics.world.enable(this);
    this.setImmovable(true);

    // Randomizo la velocidad.
    let obstaculoSpeed = this.obstaculos.speed;
    obstaculoSpeed = randomNum(
      obstaculoSpeed - this.obstaculos.speedVar,
      obstaculoSpeed + this.obstaculos.speedVar,
    );
    this.body.setVelocityX(-obstaculoSpeed);

    // Doy tamaño a la animación y seteo le Hitbox,
    this.setOrigin(0);
    this.body.setSize(this.obstaculos.width, this.obstaculos.height, false);
    this.body.setOffset(this.obstaculos.offsetX, this.obstaculos.offsetY);
    this.setScale(this.obstaculos.scale);
    this.y -= this.obstaculos.yCorrection;

    // Animación.
    if (this.obstaculos.id === 'final') {
      const flipCoin = Math.random();
      if (flipCoin > 0.5) {
        this.play('final');
      } else {
        this.play('final2');
      }
    } else {
      this.play(this.type);
    }
    this.scene.add.existing(this);
  }

  stopObstaculo(time) {
    this.scene.time.addEvent({
      delay: time,
      callback: this.setStop,
      callbackScope: this,
      repeat: 0,
    });
  }

  setStop() {
    this.body.setVelocityX(0);
  }
}
