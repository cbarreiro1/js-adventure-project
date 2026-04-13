import { GameObject } from "./GameObject.js";

export class Container extends GameObject {
    constructor(id, name, description, parent = null) {
        super(id, name, description, parent);
        this.contents = [];
    }

    addChild(obj) {
        if (!this.contents.includes(obj)) {
            this.contents.push(obj);
            obj.parent = this;
        }
    }

    removeChild(obj) {
        const index = this.contents.indexOf(obj);
        if (index > -1) {
            this.contents.splice(index, 1);
            obj.parent = null;
        }
    }
}
