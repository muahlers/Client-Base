import * as Phaser from 'phaser';
import { randomNum } from '../utils/utils'

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
        height: 80,
        scale: 1.2,
        speed: this.playerSpeed - 20, // 200
        offsetX: 0,
        offsetY: 0,
        yCorrection: 20,
        speedVar: 20,
      },
      grass: {
        id: 'grass',
        width: 375,
        height: 251,
        scale: 0.4,
        speed: this.playerSpeed, // 160
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 0,
      },
      moto: {
        id: 'moto',
        width: 100,
        height: 60,
        scale: 1,
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
        width: 80,
        height: 80,
        scale: 1,
        speed: this.playerSpeed - 40, // 220
        offsetX: 0,
        offsetY: 0,
        yCorrection: 0,
        speedVar: 20,
      },
    };
  }

  drawObstaculo() {
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
    console.log(this.obstaculos[this.type].id);
  }
}
