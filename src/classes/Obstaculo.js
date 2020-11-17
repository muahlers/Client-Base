import * as Phaser from 'phaser';

export default class Obstaculo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, speed, outlet, type) {
    super(scene, x, y);
    this.scene = scene;
    this.speed = speed;
    this.outlet = outlet;
    this.type = type;
  }

  drawObstaculo() {
    // enable Physics
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.body.setVelocityX(-this.speed);
    this.setOrigin(0);

    switch (this.type) {
      case 'wall':
      {
        this.body.setSize(window.window.game.config.width, 80, false);
        break;
      }

      case 'retenMovil':
      {
        this.setScale(1);
        this.play(this.type);
        this.body.setSize(160, 84, false);
        break;
      }
      case 'bus':
      {
        this.setScale(1);
        this.play(this.type);
        this.body.setSize(180, 84, false);
        break;
      }

      case 'people':
      {
        // scale our player
        this.setScale(1.2, 1.2);
        this.play(this.type);
        this.body.setSize(100, 80, false);
        this.body.setOffset(3, 14);
        this.y -= 20;
        break;
      }
      case 'grass':
      {
        this.body.setSize(375, 251, false);
        this.setScale(0.4, 0.4);
        this.play(this.type);

        this.body.setOffset(3, 14);
        break;
      }

      case 'moto':
      {
        this.setScale(1);
        this.body.setSize(100, 60, false);
        this.play(this.type);
        break;
      }
      default: {
        console.log('Obstaculo no Encontrado');
        break;
      }
    }

    this.scene.add.existing(this);
  }
}
