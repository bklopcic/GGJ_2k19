class TestScene extends Phaser.Scene
{
    constructor()
    {
        super(
        {
            key: "test", 
            physics:
            {
                default: 'arcade',
                arcade: 
                {
                    debug: false
        }}});

        this.player;
        this.stage;
        this.display;
    }
    
    create()
    {   
        const data = this.cache.json.get("data");
        this.stage = new Stage(this, data);
        const container = this.add.container(0,0);
        this.stage.chunker.startDebug(container);
        
        const player = this.stage.spawnActor("player", 1750, 200, Direction.SOUTH, "player");
        this.player = new PlayerController(player);
        this.chunkController = new ChunkingController(this.stage.chunker, player);
        this.chunkController.startDebug(container);
        this.chunkController.triggerPaddingX = 800;
        this.chunkController.triggerPaddingY = 600;
        
        this.cameras.main.setBounds(0, 0, data.chunkWidth * data.numChunksX, data.chunkHeight * data.numChunksY);
        this.physics.world.setBounds(this.cameras.main.x, this.cameras.main.y, data.chunkWidth * data.numChunksX, data.chunkHeight * data.numChunksY);
        this.cameras.main.startFollow(player, true);
    }
    
    update()
    {
        this.player.update();
        this.chunkController.update();
    }
}