ACTOR_TYPES.eraser = class extends Actor
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "", Direction.WEST);
        this.sprite.destroy();

        this.ACTOR_TYPE = "eraser";
        this.collidable = true;
        this.chunkable = false;
        this.setAsObstacle(false);

        this.body.setSize(this.stage.data.tileWidth/2, this.stage.data.tileHeight/2);
        this.body.setOffset(-this.body.width/2, -this.body.height/2);

        this.old = false;
    }

    friendlyCollision(other)
    {
        other.die();
    }

    enemyCollision(other)
    {
        other.die();
    }

    action()
    {
        if (this.old)
        {
            this.die();
        }
        this.old = true;
    }

    reset(x, y)
    {
        super.reset(x, y);
        this.ticks = 0;
        this.chunkable = false;
    }
}