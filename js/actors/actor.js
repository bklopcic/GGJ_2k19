/**
    This class is the parent class for all interactive objects that exist in a combat stage.
    The Actor class extends the Phaser.Sprite class, which means that any operations defined
    in this or a child class's update method will be called internall by Phaser during the update step. 
    
*/
class Actor extends Phaser.GameObjects.Container
{
    /**
        @param {Stage} stage Stage that this Actor belongs to
        @param {StageCoord} coord StageCoord of the starting position of this Actor
        @param {string} key string name of image (or spritesheet) that this actor will use as its body
        @param {Direction.prop} direction Direction property representing the direction this Actor starts off facing (optional. Defaults to west)
        @param {bool} isObstacle whether this Actor should report its position to the grid (optional, defaults to true)
    */
    constructor(stage, x, y, key, direction)
    {            
        super(stage.scene, x, y); //call parent constructor in our own context
        this.sprite = this.scene.add.sprite(0, 0, key); //we place the sprite at 0, 0 because it is relative to the container's position
        this.add(this.sprite);
        this.stage = stage;
        this.faceDirection = direction || Direction.WEST;

        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        //child classes are responsible for appropriately resizing and repositioning their hitbox
        //NOTE: can also set body to be a circle using: this.body.setCircle()
        this.body.setSize(this.sprite.width, this.sprite.height);
        this.body.setOffset(-this.sprite.width/2, -this.sprite.height/2);

        //whether this actor should be tracked on the data grod. Actors marked as obstacles
        //will be factored in when other actors are pathfinding. Obstacle actors cannot be the
        //direct target of a pathfind, nor can they pathfind. If an obstacle actor wishes to move
        //it must first call stage.leaveTile() and then updatePosition() once it is done moving
        //USE setAsObstacle(trueOrFalse) TO CHANGE OBSTACLE STATUS OF ACTOR
        this.isObstacle = false;

        //whether or not collision physics should effect this actor when it overlaps another actor
        //collision will only occur if both actors have collideable set to true
        //if neither object is collideable then collision callbacks will not occur
        this.collidable = false;

        //whether this actor should be saved when it is in an unloading chunk. By default,
        //this property will be rest back to true when an actor is reset. If an actor subclass
        //is to always be non-chunkable, the reset method must be overridden
        this.chunkable = true;

        this.interactable = false;
        
        this.teamTag = "-1";
        //whether this actor can be targeted by other actors
        this.targetable = false;
        this.maxHp = 1;
        this.hp = this.maxHp;
        this.attackDamage = 0;

        //props that can be assigned in child classes
        this.gui = null;
        this.targeter = null;
        this.inventory = null;
        
        //Setting this property to true will cause the actor to skip its "action()" call during update
        //Use when connecting actor to external controller
        this.overridden = false;
    }

    /**
    *   Returns an object literal containing the essential properties the stage needs to know in order to
    *   make a copt of this object. Mainly for outputting to JSON. This makes it easier for children to
    *   append properties when overriding Actor.toString.
    */
    get dataLiteral()
    {
        const data = {};
        data.type = this.ACTOR_TYPE;
        data.x = this.x;
        data.y = this.y;
        data.faceDirection = this.faceDirection;
        data.team = this.teamTag;
        return data;
    }

    get stagePosition()
    {
        return this.stage.getCoordByPixels(this.x, this.y);
    }

    /**
    * Updates this Actor's properties to reflect it's current coordinate on the stage.
    * NOTE: stage.leaveTile must be called BEFORE and an actor marked as an obstacle moves
    */
    updatePosition() 
    {     
        if (this.isObstacle)
        {
            this.stage.enterTile(this.stagePosition);
        }   
    }

    /**
     * Set up this actor to be an obstacle
     * @param {bool} mode whether this actor is no an obstacle or not
     */
    setAsObstacle(mode)
    {
        if (mode && !this.isObstacle)
        {
            this.stage.enterTile(this.stagePosition);
        }
        else if (!mode && this.isObstacle)
        {
            this.stage.leaveTile(this.stagePosition);
        }
        this.isObstacle = mode;
    }

    /**
        <private> Performs a root level checks for the actor. Calls action() on child classes if defined and actor can update
    */
    update() 
    {
        this.depth = this.body.y;
        if (this.overridden)
        {
            return;
        }
        this.action();
    }

    /**
     * This method should be overriden by child class to process their own internal logic.
     * action will be called automatically by the parent class if actor is currently able to 
     * take its own actions.
     */
    action(){}

    /**
        Handles setting this actor's team
    */
    setTeam(name) 
    {
        this.teamTag = name;
        if (this.gui)
        {
            this.gui.setTheme(this.teamTag);
        }
    }

    /**
        Handles damaging this Actor
        
        @param damage number the amount of this Actor's hp to subtract
    */
    takeHit(damage) 
    {
        this.hp -= damage;
        if (this.gui)
        {
            this.gui.updateHealthBar();
        }
    }

    /**
    * adds to this actor's hp. Hp will not exceed max
    * 
    * @param {number} amt amount of hp to add to this actor
    */
    heal(amt)
    {
        this.hp += amt;
        if (this.hp > this.maxHp)
        {
            this.hp = this.maxHp;
        }
        if (this.gui)
        {
            this.gui.updateHealthBar();
        }
    }

    /**
    *   Handles collisions between this Actor and other Actors on a different team
    * 
    *   NOTE: this method is called on both Actors  
    *   @param {Actor} other Actor that this Actor collided with
    */
    enemyCollision(other) {}

    /**
    *   Handles collisions between this Actor and other Actors on the same team
    *   
    *   NOTE: this method is called on both Actors  
    *   @param {Actor} other Actor that this Actor collided with
    */
    friendlyCollision(other) {}

    /**
    * This method is called after the collision handler has been called on both actors.
    * This is where Actors should run any necessary operations on themselves for collision.
    */
    postCollision()
    {
        if (this.hp <= 0)
        {
            this.die();
        }
    }

    collidBounds(){}

    /**
        Handles destroying this object.
        NOTE: This eliminates all internal references to this Actor, but in order for the physical object to be
        garbage collected all external references will need to be nullified as well
    */
    die() 
    {
        if (this.active)
        {
            if (this.isObstacle)
            {
                this.stage.leaveTile(this.stagePosition);
            }
            this.setActive(false);
            this.setVisible(false);
            this.body.enable = false; 
        }
    }

    /**
    * 
    * @param {int} x position to place this actor
    * @param {int} y position to place this actor
    * @param {Direction} faceDirection faceDirection of this actor (optional)
    */
    reset(x, y, faceDirection)
    {
        this.setPosition(x, y);
        this.updatePosition();
        this.faceDirection = faceDirection || Direction.WEST;
        this.hp = this.maxHp;
        this.chunkable = true;
        if(this.gui)
        {
            this.gui.updateHealthBar();
        }
        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;
    }

    addGUI()
    {
        this.gui = new ActorGUI(this);
    }

    toString() 
    {
        return JSON.stringify(this.dataLiteral);
    }
}