class resource extends Actor
{
    constructor(stage, x, y, key, faceDirection)
    {
        super(stage, x, y, key, faceDirection);

        this.collidable = true;
        this.targetable = false;
        this.interactable = true;
        this.setAsObstacle(true);
        
        this.maxHp = 14;
        this.hp = this.maxHp;
        
        this.body.immovable = true;
        this.body.setSize(this.sprite.width, this.sprite.height/2);
        this.body.setOffset(-this.sprite.width/2, 0);

        this.ACTOR_TYPE = "resource";
        this.resource = "stone";
        //this.addGUI();
    }

    postCollision()
    {
        if (this.hp <= 0)
        {
            this.spawnResources();
            this.die();
        }
    }

    spawnResources(num)
    {
        num = num || UtilFunctions.genRandInt(1, 4); //variable reward
        for (let i = 0; i < num; i++)
        {
            const randX = this.x + UtilFunctions.genRandInt(-this.body.width/2, this.body.width/2);
            const randY = this.y + UtilFunctions.genRandInt(-this.body.height/2, this.body.height/2);
            this.stage.spawn.spawnActor(this.resource, randX, randY, Direction.WEST, this.teamTag);
        }
    }
}

ACTOR_TYPES.treeresource = class extends resource
{
    constructor(stage, x, y, faceDirection)
    {
        super(stage, x, y, "tree", faceDirection);
        this.ACTOR_TYPE = "treeresource";

        this.body.setCircle(15 , -14, -15);
        this.sprite.y -= this.sprite.height * .33;
        this.resource = "log";
    }
}

ACTOR_TYPES.stoneresource = class extends resource
{
    constructor(stage, x, y, faceDirection)
    {
        super(stage, x, y, "rockpile", faceDirection);
        this.ACTOR_TYPE = "stoneresource";
        this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
        this.sprite.y -= 36;
        this.resource = "stone";
    }
}

ACTOR_TYPES.f1resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "f1", faceDirection);
this.ACTOR_TYPE = "f1resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "carbon";
}
}

ACTOR_TYPES.f16resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "f16", faceDirection);
this.ACTOR_TYPE = "f16resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "aether";
}
}

ACTOR_TYPES.f2resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "f2", faceDirection);
this.ACTOR_TYPE = "f2resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "carbon";
}
}

ACTOR_TYPES.f3resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "f3", faceDirection);
this.ACTOR_TYPE = "f3resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "carbon";
}
}

ACTOR_TYPES.i1resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i1", faceDirection);
this.ACTOR_TYPE = "i1resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i10resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i10", faceDirection);
this.ACTOR_TYPE = "i10resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i22resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i22", faceDirection);
this.ACTOR_TYPE = "i22resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i23resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i23", faceDirection);
this.ACTOR_TYPE = "i23resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i24resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i24", faceDirection);
this.ACTOR_TYPE = "i24resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i25resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i25", faceDirection);
this.ACTOR_TYPE = "i25resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i26resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i26", faceDirection);
this.ACTOR_TYPE = "i26resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i27resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i27", faceDirection);
this.ACTOR_TYPE = "i27resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i28resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i28", faceDirection);
this.ACTOR_TYPE = "i28resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i29resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i29", faceDirection);
this.ACTOR_TYPE = "i29resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i30resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i30", faceDirection);
this.ACTOR_TYPE = "i30resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i36resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i36", faceDirection);
this.ACTOR_TYPE = "i36resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i37resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i37", faceDirection);
this.ACTOR_TYPE = "i37resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i38resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i38", faceDirection);
this.ACTOR_TYPE = "i38resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i4resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i4", faceDirection);
this.ACTOR_TYPE = "i4resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.i7resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "i7", faceDirection);
this.ACTOR_TYPE = "i7resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "polymer";
}
}

ACTOR_TYPES.r11resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r11", faceDirection);
this.ACTOR_TYPE = "r11resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r23resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r23", faceDirection);
this.ACTOR_TYPE = "r23resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r28resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r28", faceDirection);
this.ACTOR_TYPE = "r28resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r41resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r41", faceDirection);
this.ACTOR_TYPE = "r41resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r42resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r42", faceDirection);
this.ACTOR_TYPE = "r42resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r43resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r43", faceDirection);
this.ACTOR_TYPE = "r43resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r44resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r44", faceDirection);
this.ACTOR_TYPE = "r44resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r45resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r45", faceDirection);
this.ACTOR_TYPE = "r45resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r46resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r46", faceDirection);
this.ACTOR_TYPE = "r46resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r47resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r47", faceDirection);
this.ACTOR_TYPE = "r47resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r48resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r48", faceDirection);
this.ACTOR_TYPE = "r48resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r49resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r49", faceDirection);
this.ACTOR_TYPE = "r49resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r5resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r5", faceDirection);
this.ACTOR_TYPE = "r5resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r51resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r51", faceDirection);
this.ACTOR_TYPE = "r51resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r52resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r52", faceDirection);
this.ACTOR_TYPE = "r52resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r53resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r53", faceDirection);
this.ACTOR_TYPE = "r53resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r54resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r54", faceDirection);
this.ACTOR_TYPE = "r54resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r55resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r55", faceDirection);
this.ACTOR_TYPE = "r55resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r56resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r56", faceDirection);
this.ACTOR_TYPE = "r56resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r57resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r57", faceDirection);
this.ACTOR_TYPE = "r57resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r58resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r58", faceDirection);
this.ACTOR_TYPE = "r58resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.r59resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r59", faceDirection);
this.ACTOR_TYPE = "r59resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r6resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r6", faceDirection);
this.ACTOR_TYPE = "r6resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r60resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r60", faceDirection);
this.ACTOR_TYPE = "r60resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "metal";
}
}

ACTOR_TYPES.r61resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "r61", faceDirection);
this.ACTOR_TYPE = "r61resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "silicon";
}
}

ACTOR_TYPES.t1resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "t1", faceDirection);
this.ACTOR_TYPE = "t1resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "aether";
}
}

ACTOR_TYPES.t17resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "t17", faceDirection);
this.ACTOR_TYPE = "t17resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "carbon";
}
}

ACTOR_TYPES.t2resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "t2", faceDirection);
this.ACTOR_TYPE = "t2resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "aether";
}
}

ACTOR_TYPES.t3resource = class extends resource
{
constructor(stage, x, y, faceDirection)
{
super(stage, x, y, "t3", faceDirection);
this.ACTOR_TYPE = "t3resource";
this.body.setOffset(-this.sprite.width/2, -this.sprite.height/4.2);
this.sprite.y -= 36;
this.resource = "aether";
}
}