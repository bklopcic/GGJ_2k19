class ChunkTestScene extends Phaser.Scene
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

    preload()
    {
        this.load.image('tile', "assets/img/testTile.png");
        this.load.image('box', "assets/img/frame.png");
        this.load.image('dot', "assets/img/dot.png");
        this.load.json('data', 'data/chunktest.json');
    }
    
    create()
    {
        var width = 17;
        var height = 13;
        
        var data = this.cache.json.get("data");
        console.log(data);
        
        this.stage = new Stage(this, data);
        this.stage.chunker.startDebug();

        this.stage.chunker.setActiveRange(new StageCoord(0,0), new StageCoord(3,3));

        this.point = {x:0, y:0};

        this.controller = new ChunkingController(this.stage.chunker, this.point);
        this.controller.startDebug();

        this.input.on('pointermove', function (pointer)
        {
            this.point.x = pointer.x;
            this.point.y = pointer.y;
        }, this);
        
        this.input.on('pointerdown', function (pointer)
        {
            if (this.stage.chunker.checkIdxExists(this.stage.chunker.getParentChunkIdx(pointer)))
            {
                this.stage.spawn.spawnActor("testdot", pointer.x, pointer.y);
            }
        }, this);
    }
    
    update()
    {
        this.stage.update();
        this.controller.update();
    }
}