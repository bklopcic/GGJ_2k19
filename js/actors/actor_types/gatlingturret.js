ACTOR_TYPES.gatlingturret = class extends ACTOR_TYPES.targetingturret
{
    
    constructor(stage, x, y, direction, key)
    {
        direction = direction || Direction.WEST;
        key = key || "gatling-crossbow";
        super(stage, x, y, direction, key);
        this.ACTOR_TYPE = "gatlingturret";
        
        this.fireRate = 400;
        this.range = 300;
        
        this.maxHp = 10;
        this.hp = this.maxHp;
        
        this.targeter.range = this.range;
    }
}