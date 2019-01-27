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
        super(stage, x, y, "space-dude", direction);
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
        //NOTE: the .4 is to account for the scale resizing. This should be eliminated when a regular texture is implemented for this actor
        this.body.setSize(this.sprite.width/4, this.sprite.height/4);
        this.body.setOffset(-22, -5);

        //this.addGUI();
        this.inventory = new Inventory();

        this.scene.anims.create({
            key: 'player-north-walk',
            frames: this.scene.anims.generateFrameNumbers("space-dude", { start: 1, end: 8 }),
            frameRate: 24,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'player-west-walk',
            frames: this.scene.anims.generateFrameNumbers("space-dude", { start: 9, end: 17 }),
            frameRate: 24,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'player-south-walk',
            frames: this.scene.anims.generateFrameNumbers("space-dude", { start: 18, end: 26 }),
            frameRate: 24,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'player-east-walk',
            frames: this.scene.anims.generateFrameNumbers("space-dude", { start: 27, end: 36 }),
            frameRate: 24,
            repeat: -1
        });
        this.animKeys = {
            1: "player-west-walk",
            3: "player-north-walk",
            5: "player-east-walk",
            7: "player-south-walk"
        }
        this.faceFrames = {1: 9, 3: 1, 5: 27, 7: 18};
    }

    takeHit(){}
}