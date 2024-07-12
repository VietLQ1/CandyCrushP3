import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Candy crush',
  version: '0.0.1',
  width: 512,
  height: 640,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, GameScene],
  backgroundColor: '#de3412',
  render: { pixelArt: true },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
};
