/**
 * This class is for storing data about actors. They are a lightweight organizational
 * tool for storing groups of actor data based on their location.
 * Chunk data can be read to add actors to the scene. After Actors are loaded, 
 * the chunk's clearActorData() method should be called to reset it for when it's time to 
 * unload it.
 */
class GridChunk
{
    constructor(chunkData)
    {
        this.actors = chunkData.actors;
        this.tiles = chunkData.tiles;
    }

    get dataLiteral()
    {
        const copy = this.clone();
        const data = {};
        data.actors = copy.actors;
        data.tiles = copy.tiles;
        return data;
    }

    clearActorData()
    {
        this.actors = [];
    }

    addActor(actor)
    {
        this.actors.push(actor.dataLiteral);
    }

    addActorData(data)
    {
        this.actors.push(data);
    }

    clone()
    {
        const actorArrCopy = [];
        for (let a of this.actors)
        {
            actorArrCopy.push(Object.assign({}, a));
        }
        const tilesCopy = [];
        for (let j = 0; j < this.tiles.length; j++)
        {
            tilesCopy[j] = Array.from(this.tiles[j]);
        }
        return new GridChunk({actors: actorArrCopy, tiles: tilesCopy});
    }
}