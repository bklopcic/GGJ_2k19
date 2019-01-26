const Messager = {
    messages: [
        {x: 100, y: 0, text:"What's an actor?"},
        {x: -300, y: -100, text:"What do actors do?"},
        {x: -70, y: -150, text: ["Those actors", "are boring."]},
        {x: -100, y: -160, text:["How do you manage all those different", "structures in your code?"]},
        {x: -400, y: -70, text:["That's a lot of objects...","won't your computer", "slow down?"]},
        {x: 70, y: -70, text:["Even so there's", "a lot of things", "in your world."]},
        {x: 80, y: -30, text:["It's a lot of data", "to have to generate..."]},
        {x: -70, y: 150, text:["It's ok, would be", "better with airships."]}
    ],

    currIdx: 0,

    getMessage: function()
    {
        if (this.currIdx >= this.messages.length) return {x:0, y:0, text:""};
        const msg = this.messages[this.currIdx];
        this.currIdx++;
        return msg;
    }
}