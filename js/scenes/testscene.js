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
                    debug: true
        }}});

        this.player;
        this.stage;
        this.display;
    }

    preload()
    {
        this.load.json('data','data/empty-medium.json');
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

        const scraper = new ChunkScraper(this.stage.chunker);
        const clearings = scraper.getClearingsInChunk(new StageCoord(3,3), 10, 10);
        const a = {type:"nate", x: clearings[0][5].x, y: clearings[0][5].y, faceDirection: 1};
        this.stage.chunker.writeActorToData(a);
        
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