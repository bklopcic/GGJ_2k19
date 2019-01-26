ACTOR_TYPES.testdot = class extends Actor 
{
    constructor(stage, x, y)
    {
        super(stage, x, y, "dot");

        this.ACTOR_TYPE = "testdot";
        this.body.immovable = true;
        this.setAsObstacle(false);
    }
}