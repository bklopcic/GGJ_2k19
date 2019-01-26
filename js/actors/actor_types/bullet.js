/**
 * projectile that can be fired
 */
ACTOR_TYPES.bullet = class extends Actor
{
    constructor(stage, x, y, direction)
    {
        super(stage, x, y, "bullet", direction);
        this.ACTOR_TYPE = "bullet";

        this.targetable = false;
        this.collidable = false;
        this.setAsObstacle(false);

        this.body.onWorldBounds = true;

    }

    enemyCollision(other)
    {
        other.takeHit(this.attackDamage);
    }

    postCollision()
    {
        this.die();
    }

    collideBounds()
    {
        this.die();
    }
}