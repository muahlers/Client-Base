class Platform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame, speed, width) {
    super(scene, x, y, key, frame);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.displayWidth = width;
    this.velocity = speed;

    // this.tileScaleX(width/48);
    // enable Physics
    this.scene.physics.world.enable(this);

    // set immovable if another object collides with our player.
    this.setImmovable(true);
    this.body.setVelocityX(this.velocity);

    // this.setScale(1); //Escalo mi Sprite en 2x, tanto en x como en y,
    // this.setScrollFactor(0);

    this.scene.add.existing(this);
  }

  setPlatformPos(x, y) {
    this.x = x;
    this.y = y;
  }
}
