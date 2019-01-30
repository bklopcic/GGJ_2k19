class ChunkeditorScene extends Phaser.Scene
{
    constructor()
    {
        super(
        {
            key: "chunk-editor", 
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

    preload()
    {
        this.load.on('complete', function () {
            updateConfigSelect();
        });
    }

    create()
    {
        this.stage = new Stage(this, this.data);

        this.disableActors();
        this.selectedTileType = null;
        this.latestActionCoord = null;
        this.mouseDown = false;

        this.input.on("pointerdown", function(p){
            this.mouseDown = true; 
            this.handleClick(p);
        }, this);
        this.input.on("pointerup", function(){
            this.mouseDown = false;
        }, this);
        this.input.on("pointermove", function(p){
            if ($("#snap-to-grid-check").prop("checked") || this.selectedTileType != null)
            {
                this.handleClick(p);
            }
        }, this);

        this.cameraSpeed = 10;
        this.cameras.main.setBounds(0, 0, this.data.chunkWidth * this.data.numChunksX, this.data.chunkHeight * this.data.numChunksY);
        this.borderPaddingX = this.cameras.main.width/2;
        this.borderPaddingY = this.cameras.main.height/2;
        this.point = new Phaser.Geom.Point(this.borderPaddingX, this.borderPaddingY);
        this.physics.world.setBounds(this.cameras.main.x, this.cameras.main.y, this.data.chunkWidth * this.data.numChunksX, this.data.chunkHeight * this.data.numChunksY);
        this.cameras.main.startFollow(this.point, true);
        
        const debugContainer = this.add.container(0,0);
        this.chunkController = new ChunkingController(this.stage.chunker, this.point);
        this.stage.chunker.startDebug(debugContainer);
        this.stage.chunker.onChunkLoadEvent = this.onChunkCallback;
        this.stage.chunker.onChunkLoadEventContext = this;
        this.chunkController.startDebug(debugContainer);
        this.chunkController.triggerPaddingX = this.data.chunkWidth * .8;
        this.chunkController.triggerPaddingY = this.data.chunkHeight * .8;


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
            if (this.point.x < this.borderPaddingX)
            {
                this.point.x = this.borderPaddingX;
            }
        }
        else if(this.controlKeys.D.isDown)
        {
            this.point.x+= this.cameraSpeed;
            if (this.point.x > this.physics.world.bounds.width - this.borderPaddingX)
            {
                this.point.x = this.physics.world.bounds.width - this.borderPaddingX;
            }
        }
        if(this.controlKeys.W.isDown)
        {
            this.point.y-= this.cameraSpeed;
            if (this.point.y < this.borderPaddingY)
            {
                this.point.y = this.borderPaddingY;
            }
        }
        else if (this.controlKeys.S.isDown)
        {
            this.point.y+= this.cameraSpeed;
            if (this.point.y > this.physics.world.bounds.height - this.borderPaddingY)
            {
                this.point.y = this.physics.world.bounds.height - this.borderPaddingY;
            }
        }
    }

    getDOMSettings()
    {
        const settings = {};
        settings.type = $("#type-select").val();
        settings.direction = Number($("#direction-select").val());
        settings.team = $("#team-select").val();
        settings.config = $("#config-select").val();
        return settings;
    }

    handleClick(pointer)
    {
        if (this.mouseDown && this.stage.chunker.checkIdxExists(this.stage.chunker.getParentChunkIdx(pointer)))
        {
            const mode = $("#mode-select").val();
            const gridSnap = $("#snap-to-grid-check").prop("checked");
            const inTileMode = this.selectedTileType != null;
            let clickX = this.cameras.main.scrollX + pointer.x;
            let clickY = this.cameras.main.scrollY + pointer.y;
            const coord = this.stage.getCoordByPixels(clickX, clickY);

            if ((this.latestActionCoord != null && coord.compareCoord(this.latestActionCoord)) && (inTileMode || gridSnap))
            {
                return;
            }
            if (inTileMode)
            {
                this.placeTile(clickX, clickY);
                this.latestActionCoord = coord;
                return;
            }
            if (gridSnap)
            {
                const tile = this.stage.getTileAt(coord);
                clickX = tile.x + this.data.tileWidth/2;
                clickY = tile.y + this.data.tileHeight/2;
            }
            switch(mode)
            {
                case "place":
                    const set = this.getDOMSettings();
                    const actor = this.stage.spawn.spawnActor(set.type, clickX, clickY, set.direction, set.team, set.config);
                    actor.overridden = true;
                    this.latestActionCoord = coord;
                    break;
                case "erase":
                    this.stage.spawn.spawnActor("eraser", clickX, clickY);
                    this.latestActionCoord = coord;
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