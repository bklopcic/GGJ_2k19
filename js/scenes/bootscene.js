class BootScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'boot'});

        this.nextSceneKey;
    }

    init(nextSceneKey)
    {
        this.nextSceneKey = nextSceneKey;
    }

    preload()
    {
        this.load.image('tile0', 'assets/img/greentile1.png');
        this.load.image('tile1', 'assets/img/greentile2.png');
        this.load.image('tilesheet', 'assets/img/tilemap.png');
        this.load.image('wall', 'assets/img/light_wall.png');
        this.load.image('dark-wall', 'assets/img/dark_wall.png');
        this.load.image('bullet', 'assets/img/bullet.png');
        this.load.image('blank', 'assets/img/empty.png');
        this.load.image('rockpile', 'assets/img/stone_pile.png');
        this.load.image('tree', 'assets/img/tree.png');
        this.load.image('log', 'assets/img/log.png');
        this.load.image('stoneresource', 'assets/img/stone.png');
        this.load.image('ghost', 'assets/img/ghost.png');
        this.load.image('paul', 'assets/img/pauldickson.png');
        this.load.image('doug', 'assets/img/douglasturnbull.png');
        this.load.image('nate', 'assets/img/nathanprestopnik.png');
        this.load.image('john', 'assets/img/johnbarr.png');
        this.load.image('toby', 'assets/img/tobydragon.png');
        this.load.spritesheet('crossbow', 'assets/img/crossbow_spritesheet.png', {frameWidth: 92, frameHeight: 90, frameCount:64});
        this.load.spritesheet('gear-crossbow', 'assets/img/gear_crossbow_spritesheet.png', {frameWidth: 100, frameHeight: 100, frameCount:64});
        this.load.spritesheet('gatling-crossbow', 'assets/img/gatling_crossbow_spritesheet.png', {frameWidth: 120, frameHeight: 117, frameCount:64});
        this.load.spritesheet('blue-dude', 'assets/img/blue_dude_spritesheet.png', {frameWidth: 170, frameHeight: 180, frameCount:210});
        this.load.json('data','data/seniorpresentation.json');
    }

    create()
    {
        this.scene.start(this.nextSceneKey);
    }
}