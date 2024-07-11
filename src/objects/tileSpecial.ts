import { ImageConstructor } from "../interfaces/image.interface";
import { Tile } from "./Tile";

export class TileSpecial extends Tile {
    public special: string;
    constructor(params: ImageConstructor, special: string) {
        super(params);
        this.special = special;
        this.setAlpha(0.5);
    }
    private init(): void {
    }
}