import { ImageConstructor } from '../interfaces/image.interface';

export class Tile extends Phaser.GameObjects.Sprite {
  constructor(params: ImageConstructor) {
    super(params.scene, params.x, params.y, params.texture, params.frame);
    // add tile background
    // set image settings
    this.setOrigin(0, 0);
    this.setInteractive();
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers(params.texture, { start: 4, end: 5 }),
      frameRate: 3,
      repeat: -1,
    });
    this.anims.create({
      key: 'selected',
      frames: this.anims.generateFrameNumbers(params.texture, { start: 36, end: 37 }),
      frameRate: 3,
      repeat: -1,
    });
    //this.setDisplayOrigin(32, 32);
    this.play('idle');
    this.scene.add.existing(this);
  }
}
