class Head {
  constructor(game) {
    this.game = game;

    this.lastPosition = {y: 0,  x:0};
    this.position = {y: 0,  x:0};
    this.element;
  }

  initialize() {
    this.element = document.createElement('div');
    this.element.setAttribute('id', 'head');
    this.element.style.transform = `translate(${this.position.y}px, ${this.position.x}px)`;
    this.headContainer = document.createElement('div');
    this.headContainer.classList.add('head-container');
    this.headContainer.style.transform = `rotate(90deg)`;
    this.headContainer.innerHTML = `
      <svg class="snake-mouth" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 117.1 117.1" style="enable-background:new 0 0 117.1 117.1;" xml:space="preserve">
        <circle class="snake-mouth__mouth-bottom" cx="58.5" cy="58.5" r="58.5"/>
        <path class="snake-mouth__gums" d="M4.7,58.5C-1.5,42.6,21.6,4.7,58.5,4.7s60,37.9,53.8,53.8C102.9,82.9,14.1,82.9,4.7,58.5z"/>
        <circle class="snake-mouth__tooth-left" cx="53.5" cy="10.7" r="3.9"/>
        <circle class="snake-mouth__tooth-right" cx="63.5" cy="10.7" r="3.9"/>
      </svg>
      <svg class="snake-head" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 117.1 117.1" style="enable-background:new 0 0 117.1 117.1;" xml:space="preserve">
        <circle class="snake-head__head" cx="58.5" cy="58.5" r="58.5"/>
        <circle class="snake-head__eye-left" cx="39" cy="41.4" r="12.3"/>
        <circle class="snake-head__pupil-left" cx="39" cy="37.4" r="3.2"/>
        <circle class="snake-head__eye-right" cx="79" cy="41.4" r="12.3"/>
        <circle class="snake-head__pupil-right" cx="79" cy="37.4" r="3.2"/>
      </svg>
    `;

    this.element.appendChild(this.headContainer);
    this.game.board.appendChild(this.element);
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
    this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
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
    let currentAngle = Number(this.headContainer.style.transform.replace('rotate(', '').replace('deg)', ''));

    if (currentDirection === 'down') {
      if (nextDirection === 'right') currentAngle -= 90;
      if (nextDirection === 'left') currentAngle += 90;
    }

    if (currentDirection === 'up') {
      if (nextDirection === 'right') currentAngle += 90;
      if (nextDirection === 'left') currentAngle -= 90;
    }

    if (currentDirection === 'left') {
      if (nextDirection === 'up') currentAngle += 90;
      if (nextDirection === 'down') currentAngle -= 90;
    }

    if (currentDirection === 'right') {
      if (nextDirection === 'up') currentAngle -= 90;
      if (nextDirection === 'down') currentAngle += 90;
    }

    this.currentAngle = currentAngle;
    this.headContainer.style.transform = `rotate(${this.currentAngle}deg)`;
  }
}
