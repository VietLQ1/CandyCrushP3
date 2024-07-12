export class ScoreManager
{
    private scene: Phaser.Scene;
    private score: number;
    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        this.score = 0;
    }
    public addScore(amount: number): void
    {
        this.score += amount;
    }
    public get Score(): number
    {
        return this.score;
    }
    public setScore(score: number): void
    {
        this.score = score;
    }
    public resetScore(): void
    {
        this.score = 0;
    }
}