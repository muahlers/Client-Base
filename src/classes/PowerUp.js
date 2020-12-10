import * as Phaser from 'phaser';

export default class powerUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene; // Scene this Game Object will be added to
  }

  drawPowerUp() {
    // enable Physics
    this.scene.physics.world.enable(this);
    // add player to existing scene
    this.setCollideWorldBounds(true); // No permito que powerUp salga de la camara.

    this.scene.add.existing(this);

    this.body.setVelocity(200, 200);
    this.body.setBounce(0.8);

    console.log(this.body.velocity);

    if (Math.random() > 0.5) {
      this.play('red', true);
    } else {
      this.play('grey', true);
    }
  }
}
