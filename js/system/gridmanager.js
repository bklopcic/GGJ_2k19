class GridManager
{
    constructor(scene, tileKeys, tileWidth, tileHeight, container)
    {
        this.scene = scene;
        this.tileKeys = tileKeys;

        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

        this.offsetX = 0;
        this.offsetY = 0;

        this.container = container || this.scene.add.container(0, 0);
        
        this.dataGrid = [];
        this.maps = [];
    }

    /**
     * 
     * @param {number} xSize number of tiles in the x direction
     * @param {number} ySize number of tiles in the y direction
     * @param {number} offsetX x value pixel offset of the grid from 0,0
     * @param {number} offsetY y value for pixel offset of the grid from 0,0
     * @param {StageCoord[]} positionArr array of StageCoords that should be activated after the grid is reset
     */
    resetGrid(xSize, ySize, offsetX, offsetY, positionArr)
    {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.dataGrid = [];
        for (let i = 0; i < ySize; i++)
        {
            this.dataGrid[i] = [];
            for (let j = 0; j < xSize; j++)
            {
                this.dataGrid[i][j] = 0;
            }
        }

        if (positionArr)
        {
            this.recordPositions(positionArr);
        }
    }

    drawTiles(x, y, tileData)
    {
        //quick and dirty memory management
        //potential issue: no guaruntee both maps with be the same size...
        const length = this.maps.length;
        for (let i = 0; i < length; i++)
        {
            if (this.maps[i].x == x && this.maps[i].y == y)
            {
                this.maps[i].map.destroy();
                this.maps.splice(i, 1);
                break;
            }
        }
        const map = this.scene.make.tilemap({ data: tileData, tileWidth: this.tileWidth, tileHeight: this.tileHeight });
        const tiles = map.addTilesetImage("tilesheet");
        const layer = map.createStaticLayer(0, tiles, x, y);
        this.container.add(layer);
        this.maps.push({map: map, x: x, y: y});
    }

    /**
        Returns the pixel coordinate of a specified StageCoord
        
        @param {StageCoord} coord the position on the grid to retrieve the tile from
        @return Phaser.Geom.Point representing the pixel coordinate of the StageCoord
    */
   getTileAt(coord) 
   {
       return new Phaser.Geom.Point(coord.x * this.tileWidth, coord.y * this.tileHeight);
   }

   /**
       Returns a coordinate object representing a position in the grid at a specified pixel position
       NOTE: position is relative to the currently loaded range, NOT the world
       
       @param x number representing the horizontal position (in pixels) of the requested Stage position
       @param y number representing the vertical position (in pixels) of the requested Stage position
       @return StageCoord       
   */
   getCoordByPixels(x, y) 
   {
       return new StageCoord(Math.floor((x-this.offsetX)/this.tileWidth), Math.floor((y-this.offsetY)/this.tileHeight));
   }

   /**
       Checks if a specified position is within the bounds of the stage.
       
       @param coord StageCoord representing the position to be checked
       @return bool (true if in bounds, false if not)
   */
   checkInBounds(coord) 
   {
       return (coord.x >= 0 && coord.x < this.dataGrid[0].length && coord.y >= 0 && coord.y < this.dataGrid.length);
   }

   /**
   * Handles adding to the number of occupants at a position on the grid
   *    
   * @param coord StageCoord the position to occupy
   */
   enterTile(coord) 
   {
       this.dataGrid[coord.y][coord.x]++;
   }

   recordPositions(positionArr)
   {
       for (let i = 0; i < positionArr.length; i++)
       {
           console.log(positionArr[i]);
           this.enterTile(positionArr[i]);
       }
   }

   /**
       Handles decrementing from the number of occupants at a position on a grid
       
       @param coord StageCoord the position to unoccupy
   */
   leaveTile(coord) 
   {
       this.dataGrid[coord.y][coord.x]--;
   }

   /**
       Checks if a specified position on the grid is occupied by another actor
       
       @param coord StageCoord the position to check
       @return bool (true if empty, false otherwise)
   */
   checkIfEmpty(coord) 
   {
       return this.dataGrid[coord.y][coord.x] == 0;
   }
}