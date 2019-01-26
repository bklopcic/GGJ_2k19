/**
    This is an extnesion of the actor class that will fire bullets at a fixed interval in a set direction
    
    @param stage Stage that hisTurret belongs to
    @param x the horizontal position of this turret
    @param y the vertical position of this turret
    @param direction Direction property the facing (and firing) direction of this turret (optional. Default to west)
*/
ACTOR_TYPES.turret = class extends Actor
{
    constructor(stage, x, y, direction, key) 
    {
        direction = direction || Direction.WEST;
        key = key || "crossbow";
        super(stage, x, y, key, direction);

        this.ACTOR_TYPE = "turret";

        this.faceFrames = [7, 15, 23, 31, 39, 47, 55, 63];
                
        this.targetable = true;
        this.collidable = true;
        this.isObstacle = true;
        this.body.immovable = true;

        this.body.setCircle(30, -30, -25);
        
        this.maxHp = 7;
        this.hp = this.maxHp;
        this.fireRate = 3000;
        this.bulletSpeed = 250;
        this.attackDamage = 2;
        this.canFire = false;

        this.addGUI();
        this.updateFrame();
    }

    reset(x, y, faceDirection)
    {
        super.reset(x, y, faceDirection);

        this.canFire = false;

        this.setFireEvent();
        this.updateFrame();
    }

    /**
        Handles updating this turret 
    */
    action()
    {
        if (this.canFire)
        {
            this.canFire = false;
            this.setFireEvent();            
            const modifyerX = Direction.modifyer[this.faceDirection].x;
            const modifyerY = Direction.modifyer[this.faceDirection].y;
            
            //standard turret calculates its target as two tiles in front of it in its facing direction
            const target = new Phaser.Geom.Point(this.x +((this.sprite.width*2) * modifyerX), this.y+((this.sprite.height*2) * modifyerY));
            
            this.fire(target);        
        }
    }

    setFireEvent()
    {
        this.scene.time.addEvent({delay: this.fireRate, callback: function(){if (this.active){this.canFire = true;}}, callbackScope: this});
    }

    /**
        Handles firing. The position that the bullet will be fired from is the tile adjascent to
        the Turret in the direction its facing
        
        @param target Phaser.Point (or any object with x and y properties) to fire the bullet at
    */
    fire(target)
    {
        if (!target)
        {
            return;
        }
        const bullet = this.stage.spawnActor("bullet", 0, 0, this.faceDirection, this.teamTag);
        bullet.chunkable = false;
        const modifyerX = Direction.modifyer[this.faceDirection].x;
        const modifyerY = Direction.modifyer[this.faceDirection].y;
        bullet.setPosition(this.x +(((this.sprite.width/2)+(bullet.sprite.width/2)) * modifyerX), this.y+(((this.sprite.height/2)+(bullet.sprite.height/2)) * modifyerY));
        bullet.attackDamage = this.attackDamage;
        this.scene.physics.moveToObject(bullet, target, this.bulletSpeed);
    }

    updateFrame()
    {
        //this should be taken care of by parent class
        this.sprite.setFrame(this.faceFrames[this.faceDirection -1]);
    }
}