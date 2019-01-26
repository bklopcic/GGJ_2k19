class ChunkEditerScene extends Phaser.Scene
{
    constructor()
    {
        super(
        {
            key: "chunk-editer", 
            physics:
            {
                default: 'arcade',
                arcade: 
                {
                    debug: true
        }}});

        this.stage;
        this.data;
    }

    init(data)
    {
        if (data && data.hasOwnProperty("chunkWidth"))
        {
            this.data = data;
        }
        else
        {
            this.data = makeDefaultChunkData();
        }
    }

    create()
    {
        this.stage = new Stage(this, this.data);

        this.disableActors();
        this.selectedTileType = null;

        this.input.on("pointerdown", this.handleClick, this);

        this.point = new Phaser.Geom.Point(this.data.chunkWidth/2, this.data.chunkHeight/2);
        const debugContainer = this.add.container(0,0);
        this.chunkController = new ChunkingController(this.stage.chunker, this.point);
        this.stage.chunker.startDebug(debugContainer);
        this.stage.chunker.onChunkLoadEvent = this.onChunkCallback;
        this.stage.chunker.onChunkLoadEventContext = this;
        this.chunkController.startDebug(debugContainer);
        this.chunkController.triggerPaddingX = this.data.chunkWidth * .8;
        this.chunkController.triggerPaddingY = this.data.chunkHeight * .8;
        
        this.cameraSpeed = 10;
        this.cameras.main.setBounds(0, 0, this.data.chunkWidth * this.data.numChunksX, this.data.chunkHeight * this.data.numChunksY);
        this.physics.world.setBounds(this.cameras.main.x, this.cameras.main.y, this.data.chunkWidth * this.data.numChunksX, this.data.chunkHeight * this.data.numChunksY);
        this.cameras.main.startFollow(this.point, true);

        this.controlKeys = 
        {
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        };
    }

    update()
    {
        this.moveCamera();
        this.chunkController.update();
    }

    moveCamera()
    {
        if(this.controlKeys.A.isDown)
        {
            this.point.x-= this.cameraSpeed;
            if (this.point.x < this.data.chunkWidth/2)
            {
                this.point.x = this.data.chunkWidth/2;
            }
        }
        else if(this.controlKeys.D.isDown)
        {
            this.point.x+= this.cameraSpeed;
            if (this.point.x > this.physics.world.bounds.width - this.data.chunkWidth/2)
            {
                this.point.x = this.physics.world.bounds.width - this.data.chunkWidth/2;
            }
        }
        if(this.controlKeys.W.isDown)
        {
            this.point.y-= this.cameraSpeed;
            if (this.point.y < this.data.chunkHeight/2)
            {
                this.point.y = this.data.chunkHeight/2;
            }
        }
        else if (this.controlKeys.S.isDown)
        {
            this.point.y+= this.cameraSpeed;
            if (this.point.y > this.physics.world.bounds.height - this.data.chunkHeight/2)
            {
                this.point.y = this.physics.world.bounds.height - this.data.chunkHeight/2;
            }
        }
    }

    getDOMSettings()
    {
        const settings = {};
        settings.type = $("#type-select").val();
        settings.direction = Number($("#direction-select").val());
        settings.team = $("#team-select").val();
        return settings;
    }

    handleClick(pointer)
    {
        if (this.stage.chunker.checkIdxExists(this.stage.chunker.getParentChunkIdx(pointer)))
        {
            const mode = $("#mode-select").val();
            const gridSnap = $("#snap-to-grid-check").prop("checked");
            let clickX = this.cameras.main.scrollX + pointer.x;
            let clickY = this.cameras.main.scrollY + pointer.y;
            
            if (this.selectedTileType != null)
            {
                this.placeTile(clickX, clickY);
                return;
            }
            if (gridSnap)
            {
                const coord = this.stage.getCoordByPixels(clickX, clickY);
                const tile = this.stage.getTileAt(new StageCoord(coord.x, coord.y));
                clickX = tile.x + this.data.tileWidth/2;
                clickY = tile.y + this.data.tileHeight/2;
            }

            switch(mode)
            {
                case "place":
                    const set = this.getDOMSettings();
                    const actor = this.stage.spawn.spawnActor(set.type, clickX, clickY, set.direction, set.team);
                    actor.overridden = true;
                    break;
                case "erase":
                    this.stage.spawn.spawnActor("eraser", clickX, clickY);
                    break;
                default:
                    break;
            } 
        }
    }

    placeTile(x, y)
    {
        const chunkIdx = this.stage.chunker.getParentChunkIdx({x,y});
        const tileX = Math.floor((x / this.data.tileWidth) - (chunkIdx.x * this.data.tilesPerChunkX));
        const tileY = Math.floor((y / this.data.tileHeight) - (chunkIdx.y * this.data.tilesPerChunkY));
        const chunk = this.stage.chunker.chunks[chunkIdx.y][chunkIdx.x];
        chunk.tiles[tileY][tileX] = this.selectedTileType;
        this.stage.grid.drawTiles(chunkIdx.x * this.data.chunkWidth, chunkIdx.y * this.data.chunkHeight, chunk.tiles);
    }

    disableActors()
    {
        for (let a of this.stage.spawn.allActors)
        {
            a.overridden = true;
        }
    }

    hideActors()
    {
        for (let a of this.stage.spawn.allActors)
        {
            if (a.active)
            {
                a.setVisible(false);
            }
        }
    }

    showActors()
    {
        for (let a of this.stage.spawn.allActors)
        {
            if (a.active)
            {
                a.setVisible(true);
            }
        }
    }

    onChunkCallback()
    {
        this.disableActors();

        if (this.selectedTileType != null)
        {
            this.hideActors();
        }
    }
}