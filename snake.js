window.onload = function() {
    // Get the canvas and context
    let canvas = document.getElementById('gameCanvas');
    let context = canvas.getContext('2d');

    // Define the size of each square
    let box = 20;

    // Initialize the snake as an array of squares
    let snake = [];
    snake[0] = { x: 10 * box, y: 10 * box };

    // Set the initial direction of the snake
    let direction = "RIGHT";

    // Place the first food item at a random position
    let food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    // The main draw function that draws everything on the canvas
    function draw() {
        // Clear the canvas and set its background color
        context.fillStyle = "white";
        context.fillRect(0, 0, 16 * box, 16 * box);

        // Draw the snake
        for (let i = 0; i < snake.length; i++) {
            context.fillStyle = (i == 0) ? "green" : "white";
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }

        // Draw the food
        context.fillStyle = "red";
        context.fillRect(food.x, food.y, box, box);

        // Save the head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // Update the head position based on the direction
        if (direction == "RIGHT") snakeX += box;
        if (direction == "LEFT") snakeX -= box;
        if (direction == "UP") snakeY -= box;
        if (direction == "DOWN") snakeY += box;

        // Check if the snake has eaten the food
        if (snakeX == food.x && snakeY == food.y) {
            // Create new food at a random position
            food = {
                x: Math.floor(Math.random() * 15 + 1) * box,
                y: Math.floor(Math.random() * 15 + 1) * box
            };
        } else {
            // Remove the tail of the snake
            snake.pop();
        }

        // Create the new head of the snake
        let newHead = {
            x: snakeX,
            y: snakeY
        };

        // Check if the game is over
        if (snakeX < 0 || snakeX > 15 * box || snakeY < 0 || snakeY > 15 * box || collision(newHead, snake)) {
            clearInterval(game);
        }

        // Add the new head to the snake
        snake.unshift(newHead);
    }

    // Update the direction based on the key pressed
    function directionUpdate(event) {
        let key = event.keyCode;
        if (key == 37 && direction != "RIGHT") {
            direction = "LEFT";
        } else if (key == 38 && direction != "DOWN") {
            direction = "UP";
        } else if (key == 39 && direction != "LEFT") {
            direction = "RIGHT";
        } else if (key == 40 && direction != "UP") {
            direction = "DOWN";
        }
    }

    // Check if the head collides with the body of the snake
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    // Listen to keydown events
    document.addEventListener('keydown', directionUpdate);

    // Call the draw function every 100 ms
    let game = setInterval(draw, 100);
}