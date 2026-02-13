// Model
const world = {
    currentRoomID: "cockpit",
    rooms: null
};

let rooms = []

// Controller
const roomNameEl = document.querySelector("#room-name");
const roomDescEl = document.querySelector("#room-desc");

async function init() {
    fetch("./db.json")
        .then(res => res.json())
        .then(data => {
            rooms = data.rooms
            world.rooms = data.rooms
            render()
        })
        .catch(err => console.error(err))
}


// View
function render() {
    const room = world.rooms[world.currentRoomID];
    if (!room) {
        return;
    }

    roomNameEl.textContent = room.name;
    roomDescEl.textContent = room.description;

}

init()