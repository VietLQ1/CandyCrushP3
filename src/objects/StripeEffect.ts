import { TileEffect } from "./TileEffect";

export class StripeEffect extends TileEffect
{
    private duration: number = 300;
    private direction: string;
    constructor(scene: Phaser.Scene, x: number, y: number, direction: string)
    {
        super(scene, x, y, 'stripe');
        this.direction = direction;
    }
    public playEffect(): void
    {
        let effectTween: Phaser.Tweens.Tween | undefined;
        switch(this.direction)
        {
            case 'up':
                this.effect.setRotation(Math.PI / 2);
                effectTween = this.scene.tweens.add({
                    targets: this.effect,
                    y: 0,
                    scaleY: 2,
                    ease: 'Sine.easeInOut',
                    duration: this.duration,
                    repeat: 0,
                });
                break;
            case 'down':
                this.effect.setRotation(-Math.PI / 2);
                effectTween = this.scene.tweens.add({
                    targets: this.effect,
                    y: 448,
                    scaleY: 2,
                    ease: 'Sine.easeInOut',
                    duration: this.duration,
                    repeat: 0,
                });
                break;
            case 'left':
                this.effect.setRotation(Math.PI);
                effectTween = this.scene.tweens.add({
                    targets: this.effect,
                    x: 0,
                    scaleX: 2,
                    ease: 'Sine.easeInOut',
                    duration: this.duration,
                    repeat: 0,
                });
                break;
            case 'right':
                this.effect.setRotation(0);
                effectTween = this.scene.tweens.add({
                    targets: this.effect,
                    x: 448,
                    scaleX: 2,
                    ease: 'Sine.easeInOut',
                    duration: this.duration,
                    repeat: 0,
                });
                break;
        }
        if (effectTween)
        {
            effectTween.on('complete', () => {
                this.effect.destroy();
            });
        }
    }
}