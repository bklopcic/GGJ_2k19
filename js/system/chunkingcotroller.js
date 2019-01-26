class ChunkingController
{
    constructor(chunker, focalObject)
    {
        this.chunker = chunker;
        this.focalObject = focalObject;

        this.triggerPaddingX = 100;
        this.triggerPaddingY = 75;

        this.triggerBounds = 
        {
            top: new StageCoord(0, 0),
            bottom: new StageCoord(0, 0)
        };

        this.debugDrawer = null;

        this.setBoundaries();
    }

    setFocalObject(obj)
    {
        this.focalObject = obj;
        this.setBoundaries();
    }

    setBoundaries()
    {
         
        if (this.chunker.checkIdxExists(this.chunker.getParentChunkIdx(this.focalObject)))
        {
            const centerChunk = this.chunker.getParentChunkIdx(this.focalObject);

            if (this.chunker.checkIdxExists(new StageCoord(centerChunk.x - 1, centerChunk.y)))
            {
                this.triggerBounds.top.x = (centerChunk.x * this.chunker.chunkWidth) + this.chunker.chunkWidth/2 - this.triggerPaddingX;
            }
            else
            {
                this.triggerBounds.top.x = 0;
            }

            if (this.chunker.checkIdxExists(new StageCoord(centerChunk.x, centerChunk.y - 1)))
            {
                this.triggerBounds.top.y = (centerChunk.y * this.chunker.chunkHeight) + this.chunker.chunkHeight/2 - this.triggerPaddingY;
            }
            else
            {
                this.triggerBounds.top.y = 0;
            }
            
            if (this.chunker.checkIdxExists(new StageCoord(centerChunk.x + 1, centerChunk.y)))
            {
                this.triggerBounds.bottom.x = (centerChunk.x * this.chunker.chunkWidth) + this.chunker.chunkWidth/2 + this.triggerPaddingX;
            }
            else
            {
                this.triggerBounds.bottom.x = (centerChunk.x + 1) * this.chunker.chunkWidth;
            }

            if (this.chunker.checkIdxExists(new StageCoord(centerChunk.x, centerChunk.y + 1)))
            {
                this.triggerBounds.bottom.y = (centerChunk.y * this.chunker.chunkHeight) + this.chunker.chunkHeight/2 + this.triggerPaddingY;
            }
            else
            {
                this.triggerBounds.bottom.y = (centerChunk.y + 1) * this.chunker.chunkHeight;
            }
        }

        if (this.debugDrawer)
        {
            this.debugDraw();
        }
    }

    checkTrigger()
    {
        return !UtilFunctions.checkCoordInRange(this.triggerBounds.top, this.triggerBounds.bottom, new StageCoord(this.focalObject.x, this.focalObject.y));
    }

    update()
    {
        //If object has crossed trigger bounds, reset bounds, load/unload appropriate chunks
        if (this.checkTrigger())
        {
            this.setBoundaries();
            const centerChunk = this.chunker.getParentChunkIdx(this.focalObject);
            const startIdx = new StageCoord(centerChunk.x-1, centerChunk.y-1);
            const endIdx = new StageCoord(centerChunk.x+2, centerChunk.y+2);
            try
            {
                this.chunker.setActiveRange(startIdx, endIdx, true);
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }

    startDebug(container)
    {
        this.debugDrawer = this.chunker.scene.add.graphics({ fillStyle: { color: 0x0000aa }, lineStyle: { color: 0xaa8800 } });
        if (container)
        {
            container.add(this.debugDrawer);
        }
        this.debugDraw();
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
        const x = this.triggerBounds.top.x;
        const y = this.triggerBounds.top.y;
        const w = this.triggerBounds.bottom.x - x;
        const h = this.triggerBounds.bottom.y - y;
        this.debugDrawer.strokeRect(x, y, w, h);
    }
}