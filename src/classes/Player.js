import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame, distance, velocity, jumps, propina, termo, heat) {
    super(scene, x, y, key, frame);
    this.scene = scene; // Scene this Game Object will be added to
    this.velocity = velocity; // the velocity this player moves.
    this.maxJumps = jumps; // Max Jumps a player can make per stage.
    this.jumps = this.maxJumps;
    this.canJump = true;
    this.canHit = true;
    this.lowTemp = true;
    this.propina = propina;
    this.termo = termo;
    this.distance = distance;
    this.heat = heat;
    this.name = sessionName();

    // enable Physics
    this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player.
    this.setImmovable(false);
    // scale our player
    // Escalo mi Sprite en 2x, tanto en x como en y,
    this.setScale(window.game.config.height / (3 * (163 + 15)));
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
    this.body.setVelocity(0);

    if ((cursor.left.isDown || this.scene.keyA.isDown) && this.canJump) {
      this.body.setVelocityX(-this.velocity);
    } else if ((cursor.right.isDown || this.scene.keyD.isDown) && this.canJump) {
      this.body.setVelocityX(this.velocity);
    } else if ((cursor.down.isDown || this.scene.keyS.isDown) && this.canJump) {
      this.body.setVelocityY(this.velocity);
      this.play('bikeDown', true);
    } else if ((cursor.up.isDown || this.scene.keyW.isDown) && this.canJump) {
      this.body.setVelocityY(-this.velocity);
      this.play('bikeUp', true);
    } else if (this.canJump && this.canHit) { this.play('bikeGoing', true); }

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

    if (this.lowTemp) {
      this.lowTemp = false;
      this.scene.time.addEvent({
        delay: (1500 * this.termo),
        callback: () => {
          this.playerRefreshHeat();
        },
        callbackScope: this,
        repeat: 0,
        args: null,
      });﻿﻿
    }
  }

  playerJump() {
    this.play('bikeJump');
    this.scene.events.emit('playerJump');
  }

  playerRefreshHeat() {
    console.log(this.lowTemp);
    this.heat -= 1;
    this.lowTemp = true;
  }

  hitObstacle() {
    console.log('Hit');
    this.canHit = false;
    this.play('bikeCrush', true);
  }
}