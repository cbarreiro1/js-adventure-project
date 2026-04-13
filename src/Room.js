import { Container } from "./Container.js";

export class Room extends Container {
    constructor(id, name, description, parent = null) {
        super(id, name, description, parent);
        this.exitMap = {}; // Maps direction/ID to Room objects
    }

    setExit(direction, room) {
        this.exitMap[direction] = room;
    }

    getExit(direction) {
        return this.exitMap[direction];
    }

    getExitNames() {
        return Object.keys(this.exitMap);
    }
}
