import { Container } from "./Container.js";

export class Player extends Container {
    constructor(id = "player", name = "Player", description = "You are the player.") {
        super(id, name, description, null);
    }
}
