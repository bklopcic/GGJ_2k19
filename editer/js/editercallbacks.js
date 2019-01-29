function copyText(elemId)
{
    const copyText = document.getElementById(elemId);

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");
}

function makeDefaultChunkData()
{
    return generateStageData(1, 1, 10, 10, 100, 80);
}

function generateStageData(numChunksX, numChunksY, tilesPerChunkX, tilesPerChunkY, tileWidth, tileHeight)
{
    const data = {numChunksX, numChunksY, chunkWidth: tilesPerChunkX*tileWidth, chunkHeight:tilesPerChunkY*tileHeight, tilesPerChunkX, tilesPerChunkY, tileWidth, tileHeight};
    data.activeRange = {
        startIdx: {
            x: 0,
            y: 0
        },
        endIdx: {
            x: 1,
            y: 1
        }
    };
    data.tileSet = ['tile0', 'tile1'];
    data.chunks = [];
    for (let i = 0; i < numChunksY; i++)
    {
        data.chunks[i] = [];
        for (let j = 0; j < numChunksX; j++)
        {
            data.chunks[i][j] = {actors:[], tiles: []}
            for (let  k = 0; k < tilesPerChunkY; k++)
            {
                data.chunks[i][j].tiles[k] = [];
                for (let l = 0; l < tilesPerChunkX; l++)
                {
                    //create checkerboard pattern
                    data.chunks[i][j].tiles[k][l] = k % 2 == 0 ? l % 2 == 0 ? 0: 1 : l % 2 == 0 ? 1 : 0;
                }
            }
        }
    }
    return data;
}

function enterTileMode()
{
    $("#edit-tile-mode-btn").prop("checked", true);
    const scene = game.scene.getScene("chunk-editer");
    scene.selectedTileType = 0;
    scene.hideActors();
}

function exitTileMode()
{
    $("#edit-tile-mode-btn").prop("checked", false);
    const scene = game.scene.getScene("chunk-editer");
    scene.selectedTileType = null;
    scene.showActors();
}