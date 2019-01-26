/**
    This class overrides a Spider actor's internal update logic and connects it instead to user input
    
    @param actor Actor to be controlled by this controller
*/
class PlayerController 
{
    constructor(actor)
    {
        this.actor = actor;
        this.scene = this.actor.scene;
        this.targeter = new TargetingSystem(this.actor.stage, new Phaser.Geom.Point(this.actor.x, this.actor.y), this.actor.teamTag);
        this.mover = new PathMover(this.actor);
        
        this.maxHp = this.actor.maxHp;
        
        this.actor.overridden = true;

        this.shiftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.standMode = false;

        this.targetAngle = null;

        this.scene.input.on('pointerdown', this.handleClick, this);
        this.scene.input.on('pointermove', this.handleMouseMove, this);
        
        this.faceFrames = {1: 28, 2: 182, 3: 209, 4: 59, 5: 88, 6: 117, 7: 139, 8: 160};
    }

    /**
        Handles gathering user input and calling the appropriate methods within the spider
    */
    update() 
    {
        if (!this.actor || !this.actor.active)
        {
            return;
        }
        this.mover.update();

        //this.actor.updatePosition();
        this.targeter.updatePosition(new Phaser.Geom.Point(this.actor.x, this.actor.y));
        
        if (this.shiftKey.isDown)
        {
            this.standMode = true;
        }
        else
        {
            this.standMode = false;
        }
    }

    handleClick(pointer)
    {
        const mouseX = this.actor.scene.cameras.main.scrollX + pointer.x;
        const mouseY = this.actor.scene.cameras.main.scrollY + pointer.y;
        if (pointer.leftButtonDown())
        {
            if (this.standMode)
            {
                this.fire(mouseX, mouseY);
            }
            else
            {
                this.moveTo(mouseX, mouseY);
            }
        }
        else if (pointer.rightButtonDown())
        {
            //build
        }
    }

    handleMouseMove(pointer)
    {
        if (this.standMode)
        {
            const mouseX = this.actor.scene.cameras.main.scrollX + pointer.x;
            const mouseY = this.actor.scene.cameras.main.scrollY + pointer.y;
            this.targeter.setTarget(new Phaser.Geom.Point(mouseX, mouseY));
            this.actor.faceDirection = this.targeter.getDirectionToTarget();
            this.actor.sprite.setFrame(this.faceFrames[this.actor.faceDirection]);
        }
    }

    moveTo(x, y)
    {
        this.targeter.setTarget(new Phaser.Geom.Point(x, y));
        this.actor.faceDirection = this.targeter.getDirectionToTarget();
        this.mover.moveTo(x, y);    
    }

    build()
    {
        const stage = this.actor.stage;
        let targetCoord = stage.getCoordByPixels(this.actor.x, this.actor.y).getNeighbor(this.actor.faceDirection);
        if (stage.checkIfEmpty(targetCoord))
        {
            const targetTile = stage.getTileAt(targetCoord);
            let x = targetTile.x + stage.data.tileWidth/2;
            let y = targetTile.y + stage.data.tileHeight/2;
            stage.spawn.spawnActor(this.buildings[this.selectedBuilding], x, y, this.actor.faceDirection, this.actor.teamTag);
        }
    }

    attack()
    {
        const stage = this.actor.stage;
        let targetCoord = stage.getCoordByPixels(this.actor.x, this.actor.y).getNeighbor(this.actor.faceDirection);
        let targetTile = stage.getTileAt(targetCoord);
        let x = targetTile.x + stage.data.tileWidth/2;
        let y = targetTile.y + stage.data.tileHeight/2;
        const attack = stage.spawn.spawnActor("playerattack", x, y, this.actor.faceDirection, this.actor.teamTag);
        attack.attackDamage = this.actor.attackDamage;
    }

    fire(x, y)
    {
        this.targetAngle = Phaser.Math.Angle.Between(this.actor.x, this.actor.y, x, y);
        this.spawnLaser();
        this.actor.scene.time.addEvent({ delay: 200, callback: this.spawnLaser, callbackScope: this, repeat: 2 });
    }
    
    spawnLaser()
    {
        const stage = this.actor.stage;
        const laser = stage.spawnActor("playerattack", this.actor.x, this.actor.y, Direction.WEST, this.actor.team);
        laser.chunkable = false;
        const targetDistance = 200;
        const targetX = this.actor.x + targetDistance * Math.cos(this.targetAngle);
        const targetY = this.actor.y + targetDistance * Math.sin(this.targetAngle);
        this.actor.scene.physics.moveToObject(laser, new Phaser.Geom.Point(targetX, targetY), 100);
        laser.setAngle(UtilFunctions.radiansToDegrees(this.targetAngle)+90);
    }
}