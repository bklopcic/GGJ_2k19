class Inventory
{
    constructor()
    {
        this.items = {};
    }

    hasItem(itemName)
    {
        return this.items.hasOwnProperty(itemName);
    }

    addItem(itemName, quantity)
    {
        quantity = quantity || 1;
        if (this.hasItem(itemName))
        {
            this.items[itemName] += quantity;
        }
        else
        {
            this.items[itemName] = quantity;
        }
        console.log(this.items);
    }

    getItemQuantity(itemName)
    {
        if (this.hasItem(itemName))
        {
            return this.items[itemName];
        }
        return 0;
    }

    removeItem(itemName, quantity)
    {
        quantity = quantity || 1;
        if (this.hasItem(itemName))
        {
            this.items[itemName] = this.items[itemName] - quantity < 0 ? 0 : this.items[itemName] - quantity;
        }
    }
}