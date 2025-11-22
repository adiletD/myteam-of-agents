// =====================
// Type Definitions & Constants
// =====================

const GRID_SIZE = 20; // 20x20 grid
const CELL_SIZE = 25; // Each cell is 25px
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // 500px x 500px
const GAME_SPEED = 150; // Move every 150ms (moderate speed for kids)

// Directions
const DIRECTION = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Colors for numbers (kid-friendly, bright colors)
const NUMBER_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8C42', '#95E1D3', '#F38181'];

// =====================
// Game State
// =====================

let gameState = {
    snake: [],
    direction: DIRECTION.RIGHT,
    nextDirection: DIRECTION.RIGHT,
    foods: [], // Array of food items with position and value
    currentProblem: { num1: 0, num2: 0, answer: 0 },
    score: 0,
    gameOver: false,
    gamePaused: true,
    gameLoop: null
};

// =====================
// DOM Elements
// =====================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const problemText = document.getElementById('problem-text');
const gameOverModal = document.getElementById('gameOverModal');
const startModal = document.getElementById('startModal');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const finalScoreElement = document.getElementById('finalScore');
const encouragementElement = document.getElementById('encouragementMessage');

// Set canvas size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// =====================
// Utility Functions
// =====================

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosition() {
    return {
        x: getRandomInt(0, GRID_SIZE - 1),
        y: getRandomInt(0, GRID_SIZE - 1)
    };
}

function isPositionOccupied(pos) {
    // Check if position is occupied by snake
    for (let segment of gameState.snake) {
        if (segment.x === pos.x && segment.y === pos.y) {
            return true;
        }
    }
    // Check if position is occupied by food
    for (let food of gameState.foods) {
        if (food.x === pos.x && food.y === pos.y) {
            return true;
        }
    }
    return false;
}

function getRandomFreePosition() {
    let pos;
    let attempts = 0;
    do {
        pos = getRandomPosition();
        attempts++;
        if (attempts > 100) {
            // Fallback: return any position if board is too full
            return getRandomPosition();
        }
    } while (isPositionOccupied(pos));
    return pos;
}

// =====================
// Math Problem Generation
// =====================

function generateMathProblem() {
    // Single digit addition (0-9 + 0-9)
    const num1 = getRandomInt(0, 9);
    const num2 = getRandomInt(0, 9);
    const answer = num1 + num2;
    
    return { num1, num2, answer };
}

function generateWrongAnswers(correctAnswer, count = 3) {
    const wrongAnswers = new Set();
    
    while (wrongAnswers.size < count) {
        // Generate numbers close to the correct answer (within ±5)
        const offset = getRandomInt(-5, 5);
        const wrongAnswer = correctAnswer + offset;
        
        // Make sure it's different from correct answer and in valid range
        if (wrongAnswer !== correctAnswer && wrongAnswer >= 0 && wrongAnswer <= 20) {
            wrongAnswers.add(wrongAnswer);
        }
    }
    
    return Array.from(wrongAnswers);
}

function updateProblemDisplay() {
    const { num1, num2 } = gameState.currentProblem;
    problemText.textContent = `${num1} + ${num2} = ?`;
}

// =====================
// Food Management
// =====================

function spawnFoods() {
    gameState.foods = [];
    
    const correctAnswer = gameState.currentProblem.answer;
    const wrongAnswers = generateWrongAnswers(correctAnswer, 3);
    
    // Add correct answer
    const correctPos = getRandomFreePosition();
    gameState.foods.push({
        x: correctPos.x,
        y: correctPos.y,
        value: correctAnswer,
        isCorrect: true,
        color: NUMBER_COLORS[getRandomInt(0, NUMBER_COLORS.length - 1)]
    });
    
    // Add wrong answers
    wrongAnswers.forEach(wrongAnswer => {
        const pos = getRandomFreePosition();
        gameState.foods.push({
            x: pos.x,
            y: pos.y,
            value: wrongAnswer,
            isCorrect: false,
            color: NUMBER_COLORS[getRandomInt(0, NUMBER_COLORS.length - 1)]
        });
    });
}

// =====================
// Snake Initialization
// =====================

function initializeSnake() {
    // Start snake in the middle, 3 segments long
    const startX = Math.floor(GRID_SIZE / 2);
    const startY = Math.floor(GRID_SIZE / 2);
    
    gameState.snake = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY }
    ];
    
    gameState.direction = DIRECTION.RIGHT;
    gameState.nextDirection = DIRECTION.RIGHT;
}

// =====================
// Game Initialization
// =====================

function initializeGame() {
    gameState.score = 0;
    gameState.gameOver = false;
    gameState.gamePaused = false;
    
    initializeSnake();
    gameState.currentProblem = generateMathProblem();
    updateProblemDisplay();
    spawnFoods();
    updateScore();
    
    // Hide modals
    startModal.classList.add('hidden');
    gameOverModal.classList.add('hidden');
}

// =====================
// Input Handling
// =====================

document.addEventListener('keydown', (e) => {
    if (gameState.gamePaused && e.code === 'Space') {
        return;
    }
    
    const key = e.key.toLowerCase();
    const currentDir = gameState.direction;
    
    // Prevent moving backwards into itself
    switch (key) {
        case 'arrowup':
        case 'w':
            if (currentDir !== DIRECTION.DOWN) {
                gameState.nextDirection = DIRECTION.UP;
            }
            e.preventDefault();
            break;
        case 'arrowdown':
        case 's':
            if (currentDir !== DIRECTION.UP) {
                gameState.nextDirection = DIRECTION.DOWN;
            }
            e.preventDefault();
            break;
        case 'arrowleft':
        case 'a':
            if (currentDir !== DIRECTION.RIGHT) {
                gameState.nextDirection = DIRECTION.LEFT;
            }
            e.preventDefault();
            break;
        case 'arrowright':
        case 'd':
            if (currentDir !== DIRECTION.LEFT) {
                gameState.nextDirection = DIRECTION.RIGHT;
            }
            e.preventDefault();
            break;
    }
});

// =====================
// Game Logic
// =====================

function moveSnake() {
    // Update direction
    gameState.direction = gameState.nextDirection;
    
    // Calculate new head position
    const head = gameState.snake[0];
    const newHead = {
        x: head.x + gameState.direction.x,
        y: head.y + gameState.direction.y
    };
    
    // Check wall collision
    if (newHead.x < 0 || newHead.x >= GRID_SIZE || 
        newHead.y < 0 || newHead.y >= GRID_SIZE) {
        endGame();
        return;
    }
    
    // Check self collision
    for (let segment of gameState.snake) {
        if (segment.x === newHead.x && segment.y === newHead.y) {
            endGame();
            return;
        }
    }
    
    // Add new head
    gameState.snake.unshift(newHead);
    
    // Check food collision
    let ateFood = false;
    let ateCorrectFood = false;
    
    for (let i = 0; i < gameState.foods.length; i++) {
        const food = gameState.foods[i];
        if (newHead.x === food.x && newHead.y === food.y) {
            ateFood = true;
            
            if (food.isCorrect) {
                // Correct answer!
                ateCorrectFood = true;
                gameState.score++;
                updateScore();
                
                // Generate new problem and foods
                gameState.currentProblem = generateMathProblem();
                updateProblemDisplay();
                spawnFoods();
            } else {
                // Wrong answer - game over
                endGame();
                return;
            }
            
            break;
        }
    }
    
    // If didn't eat food, remove tail (snake moves forward)
    if (!ateCorrectFood) {
        gameState.snake.pop();
    }
    // If ate correct food, tail stays (snake grows)
}

function updateScore() {
    scoreElement.textContent = gameState.score;
}

function getEncouragementMessage(score) {
    if (score === 0) return "Don't give up! Try again!";
    if (score < 3) return "Good start! Keep going!";
    if (score < 5) return "Nice work! You're learning!";
    if (score < 10) return "Great job! You're doing awesome!";
    if (score < 15) return "Fantastic! You're a math star!";
    return "AMAZING! You're a math genius! 🌟";
}

function endGame() {
    gameState.gameOver = true;
    gameState.gamePaused = true;
    
    if (gameState.gameLoop) {
        clearInterval(gameState.gameLoop);
    }
    
    // Show game over modal
    finalScoreElement.textContent = gameState.score;
    encouragementElement.textContent = getEncouragementMessage(gameState.score);
    gameOverModal.classList.remove('hidden');
}

// =====================
// Rendering
// =====================

function drawGrid() {
    ctx.strokeStyle = '#E8E8D0';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= GRID_SIZE; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
        ctx.stroke();
        
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }
}

function drawSnake() {
    gameState.snake.forEach((segment, index) => {
        const x = segment.x * CELL_SIZE;
        const y = segment.y * CELL_SIZE;
        
        // Draw snake segment with rounded corners
        ctx.fillStyle = index === 0 ? '#45a049' : '#4CAF50'; // Head is slightly darker
        ctx.strokeStyle = '#2E7D32';
        ctx.lineWidth = 2;
        
        // Rounded rectangle
        const radius = 8;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + CELL_SIZE - radius, y);
        ctx.quadraticCurveTo(x + CELL_SIZE, y, x + CELL_SIZE, y + radius);
        ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE - radius);
        ctx.quadraticCurveTo(x + CELL_SIZE, y + CELL_SIZE, x + CELL_SIZE - radius, y + CELL_SIZE);
        ctx.lineTo(x + radius, y + CELL_SIZE);
        ctx.quadraticCurveTo(x, y + CELL_SIZE, x, y + CELL_SIZE - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw eyes on head
        if (index === 0) {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(x + 10, y + 10, 3, 0, Math.PI * 2);
            ctx.arc(x + CELL_SIZE - 10, y + 10, 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(x + 10, y + 10, 1.5, 0, Math.PI * 2);
            ctx.arc(x + CELL_SIZE - 10, y + 10, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

function drawFoods() {
    gameState.foods.forEach(food => {
        const x = food.x * CELL_SIZE;
        const y = food.y * CELL_SIZE;
        
        // Draw circle background
        ctx.fillStyle = food.color;
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        
        ctx.beginPath();
        ctx.arc(x + CELL_SIZE / 2, y + CELL_SIZE / 2, CELL_SIZE / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Draw number
        ctx.fillStyle = 'white';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Outline for readability
        ctx.strokeText(food.value.toString(), x + CELL_SIZE / 2, y + CELL_SIZE / 2);
        ctx.fillText(food.value.toString(), x + CELL_SIZE / 2, y + CELL_SIZE / 2);
    });
}

function render() {
    // Clear canvas
    ctx.fillStyle = '#F5F5DC';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw grid
    drawGrid();
    
    // Draw game elements
    drawFoods();
    drawSnake();
}

// =====================
// Game Loop
// =====================

function gameLoop() {
    if (gameState.gameOver || gameState.gamePaused) {
        return;
    }
    
    moveSnake();
    render();
}

function startGameLoop() {
    if (gameState.gameLoop) {
        clearInterval(gameState.gameLoop);
    }
    
    render(); // Initial render
    gameState.gameLoop = setInterval(gameLoop, GAME_SPEED);
}

// =====================
// Event Listeners
// =====================

startButton.addEventListener('click', () => {
    initializeGame();
    startGameLoop();
});

restartButton.addEventListener('click', () => {
    initializeGame();
    startGameLoop();
});

// =====================
// Initialize on Load
// =====================

window.addEventListener('load', () => {
    // Show start modal
    startModal.classList.remove('hidden');
    
    // Draw initial empty canvas
    render();
});

