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
        this.mover = new PointDirectionMover(this.actor); //new PathMover(this.actor);
        
        this.maxHp = this.actor.maxHp;
        
        this.actor.overridden = true;

        this.shiftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        this.standMode = false;
        this.targetAngle = null;
        this.targetActor = null;

        this.scene.input.on('pointerdown', this.handleClick, this);
        this.scene.input.on('pointermove', this.handleMouseMove, this);
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
        
        if (this.shiftKey.isDown)
        {
            this.standMode = true;
            this.mover.cancelPath();
            this.actor.body.setVelocity(0, 0);
            this.actor.sprite.setFrame(this.actor.faceFrames[this.actor.faceDirection]);
        }
        else
        {
            this.standMode = false;
        }

        if(!this.mover.pathInProgress && !this.standMode)
        {
            this.actor.sprite.setFrame(this.actor.faceFrames[this.actor.faceDirection]);
            if (this.selectedActor != null)
            {
                this.arriveAtSelectedActor();
            }
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
                this.selectedActor = this.checkActorClick(mouseX, mouseY);
                if (this.selectedActor != null)
                {
                    const distanceToTarget = Phaser.Math.Distance.Between(this.actor.x, this.actor.y, this.selectedActor.x, this.selectedActor.y);
                    this.actor.faceDirection = UtilFunctions.get4WayDirectionToObject(this.actor, this.selectedActor);
                    if (distanceToTarget <= this.actor.range)
                    {
                        this.arriveAtSelectedActor();
                    }
                    else
                    {
                        this.mover.moveToNeighborOf(mouseX, mouseY);
                        this.actor.stage.spawnActor("movetarget", this.mover.target.x + this.mover.target.width/2, this.mover.target.y + this.mover.target.width/2, this.actor.teamTag);
                        this.actor.sprite.play(this.actor.animKeys[this.actor.faceDirection]);
                    }
                }
                else
                {
                    this.moveTo(mouseX, mouseY);
                }
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
            this.actor.faceDirection = UtilFunctions.get4WayDirectionToObject(this.actor, {x: mouseX, y: mouseY});
            this.actor.sprite.setFrame(this.actor.faceFrames[this.actor.faceDirection]);
        }
    }

    moveTo(x, y)
    {
        this.mover.moveTo(x, y);
        const target = new Phaser.Geom.Point(this.mover.target.x + this.mover.target.width/2, this.mover.target.y + this.mover.target.height/2);
        this.actor.faceDirection = UtilFunctions.get4WayDirectionToObject(this.actor, target)
        this.actor.sprite.play(this.actor.animKeys[this.actor.faceDirection]);
        this.actor.stage.spawnActor("movetarget", target.x, target.y, this.actor.teamTag);
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

    fire(x, y)
    {
        this.targetAngle = Phaser.Math.Angle.Between(this.actor.x, this.actor.y, x, y);
        this.spawnLaser();
        this.actor.scene.time.addEvent({ delay: 200, callback: this.spawnLaser, callbackScope: this, repeat: 2 });
    }
    
    spawnLaser()
    {
        const stage = this.actor.stage;
        const offset = 30;
        let spawnX = this.actor.x + (Direction.modifyer[this.actor.faceDirection].x * offset);
        let spawnY = this.actor.y + (Direction.modifyer[this.actor.faceDirection].y * offset);
        if (this.actor.faceDirection == Direction.WEST || this.actor.faceDirection == Direction.EAST)
        {
            spawnY += 20;
        }
        const laser = stage.spawnActor("playerattack", spawnX, spawnY, Direction.WEST, this.actor.teamTag);
        laser.chunkable = false;
        const targetDistance = 200;
        const targetX = this.actor.x + targetDistance * Math.cos(this.targetAngle);
        const targetY = this.actor.y + targetDistance * Math.sin(this.targetAngle);
        this.actor.scene.physics.moveToObject(laser, new Phaser.Geom.Point(targetX, targetY), 100);
        laser.setAngle(UtilFunctions.radiansToDegrees(this.targetAngle)+90);
    }

    checkActorClick(x, y)
    {
        const stage = this.actor.stage;
        for (let a of stage.allActors)
        {
            if (a.active && a.interactable && a.body.hitTest(x, y))
            {
                return a;
            }
        }
        return null;
    }

    arriveAtSelectedActor()
    {
        if (this.selectedActor.teamTag != this.actor.teamTag)
        {
            this.fire(this.selectedActor.x, this.selectedActor.y);        
        }
        this.selectedActor = null;
    }
}