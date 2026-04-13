import { Room } from "./Room.js";
import { Item } from "./Item.js";
import { Player } from "./Player.js";

export const world = {
    currentRoom: null,
    player: null,
    rooms: new Map(),
    items: new Map(),
    currentMessage: ""
};

export async function loadWorld() {
    try {
        const response = await fetch("./db.json");
        const data = await response.json();

        // Create all objects
        createAllRooms(data.rooms);
        createAllItems(data.items);
        createPlayer();

        // Rebuild relationships
        connectRoomExits(data.rooms);
        placeItemsInRooms(data.rooms);
        placePlayerInStartingRoom(data.rooms);

        return world;
    } catch (err) {
        console.error("Error loading world:", err);
        throw err;
    }
}

function createAllRooms(roomsData) {
    for (const [roomId, roomData] of Object.entries(roomsData)) {
        const room = new Room(
            roomId,
            roomData.name,
            roomData.description
        );
        world.rooms.set(roomId, room);
    }
}

function createAllItems(itemsData) {
    for (const [itemId, itemData] of Object.entries(itemsData)) {
        const item = new Item(
            itemId,
            itemData.name,
            itemData.description
        );
        world.items.set(itemId, item);
    }
}

function createPlayer() {
    world.player = new Player();
}

function connectRoomExits(roomsData) {
    for (const [roomId, roomData] of Object.entries(roomsData)) {
        const room = world.rooms.get(roomId);
        if (roomData.exits) {
            for (const exitId of roomData.exits) {
                const exitRoom = world.rooms.get(exitId);
                if (exitRoom) {
                    room.setExit(exitId, exitRoom);
                }
            }
        }
    }
}

function placeItemsInRooms(roomsData) {
    for (const [roomId, roomData] of Object.entries(roomsData)) {
        const room = world.rooms.get(roomId);
        if (roomData.items) {
            for (const itemId of roomData.items) {
                const item = world.items.get(itemId);
                if (item) {
                    room.addChild(item);
                }
            }
        }
    }
}

function placePlayerInStartingRoom(roomsData) {
    // Place player in the first room or default to controlRoom
    const startingRoomId = Object.keys(roomsData)[0];
    const startingRoom = world.rooms.get(startingRoomId) || world.rooms.get("controlRoom");
    if (startingRoom) {
        world.currentRoom = startingRoom;
    }
}