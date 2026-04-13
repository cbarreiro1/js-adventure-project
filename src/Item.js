import { GameObject } from "./GameObject.js";

export class Item extends GameObject {
    constructor(id, name, description, parent = null) {
        super(id, name, description, parent);
    }

    take(world) {
        // Move item from its current room to player inventory
        if (this.parent) {
            this.parent.removeChild(this);
        }
        world.player.addChild(this);
        return `You took the ${this.name}.`;
    }

    drop(world) {
        // Move item from player inventory to current room
        if (this.parent) {
            this.parent.removeChild(this);
        }
        world.currentRoom.addChild(this);
        return `You dropped the ${this.name}.`;
    }

    getActions(world) {
        if (this.parent === world.currentRoom) {
            return ["examine", "take"];
        } else if (this.parent === world.player) {
            return ["examine", "drop"];
        }
        return ["examine"];
    }
}
