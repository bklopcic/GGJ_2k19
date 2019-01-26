/**
    Be nice... he's a very useful Actor
    
    @param stage Stage that this Wall exists on
    @param coord StageCoord the position on the Stage of this Wall
*/
ACTOR_TYPES.wall = class extends Actor
{
    constructor(stage, x, y, faceDirection, key)
    {
        key = key || "wall";
        super(stage, x, y, key, faceDirection);

        this.ACTOR_TYPE = "wall";
        
        this.setAsObstacle(true);
        this.body.immovable = true; //He doesn't move

        this.body.setSize(this.sprite.width, this.sprite.height/2);
        this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4);
        this.sprite.y = -this.sprite.height/4;
        
        this.collidable = true;
        this.targetable = false; //He can't be directly targeted
    }
}