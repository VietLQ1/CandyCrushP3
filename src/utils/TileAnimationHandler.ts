import { Tile } from "../objects/Tile";

export class TileAnimationHandler
{
    private scene: Phaser.Scene;
    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
    }
    public playTileAnimation(tile: Tile | undefined, key: string): void
    {
        if (!tile)
        {
            return;
        }
        tile.play(key);
    }
    public playTileExplodeParticle(tile: Tile | undefined): void
    {
        if (!tile)
        {
            return;
        }
        
    }
}