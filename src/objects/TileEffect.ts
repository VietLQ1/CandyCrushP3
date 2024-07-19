export class TileEffect
{
    protected scene: Phaser.Scene;
    protected effect: Phaser.GameObjects.Sprite;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string)
    {
        this.scene = scene;
        this.effect = this.scene.add.sprite(x, y, texture, frame);
    }
    public playEffect(): void
    {
        this.effect.setDepth(2);
    }
}