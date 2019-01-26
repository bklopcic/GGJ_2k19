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
    }
}