const canvas = document.getElementById('myCanvas'),
      ctx = canvas.getContext('2d'),
      button = document.getElementsByTagName('button')[0];

class Snake {
  constructor(game) {
    this.x = 300;
    this.y = 300;
    this.color = 'red';
    this.width = 15;
    this.height = 15;
    this.length = 5;
    this.direction = 'right';
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
    game.score++;
  }
}

const drawScore = (game) => {
  ctx.font = '18px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText(`Score: ${game.score}`, 270, 20);
}

const beginGame = (game) => {
  const { snake, food } = game;
  snake.run(snake);
  food.draw();
  checkFoodCollision(game);
  drawScore(game);
}

const endGame = () => {
  alert('game over');
  location.reload();
}

const init = () => {
  const game = { isPlaying: true, score: 0 };
  game.snake = new Snake(game);
  createFood(game);
  setInterval(beginGame, 100, game);
}

button.addEventListener('click', () => {
  button.classList.toggle('hide');
  init();
});
