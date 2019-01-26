ACTOR_TYPES.ghost = class extends Actor
{
    constructor(stage, x, y, faceDirection)
    {
        super(stage, x, y, "ghost", faceDirection);

        this.setAsObstacle(false);
        this.ACTOR_TYPE = "ghost";
        this.sprite.setScale(.25, .25);
        this.body.setSize(75, 75);
        this.body.setOffset(-(this.sprite.width/2) * .25, (-this.sprite.height/2)*.25);

        this.speed = 100;
        this.range = 500;

        this.targeter = new TargetingSystem(this.stage, new Phaser.Geom.Point(this.x, this.y), this.teamTag, this.range, null);
        this.mover = new PathMover(this);
    }

    action()
    {
        if (!this.targeter.target)
        {
            this.findPlayer();
        }
        else
        {
            if (this.targeter.checkTargetInRange())
            {
                this.mover.moveTo(this.targeter.target.x, this.targeter.target.y);
            }
        }
        this.mover.update();
        this.targeter.updatePosition(new Phaser.Geom.Point(this.x, this.y));
    }

    enemyCollision(other)
    {
    }

    postCollision()
    {
        //this.die();
    }

    findPlayer()
    {
        for (let a of this.stage.spawn.allActors)
        {
            if (a.ACTOR_TYPE == "player")
            {
                this.targeter.setTarget(a);
            }
        }
    }
}