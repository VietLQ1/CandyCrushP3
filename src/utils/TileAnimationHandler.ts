import { CONST } from "../const/const";
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
        this.scene.add.particles(tile.x + CONST.tileWidth / 2, tile.y + CONST.tileHeight / 2, tile.texture.key, {
            speed: 100,
            lifespan: 500,
            quantity: 10,
            scale: { start: 0.5, end: 0 },
            // emitZone: { type: 'edge', source: tile.getBounds(), quantity: 42 },
            duration: 100
        });
    }
}