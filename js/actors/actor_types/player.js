/**
* This Class represents the actor that the player controls.
* The Player has a target tile (the tile is can build on/interact with) that is updated based on 
* its current position and the direction it's facing   
*/
ACTOR_TYPES.player = class extends Actor
{
    /**
     @param stage the stage that this Spider belongs to
     @param coord StageCoord of the starting position of this Spider
     @param direction the starting faceDirection of this Spider (optional. Defaults to west)
     */
    constructor(stage, x, y, direction) 
    {
        direction = direction || Direction.WEST;
        super(stage, x, y, "blue-dude", direction);
        this.ACTOR_TYPE = "player";
                
        this.speed = 300;
        this.targetable = true;
        this.collidable = true;
        this.setAsObstacle(false);
            
        this.maxHp = 10;
        this.hp = this.maxHp;
        this.attackDamage = .5;
        //dictionary used to store which items this player has (keys) and how many it has (values)
        //if this gets too complex, or other actors need similar functionality can be refactored into an
        //an inventory class as an actor tool
        this.pickUpItems = {};
        this.sprite.setScale(.5,.5);
        //NOTE: the .4 is to account for the scale resizing. This should be eliminated when a regular texture is implemented for this actor
        this.body.setSize(this.sprite.width/4, this.sprite.height/4);
        this.body.setOffset(-22, -5);

        //this.addGUI();
        this.inventory = new Inventory();

        this.scene.anims.create({
            key: 'player-west-walk',
            frames: this.scene.anims.generateFrameNumbers("blue-dude", { start: 61, end: 87 }),
            frameRate: 24,
            repeat: -1
        });
        this.sprite.anims.load("player-west-walk");
    }

    takeHit(){}

    /**
        Places a new actor on the stage at this player's current target tile. The new actor is passed
        the player's current face direction as well as it's team tag
        
        @param actorType string the type of Actor to create
        @return bool whether the new Actor was successfully built
    */
    build(actorType) 
    {
        if (this.stage.checkInBounds(this.targetPosition))
        {
            if (this.stage.checkIfEmpty(this.targetPosition))
            {
                this.stage.spawn.spawnActor(actorType, this.targetBox.x, this.targetBox.y, this.faceDirection, this.teamTag);
                return true;
            }
            else
            {
                const attack = this.stage.spawn.spawnActor("playerattack", this.targetBox.x, this.targetBox.y, this.faceDirection, this.teamTag);
                attack.attackDamage = this.attackDamage;
                return true;
            }
        }
        return false
    }
}