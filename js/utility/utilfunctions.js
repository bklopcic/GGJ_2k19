const UtilFunctions = 
{
    genRandInt: function(min, max)
    {
        return Math.floor(Math.random() * (max - min) + min);
    },

    checkCoordInRange: function(startCoord, endCoord, coordToCheck)
    {
        return (coordToCheck.x >= startCoord.x && coordToCheck.x < endCoord.x &&
            coordToCheck.y >= startCoord.y && coordToCheck.y < endCoord.y);
    },

    radiansToDegrees: function(radAngle)
    {
        return radAngle * (180/Math.PI);
    },

    /**
    * looks for openings of a specified number of tiles (x and y) within a specified 2D array
    * patches will overlap
    * @returns array of array of stageCoords (each array represents a valid clearing)
    */
    findClearingsIn2DArr: function(data, clearingWidth, clearingHeight)
    {
       const clearings = [];
       for (let i = 0; i < (data.length - clearingHeight) + 1; i++)
       {
           for (let j = 0; j < (data[i].length - clearingWidth) + 1; j++)
           {
               const coords = [];
               let clearingBroken = false;
               //search subset of grid
               for (let  k = i; k < i + clearingHeight; k++)
               {
                   for (let l = j; l < j + clearingWidth; l++)
                   {
                        if (data[k][l] == 0)
                        {
                            coords.push({x: k, y: l});
                        }
                        else
                        {
                            clearingBroken = true;
                            break;
                        }
                    }
                    if (clearingBroken)
                    {
                       break;
                    }
                }
                if (coords.length == clearingWidth * clearingHeight)
                {
                    clearings.push(coords);
                }
            }
        }
       return clearings;
    },

    getDirectionToObject: function(base, target)
    {
        let angle = Phaser.Math.Angle.BetweenPoints(base, target);
        angle = (UtilFunctions.radiansToDegrees(angle) + 202.5)%360;
        const direction = Math.abs(Math.ceil(angle/45)); //transform radian angle to direction
        return direction;
    },

    get4WayDirectionToObject: function(base, target)
    {
        let angle = Phaser.Math.Angle.BetweenPoints(base, target);
        angle = (UtilFunctions.radiansToDegrees(angle) + 202.5)%360;
        let direction = Math.abs(Math.ceil(angle/90)); //transform radian angle to direction
        direction += direction - 1;
        return direction;
    }
}