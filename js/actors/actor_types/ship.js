ACTOR_TYPES.ship = class extends Actor
{
    constructor(stage, x, y, faceDirection)
    {
        super(stage, x, y, "ship", faceDirection);

        this.ACTOR_TYPE = "ship";
        
        this.setAsObstacle(true);
        this.body.immovable = true; //He doesn't move

        this.body.setSize(900, 200);
        this.body.setOffset(-450, -130);
        
        this.collidable = true;
        this.targetable = false;
        this.interactable = true;

        this.controlPanel = this.stage.spawnActor("interactionpanel", this.x - 85, this.y + 120, Direction.WEST, "player");
        this.controlPanel.addDiegetic(this.x - 64, this.y + 122, "door", true);
        this.controlPanel.addOption("stoneresource", this.teleport, this);
    }

    teleport()
    {
        const scraper = new ChunkScraper(this.stage.chunker);
        const clearings = scraper.getClearingsInChunk(new StageCoord(3,3), 6, 4);
        const data = this.dataLiteral;
        const rand = UtilFunctions.genRandInt(0, clearings.length);
        data.x = clearings[rand][12].x;
        data.y = clearings[rand][12].y;
        this.stage.chunker.writeActorToData(data);
        this.die();
        this.stage.chunker.reload();
    }

    reset(x, y, faceDirection, team)
    {
        super.reset(x, y, faceDirection, team);
        this.controlPanel = this.stage.spawnActor("interactionpanel", this.x - 85, this.y + 120, Direction.WEST, "player");
        this.controlPanel.addDiegetic(this.x - 64, this.y + 122, "door", true);
        this.controlPanel.addOption("stoneresource", this.teleport, this);
    }

    die()
    {
        super.die();
        this.controlPanel.die();
    }
}