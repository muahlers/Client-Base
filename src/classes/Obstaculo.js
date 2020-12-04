import * as Phaser from 'phaser';
import {
  randomNum, randomType2, randomType3, randomType4,
} from '../utils/utils';
import { obstaculoData } from '../utils/obstaculoData';

export default class Obstaculo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, height, outlet, type, playerSpeed) {
    super(scene, x, y);
    this.scene = scene;
    this.outletPipeHeightPx = height;
    this.outletNumber = outlet;
    this.type = type;
    this.playerSpeed = playerSpeed;

    if (this.type === 'sedan_retenMovil') {
      const uniqueType = randomType2('sedan', 'retenMovil', 40);
      this.type = uniqueType;
    }
    if (this.type === 'vieja_people') {
      const uniqueType = randomType2('vieja', 'people', 30);
      this.type = uniqueType;
    }
    if (this.type === 'vieja_grass') {
      const uniqueType = randomType2('vieja', 'grass', 60);
      this.type = uniqueType;
    }
    if (this.type === 'vieja_people_moncho_perro') {
      const uniqueType = randomType4('vieja', 'people', 'moncho', 'perro', 70, 40, 30);
      this.type = uniqueType;
    }
    if (this.type === 'moto_motoPaco') {
      const uniqueType = randomType2('moto', 'motoPaco', 30);
      this.type = uniqueType;
    }
    if (this.type === 'vieja_people_skater') {
      const uniqueType = randomType3('vieja', 'people', 'skater', 40, 30);
      this.type = uniqueType;
    }
    if (this.type === 'carrito_vago') {
      const uniqueType = randomType2('carrito', 'vago', 30);
      this.type = uniqueType;
    }
    if (this.type === 'people_moncho') {
      const uniqueType = randomType2('people', 'moncho', 5);
      this.type = uniqueType;
    }
    if (this.type === 'carrito_vago_algodon_carpa') {
      const uniqueType = randomType4('carrito', 'vago', 'algodon', 'carpa', 70, 60, 30);
      this.type = uniqueType;
    }
    if (this.type === 'sedan_camioneta') {
      const uniqueType = randomType2('sedan', 'camioneta', 40);
      this.type = uniqueType;
    }
    if (this.type === 'vieja_people_oficinista') {
      const uniqueType = randomType3('vieja', 'people', 'oficinista', 55, 45);
      this.type = uniqueType;
    }
    if (this.type === 'vieja_people_skater_telefono') {
      const uniqueType = randomType4('vieja', 'people', 'skater', 'telefono', 70, 65, 30);
      this.type = uniqueType;
    }
    if (this.type === 'people_perro') {
      const uniqueType = randomType2('people', 'perro', 10);
      this.type = uniqueType;
    }
    if (this.type === 'people_perro_moneda') {
      const uniqueType = randomType3('people', 'perro', 'moneda', 40, 30);
      this.type = uniqueType;
    }
  }

  drawObstaculo() {
    this.obstaculos = obstaculoData(this.type, this.playerSpeed);
    console.log(this.obstaculos);

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
    this.play(this.type);
    this.scene.add.existing(this);
    console.log(`${this.type}: ${obstaculoSpeed}`);
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
