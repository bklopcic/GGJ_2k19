const phaserConfig = 
{
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    parent: "game-container",
    scene: [BootScene, ChunkEditerScene],
    physics: {
        default: "arcade"
    }
};

const game = new Phaser.Game(phaserConfig);
game.scene.start("boot", "chunk-editer");