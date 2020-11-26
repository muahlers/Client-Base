import * as Phaser from 'phaser';
import { randomNum, randomType2, randomType3 } from '../utils/utils';

export default class Obstaculo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, height, outlet, type, playerSpeed) {
    super(scene, x, y);
    this.scene = scene;
    this.outletPipeHeightPx = height;
    this.outletNumber = outlet;
    this.type = type;
    this.playerSpeed = playerSpeed;

    // Información de Obstaculos.
    this.obstaculos = {
      wall: {
        id: 'wall',
        width: window.window.game.config.width,
        height: 86,
        scale: 1,
        speed: 0,
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 0,
      },
      retenMovil: {
        id: 'retenMovil',
        width: 160,
        height: 84,
        scale: 1,
        speed: 350 * (this.playerSpeed / 160),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 50,
      },
      bus: {
        id: 'bus',
        width: 180,
        height: 84,
        scale: 1,
        speed: 400 * (this.playerSpeed / 160),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 100,
      },
      people: {
        id: 'people',
        width: 100,
        height: 75,
        scale: 1.2,
        speed: this.playerSpeed + 20, // 200
        offsetX: 15,
        offsetY: 20,
        yCorrection: 20,
        speedVar: 20,
      },
      vago: {
        id: 'vago',
        width: 74,
        height: 24,
        scale: 1.5,
        speed: this.playerSpeed, // 160
        offsetX: 0,
        offsetY: 0,
        yCorrection: -30,
        speedVar: 0,
      },
      moto: {
        id: 'moto',
        width: 80,
        height: 65,
        scale: 1.2,
        speed: 650 * (this.playerSpeed / 160),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 50,
      },
      motoPaco: {
        id: 'motoPaco',
        width: 80,
        height: 65,
        scale: 1.2,
        speed: 650 * (this.playerSpeed / 160),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 50,
      },
      sedan: {
        id: 'sedan',
        width: 155,
        height: 60,
        scale: 1,
        speed: 500 * (this.playerSpeed / 160),
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 100,
      },
      vieja: {
        id: 'vieja',
        width: 50,
        height: 60,
        scale: 1.3,
        speed: this.playerSpeed - 80, // 220
        offsetX: 0,
        offsetY: 5,
        yCorrection: 0,
        speedVar: 20,
      },
      moncho: {
        id: 'moncho',
        width: 30,
        height: 60,
        scale: 1.3,
        speed: this.playerSpeed - 80, // 220
        offsetX: 0,
        offsetY: 5,
        yCorrection: 0,
        speedVar: 20,
      },
      skater: {
        id: 'skater',
        width: 40,
        height: 56,
        scale: 1.3,
        speed: this.playerSpeed + 40, // 220
        offsetX: 0,
        offsetY: 5,
        yCorrection: 0,
        speedVar: 20,
      },
      carrito: {
        id: 'carrito',
        width: 72,
        height: 50,
        scale: 1.3,
        speed: this.playerSpeed - 20, // 220
        offsetX: 0,
        offsetY: 15,
        yCorrection: 0,
        speedVar: 20,
      },
      final: {
        id: 'final',
        width: 72,
        height: 50,
        scale: 1.3,
        speed: this.playerSpeed - 100, // 220
        offsetX: 0,
        offsetY: 15,
        yCorrection: 0,
        speedVar: 20,
      },
    };
  }

  drawObstaculo() {
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
    if (this.type === 'vieja_people_moncho') {
      const uniqueType = randomType3('vieja', 'people', 'moncho', 40, 5);
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

    // enable Physics
    this.scene.physics.world.enable(this);
    this.setImmovable(true);

    // Randomizo la velocidad.
    let obstaculoSpeed = this.obstaculos[this.type].speed;
    obstaculoSpeed = randomNum(
      obstaculoSpeed - this.obstaculos[this.type].speedVar,
      obstaculoSpeed + this.obstaculos[this.type].speedVar,
    );
    this.body.setVelocityX(-obstaculoSpeed);

    // Doy tamaño a la animación y seteo le Hitbox,
    this.setOrigin(0);
    this.body.setSize(this.obstaculos[this.type].width, this.obstaculos[this.type].height, false);
    this.body.setOffset(this.obstaculos[this.type].offsetX, this.obstaculos[this.type].offsetY);
    this.setScale(this.obstaculos[this.type].scale);
    this.y -= this.obstaculos[this.type].yCorrection;

    // Animación.
    this.play(this.type);
    this.scene.add.existing(this);
    console.log(`${this.type}: ${obstaculoSpeed}`);
  }
}
