const tailesContainer = document.querySelector(".tiles");
const infoButton = document.querySelector(".info-button"); // Select the info button element
const infoText = "This is a memory game where you need to match tiles of the same color. Click on two tiles to reveal their color. If they match, they remain revealed. If not, they will be hidden again after a brief moment. Try to match all the tiles as quickly as possible!"; // Information text

let tileCount = 4; // Initial tile count
let columns = 2; // Initial number of columns
const colors = ["DeepPink", "pink", "HotPink", "LightGreen", "DeepSkyBlue", "MediumTurquoise", "Aqua", "Aquamarine"]; // 8 colors
let colorPickList = [...colors.slice(0, tileCount / 2), ...colors.slice(0, tileCount / 2)]; // Array with half the colors duplicated

let revealedCount = 0;
let activTail = null;
let awaitingEndOfMove = false;

// Function to build a tile element
function buildTile(color) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");
        if (awaitingEndOfMove || revealed === "true" || element === activTail) {
            return;
        }

        element.style.backgroundColor = color;
        if (!activTail) {
            activTail = element;
            return;
        }

        const colorToMatch = activTail.getAttribute("data-color");
        if (colorToMatch === color) {
            activTail.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");
            activTail = null;
            awaitingEndOfMove = false;
            revealedCount += 2;

            if (revealedCount === tileCount) {
                // Reset the game for the next stage
                if (tileCount === 4) {
                    tileCount = 6;
                    columns = 3;
                    colorPickList = [...colors.slice(0, tileCount / 2), ...colors.slice(0, tileCount / 2)];
                } else if (tileCount === 6) {
                    tileCount = 16;
                    columns = 4;
                    colorPickList = [...colors, ...colors];
                } else {
                    alert("Congratulations! You've completed the game. Would you like to play again?");
                }

                revealedCount = 0;
                tailesContainer.setAttribute("data-tile-count", tileCount);
                tailesContainer.innerHTML = "";
                for (let i = 0; i < tileCount; i++) {
                    const randomIndex = Math.floor(Math.random() * colorPickList.length);
                    const color = colorPickList[randomIndex];
                    const tile = buildTile(color);
                    colorPickList.splice(randomIndex, 1);
                    tailesContainer.appendChild(tile);
                }
            }

            return;
        }

        // If colors don't match, hide the tiles again after a brief moment
        awaitingEndOfMove = true;
        setTimeout(() => {
            element.style.backgroundColor = null;
            activTail.style.backgroundColor = null;
            awaitingEndOfMove = false;
            activTail = null;
        }, 1000);
    });

    return element;
}

// Build initial tiles
tailesContainer.setAttribute("data-tile-count", tileCount);
for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorPickList.length);
    const color = colorPickList[randomIndex];
    const tile = buildTile(color);
    colorPickList.splice(randomIndex, 1);
    tailesContainer.appendChild(tile);
}

// Event listener for the info button
infoButton.addEventListener("click", () => {
    alert(infoText);
});
