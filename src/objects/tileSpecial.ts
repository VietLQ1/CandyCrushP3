import { ImageConstructor } from "../interfaces/image.interface";
import { Tile } from "./Tile";

export class TileSpecial extends Tile {
    public special: string;
    constructor(params: ImageConstructor, special: string) {
        super(params);
        this.special = special;
        this.init();
    }
    private init(): void {
        //play special audio
    }
}