const canvas = document.getElementById('gameWindow');
const ctx = canvas.getContext('2d');

let playerPosX = 0;
let playerPosY = -100;

let playerVelX = 0;
let playerVelY = 0;

let cameraPosX = -canvas.clientWidth / 2;
let cameraPosY = -canvas.clientHeight / 2;

const floorY = 10;

let aIsPressed = false;
let dIsPressed = false;
let spaceIsPressed = false;

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "a":
            aIsPressed = true;
            break;
        case "d":
            dIsPressed = true;
            break;
        case " ":
            spaceIsPressed = true;
            break;
    }
})

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "a":
            aIsPressed = false;
            break;
        case "d":
            dIsPressed = false;
            break;
        case " ":
            spaceIsPressed = false;
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

    // gravity
    playerVelY += deltaTime / 100;

    // jump
    if (playerPosY == 0 && spaceIsPressed) playerVelY = -8;

    // movement
    if (aIsPressed && !dIsPressed) playerVelX = deltaTime / 200 * -5 + (1 - deltaTime / 200) * playerVelX;
    else if (dIsPressed && !aIsPressed) playerVelX = deltaTime / 200 * 5 + (1 - deltaTime / 200) * playerVelX;
    else playerVelX = (1 - deltaTime / 200) * playerVelX;

    // update position
    playerPosX += playerVelX;
    playerPosY += playerVelY;

    // floor collision
    if (playerPosY > 0) {
        playerPosY = 0;
        playerVelY = 0;
    }

    // adjust camera
    let rate = deltaTime / 200;
    if (cameraPosX < playerPosX - canvas.clientWidth + 200) {
        cameraPosX += rate * (playerPosX - canvas.clientWidth + 200 - cameraPosX);
    } else if (cameraPosX > playerPosX - 200) {
        cameraPosX -= rate * (cameraPosX - (playerPosX - 200));
    }
    if (cameraPosY < playerPosY - canvas.clientHeight + 150) {
        cameraPosY += rate * (playerPosY - canvas.clientHeight + 150 - cameraPosY);
    } else if (cameraPosY > playerPosY - 150) {
        cameraPosY -= rate * (cameraPosY - (playerPosY - 150));
    }

}

function render() {

    // draw background
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // draw floor
    ctx.fillStyle = "black";
    ctx.fillRect(0, floorY - cameraPosY, canvas.clientWidth, canvas.clientHeight);

    // draw house
    ctx.fillStyle = "yellow";
    ctx.fillRect(-40 - cameraPosX, -70 - cameraPosY, 80, 80);
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(-60 - cameraPosX, -70 - cameraPosY);
    ctx.lineTo(60 - cameraPosX, -70 - cameraPosY);
    ctx.lineTo(-cameraPosX, -100 - cameraPosY);
    ctx.lineTo(-60 - cameraPosX, -70 - cameraPosY);
    ctx.fill();

    // draw player
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(playerPosX - cameraPosX, playerPosY - cameraPosY, 10, 0, 2 * Math.PI);
    ctx.fill();

}