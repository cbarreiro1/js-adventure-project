import { world } from "./model.js";

const roomNameEl = document.querySelector("#room-name");
const roomDescEl = document.querySelector("#room-desc");
const roomExitsEl = document.querySelector("#room-exits");
const roomItemsEl = document.querySelector("#room-items");
const messageAreaEl = document.querySelector("#message-area");
const inventoryEl = document.querySelector("#inventory");

export function render(room, message) {
    roomNameEl.textContent = room.name;
    roomDescEl.textContent = room.description;

    roomExitsEl.innerHTML = "Exits: " + room.exits
        .map(createExit)
        .join(" ");

    roomItemsEl.innerHTML = "Items: " + room.items
        .map(item => createItem(item, ["examine", "take"]))
        .join(" ");

    messageAreaEl.innerHTML = createMessage(message);

    inventoryEl.innerHTML = world.inventory
        .map(item => createItem(item, ["examine", "use"]))
        .join(" ");
}

function createExit(exit) {
    return `<a href="#" data-exit="${exit}" class="exit">${world.rooms[exit].name}</a>`;
}

function createItem(item, actions) {
    const buttons = actions
        .map(action => `<button data-action="${action}">${capitalize(action)}</button>`)
        .join("");

    return `
        <div class="item-box" data-item="${item}">
            <a href="#" class="item">${world.items[item].name}</a>
            <div class="item-menu" hidden>
                ${buttons}
            </div>
        </div>
    `;
}

function createMessage(message) {
    return `<p class="message">${message}</p>`;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function bindExitClicks(handler) {
    roomExitsEl.addEventListener("click", (e) => {
        e.preventDefault();

        const exit = e.target.dataset.exit;

        if (exit) {
            handler(exit);
        }
    });
}

export function bindItemActions(handler) {

    bindContainer(roomItemsEl, handler);
    bindContainer(inventoryEl, handler);

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".item-box")) {
            hideAllMenus();
        }
    });
}

function bindContainer(container, handler) {

    container.addEventListener("click", (e) => {
        e.preventDefault();

        const itemLink = e.target.closest(".item");
        const actionBtn = e.target.closest("[data-action]");

        // ITEM CLICK
        if (itemLink) {
            const box = itemLink.closest(".item-box");
            const menu = box.querySelector(".item-menu");

            hideAllMenus();
            menu.hidden = false;
            return;
        }

        // ACTION CLICK
        if (actionBtn) {
            const box = actionBtn.closest(".item-box");
            const item = box.dataset.item;
            const action = actionBtn.dataset.action;

            handler(item, action);

            hideAllMenus();
        }
    });
}

function hideAllMenus() {
    document.querySelectorAll(".item-menu").forEach(menu => {
        menu.hidden = true;
    });
}