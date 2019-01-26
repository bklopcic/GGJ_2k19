//Direction enum
var Direction = {
    NONE: 0,
    WEST: 1,
    NORTHWEST: 2,
    NORTH: 3,
    NORTHEAST: 4,
    EAST: 5,
    SOUTHEAST: 6,
    SOUTH: 7,
    SOUTHWEST: 8,
    
    
    /***
    This can be very useful. use case ex.: Direction.modifyer[Direction.NORTH].y (yields -1).
    This could be used for something like:
    sprite.body.velocity.y = speed * Direction.modifyer[Direction.NORTH].y;
    sprite.body.velocity.x = speed * Direction.modifyer[Direction.NORTH].x; 
    
    results in movement in a northward direction! huzzah!
    This is even more useful once we realize that an Actor's faceDirection changes all the time,
    but rather than require a bunch of logic to figure out how they should move we can just plug their
    faceDirection into Direction.modifyer and let this mapping do the work. No logic required.
    ***/
    modifyer: {
        0: {x: 0, y: 0},
        1: {x: -1, y: 0},
        2: {x: -1, y: -1},
        3: {x: 0, y:-1},
        4: {x: 1, y: -1},
        5: {x: 1, y: 0},
        6: {x: 1, y: 1},
        7: {x: 0, y: 1},
        8: {x: -1, y: 1}
    },
    
    
    
    //the reverse mapping
    modifyerToDirection : function(modifyer){
        //there are better ways to do this... in the future
        //NOTE: if the syntax for this changes, TargetingSystem.getDirectionToTarget will need to be updated
        
        if (modifyer.x == 0 && modifyer.y == 0){
            return this.NONE;
        } else if (modifyer.x == -1 && modifyer.y == 0){
            return this.WEST;
        } else if (modifyer.x == -1 && modifyer.y == -1){
            return this.NORTHWEST;
        } else if (modifyer.x == 0 && modifyer.y == -1){
            return this.NORTH;
        } else if (modifyer.x == 1 && modifyer.y == -1){
            return this.NORTHEAST;
        } else if (modifyer.x == 1 && modifyer.y == 0){
            return this.EAST;
        } else if (modifyer.x == 1 && modifyer.y == 1){
            return this.SOUTHEAST;
        } else if (modifyer.x == 0 && modifyer.y == 1){
            return this.SOUTH;
        } else if (modifyer.x == -1 && modifyer.y == 1){
            return this.SOUTHWEST;
        } 
    }
}

var ACTOR_TYPES = {};