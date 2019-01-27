ACTOR_TYPES.movetarget = class extends Actor
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "move-target", Direction.WEST);

        this.collidable = false;
        this.chunkable = false;
        this.setAsObstacle(false);
        this.setAlpha(.8);

    }

    action()
    {
    }

    reset(x, y, faceDirection, teamTag)
    {
        super.reset(x, y, faceDirection, teamTag);
        
        this.setScale(1, 1);
        this.setAlpha(.8);
        this.scene.tweens.add({
            targets: this,
            scaleX: .2,
            scaleY: .2, 
            alpha: .2,
            duration: 800,
            onComplete: () => {this.die()}
        });
    }
}