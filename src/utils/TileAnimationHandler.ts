import { CONST } from "../const/const";
import { Tile } from "../objects/Tile";
import { TileSpecial } from "../objects/TileSpecial";

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
        if (tile instanceof TileSpecial && key === 'selected')
        {
            tile.play('spin');
            return;
        }
        tile.play(key);
    }
    public playTileExplodeParticle(tile: Tile | undefined,  delay: number = 0): void
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
            delay: delay,
            // emitZone: { type: 'edge', source: tile.getBounds(), quantity: 42 },
            duration: 100
        });
    }
    public playSpecialTileParticle(tile: TileSpecial | undefined): void
    {
        if (!tile)
        {
            return;
        }
        let particle: Phaser.GameObjects.Particles.ParticleEmitter;
        if (tile.special === 'fullboard')
        {
            particle = this.scene.add.particles(0, 0, 'pink', {
                speed: { min: -100, max: 100 },
                lifespan: 300,
                scale: { start: 0.25, end: 0, ease: 'Sine.easeIn' },
                // blendMode: 'ADD',
            }).startFollow(tile, CONST.tileWidth / 2, CONST.tileHeight / 2);
        }
        else if (tile.special === 'row' || tile.special === 'column')
        {
            particle = this.scene.add.particles(0, 0, 'blue', {
                speed: { min: -100, max: 100 },
                lifespan: 300,
                scale: { start: 0.15, end: 0, ease: 'Sine.easeIn' },
                blendMode: 'ADD',
                angle: { min: -100, max: -80},
            }).startFollow(tile, CONST.tileWidth / 2, CONST.tileHeight / 2);
        }
        else if (tile.special === '3x3')
        {
            particle = this.scene.add.particles(0, 0, 'blue', {
                speed: { min: -100, max: 100 },
                lifespan: 300,
                scale: { start: 0.15, end: 0, ease: 'Sine.easeIn' },
                // blendMode: 'ADD',
            }).startFollow(tile, CONST.tileWidth / 2, CONST.tileHeight / 2);
        }
        tile.on('destroy', () => {
            particle.stop(true);
        });
    }
    public playHintParticle(tile: Tile | undefined): void
    {
        if (!tile)
        {
            return;
        }
        this.scene.add.particles(
            0,
            0,
            'Yellow',
            {
                speed: 1,
                lifespan: 1000,
                quantity: 10,
                scale: { start: 0.2, end: 0 },
                duration: 1000,
                emitZone: { type: 'edge', source: tile.getBounds(), quantity: 32 },
                blendMode: 'ADD',
                frequency: 8,
                stopAfter: 32
            }
          );
    }
}