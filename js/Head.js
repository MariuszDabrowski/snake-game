class Head {
  constructor(game) {
    this.game = game;

    this.lastPosition = {y: 0,  x:0};
    this.position = {y: 0,  x:0};
    this.rotation = 90;
    this.element = document.querySelector('#head');
    this.headContainer = document.querySelector('.head-container');
  }

  nextPosition() {
    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;

    if (this.game.direction === 'right') {
      this.position.x += this.game.stepSize;
    } else if (game.direction === 'left') {
      this.position.x -= this.game.stepSize;
    } else if (game.direction === 'down') {
      this.position.y += this.game.stepSize;
    } else if (game.direction === 'up') {
      this.position.y -= this.game.stepSize;
    }
  }

  move() {
    this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px) translateZ(0)`;
  }

  detectCollision() {
    // Collision with mouse
    if (this.position.x === this.game.mouse.position.x && this.position.y === this.game.mouse.position.y) {
      this.element.classList.toggle('mouth-open');
      this.game.mouse.element.classList.remove('mouse-wrapper--active');
      setTimeout(() => {
        this.game.body.addNode();
        this.game.mouse.spawn();
        this.element.classList.toggle('mouth-open');
      }, 200);
    }

    // Collision with the snake
    this.game.body.iterateNodes(function (node) {
      if (
        node.position.x === this.position.x &&
        node.position.y === this.position.y
      ) {
        this.game.endGame();
      }
    }.bind(this));

    // Collision with game board
    if (this.position.y < 0) this.game.endGame()
    if (this.position.y > this.game.boardSize.height - this.element.clientHeight) this.game.endGame()
    if (this.position.x < 0) this.game.endGame()
    if (this.position.x > this.game.boardSize.width - this.element.clientHeight) this.game.endGame()
  }

  rotate(currentDirection, nextDirection) {
    if (currentDirection === 'down') {
      if (nextDirection === 'right') this.rotation -= 90;
      if (nextDirection === 'left') this.rotation += 90;
    }

    if (currentDirection === 'up') {
      if (nextDirection === 'right') this.rotation += 90;
      if (nextDirection === 'left') this.rotation -= 90;
    }

    if (currentDirection === 'left') {
      if (nextDirection === 'up') this.rotation += 90;
      if (nextDirection === 'down') this.rotation -= 90;
    }

    if (currentDirection === 'right') {
      if (nextDirection === 'up') this.rotation -= 90;
      if (nextDirection === 'down') this.rotation += 90;
    }

    this.headContainer.style.transform = `rotate(${this.rotation}deg)`;
  }
}
