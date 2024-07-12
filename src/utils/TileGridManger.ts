import { GameObjects } from "phaser";
import { Tile } from "../objects/Tile";
import { CONST } from "../const/const";

export class TileGridManager
{
    private scene: Phaser.Scene;
    private tileGrid: Tile[][];
    private backGrid: Phaser.GameObjects.Image[][];
    private tiles: Phaser.GameObjects.Group;
    constructor(scene: Phaser.Scene, tileGrid: Tile[][], backGrid: Phaser.GameObjects.Image[][])
    {
        this.scene = scene;
        this.tileGrid = tileGrid;
        this.backGrid = backGrid;
    }
    public transitionTileGrid(): void
    {
        const circle = new Phaser.Geom.Circle(224, 224, 192);
        Phaser.Actions.PlaceOnCircle(this.tileGrid.flat(1), circle);

        this.scene.tweens.add({
            targets: circle,
            scale: 1,
            ease: 'Linear',
            duration: 3000,
            repeat: 0,
            onUpdate: () => {
                Phaser.Actions.RotateAroundDistance(this.tileGrid.flat(), circle, 0.02, circle.radius);
            }
        }
        ).on('complete', () => {
            for (let y = 0; y < this.tileGrid.length; y++)
            {
                for (let x = 0; x < this.tileGrid[y].length; x++)
                {
                    this.scene.tweens.add({
                        targets: this.tileGrid[y][x],
                        x: x * CONST.tileWidth,
                        y: y * CONST.tileHeight,
                        ease: 'Sine.easeInOut',
                        duration: 1000,
                        repeat: 0,
                        yoyo: false,
                    });
                }
            }
        });
    }
    public idleTileGrid(): void
    {
        for (let i = 0; i < this.tileGrid.length; i++)
        {
            for (let j = 0; j < this.tileGrid[i].length; j++)
            {
                this.scene.tweens.add({
                    targets: this.tileGrid[i][j],
                    rotation: 0.1,
                    ease: 'sine.inout',
                    duration: 300,
                    delay: i * 50,
                    repeat: 0,
                    yoyo: true,
                });
            }
        }
    }
    public highlightTileGrid(tilePos: {x: number, y: number}): void
    {
        if (tilePos.x < 0 || tilePos.x >= this.tileGrid.length || tilePos.y < 0 || tilePos.y >= this.tileGrid[0].length)
        {
            return;
        }
        this.scene.add.particles(0, 0, 'cloud', {
            speed: 15,
            lifespan: 200,
            quantity: 10,
            scale: { start: 0.2, end: 0 },
            emitZone: { type: 'edge', source: this.backGrid[tilePos.y][tilePos.x].getBounds(), quantity: 42 },
            duration: 300
        });
    }
}