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

        this.canFire = true;
        this.standMode = false;
        this.targetAngle = null;
        this.targetActor = null;
        this.targetBuildSite = null;

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
            if (!this.standMode)
            {
                this.destroyBuildSite();
            }
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
        this.destroyBuildSite();
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
            if (this.standMode)
            {
                const location = UtilFunctions.getPointAtDistanceOnAngleToTarget(this.actor, {x: mouseX, y: mouseY}, this.actor.range/2);
                this.makeBuildMenu(location.x, location.y);
            }
            else
            {
                const target = this.makeBuildMenu(mouseX, mouseY);
                this.moveTo(target.x, target.y);
            }
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

    fire(x, y)
    {
        if (!this.canFire)
        {
            return;
        }
        this.targetAngle = Phaser.Math.Angle.Between(this.actor.x, this.actor.y, x, y);
        const repeat = 2;
        const delay = 200;
        this.actor.scene.time.addEvent({ delay: 200, callback: this.spawnLaser, callbackScope: this, repeat: 2 });
        this.spawnLaser(x, y);
        this.actor.scene.time.addEvent({ delay: ((repeat+1) * delay) + 1200, callback: function(){
            this.canFire = true;
        }, callbackScope: this});
        this.canFire = false;
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
        laser.attackDamage = this.actor.attackDamage;
        const targetDistance = 200;
        const targetX = this.actor.x + targetDistance * Math.cos(this.targetAngle);
        const targetY = this.actor.y + targetDistance * Math.sin(this.targetAngle);
        this.actor.scene.physics.moveToObject(laser, new Phaser.Geom.Point(targetX, targetY), 100);
        laser.setAngle(UtilFunctions.radiansToDegrees(this.targetAngle)+90);
        return laser;
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

    makeBuildMenu(x, y)
    {
        const target = UtilFunctions.getPointAtDistanceOnAngleToTarget({x:x,y:y}, this.actor, this.actor.range/2);
        this.targetBuildSite = this.actor.stage.spawnActor("interactionpanel", target.x, target.y, Direction.WEST, this.actor.teamTag);
        const cube = this.targetBuildSite.addDiegetic(x, y, "cube");
        cube.setScale(.3, .3);
        cube.setAlpha(.8);
        this.actor.scene.tweens.add({
            targets: cube,
            alpha: .4,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        this.targetBuildSite.addOption("log", function(){
            this.actor.stage.spawnActor("turret", x, y, this.actor.faceDirection, this.actor.teamTag);
            this.destroyBuildSite();
        }, this);
        return target;
    }

    destroyBuildSite()
    {
        if (this.targetBuildSite != null)
        {
            this.targetBuildSite.die();
            this.targetBuildSite = null;
        }
    }
}