class Game {
  constructor() {
    this.mouse = new Mouse(this);
    this.head = new Head(this);
    this.body = new Body(this);

    this.board = document.getElementById('board');
    this.boardSize = {
      height: this.board.clientHeight,
      width: this.board.clientWidth
    };

    this.gameOver = false;
    this.interval;
    this.gameSpeed = 200;
    this.stepSize = 50;
    this.direction = 'right';
  }
  
  initialize() {
    this.addGameControls();
    this.mouse.initialize();
    this.mouse.spawn();
    
    // Start the game loop
    this.interval = setInterval(this.update.bind(this), this.gameSpeed);
  }

  addGameControls() {
    document.body.addEventListener('keydown', keyPressed.bind(this));

    function keyPressed(e) {
      if (this.gameOver) return;

      if (e.keyCode === 37 ) { // left
        if(this.direction !== 'right') {
          this.head.rotate(this.direction, 'left');
          this.direction = 'left';
        }
      } else if (e.keyCode === 39) { //right
        if (this.direction !== 'left') {
          this.head.rotate(this.direction, 'right');
          this.direction = 'right';
        }
      } else if (e.keyCode === 38) { //up
        if (this.direction !== 'down') {
          this.head.rotate(this.direction, 'up');
          this.direction = 'up';
        }
      } else if (e.keyCode === 40) { //down
        if (this.direction !== 'up') {
          this.head.rotate(this.direction, 'down');
          this.direction = 'down';
        }
      }
    }
  }

  update() {
    this.head.nextPosition();
    this.body.updateNodePositions();
    this.head.detectCollision();

    if (!this.gameOver) {
      this.head.move();
      this.body.moveNodes();
    }
  }

  endGame() {
    this.gameOver = true;
    clearInterval(this.interval);
    this.killSnake();
  }

  killSnake() {
    const snakeHead = document.querySelector('#head');
    const snakeNodes = document.querySelectorAll('.snake-node');

    const killSnake = gsap.timeline();
    killSnake.to([snakeHead, ...snakeNodes], {
      scale: 0.001,
      stagger: {
        each: 0.05,
        from: 'start',
        ease: 'linear'
      }
    });
  }

  randomPosition() {
    const possibleStepsHeight = this.boardSize.height / this.stepSize
    const possibleStepsWidth = this.boardSize.width / this.stepSize

    const x = Math.floor(possibleStepsWidth * Math.random()) * this.stepSize
    const y = Math.floor(possibleStepsHeight * Math.random()) * this.stepSize

    return {x, y}
  }
}

// ---------------
// Start the game!
// ---------------

const game = new Game();
game.initialize();