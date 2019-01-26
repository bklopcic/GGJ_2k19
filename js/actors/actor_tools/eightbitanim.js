/**
 * This class is an abstraction of the 8 animations necessary for 
 * an animation to work from all angles. Wrapper for the Phaser.Animation class
 */
class EightBitAnim
{
    /**
     * Creates an eight bit animation. Store a reference to this and call "play()" 
     * to start it.
     * 
     * @param {Phaser.Sprite} actor the actor that this animation will belong to
     * @param {string} animName the name of the animation
     * @param {number} length the length of the animation
     */
    constructor(actor, animName, startFrame, length, directions)
    {
        this.actor = actor;
        this.startFrame = startFrame || 0;
        this.length = length;

        this.angles = {};

        for (let i = 0; i < directions.length; i++)
        {
            let frames = [];
            for (let j = this.startFrame; j < this.startFrame + this.length; j++)
            {
                frames[j] = i * length + j;
            }
            this.angles[i] = sprite.animations.add(animName + i, frames);
        }
    }

    /**
     * Starts this animation
     * 
     * @param {number} frameRate the speed at which this animation should be played (defaults to 12 fps)
     * @param {boolean} loop whether this animation should loop (defaults to false)
     */
    play(frameRate, loop)
    {
        frameRate = frameRate || 12;
        loop = false;
        this.angles[this.actor.faceDirection].play(frameRate, loop);
    }
}