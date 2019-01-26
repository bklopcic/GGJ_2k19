ACTOR_TYPES.unbreakablewall = class extends ACTOR_TYPES.wall
{
    constructor(stage, x, y, faceDirection, key)
    {
        key = key || "dark-wall";
        super(stage, x, y, faceDirection, key);

        this.ACTOR_TYPE = "unbreakablewall";
    }

    takeHit(){}
}