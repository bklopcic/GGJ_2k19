/**
    Simply defined, the stage class is a place for actors to interact. This class defines the environment
    in which the actors will exist. The stage is in charge of handling all actor interactions (collisions, etc)
*/
class Stage
{
    /**
     * @param scene Phaser.scene that this Stage belongs to
     * @param data Object containing the information to be used for stage setup
     */
    constructor(scene, data)
    {       
        this.scene = scene;
        this.data = data;

        this.grid = new GridManager(this.scene, data.tileSet, data.tileWidth, data.tileHeight);
        this.spawn = new ActorManager(this, this.scene.add.group());
        this.chunker = new GridChunkManager(this.scene, this.spawn, this.grid, data);

        const startIdx = new StageCoord(data.activeRange.startIdx.x, data.activeRange.startIdx.y);
        const endIdx =  new StageCoord(data.activeRange.endIdx.x, data.activeRange.endIdx.y);
        this.chunker.setActiveRange(startIdx, endIdx);
    }

    get tileWidth()
    {
        return this.grid.tileWidth;
    }

    get tileHeight()
    {
        return this.grid.tileHeight;
    }

    get chunkWidth()
    {
        return this.chunker.chunkWidth;
    }

    get chunkHeight()
    {
        return this.chunker.chunkHeight;
    }
    
    get dataLiteral()
    {
        return this.chunker.generateData();
    }

    get dataGrid()
    {
        return this.grid.dataGrid;
    }

    get allActors()
    {
        return this.spawn.allActors;
    }

    /**
     * resolves collisions between actors by the following ruleset:
     *      - actors' collision handlers will only be called if at least one actor is collidable
     * 
     *      - if both actors are collidable, collision physics will be applied, otherwise they will simply overlap
     * 
     *      - if colliding actors are on the same team, their internal friendlyCollision() methods will be
     *        called in turn, passing in a reference to the other actor
     * 
     *      - if the actors are not on the same team, enemyCollision() wil be called instead, also passing a reference
     * 
     *      - each actor will have postCollision() called after either enemyCollision or friendlyCollision has been
     *        invoked on both actors
    */
    collisionHandler(actor1, actor2)
    {
        if (actor1.collidable || actor2.collidable)
        {
            if (actor1.collidable && actor2.collidable)
            {
                this.scene.physics.collide(actor1, actor2); //apply collision physics
            }
            
            if (actor1.teamTag == actor2.teamTag)
            {
                actor1.friendlyCollision(actor2);
                actor2.friendlyCollision(actor1);
            }
            else
            {
                actor1.enemyCollision(actor2);
                actor2.enemyCollision(actor1);
            }
            actor1.postCollision();
            actor2.postCollision();
        }
    }

    collideBounds(actorBody)
    {
        actorBody.gameObject.collideBounds();
    }

    /**
         Returns the pixel coordinate of a specified StageCoord
        
        @param {StageCoord} coord the position on the grid to retrieve the tile from
        @return Phaser.Geom.Point representing the pixel coordinate of the StageCoord
    */
    getTileAt(coord) 
    {
        let tile = this.grid.getTileAt(coord);
        tile.x += this.chunker.activeChunkRange.startIdx.x * this.chunkWidth;
        tile.y += this.chunker.activeChunkRange.startIdx.y * this.chunkHeight;
        return tile;
    }

    /**
         Returns a coordinate object representing a position in the grid at a specified pixel position
        
        @param x number representing the horizontal position (in pixels) of the requested Stage position
        @param y number representing the vertical position (in pixels) of the requested Stage position
        @return StageCoord       
    */
    getCoordByPixels(x, y) 
    {
        return this.grid.getCoordByPixels(x, y);
    }

    /**
         Checks if a specified position is within the bounds of the stage.
        
        @param coord StageCoord representing the position to be checked
        @return bool (true if in bounds, false if not)
    */
    checkInBounds(coord) 
    {
        return this.grid.checkInBounds(coord);
    }

    /**
     * Handles adding to the number of occupants at a position on the grid
     *    
     * @param coord StageCoord the position to occupy
     */
    enterTile(coord) 
    {
        this.grid.enterTile(coord);
    }

    /**
         Handles decrementing from the number of occupants at a position on a grid
        
        @param coord StageCoord the position to unoccupy
    */
    leaveTile(coord) 
    {
        this.grid.leaveTile(coord);
    }

    /**
         Checks if a specified position on the grid is occupied by another actor
        
        @param coord StageCoord the position to check
        @return bool (true if empty, false otherwise)
    */
    checkIfEmpty(coord) 
    {
        return this.grid.checkIfEmpty(coord);
    }

    toString()
    {
        return this.chunker.toString();
    }

    spawnActor(type, x, y, direction, team)
    {
        return this.spawn.spawnActor(type, x, y, direction, team);
    }
}