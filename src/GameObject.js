export class GameObject {
    constructor(id, name, description, parent = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.parent = parent;
    }

    examine() {
        return this.description;
    }

    getActions() {
        return [];
    }
}