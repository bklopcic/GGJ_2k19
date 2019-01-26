/**
    A 2D grid of tiles. This class handles set up and updating of tile objects
    
    @param game Phaser.Game that this StageGrid exists in
    @param xSize number the horizontal number of tiles
    @param ySize number the vertical number of tiles
    @param tileKeys string array the keys used to crate the tiles
    @param offsetX number the vertical offset of grid from left side of the game world (optional)
    @param offsetY number the horizontal offset of the grid from the top of the game world (optional)
*/
class StageGrid 
{
    constructor(scene, xSize, ySize, tileKeys, offsetX, offsetY) 
    {
        this.scene = scene;
        this.xSize = xSize;
        this.ySize = ySize;
        this.tileKeys = tileKeys;
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        
        //get our tile width and height directly from the image in the cache
        //TODO: change this to be stored in a json file that has info about a scene's tiles
        let testTile = this.scene.textures.get(this.tileKeys[0]).source[0];
        this.tileWidth = testTile.width;
        this.tileHeight = testTile.height;
        testTile = null;
        
        //to account for the fact that tiles' anchor points are in their center
        this.offsetX = offsetX + (this.tileWidth/2); 
        this.offsetY = offsetY + (this.tileHeight/2);
        
        //a single texture 
        this.tiles = this.scene.add.renderTexture(0, 0, this.tileWidth * this.xSize, this.tileHeight * this.ySize);
                
        this.dataGrid = [];
                        
        this.createGrid();
    }

    /**
        Handles setting up the grid
    */
    createGrid() 
    {
        for (let y = 0; y < this.ySize; y++)
        {
            this.dataGrid[y] = [];
            for(let x = 0; x < this.xSize; x++)
            {
                const xPos = (x*this.tileWidth)+this.offsetX;
                const yPos = (y*this.tileHeight)+this.offsetY;
                
                //this.tiles.draw(this.scene.add.image(xPos, yPos, this.tileKeys[0]));
                this.dataGrid[y][x] = 0;
            }
        }
    }

    /**
        Returns the pixel coordinate of a specified StageCoord
        
        @param {StageCoord} coord the position on the grid to retrieve the tile from
        @return Phaser.Geom.Point representing the pixel coordinate of the StageCoord
    */
    getTileAt(coord) 
    {
        return new Phaser.Geom.Point(coord.x * this.tileWidth + this.offsetX, coord.y * this.tileHeight + this.offsetY);
    }

    /**
        Returns a coordinate object representing a position in the grid at a specified pixel position
        
        @param x number representing the horizontal position (in pixels) of the requested Stage position
        @param y number representing the vertical position (in pixels) of the requested Stage position
        @return StageCoord
        
        TODO: Make this method account for non-zero offset
    */
    getCoordByPixels(x, y) 
    {
        const rawOffsetX = this.offsetX - (this.tileWidth/2);
        const rawOffsetY = this.offsetY - (this.tileHeight/2);
        return new StageCoord(Math.floor((x-rawOffsetX)/this.tileWidth), Math.floor((y-rawOffsetY)/this.tileHeight));
    }

    /**
        Checks if a specified position is within the bounds of the stage.
        
        @param coord StageCoord representing the position to be checked
        @return bool (true if in bounds, false if not)
    */
    checkInBounds(coord) 
    {
        return (coord.x >= 0 && coord.x < this.xSize && coord.y >= 0 && coord.y < this.ySize);
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

    /**
        Hanldes decrementing from the number of occupants at a position on a grid
        
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