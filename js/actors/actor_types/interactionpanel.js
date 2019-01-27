ACTOR_TYPES.interactionpanel = class extends Actor
{
    constructor(stage, x, y, faceDirection)
    {
        super(stage, x, y, "interaction-panel", faceDirection);
        this.ACTOR_TYPE = "interactionpanel";
                
        this.setAsObstacle(false);
        this.collidable = false;

        this.textObject = null;
        this.hovered = false;

        this.body.setSize(100, 80);
        this.body.setOffset(-50, -40);
        this.sprite.y -= this.sprite.height/2;
        this.sprite.x += this.sprite.width/2;
        
        this.options = [];
        this.diegetics = [];
        this.hideElements();
    }

    action()
    {
        if (this.hovered)
        {
            this.showElements();
        }
        else
        {
            this.hideElements();
        }
        this.hovered = false;
    }

    friendlyCollision(other)
    {
        if (other.ACTOR_TYPE == "player")
        {
            this.hovered = true;
        }
    }

    addOption(key, callback, context)
    {
        const btn = this.scene.add.image(0, 0, key);
        btn.x = this.sprite.x;
        btn.y = (this.sprite.y - this.sprite.height/2 )+ (this.options.length * 30) + btn.height/2 + 8;
        this.add(btn);
        this.options.push(btn);
        btn.setInteractive({
            useHandCursor: true
        });
        btn.on("pointerdown", function(p, x, y, e){
            e.stopPropagation();
            callback.call(context)
        });
    }

    addDiegetic(x, y, key)
    {
        const sprite = this.scene.add.sprite(0, 0, key);
        this.add(sprite);
        sprite.x = x - this.x;
        sprite.y = y - this.y;
        this.diegetics.push(sprite);
        this.sendToBack(sprite);
        return sprite;
    }

    hideElements()
    {
        this.sprite.setAlpha(0);
        for (let o of this.options)
        {
            o.setAlpha(0);
        }
    }

    showElements()
    {
        this.sprite.setAlpha(.9);
        for (let o of this.options)
        {
            o.setAlpha(.9);
        }
    }

    reset(x, y, faceDirection)
    {
        super.reset(x, y, faceDirection);

        for (let d of this.diegetics)
        {
            d.destroy();
        }
        for (let o of this.options)
        {
            o.destroy();
        }
        this.diegetics = [];
        this.options = [];
    }
}