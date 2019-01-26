class PickupItem extends Actor
{
    constructor(stage, x, y, key, faceDirection)
    {
        super(stage, x, y, key, faceDirection);

        this.collidable = false;
        this.targetable = false;
        this.collected = false;
        this.setAsObstacle(false);
        this.pickupType = "pickup Item"
    }

    enemyCollision(other)
    {
        if (other.inventory && !this.collected)
        {
            this.collected = true;
            other.inventory.addItem(this.pickupType, 1);
        }
    }

    postCollision()
    {
        if (this.collected)
        {
            this.die();
        }
    }

    reset(x, y, direction)
    {
        super.reset(x, y, direction);
        this.collected = false;
    }
}

ACTOR_TYPES.log = class extends PickupItem
{
    constructor(stage, x, y, faceDirection)
    {
        super(stage, x, y, "log", faceDirection);
        this.ACTOR_TYPE = "log";
        this.pickupType = "log";
    }
}

ACTOR_TYPES.stone = class extends PickupItem
{
    constructor(stage, x, y, faceDirection)
    {
        super(stage, x, y, "stoneresource", faceDirection);
        this.ACTOR_TYPE = "stone";
        this.pickupType = "stone";
    }
}