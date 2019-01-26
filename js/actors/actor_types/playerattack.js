ACTOR_TYPES.playerattack = class extends Actor
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "", Direction.WEST);
        this.sprite.destroy();

        this.collidable = false;
        this.setAsObstacle(false);

        this.body.setSize(this.stage.data.tileWidth, this.stage.data.tileHeight);

        this.old = false;
    }

    action()
    {
        if (this.old)
        {
            this.die();
        }
        this.old = true;
    }

    friendlyCollision(other)
    {
    }

    enemyCollision(other)
    {
        if (other.ACTOR_TYPE === "resource")
        {
            other.takeHit(this.attackDamage * 10);
        }
        else
        {
            other.takeHit(this.attackDamage);
        }
    }

    postCollision()
    {
        this.die();
    }

    reset(x, y, faceDirection, teamTag)
    {
        super.reset(x, y, faceDirection, teamTag);
        this.old = false;
    }
}