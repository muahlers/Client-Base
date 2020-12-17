import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame, distance, velocity, jumps, propina, termo, heat) {
    super(scene, x, y, key, frame);
    this.scene = scene; // Scene this Game Object will be added to
    this.velocity = velocity; // the velocity this player moves.
    this.maxJumps = jumps; // Max Jumps a player can make per stage.
    this.jumps = this.maxJumps;
    this.propina = propina;
    this.termo = termo;
    this.distance = distance;
    this.heat = heat;
    this.name = 'Joe'; // sessionName();
    // Indicadores:
    this.canJump = true; // Indicador para Saltar.
    this.canHit = true; // Indicador para ser Golepado.
    this.lowTemp = true; // Indicador para bajar temperatura.
    this.onStage = true; // Indicador de que la etapa No ha terminado.

    // enable Physics
    this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player.
    this.setImmovable(false);
    // scale our player
    // Escalo mi Sprite en 2x, tanto en x como en y,
    this.setScale(window.game.config.height / (3 * (163 + 30)));
    // Collide with world bounds.
    this.setCollideWorldBounds(true); // No permito que mi player salga de la camara.
    // this.setGravityY(100);
    // add player to existing scene
    this.scene.add.existing(this);
    // change Hitbox to player
    this.body.setSize(58, 36, false);
    this.body.setOffset(3, 34);
  }

  update(cursor) {
    this.playerMovemnt(cursor);

    if (cursor.space.isDown && this.jumps > 0 && this.canJump) {
      this.jumps -= 1;
      this.canJump = false;
      this.scene.time.addEvent({
        delay: 1000,
        callback: () => {
          this.canJump = true;
          this.scene.events.emit('playerFinishJump');
        },
        callbackScope: this,
        repeat: 0,
        args: null,
      });﻿﻿
      this.playerJump();
    }

    if (this.lowTemp && this.onStage) {
      this.lowTemp = false;
      this.scene.time.addEvent({
        delay: (1700 * this.termo),
        callback: () => {
          this.playerRefreshHeat();
        },
        callbackScope: this,
        repeat: 0,
        args: null,
      });﻿﻿
    }
  }

  playerMovemnt(cursor) {
    this.body.setVelocity(0);

    if ((cursor.left.isDown || this.scene.keyA.isDown) && this.canJump) {
      this.body.setVelocityX(-this.velocity);
    } else if ((cursor.right.isDown || this.scene.keyD.isDown) && this.canJump) {
      this.body.setVelocityX(this.velocity);
    }

    if ((cursor.down.isDown || this.scene.keyS.isDown) && this.canJump) {
      this.body.setVelocityY(this.velocity);
      this.play('bikeDown', true);
    } else if ((cursor.up.isDown || this.scene.keyW.isDown) && this.canJump) {
      this.body.setVelocityY(-this.velocity);
      this.play('bikeUp', true);
    } else if (this.canJump && this.canHit) { this.play('bikeGoing', true); }
  }

  playerJump() {
    this.play('bikeJump');
    this.scene.events.emit('playerJump');
  }

  playerHitObstacle() { // Sin Uso.
    console.log('Hit');
    this.canHit = false;
    this.play('bikeCrush', true);
  }

  playerRefreshHeat() {
    this.heat -= 1;
    this.lowTemp = true;
  }

  playerEndStage() {
    this.onStage = false;
  }

  playerChangeSpeed(speed) {
    this.velocity += speed;
  }

  getPropinaStreet(coin) {
    this.propina += coin;
  }
}
