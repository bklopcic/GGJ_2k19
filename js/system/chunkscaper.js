class ChunkScraper
{
    constructor(chunkManager)
    {
        this.chunkManager = chunkManager;
    }

    getChunkActorData(coord)
    {
        const chunkData = this.chunkManager.generateDataFromChunk(coord);
        const actors = [];
        for (let a of chunkData.actors)
        {
            actors.push(Object.assign({}, a));
        }
        return actors;
    }

    //Returns an array of all actor data matching the specified type
    getActorDataByType(actorType)
    {
        const data = this.chunkManager.generateData();
        const actors = [];
        for (let i = 0; i < data.numChunksY; i++)
        {
            for (let j = 0; j < data.numChunksX; j++)
            {
                for (let a of data.chunks[i][j].actors)
                {
                    if (a.type == actorType)
                    {
                        actors.push(Object.assign({}, a));
                    }
                }
            }
        }
        return actors;
    }

    /**
    * Returns an array of StageCoord arrays. Each ST arr represents teh pixel coordinates of clearings
    * in the specified chunk
    */
    getClearingsInChunk(coord, xSize, ySize)
    {
        const data = this.chunkManager.generateDataFromChunk(coord);
        const gridSim = this.getSimulatedGridManager(coord, data);
        
        const rawPoints = UtilFunctions.findClearingsIn2DArr(gridSim.dataGrid, xSize, ySize);
        const stageCoords = [];
        for (let i = 0; i < rawPoints.length; i++)
        {
            stageCoords[i] = [];
            for (let j = 0; j < rawPoints[i].length; j++)
            {   
                const x = (data.chunkWidth * coord.x) +rawPoints[i][j].x * data.tileWidth;
                const y = (data.chunkHeight * coord.y) + rawPoints[i][j].y * data.tileHeight;
                stageCoords[i].push(new StageCoord(x, y));
            }
        }
        return stageCoords;
    }

    getSimulatedGridManager(coord, dataChunk)
    {
        const data = dataChunk;
        const realGrid = this.chunkManager.tileManager;
        const simGrid = new GridManager(realGrid.scene, null, realGrid.tileWidth, realGrid.tileHeight, null);
        simGrid.resetGrid(data.tilesPerChunkX, data.tilesPerChunkY, coord.x * dataChunk.chunkWidth, coord.y * dataChunk.chunkHeight);
        const positions = [];
        for (let a of data.chunks[0][0].actors)
        {
            positions.push(simGrid.getCoordByPixels(a.x, a.y));
        }
        simGrid.recordPositions(positions);
        return simGrid;
    }
}