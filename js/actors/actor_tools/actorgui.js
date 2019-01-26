class ActorGUI
{
    /**
     * 
     * @param {Actor} actor the actor that this ui belongs to
     */
    constructor(actor)
    {
        this.actor = actor;
        this.scene = this.actor.scene;

        this.graphics = this.scene.add.graphics();
        this.actor.add(this.graphics);
        this.theme = ACTOR_UI_THEMES.default;
        this.updateHealthBar();
    }

    updateHealthBar()
    {
        this.graphics.clear();
        this.graphics.fillStyle(this.theme.healthBarColor, this.theme.healthBarOpacity);
        this.graphics.fillRect(-this.actor.sprite.width/2, -this.actor.sprite.height/2 -15, 100 * (this.actor.hp/this.actor.maxHp), this.theme.healthBarWeight);
    }

    setTheme(themeName, styleObj)
    {
        if (typeof themeName == "string" && ACTOR_UI_THEMES.hasOwnProperty(themeName))
        {
            this.theme = ACTOR_UI_THEMES[themeName];
        }
        else if (styleObj && typeof styleObj == "object")
        {
            ACTOR_UI_THEMES[themeName] = new ActorUITheme(styleObj);
        }
        this.updateHealthBar();
    }
}

var ACTOR_UI_THEMES = {
    default: new ActorUITheme(),
    player: new ActorUITheme(
    {
        healthBarColor: 0x00ff00,
        healthBarOpacity: .9
    }),
    enemy: new ActorUITheme(
    {
        healthBarColor: 0xff0000,
        healthBarOpacity: .9
    })
}