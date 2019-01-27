class PointDirectionMover
{
    constructor(actor)
    {
        this.actor = actor;
        this.scene = this.actor.scene;
        this.target = null;
    }

    get pathInProgress()
    {
        return this.target != null;
    }

    moveTo(x, y)
    {
        const size = this.actor.speed/60;
        this.target = new Phaser.Geom.Rectangle(x-size/2, y-size/2, size, size);

        this.scene.physics.moveTo(this.actor, x, y, this.actor.speed);
    }

    moveToNeighborOf(x, y)
    {
        const coord = actor.stage.getCoordByPixels(x, y);
        const direction = UtilFunctions.getDirectionToObject({x, y}, this.actor);
        const targetCoord = coord.getNeighbor(direction);
        this.moveTo(actor.stage.getTileAt(targetCoord));
    }

    update()
    {
        if (this.target)
        {
            const targetCenterX = this.target.x + this.target.width/2;
            const targetCenterY = this.target.y + this.target.height/2;
            if (this.target.contains(this.actor.x, this.actor.y))
            {
                this.actor.x = targetCenterX;
                this.actor.y = targetCenterY;

                this.actor.body.setVelocity(0, 0);
                this.target = null;
            }
            else
            {
                this.scene.physics.moveTo(this.actor, targetCenterX, targetCenterY, this.actor.speed);
            }
        }
    }

    cancelPath()
    {
        this.target = null;
        this.actor.body.setVelocity(0, 0);
    }
}