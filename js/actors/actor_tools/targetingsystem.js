/**
    This object can be used by Actors to find other actors and their positions based on given criteria. 
    
    @param position StageCoord the current position of the Actor that owns this TargetingSystem
    @param group actorGroup container containing the Actors in on the stage with the Actor that owns this TargetingSystem
    @param tag string the teamTag property of this TargetingSystem's owner
    @param range number the targeting range of this TargetingSystem's owner (optional. Defaults to 0)
    @param target Actor the actor for this Object to start out targeting.
*/
class TargetingSystem 
{
    constructor(stage, position, tag, range, target)
    {
        this.stage = stage
        this.position = position;
        this.tag = tag;
        this.range = range || 0;
        this.target = target || null;
    }

    setTarget(target)
    {
        this.target = target;
    }

    /**
        Handles obtaining a target based on the specified criteria
        TODO
        NOTE: Currently targets nearest Actor with tag different from ours
    */
    acquireTarget() 
    {
        this.target = this.findClosestEnemy();
        return this.target;
    }

    /**
        @return StagePosition of this object's current target (or null if no target)
    */
    getTargetCoord() 
    {
        if (this.target)
        {
            const pos = this.target.stagePosition;
            if (pos)
            {
                return new StageCoord(pos.x, pos.y);
            }
        }
        return null;
    }

    /**
        @return Phaser.Point of this object's current target's current position, in pixels (or null if no target)
    */
    getTargetPosition() 
    {
        if (this.target)
        {
            return new Phaser.Geom.Point(this.target.x, this.target.y);
        }
        return null;
    }

    /**
        Finds the distance between two objects (any objects that have x and y properties will work.)
        NOTE: Use Phaser.Point, Actor, or Phaser.Sprite
        
        @param obj1 Object the object to measure from
        @param obj2 Object the object to measure to
        @return number
    */
    getDistance(obj1, obj2) 
    {
        return Phaser.Math.Distance.Between(obj1.x, obj1.y, obj2.x, obj2.y);
    }

    /**
        Checks if one object is within a specified range of another
        NOTE: use Phaser.Point, Phaser.Sprite, or Actor
        
        @param obj1 Object the object to measure from
        @param obj2 Object the object to check against range
        @param range number the maximum acceptible distance between the two objects
        @return bool (true if in range, false otherwise)
    */
    checkInRange(obj1, obj2, range) 
    {
        return this.getDistance(obj1, obj2) <= range;
    }

    /**
        Checks if this object's current target is within range. Will return false
        if there is no current target
        
        @return bool (true if in range, false otherwise)
    */
    checkTargetInRange() 
    {
        if (this.target)
        {
            return this.checkInRange(this.position, this.target, this.range);
        }
        return false;
    }

    /**
        @return the distance between this object's current position and the current target's position (or null if no target)
    */
    calcDistanceToTarget() 
    {
        if (this.target)
        {
            return this.getDistance(this.position, this.target);
        }
        return null;
    }

    /**
        Handles updating this object's current position
        NOTE: this should be called anytime this object's owner changes position
        
        @param position Phaser.Point the new position of this object
    */
    updatePosition(position) 
    {
        this.position = position;
    }

    /**
        Checks if a specifed actor is a targetable enemy
        
        @param obj Actor to check
        @return bool (true if enemy and targetable, false otherwise)
    */
    checkIfEnemy(obj) 
    {
        return obj.teamTag != this.tag && obj.targetable;
    }

    /**
        Finds the nearest targetable enemy

        NOTE: avoid calling this more often than you need to
        
        @return Actor
    */
    findClosestEnemy() 
    {
        let closest, distance;
        const actors = this.stage.spawn.allActors;

        for (let i = 0; i < actors.length; i++)
        {
            const a = actors[i];
            if (!a.active || !a.targetable) //inefficient to have to iterate through dead actors... find something to do about this?
            {
                continue;
            }
            if (this.checkIfEnemy(a))
            {
                const objDist = this.getDistance(this.position, a);
                if (!closest || objDist < distance)
                {
                    closest = a;
                    distance = objDist;
                }
            }
        }
        return closest;
    }

    /**
        Finds the direction of this TargetingSystem's target relative to it's current position
        
        @return Direction property
    */
    getDirectionToTarget() 
    {
        let angle = Phaser.Math.Angle.BetweenPoints(this.position, this.target);
        angle = (UtilFunctions.radiansToDegrees(angle) + 202.5)%360;
        const direction = Math.abs(Math.ceil(angle/45)); //transform radian angle to direction
        return direction;
    }
}