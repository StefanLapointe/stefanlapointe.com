const canvas = document.getElementById('gameWindow');
const ctx = canvas.getContext('2d');

let playerX = 300;
let playerY = 200;

let wIsPressed = false;
let aIsPressed = false;
let sIsPressed = false;
let dIsPressed = false;

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            wIsPressed = true;
            break;
        case "a":
            aIsPressed = true;
            break;
        case "s":
            sIsPressed = true;
            break;
        case "d":
            dIsPressed = true;
            break;
    }
})

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "w":
            wIsPressed = false;
            break;
        case "a":
            aIsPressed = false;
            break;
        case "s":
            sIsPressed = false;
            break;
        case "d":
            dIsPressed = false;
            break;
    }
})

let prevTime;
let currTime = performance.now();

requestAnimationFrame(gameLoop);

function gameLoop() {
    prevTime = currTime;
    currTime = performance.now();
    update(currTime - prevTime);
    render();
    requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    if (wIsPressed) playerY -= deltaTime;
    if (aIsPressed) playerX -= deltaTime;
    if (sIsPressed) playerY += deltaTime;
    if (dIsPressed) playerX += deltaTime;
    playerX = Math.max(0, playerX);
    playerX = Math.min(playerX, canvas.clientWidth);
    playerY = Math.max(0, playerY);
    playerY = Math.min(playerY, canvas.clientHeight);
}

function render() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(playerX, playerY, 10, 0, 2 * Math.PI);
    ctx.fill();
}