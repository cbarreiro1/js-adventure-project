import { render, bindExitClicks, bindItemActions } from "./view.js";
import { world, loadWorld } from "./model.js";

export async function init() {
    try {
        // Load and build the world from db.json
        await loadWorld();

        // Bind event handlers
        bindExitClicks(handleExitClick);
        bindItemActions(handleItemAction);

        // Initial render
        updateView();
    } catch (err) {
        console.error("Failed to initialize game:", err);
    }
}

function handleExitClick(exitId) {
    const nextRoom = world.currentRoom.getExit(exitId);

    if (nextRoom) {
        world.currentRoom = nextRoom;
        world.currentMessage = `You are now in the ${nextRoom.name}`;
        updateView();
    }
}

function updateView() {
    render(world.currentRoom, world.currentMessage, world.player);
}

function handleItemAction(itemId, action) {
    const item = world.items.get(itemId);

    if (!item) {
        return;
    }

    if (action === "examine") {
        examineItem(item);
    } else if (action === "take") {
        takeItem(item);
    } else if (action === "drop") {
        dropItem(item);
    } else if (action === "use") {
        useItem(item);
    }
}

function examineItem(item) {
    world.currentMessage = item.examine(world);
    updateView();
}

function takeItem(item) {
    // Check if item is in current room
    if (item.parent === world.currentRoom) {
        world.currentMessage = item.take(world);
        updateView();
    }
}

function dropItem(item) {
    // Check if item is in player inventory
    if (item.parent === world.player) {
        world.currentMessage = item.drop(world);
        updateView();
    }
}

function useItem(item) {
    // TODO: implement use logic
    world.currentMessage = `The ${item.name} cannot be used at the moment.`;
    updateView();
}