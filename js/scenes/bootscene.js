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
        this.load.image('metal', 'assets/img/resources/metal.png');
        this.load.image('silicon', 'assets/img/resources/silicon.png');
        this.load.image('polymer', 'assets/img/resources/polymer.png');
        this.load.image('carbon', 'assets/img/resources/carbon.png');
        this.load.image('aether', 'assets/img/resources/aether.png');
        
        //Plants and rocks
        this.load.image('f1', 'assets/img/terrain/f1.png');
        this.load.image('f16', 'assets/img/terrain/f16.png');
        this.load.image('f2', 'assets/img/terrain/f2.png');
        this.load.image('f3', 'assets/img/terrain/f3.png');
        this.load.image('i1', 'assets/img/terrain/i1.png');
        this.load.image('i10', 'assets/img/terrain/i10.png');
        this.load.image('i22', 'assets/img/terrain/i22.png');
        this.load.image('i23', 'assets/img/terrain/i23.png');
        this.load.image('i24', 'assets/img/terrain/i24.png');
        this.load.image('i25', 'assets/img/terrain/i25.png');
        this.load.image('i26', 'assets/img/terrain/i26.png');
        this.load.image('i27', 'assets/img/terrain/i27.png');
        this.load.image('i28', 'assets/img/terrain/i28.png');
        this.load.image('i29', 'assets/img/terrain/i29.png');
        this.load.image('i30', 'assets/img/terrain/i30.png');
        this.load.image('i36', 'assets/img/terrain/i36.png');
        this.load.image('i37', 'assets/img/terrain/i37.png');
        this.load.image('i38', 'assets/img/terrain/i38.png');
        this.load.image('i4', 'assets/img/terrain/i4.png');
        this.load.image('i7', 'assets/img/terrain/i7.png');
        this.load.image('r11', 'assets/img/terrain/r11.png');
        this.load.image('r23', 'assets/img/terrain/r23.png');
        this.load.image('r28', 'assets/img/terrain/r28.png');
        this.load.image('r41', 'assets/img/terrain/r41.png');
        this.load.image('r42', 'assets/img/terrain/r42.png');
        this.load.image('r43', 'assets/img/terrain/r43.png');
        this.load.image('r44', 'assets/img/terrain/r44.png');
        this.load.image('r45', 'assets/img/terrain/r45.png');
        this.load.image('r46', 'assets/img/terrain/r46.png');
        this.load.image('r47', 'assets/img/terrain/r47.png');
        this.load.image('r48', 'assets/img/terrain/r48.png');
        this.load.image('r49', 'assets/img/terrain/r49.png');
        this.load.image('r5', 'assets/img/terrain/r5.png');
        this.load.image('r51', 'assets/img/terrain/r51.png');
        this.load.image('r52', 'assets/img/terrain/r52.png');
        this.load.image('r53', 'assets/img/terrain/r53.png');
        this.load.image('r54', 'assets/img/terrain/r54.png');
        this.load.image('r55', 'assets/img/terrain/r55.png');
        this.load.image('r56', 'assets/img/terrain/r56.png');
        this.load.image('r57', 'assets/img/terrain/r57.png');
        this.load.image('r58', 'assets/img/terrain/r58.png');
        this.load.image('r59', 'assets/img/terrain/r59.png');
        this.load.image('r6', 'assets/img/terrain/r6.png');
        this.load.image('r60', 'assets/img/terrain/r60.png');
        this.load.image('r61', 'assets/img/terrain/r61.png');
        this.load.image('t1', 'assets/img/terrain/t1.png');
        this.load.image('t17', 'assets/img/terrain/t17.png');
        this.load.image('t2', 'assets/img/terrain/t2.png');
        this.load.image('t3', 'assets/img/terrain/t3.png');

        this.load.image('tile0', 'assets/img/greentile1.png');
        this.load.image('tile1', 'assets/img/greentile2.png');
        this.load.image('tilesheet', 'assets/img/tilemap.png');
        this.load.image('wall', 'assets/img/light_wall.png');
        this.load.image('dark-wall', 'assets/img/dark_wall.png');
        this.load.image('bullet', 'assets/img/bullet.png');
        this.load.image('laser', 'assets/img/laser.png');
        this.load.image('move-target', 'assets/img/movetarget.png');
        this.load.image('interaction-panel', 'assets/img/interactionpanel.png');
        this.load.image('cube', 'assets/img/cube.png');
        this.load.image('ship', 'assets/img/ship_bg.png');
        this.load.image('door', 'assets/img/ship_left_door_open.png');
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
        this.load.spritesheet('space-dude', 'assets/img/sprite_sheet_reference.png', {frameWidth: 64, frameHeight: 64, frameCount: 36});

        this.load.json('resource-config-data', 'data/actor_configs/resource.json');
    }

    create()
    {
        this.scene.start(this.nextSceneKey);
    }
}