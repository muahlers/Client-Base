class Coin extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame, velocity) {
    super(scene, x, y, key, frame);
    this.scene = scene; // Scene this Game Object will be added to
    this.velocity = velocity; // the velocity this Coin
    this.score = 10;

    // enable Physics
    this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player.
    this.setImmovable(true);
    this.body.setVelocityX(-this.velocity);
    // scale our player
    this.setScale(1); // Escalo mi Sprite en 2x, tanto en x como en y,

    this.scene.add.existing(this);
  }

  showScore() {
    return this.score;
  }
}
