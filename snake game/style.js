let canvas = document.getElementById("canvasGame");
let ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = {};
let score = 0;
let gameInterval;

function initializeGame() {
    clearInterval(gameInterval);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById("score").innerText = score;
    spawnFood();
    gameInterval = setInterval(updateGame, 100);
}

function spawnFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
}

function updateGame() {
    // Update snake position
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Check for collision with food
    if (head.x === food.x && head.y === food.y){
        score++;
        document.getElementById("score").innerText = score;
        snake.unshift(head); 
        spawnFood();
    } else {
        snake.unshift(head);
        snake.pop();
    }
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head)) {
        alert("Game Over! Your score: " + score);
        initializeGame();
    }

    drawGame();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);

    // Draw snake
    ctx.fillStyle = "green";
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, 20, 20);
    }
}

function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function setDirection(newDirection) {
    switch (newDirection) {
        case 'UP':
            if (direction.y === 0) direction = { x: 0, y: -20 };
            break;
        case 'DOWN':
            if (direction.y === 0) direction = { x: 0, y: 20 };
            break;
        case 'LEFT':
            if (direction.x === 0) direction = { x: -20, y: 0 };
            break;
        case 'RIGHT':
            if (direction.x === 0) direction = { x: 20, y: 0 };
            break;
    }
}
document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            setDirection('UP');
            break;
        case 'ArrowDown':
            setDirection('DOWN');
            break;
        case 'ArrowLeft':
            setDirection('LEFT');
            break;
        case 'ArrowRight':
            setDirection('RIGHT');
            break;
    }
});
