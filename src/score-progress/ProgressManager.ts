import { Game } from "phaser";
import { GameConfig } from "../config";

export class ProgressManager {
    private scene: Phaser.Scene;
    private progress: number;
    private milestone: number;
    private progressBar: Phaser.GameObjects.NineSlice;
    private progressFill: Phaser.GameObjects.NineSlice;
    private progressParticle: Phaser.GameObjects.Particles.ParticleEmitter;
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.progress = 0;
        this.progressBar = this.scene.add.nineslice(0, 0, 'progressBar', 0, 400).setOrigin(0, 0);
        this.progressFill = this.scene.add.nineslice(10, 0, 'progressFill', 0, 390).setOrigin(0, 0);
        this.progressParticle = this.scene.add.particles(0, 0, 'pink', {
            scale: { start: 0.05, end: 0 },
            y: { min: 5, max: 25 },
            lifespan: { min: 100, max: 200 },
            // gravityY: -50,
            // speed: 50,
            gravityX: -500,
            blendMode: 'ADD',
            quantity: 8
        });
        // this.progressParticle.startFollow(this.progressFill);
        let border = this.scene.add.nineslice(0, 0, 'progressBorder', 0, 400).setOrigin(0, 0);
        this.progressFill.displayWidth = 0;
        // this.progressFill.displayHeight = 20;
        // this.scene.events.on('update', this.update, this);
        this.milestone = 5000;
        // this.milestone = 1000;
        let displayZone = this.scene.add.zone(0, 0, GameConfig.width as number, GameConfig.height as number).setOrigin(0, 0);
        Phaser.Display.Align.In.BottomCenter(this.progressBar, displayZone);
        Phaser.Display.Align.In.Center(this.progressFill, this.progressBar);
        Phaser.Display.Align.In.BottomCenter(border, displayZone);
        this.progressParticle.setY(this.progressFill.y);
        this.progressParticle.setX(this.progressFill.x);
    }
    public updateProgress(score: number): void {
        if (this.progress === 1 && score === 0) {
            this.milestone += 500;
        }
        this.progress = score / this.milestone;
        if (this.progress > 1) {
            this.progress = 1;
        }
        if (this.progressFill.displayWidth != 390 * this.progress) {
            this.scene.tweens.add({
                targets: this.progressFill,
                displayWidth: 390 * this.progress,
                duration: 200,
                ease: 'Sine.easeInOut',
                yoyo: false,
                repeat: 0,
                onUpdate: () => {
                    this.progressParticle.setX(this.progressFill.x + this.progressFill.displayWidth);
                }
            });
        }
    }
    public get Progress(): number {
        return this.progress;
    }
}