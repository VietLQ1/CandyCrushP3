import { GameObjects } from "phaser";
import { Tile } from "../objects/Tile";
import { CONST } from "../const/const";

export class TileGridManager {
    private scene: Phaser.Scene;
    private tileGrid: Tile[][];
    private backGrid: Phaser.GameObjects.Image[][];
    private tiles: Phaser.GameObjects.Group;
    private tileHighlight: Phaser.GameObjects.Particles.ParticleEmitter[];
    constructor(scene: Phaser.Scene, tileGrid: Tile[][], backGrid: Phaser.GameObjects.Image[][]) {
        this.scene = scene;
        this.tileGrid = tileGrid;
        this.backGrid = backGrid;
        this.tileHighlight = [];
    }
    public transitionTileGrid(): void {
        for (let i = 0; i < this.tileGrid.length; i++) {
            for (let j = 0; j < this.tileGrid[i].length; j++) {
                this.scene.tweens.add({
                    targets: this.tileGrid[i][j],
                    x: 224,
                    y: 224,
                    ease: 'Sine.easeInOut',
                    duration: 500,
                    repeat: 0,
                    delay: i * 30 + j * 20,
                }).on('complete', () => {
                    if (i === this.tileGrid.length - 1 && j === this.tileGrid[i].length - 1) {
                        this.spinCicle();
                        // this.spinRectangle();
                    }
                });
            }
        }
    }
    public idleTileGrid(): void {
        for (let i = 0; i < this.tileGrid.length; i++) {
            for (let j = 0; j < this.tileGrid[i].length; j++) {
                this.scene.tweens.add({
                    targets: [this.tileGrid[i][j] , this.backGrid[i][j]],
                    rotation: 0.1,
                    ease: 'sine.inout',
                    duration: 200,
                    delay: i * 50,
                    repeat: 0,
                    yoyo: true,
                }).on('complete', () => {
                    if (i === this.tileGrid.length - 1 && j === this.tileGrid[i].length - 1) {
                        this.scene.events.emit('tileGridIdleComplete');
                    }
                });
                
            }
        }
    }
    public highlightTileGrid(tilePos: { x: number, y: number }, duration: number = 0): void {
        if (tilePos.x < 0 || tilePos.x >= this.tileGrid.length || tilePos.y < 0 || tilePos.y >= this.tileGrid[0].length) {
            return;
        }
        let newHighlight = this.scene.add.particles(0, 0, 'cloud', {
            speed: 15,
            lifespan: 200,
            quantity: 10,
            scale: { start: 0.2, end: 0 },
            emitZone: { type: 'edge', source: this.backGrid[tilePos.y][tilePos.x].getBounds(), quantity: 42 },
            duration: duration,
        });
        if (duration === 0) {
            this.tileHighlight.push(newHighlight);
        }
    }
    public unhighlightTileGrid(): void {
        for (let i = 0; i < this.tileHighlight.length; i++) {
            this.tileHighlight[i].stop();
        }
        this.tileHighlight = [];
    }
    private spinCicle(): void {
        const circle = new Phaser.Geom.Circle(224, 224, 192);
        Phaser.Actions.PlaceOnCircle(this.tileGrid.flat(1), circle);
        this.launchConfetti();
        this.scene.tweens.add({
            targets: circle,
            scale: 1,
            ease: 'Cubic.easeInOut',
            duration: 3000,
            repeat: 0,
            onUpdate: () => {
                Phaser.Actions.RotateAroundDistance(this.tileGrid.flat(), circle, 0.02, circle.radius);
            }
        }
        ).on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
            this.returnToGrid();
        });
    }
    private spinRectangle(): void {
        const rect = new Phaser.Geom.Rectangle(32, 32, 384, 384);
        let tiles = this.tileGrid.flat(1);
        Phaser.Actions.PlaceOnRectangle(tiles, rect);
        this.launchConfetti();
        let lastShift = 0;
        this.scene.tweens.add({
            targets: rect,
            width: 0,
            height: 0,
            ease: 'Cubic.easeInOut',
            duration: 3000,
            repeat: 0,
            onUpdate: () => {
                // console.log(this.scene.sys.game.loop.delta);
            }
        }
        ).on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
            this.returnToGrid();
        });
    }
    private returnToGrid(): void {
        for (let i = 0; i < this.tileGrid.length; i++) {
            Phaser.Utils.Array.Shuffle(this.tileGrid[i]);
        }
        for (let y = 0; y < this.tileGrid.length; y++) {
            for (let x = 0; x < this.tileGrid[y].length; x++) {
                // this.tileGrid[y][x].setTexture(CONST.candyTypes[Phaser.Math.RND.between(0, CONST.candyTypes.length - 1)]);
                this.scene.tweens.add({
                    targets: this.tileGrid[y][x],
                    x: x * CONST.tileWidth,
                    y: y * CONST.tileHeight,
                    ease: 'Sine.easeInOut',
                    duration: 1000,
                    repeat: 0,
                    delay: y * 50 + x * 100,
                    yoyo: false,
                }).on(Phaser.Tweens.Events.TWEEN_COMPLETE, () => {
                    if (y === this.tileGrid.length - 1 && x === this.tileGrid[y].length - 1) {
                        this.scene.events.emit('tileGridTransitionComplete');
                    }
                });
            }
        }
    }
    private launchConfetti(): void {
        this.scene.add.particles(254, 254, 'raster',
            {
                speedX: { min: -500, max: 500 },
                speedY: {min: -1600, max: -800},
                lifespan: 5000,
                gravityY: 5000,
                frame: [0, 4, 8, 12, 16],
                // x: { min: 0, max: 800 },
                scaleX: {
                    onEmit: (particle) => {
                        return -1.0
                    },
                    onUpdate: (particle) => {
                        return (particle.scaleX > 1.0 ? -1.0 : particle.scaleX + 0.05)
                    }
                },
                rotate: {
                    onEmit: (particle) => {
                        return 0
                    },
                    onUpdate: (particle) => {
                        return particle.angle + 1
                    }
                },
                duration: 300,
                maxVelocityY: {
                    onEmit: (particle) => {
                        return -1600
                    },
                    onUpdate: (particle) => {
                        if (particle.velocityY >= 0) {
                            return 200;
                        }
                        return 1600;
                    }
                },
                quantity: 3
            });

    }
}