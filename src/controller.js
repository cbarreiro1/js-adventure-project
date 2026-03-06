import { render, bindExitClicks, bindItemActions } from "./view.js";
import { world } from "./model.js";

export function init() {
    fetch("./db.json")
        .then(res => res.json())
        .then(data => {
            world.rooms = data.rooms;
            world.items = data.items;
            bindExitClicks(handleExitClick);
            bindItemActions(handleItemAction);
            updateView();
        })
        .catch(err => console.error(err));
}

function handleExitClick(exit) {
    if (world.rooms[exit]) {
        world.currentRoom = exit;
        world.message =
            `You are now in the ${world.rooms[exit].name}`;

        updateView();
    }
}

function updateView() {
    const room = world.rooms[world.currentRoom];

    render(room, world.message);
}

function handleItemAction(item, action) {
    if (action === "examine") {
        examineItem(item);
    }

    if (action === "take") {
        takeItem(item);
    }

    if (action == "use") {
        useItem(item);
    }
}

function examineItem(item) {
    const itemData = world.items[item];

    if (itemData) {
        world.message = itemData.description;
        updateView();
    }
}

function takeItem(item) {
    const room = world.rooms[world.currentRoom];

    if (room.items.includes(item)) {
        world.inventory.push(item);
        room.items = room.items.filter(i => i !== item);
        world.message = `You took the ${world.items[item].name}.`;
        updateView();
    }
}

function useItem(item) {
    // TODO: implement use logic
    const itemData = world.items[item];

    if (itemData) {
        world.message = `The ${itemData.name} cannot be used at the moment.`;
        updateView();
    }
}