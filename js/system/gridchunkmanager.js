class GridChunkManager
{
    constructor(scene, actorManager, tileManager, data)
    {
        this.scene = scene;
        this.spawner = actorManager;
        this.tileManager = tileManager;
        this.chunkWidth = data.chunkWidth;
        this.chunkHeight = data.chunkHeight;
        this.numChunksX = data.numChunksX;
        this.numChunksY = data.numChunksY;
        this.tilesPerChunkX = data.tilesPerChunkX;
        this.tilesPerChunkY = data.tilesPerChunkY;
        this.chunks = [];
        this.onChunkLoadEvent = null;
        this.onChunkLoadEventContext = this;

        this.debugDrawer = null;

        this.activeChunkRange = 
        {
            startIdx: new StageCoord(-1,-1),
            endIdx: new StageCoord(-1,-1)
        }

        for (let  i = 0; i < data.chunks.length; i++)
        {
            this.chunks[i] = [];
            for (let j = 0; j < data.chunks[i].length; j++)
            {
                const chunkData = data.chunks[i][j];
                this.chunks[i][j] = new GridChunk(chunkData);
            }
        }

        this.maxIdx = new StageCoord(data.numChunksX, data.numChunksY);
    }

    setActiveRange(startIdx, endIdx, forceClean)
    {
        if (startIdx.x > endIdx.x || startIdx.y > endIdx.y)
        {
            throw "Invalid range parameters";
        }
        forceClean = typeof forceClean === "undefined" ? false : forceClean;

        //validate range to confine to existing chunks
        startIdx.x = startIdx.x < 0 ? 0 : startIdx.x;
        startIdx.y = startIdx.y < 0 ? 0 : startIdx.y;
        endIdx.x = endIdx.x > this.maxIdx.x ? this.maxIdx.x : endIdx.x;
        endIdx.y = endIdx.y > this.maxIdx.y ? this.maxIdx.y : endIdx.y;

        if (this.activeChunkRange.startIdx.compareCoord(startIdx) && this.activeChunkRange.endIdx.compareCoord(endIdx))
        {
            return;
        }
        
        if (forceClean)
        {
            this.cleanActors(startIdx, endIdx);
        }
        this.resetGrid(startIdx, endIdx);
        this.loadChunkRange(startIdx, endIdx);
        this.activeChunkRange.startIdx = startIdx;
        this.activeChunkRange.endIdx = endIdx;

        if (this.debugDrawer)
        {
            this.debugDraw();
        }
    }

    loadChunk(coord)
    {
        //get the chunk
        const chunk = this.chunks[coord.y][coord.x];

        //load the tiles
        this.tileManager.drawTiles(coord.x * this.chunkWidth, coord.y * this.chunkHeight, chunk.tiles);

        //load the actors
        this.spawner.loadActorsFromData(chunk.actors);
        chunk.clearActorData();

        if (this.onChunkLoadEvent != null)
        {
            this.onChunkLoadEvent.call(this.onChunkLoadEventContext);
        }
    }

    loadChunkRange(startIdx, endIdx)
    {
        if (startIdx.x > endIdx.x || startIdx.y > endIdx.y)
        {
            throw "Invalid range parameters";
        }

        for (let i = startIdx.y; i < endIdx.y; i++)
        {
            for (let j = startIdx.x; j < endIdx.x; j++)
            {
                const idx = new StageCoord(j, i);
                if (this.checkIdxExists(idx) && !this.checkIdxActive(idx))
                {
                    this.loadChunk(idx);
                }
            }
        }
    }

    resetGrid(startIdx, endIdx)
    {
        const xSize = (endIdx.x - startIdx.x) * this.tilesPerChunkX;
        const ySize = (endIdx.y - startIdx.y) * this.tilesPerChunkY;
        const offsetX = this.chunkWidth * startIdx.x;
        const offsetY = this.chunkHeight * startIdx.y;
        this.tileManager.resetGrid(xSize, ySize, offsetX, offsetY);
        
        //rerecord positions of all obstacles
        for (let a of this.spawner.allActors)
        {
            if (a.active && a.isObstacle)
            {
                this.tileManager.enterTile(this.tileManager.getCoordByPixels(a.x, a.y));
            }
        }
    }

    cleanActors(startIdx, endIdx)
    {
        const actors = this.spawner.allActors;
        for (let i = 0; i < actors.length; i++)
        {
            const actor = actors[i];
            let inRange;
            
            if (typeof startIdx === "undefined" || typeof endIdx === "undefined")
            {
                inRange = this.checkInActiveBounds(actor);
            }
            else
            {
                inRange = UtilFunctions.checkCoordInRange(startIdx, endIdx, this.getParentChunkIdx(actor));
            }
            if (actor.active && !inRange)
            {
                actor.die();
                if (actor.chunkable)
                {
                    const actorIdx = this.getParentChunkIdx(actor);
                    this.chunks[actorIdx.y][actorIdx.x].addActor(actor);
                }
            }
        }
    }
    
    checkInActiveBounds(obj)
    {
        return this.checkIdxActive(this.getParentChunkIdx(obj));
    }

    checkIdxActive(coord)
    {
        return UtilFunctions.checkCoordInRange(this.activeChunkRange.startIdx, this.activeChunkRange.endIdx, coord);
    }

    checkIdxExists(coord)
    {
        return coord.x >= 0 && coord.y >= 0 && coord.x < this.chunks[0].length && coord.y < this.chunks.length;
    }

    /**
     * gets the coordinate of the chunk that a specified object is currenlty in
     * @param {Object} obj the object to check
     * @returns StageCoord representing the chunk idx of specified object
     */
    getParentChunkIdx(obj)
    {
        const x = Math.floor(obj.x / this.chunkWidth);
        const y = Math.floor(obj.y / this.chunkHeight);
        return new StageCoord(x, y);
    }

    generateData()
    {
        //generate a copy of chunks array
        const chunksCopy = [];
        for (let i = 0; i < this.chunks.length; i++)
        {
            chunksCopy[i] = [];
            for (let j = 0; j < this.chunks[i].length; j++)
            {
                chunksCopy[i][j] = this.chunks[i][j].clone();   
            }
        }

        //get the data from actors that are on currently active chunks
        const actors = this.spawner.allActors;
        for (let i = 0; i < actors.length; i++)
        {
            const actor = actors[i];
            if (actor.active && actor.chunkable)
            {
                const actorIdx = this.getParentChunkIdx(actor);
                chunksCopy[actorIdx.y][actorIdx.x].addActor(actor);
            }
        }

        for (let  i = 0; i < chunksCopy.length; i++)
        {
            for (let j = 0; j < chunksCopy[i].length; j++)
            {
                chunksCopy[i][j] = chunksCopy[i][j].dataLiteral;   
            }
        }

        const data = {};
        data.chunkWidth = this.chunkWidth;
        data.chunkHeight = this.chunkHeight;
        data.numChunksX = this.numChunksX;
        data.numChunksY = this.numChunksX;
        data.tilesPerChunkX = this.tilesPerChunkX;
        data.tilesPerChunkY = this.tilesPerChunkY;
        data.tileWidth = this.tileManager.tileWidth;
        data.tileHeight = this.tileManager.tileHeight;
        data.tileSet = this.tileManager.tileKeys;
        data.activeRange = {
            startIdx: {
                x: 0, y: 0
            },
            endIdx: {
                x: 1, y: 1
            }
        }
        data.chunks = chunksCopy;
        return data;
    }

    startDebug(container)
    {
        this.debugDrawer = this.scene.add.graphics({ fillStyle: { color: 0x0000aa }, lineStyle: { color: 0x0033aa } });
        if (container)
        {
            container.add(this.debugDrawer);
        }
    }

    stopDebug()
    {
        this.debugDrawer.clear();
        this.debugDrawer.destroy();
        this.debugDrawer = null;
    }

    debugDraw()
    {
        this.debugDrawer.clear();

        for (let i = this.activeChunkRange.startIdx.y; i < this.activeChunkRange.endIdx.y; i++)
        {
            for (let j = this.activeChunkRange.startIdx.x; j < this.activeChunkRange.endIdx.x; j++)
            {
                const idx = new StageCoord(j, i);
                
                if (this.debugDrawer)
                {
                    this.debugDrawer.strokeRect(idx.x*this.chunkWidth, idx.y*this.chunkHeight, this.chunkWidth, this.chunkHeight);
                }
            }
        }
    }

    toString()
    {
        return JSON.stringify(this.generateData());
    }
}