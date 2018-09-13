// const canvas = document.getElementById('myCanvas');
// ctx = canvas.getContext('2d');

// const snake = {
//   length: 5,
//   width: 15,
//   height: 15,
//   snakeBody: [],
//   direction: 'right',
//   score: 0,
//   gamePlaying: false,
  
//   buildSnake() {
//     for (let i = 0; i < this.length; i++) {
//       this.snakeBody.push({ x: 300 - (this.width * i), y: 300 });
//     }
//   },

//   drawSnake(x, y) {
//     ctx.beginPath();
//     ctx.rect(x, y, this.width, this.height);
//     ctx.strokeStyle = 'red';
//     ctx.stroke();
//     ctx.closePath();
//   },

//   updateSnake() {
//     let head = this.snakeBody[0];

//     if (food.x == head.x && food.y == head.y) {
//       this.snakeBody.push( {x: this.snakeBody[this.length - 1].x, y: this.snakeBody[this.length - 1].y } );
//       this.length++;
//       this.score++;
//       createFood();
//     }

//     for (let i = this.snakeBody.length - 1; i > 0; i--) {
//       this.snakeBody[i].x = this.snakeBody[i - 1].x;
//       this.snakeBody[i].y = this.snakeBody[i - 1].y;
//     }

//     if (this.direction==='left') {
//       head.x -= 15;
//     } if (this.direction ==='right') {
//       head.x += 15;
//     } if (this.direction ==='down') {
//       head.y += 15;
//     } if (this.direction ==='up') {
//       head.y -= 15;
//     }

//     checkCollision(this.snakeBody);

//     if (head.x < -(this.width) || head.x > canvas.width || head.y < -(this.height) || head.y > canvas.height) {
//       gameOver();
//     }
//   }
// };

// snake.buildSnake();
// let food;

// draw = () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   for (let i = 0; i < snake.snakeBody.length; i++) {
//     snake.drawSnake(snake.snakeBody[i].x, snake.snakeBody[i].y);
//   }
//   snake.updateSnake();
//   drawFood(food.x, food.y);
//   score();
// }

// function drawFood(x, y) {
//   ctx.beginPath();
//   ctx.rect(x, y, 15, 15);
//   ctx.strokeStyle = 'yellow';
//   ctx.stroke();
//   ctx.closePath();
// }

// function createFood() {
//   food = {
//     x: Math.ceil(Math.random() * (canvas.width - 15)/15) * 15,
//     y: Math.ceil(Math.random() * (canvas.height - 15)/15) * 15
//   }

//   for (let i = 0; i < snake.snakeBody.length; i++) {
//     let snakeX = snake.snakeBody[i].x;
//     let snakeY = snake.snakeBody[i].y;

//     if (food.x === snakeX && food.y === snakeY) {
//       food.x = Math.ceil(Math.random() * (canvas.width - 15)/15) * 15;
//       food.y = Math.ceil(Math.random() * (canvas.height - 15)/15) * 15;
//     }
//   }
// }

// createFood();

// function checkCollision(array) {
//   let headX = array[0].x;
//   let headY = array[0].y;

//   for (let i = 1; i < array.length; i++) {
//     if (array[i].x === headX && array[i].y === headY) {
//       gameOver();
//     }
//   }
// }

// function score() {
//   ctx.font = '18px Arial';
//   ctx.fillStyle = 'blue';
//   ctx.fillText(`Score: ${snake.score}`, 270, 20);
// }

// function gameOver() {
//   alert('game over');
//   snake.gamePlaying = true;
//   location.reload();
// }

// document.addEventListener('keydown', (e) => {
  
//   if(e.keyCode === 37 && snake.direction !== 'right') {
//     snake.direction = 'left';
//   } else if (e.keyCode === 38 && snake.direction !== 'down') {
//     snake.direction = 'up';
//   } else if (e.keyCode === 39 && snake.direction !== 'left') {
//     snake.direction = 'right';
//   } else if (e.keyCode === 40 && snake.direction !== 'up') {
//     snake.direction = 'down';
//   }
// });

// setInterval(draw, 100);

// //refactor heavily
// //Stylinggggggg

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

class Snake {
  constructor(game) {
    this.x = 300;
    this.y = 300;
    this.color = 'red';
    this.width = 15;
    this.height = 15;
    this.length = 5;
    this.direction = 'right';
    this.gameOver = false;
    this.body = [];
    this.game = game;

    for (let i = 0; i<this.length; i++) {
      this.body.push({ x: this.x - (this.width * i), y: this.y});
    };

    document.onkeydown = (e) => this.controller(e.which);
  }
 
  draw(part) {
    ctx.beginPath();
    ctx.rect(part.x, part.y, this.width, this.height);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }  

  run(that) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    that.body.forEach(part => that.draw(part));
    that.update();
    that.checkCollision();
  }

  update() {
    let head = this.body[0];

    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }

    switch(this.direction) {
      case 'right':
        head.x += 15;
        break;
      case 'left': 
        head.x -=15;
        break;
      case 'up':
        head.y -= 15;
        break;
      case 'down':
        head.y += 15;
        break;
    }

    if(this.game.isPlaying === false) {
      endGame();
    }
  } 

  addTail() {
    let tail = this.body[this.body.length - 1];
    this.body.push({x: tail.x, y: tail.y});
  }
  
  checkCollision() {
    let head = this.body[0];

    for(let i = 1; i<this.body.length; i++) {
      if(head.x === this.body[i].x && head.y === this.body[i].y) {
        this.game.isPlaying = false;
      }
    }

    if(head.x < 0 || head.x > canvas.width - this.width || head.y < 0 || head.y > canvas.height - this.height) {
      this.game.isPlaying = false;
    }
  }

  controller(key) {
    if(key === 37 && this.direction !== 'right') {
      this.direction = 'left';
    }

    if(key === 38 && this.direction !== 'down') {
      this.direction = 'up';
    }

    if(key === 39 && this.direction !== 'left') {
      this.direction = 'right';
    }

    if(key === 40 && this.direction !== 'up') {
      this.direction = 'down';
    }
    // if(key === 13) {
    //   this.addTail();
    // }
  }
}

class Food {
  constructor() {
    this.x;
    this.y;
    this.width = 15;
    this.height = 15;
    this.color = 'yellow';
    this.generate();
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  generate() {
    this.x = Math.round(Math.random() * (canvas.width - 15)/15) * 15;
    this.y = Math.round(Math.random() * (canvas.height - 15)/15) * 15;
    this.draw();
  }
}

const createFood = (game, snake = []) => {
  game.food = new Food();

  for (let i = 0; i<snake.length; i++) {
    if(snake[i].x === game.food.x && snake[i].y === game.food.y) {
      createFood(game, snake);
    }
  }
}

const checkFoodCollision = (game) => {
  const { snake, food } = game;
  let head = snake.body[0];
  if(head.x === food.x && head.y === food.y) {
    createFood(game, snake.body);
    snake.addTail();
  }
}

const beginGame = (game) => {
  const { snake, food } = game;
  snake.run(snake);
  food.draw();
  checkFoodCollision(game);
}

const endGame = () => {
  alert('game over');
  location.reload();
}

const game = { isPlaying: true };
game.snake = new Snake(game);
createFood(game);
setInterval(beginGame, 100, game);
