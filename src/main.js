// Model
const world = {
    currentRoom: "controlRoom",
    rooms: null,
    transitionMessage: ""
};

// Controller
const roomNameEl = document.querySelector("#room-name");
const roomDescEl = document.querySelector("#room-desc");
const roomExitsEl = document.querySelector("#room-exits");
const messageAreaEl = document.querySelector("#message-area");

roomExitsEl.addEventListener("click", (e) => {
    e.preventDefault();
    const nextRoom = e.target.dataset.exit;
    if (nextRoom && world.rooms[nextRoom]) {
        world.currentRoom = nextRoom;
        world.transitionMessage = `You are now in the ${world.rooms[world.currentRoom].name}`;
        render();
    }
})

async function init() {
    fetch("./db.json")
        .then(res => res.json())
        .then(data => {
            rooms = data.rooms;
            world.rooms = data.rooms;
            render();
        })
        .catch(err => console.error(err));
}

function createExit(exit) {
    return `<a href="#" data-exit="${exit}" class="exit">${world.rooms[exit].name}</a>`;
}

function createMessage(message) {
    return `<p class="message">${message}</p>`;
}

// View
function render() {
    const room = world.rooms[world.currentRoom];
    if (!room) {
        return;
    }

    exits = room.exits;

    roomNameEl.textContent = room.name;
    roomDescEl.textContent = room.description;
    roomExitsEl.innerHTML = room.exits.map(exit => {
        return createExit(exit);
    }).join(" ");
    messageAreaEl.innerHTML = createMessage(world.transitionMessage)
}

init()