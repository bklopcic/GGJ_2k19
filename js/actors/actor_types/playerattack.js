ACTOR_TYPES.playerattack = class extends Actor
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "laser", Direction.WEST);

        this.collidable = false;
        this.setAsObstacle(false);

        //this.body.setSize(this.stage.data.tileWidth, this.stage.data.tileHeight);
    }

    action()
    {
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

    reset(x, y, faceDirection, teamTag)
    {
        super.reset(x, y, faceDirection, teamTag);
        
        this.setScale(.2, .2);
        this.setAlpha(1);
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.2,
            scaleY: 1.2, 
            alpha: 0,
            duration: 1200,
            onComplete: () => {this.die()}
        });
    }
}