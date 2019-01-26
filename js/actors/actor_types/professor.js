class Professor extends Actor
{
    constructor(stage, x, y, key, faceDirection)
    {
        super(stage, x, y, key, faceDirection);
        this.ACTOR_TYPE = "professor";
        
        this.sprite.setScale(.7, .7);
        
        this.setAsObstacle(false);
        this.collidable = false;

        this.activated = false;
        this.textObject = null;
        this.hovered = false;
    }

    action()
    {
        if (this.hovered)
        {
            this.sprite.setAlpha(1);
        }
        else
        {
            this.sprite.setAlpha(.5);
        }
        this.hovered = false;
    }

    enemyCollision(other)
    {
        if (other.ACTOR_TYPE === "player")
        {
            if (!this.activated)
            {
                this.showText();
                this.activated = true;
            }
            this.hovered = true;
        }
    }

    showText()
    {
        const msg = Messager.getMessage();
        this.textObject = this.add(this.scene.add.text(msg.x, msg.y, msg.text, { fontFamily: 'Arial', fontSize: 24, color: "#ffffff"}));
    }

    reset(x, y, faceDirection, team)
    {
        super.reset(x, y, faceDirection);
        this.activated = false;
        this.textObject = null;
    }

    die()
    {
        super.die();
        if (this.textObject)
        {
            this.textObject.destroy();
            this.textObject = null;
        }
    }
}

ACTOR_TYPES.nate = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "nate", faceDirection, team);
        this.ACTOR_TYPE = "nate";
    }
}

ACTOR_TYPES.john = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "john", faceDirection, team);
        this.ACTOR_TYPE = "john";
    }
}

ACTOR_TYPES.toby = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "toby", faceDirection, team);
        this.ACTOR_TYPE = "toby";
    }
}

ACTOR_TYPES.paul = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "paul", faceDirection, team);
        this.ACTOR_TYPE = "paul";
    }
}

ACTOR_TYPES.doug = class extends Professor
{
    constructor(stage, x, y, faceDirection, team)
    {
        super(stage, x, y, "doug", faceDirection, team);
        this.ACTOR_TYPE = "doug";
    }
}