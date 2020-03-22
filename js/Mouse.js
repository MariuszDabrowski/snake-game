class Mouse {
  constructor(game) {
    this.game = game;

    this.position;
    this.element;
    this.attachedToDom = false;
  }

  initialize() {
    this.position = this.game.randomPosition();
    this.element = document.querySelector('.mouse-wrapper');
  }

  spawn() {
    this.position = this.game.randomPosition();

    // Ensure we're not trying to spawn on the snake head
    if (
      this.game.head.position.x === this.position.x &&
      this.game.head.position.y === this.position.y
    ) { this.position = this.game.randomPosition(); }

    // Ensure we're not trying to spawn on the snake body
    this.game.body.iterateNodes((node) => {
      if (
        node.position.x === this.position.x &&
        node.position.y === this.position.y
      ) { this.position = this.game.randomPosition(); }
    });

    // Is the element already attached to the body
    if (!this.attachedToDom) {
      this.game.board.appendChild(this.element);
      this.attachedToDom = true;
    }

    setTimeout(() => {
      this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px) translateZ(0)`;
      this.element.classList.add('mouse-wrapper--active');
    }, 400);
  }
}
