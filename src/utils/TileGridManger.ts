import { Tile } from "../objects/Tile";

export class TileGridManager
{
    private scene: Phaser.Scene;
    private tileGrid: Tile[][];
    private tiles: Phaser.GameObjects.Group;
    constructor(scene: Phaser.Scene, tileGrid: Tile[][])
    {
        this.scene = scene;
        this.tileGrid = tileGrid;
        this.tiles = this.scene.add.group(tileGrid.flat());
    }
    public transitionTileGrid()
    {
        const circle = new Phaser.Geom.Circle(224, 224, 64);
        Phaser.Actions.PlaceOnCircle(this.tiles.getChildren(), circle);
    }
}