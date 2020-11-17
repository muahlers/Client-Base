class Obstaculo extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame, velocity) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.velocity = velocity;

    // enable Physics
    this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player.
    this.setImmovable(true);
    this.body.setVelocityX(-this.velocity);
    // scale our player
    this.setScale(1); // Escalo mi Sprite en 2x, tanto en x como en y,

    this.scene.add.existing(this);
  }
}
