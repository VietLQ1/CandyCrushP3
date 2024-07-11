import { Tile } from "../objects/Tile";

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
        this.tiles = this.scene.add.group(tileGrid.flat());
    }
    public transitionTileGrid(): void
    {
        const circle = new Phaser.Geom.Circle(224, 224, 64);
        Phaser.Actions.PlaceOnCircle(this.tiles.getChildren(), circle);
    }
    public idleTileGrid(): void
    {

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