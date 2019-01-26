/**
    Actor type. This Actor does not move. This Aactor has a range, and will fire directly
    at an enemy within that range. If multiple enemies are in range, it will target the nearest one
*/
ACTOR_TYPES.targetingturret = class extends ACTOR_TYPES.turret
{
    constructor(stage, x, y, direction, key) 
    {
        direction = direction || Direction.WEST;
        key = key || "gear-crossbow";
        super(stage, x, y, direction, key);

        this.ACTOR_TYPE = "targetingturret";
            
        this.fireRate = 2000;
        this.range = 300; 
        this.targeter = new TargetingSystem(this.stage, new Phaser.Geom.Point(this.x, this.y), this.teamTag, this.range);
    }

    /**
    * Handles updating this actor
    */
    action()
    {
        if (this.targeter.checkTargetInRange())
        {
            this.updateDirection();
        }
        
        if(this.canFire)
        {  
            this.canFire = false;
            this.setFireEvent();
            
            if (this.targeter.acquireTarget() && this.targeter.checkTargetInRange())
            {
                this.updateDirection();
                this.fire(this.targeter.getTargetPosition());
            }
        }
    }

    updateDirection()
    {
        
        this.faceDirection = this.targeter.getDirectionToTarget();
        this.updateFrame();
    }

    /**
        Override parent method. Additionally handles setting the team of this TargetingTurret's members
    */
    setTeam(name)
    {
        super.setTeam(name);
        this.targeter.tag = name;
    }

    reset(x, y, direction)
    {
        super.reset(x, y, direction);
        this.targeter.updatePosition(new Phaser.Geom.Point(this.x, this.y));
    }
}