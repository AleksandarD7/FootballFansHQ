// Script za navbar

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
document.getElementById("default").click()





// // Script za SnakeGame
// var canvas = document.getElementById("snake");
// var canvas2d = canvas.getContext("2d");
// var gameEnded = false;
// canvas.width = 700;
// canvas.height = 700;
// var snakeSegments = [];
// var snakeLength = 1;
// var snakeX = 0;
// var snakeY = 0;
// var directionX = 10;
// var directionY = 0;
// var dots = [];


// function moveSnake() {
//     snakeSegments.unshift({ x: snakeX, y: snakeY });
//     snakeX += directionX;
//     snakeY += directionY;
// }

// function drawSnake() {
//     canvas2d.clearRect(0, 0, canvas.width, canvas.height);
//     canvas2d.fillStyle = "black";
//     for (var i = 0; i < snakeSegments.length; i++) {
//         canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 16, 16);
//         while (snakeSegments.length > snakeLength) {
//             snakeSegments.pop();
//         }

//     }
// }

// document.onkeydown = function (event) {
//     switch (event.keyCode) {
//         case 37: // Left arrow
//             directionX = -10;
//             directionY = 0;
//             break;
//         case 38: // Up arrow
//             directionX = 0;
//             directionY = -10;
//             break;
//         case 39: // Right arrow
//             directionX = 10;
//             directionY = 0;
//             break;
//         case 40: // Down arrow
//             directionX = 0;
//             directionY = 10;
//             break;
//     }
// };

// function gameLoop() {
//     moveSnake();
//     drawSnake();
//     spawnDots();
//     checkCollision();
//     if (!gameEnded) {
//         setTimeout(gameLoop, 100);
//     }
// }
// gameLoop();


// function spawnDots() {
//     if (dots.length < 12) {
//         var dotX = Math.floor(Math.random() * canvas.width);
//         var dotY = Math.floor(Math.random() * canvas.height);
//         dots.push({ x: dotX, y: dotY });
//     }
//     for (var i = 0; i < dots.length; i++) {
//         canvas2d.fillStyle = "red";
//         canvas2d.fillRect(dots[i].x, dots[i].y, 14, 14);
//     }
// }


// function checkCollision() {
//     for (var i = 0; i < dots.length; i++) {
//         if (snakeX < dots[i].x + 10 &&
//             snakeX + 10 > dots[i].x &&
//             snakeY < dots[i].y + 10 &&
//             snakeY + 10 > dots[i].y) {
//             snakeLength++;
//             dots.splice(i, 1);
//         }
//     }

//     if (snakeX < -10 ||
//         snakeY < -10 ||
//         snakeX > canvas.width + 10 ||
//         snakeY > canvas.height + 10) {
//         gameOver();
//     }



//     for (var i = 1; i < snakeSegments.length; i++) {
//         if (snakeX === snakeSegments[i].x && snakeY === snakeSegments[i].y) {
//             gameOver();
//         }

//     }


// }


// function gameOver() {
//     setTimeout(function () {
//         alert("Game over!");
//     }, 500);
//     gameEnded = true

// }


const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const changeDirection = e => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); 
        score++; 
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    snakeX += velocityX;
    snakeY += velocityY;
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; 

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);