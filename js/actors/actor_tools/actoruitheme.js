class ActorUITheme
{
    constructor(styleObj)
    {
        styleObj = styleObj || {};
        this.healthBarColor = styleObj.healthBarColor || 0xffffff;
        this.healthBarOpacity = styleObj.healthBarOpacity || 1;
        this.healthBarWeight = styleObj.healthBarWeight || 15;
    }
}