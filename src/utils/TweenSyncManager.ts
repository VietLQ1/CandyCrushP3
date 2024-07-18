export class TweenSyncManager{
    private scene: Phaser.Scene;
    private emitted: boolean;
    constructor(scene: Phaser.Scene){
        this.emitted = false;
        this.scene = scene;
        this.scene.events.on('update', this.update, this);
    }
    public createTween(params: Phaser.Types.Tweens.TweenBuilderConfig): Phaser.Tweens.Tween{
        this.emitted = false;
        return this.scene.tweens.add(params).pause();
    }
    public startAllTweens(): void{
        if(this.allTweens.length === 0){
            this.scene.events.emit('tweensComplete');
            return;
        }
        this.allTweens.forEach((tween: Phaser.Tweens.Tween) => {
            this.emitted = false;
            tween.play();
        });
    }
    public get allTweens(): Phaser.Tweens.Tween[]{
        return this.scene.tweens.getTweens();
    }
    public update(): void{
        if(this.scene.tweens.getTweens().length === 0 && !this.emitted){
            this.scene.events.emit('tweensComplete');
            // this.emitted = true;
            return;
        }
        let ignorable: boolean = true;
        for (let tween of this.allTweens){
            
            for(let data of tween.data as Phaser.Tweens.TweenData[]){
                // console.log(data.key);
                if (data.key !== 'rotation' ){
                    // console.log(data.key);
                    ignorable = false;
                    break;
                }
            }
            if (!ignorable){
                break;
            }
            // if(tween.totalTargets == 1){
            //     ignorable = false;
            //     break;
            // }
        }
        if(ignorable && !this.emitted){
            console.log('ignorable');
            this.scene.events.emit('tweensComplete');
        }
    }
}