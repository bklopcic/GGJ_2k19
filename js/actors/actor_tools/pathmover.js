class PathMover
{
    constructor(actor)
    {
        this.actor = actor;
        this.stage = actor.stage;
        this.mover = new PointDirectionMover(actor);
        this.target = null;
    }

    get pathInProgress()
    {
        return this.target != null;
    }

    update()
    {
        if (this.pathInProgress)
        {
            const start = this.stage.getCoordByPixels(this.actor.x, this.actor.y);
            const end = this.stage.getCoordByPixels(this.target.x, this.target.y);
            if (start.compareCoord(end))
            {
                this.mover.moveTo(this.target.x, this.target.y);
                this.target = null;
            }
            else
            {
                PATH_FINDER.findPath(this.stage.dataGrid, start.x, start.y, end.x, end.y, path => this.pathCallback(path));
            }
        }
        this.mover.update();
    }

    moveTo(x, y)
    {
        if (this.actor.x == x && this.actor.y == y)
        {
            return;
        }
        this.target = new Phaser.Geom.Point(x, y);
    }

    pathCallback(path)
    {
        if (path && path.length > 0 && this.pathInProgress)
        {
            if (path.length <= 2)
            {
                this.mover.moveTo(this.target.x, this.target.y);
            }
            else
            {
                const point = path[1];
                const x = (point.x * this.stage.tileWidth) + (this.stage.tileWidth/2) + this.stage.grid.offsetX;
                const y = (point.y * this.stage.tileHeight) + (this.stage.tileHeight/2) + this.stage.grid.offsetY;
                this.mover.moveTo(x, y);
            }
        }
        else
        {
            this.target = null;
        }
    }
}