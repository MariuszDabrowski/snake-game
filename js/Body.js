class Body {
  constructor(game) {
    this.game = game;
    
    this.headNode;
    this.tailNode;
  }

  updateNodePositions() {
    let previousNode = null;

    this.iterateNodes((node) => {
      if (!previousNode) {
        previousNode = {
          position: {
            x: node.position.x,
            y: node.position.y
          },
          currentAngle: node.currentAngle
        };
        node.position.x = this.game.head.lastPosition.x;
        node.position.y = this.game.head.lastPosition.y;
        node.currentAngle = this.game.head.currentAngle;
      } else {
        const tempNode = {
          position: {
            x: node.position.x,
            y: node.position.y
          },
          currentAngle: node.currentAngle
        };

        node.position.x = previousNode.position.x;
        node.position.y = previousNode.position.y;
        node.currentAngle = previousNode.currentAngle;
        
        previousNode = tempNode;
      }
    });
  }
  
  moveNodes() {
    this.iterateNodes((node) => {
      node.svg.style.transform = `rotate(${node.currentAngle}deg)`;
      node.element.style.transform = `translate(${node.position.x}px, ${node.position.y}px)`;
      node.element.style.opacity = 1;
    });
  }

  addNode() {
    const position = {
      x: (!this.tailNode) ? this.game.head.lastPosition.x : this.tailNode.position.x,
      y: (!this.tailNode) ? this.game.head.lastPosition.y : this.tailNode.position.y
    };

    const currentAngle = (!this.tailNode) ? this.game.head.currentAngle : this.tailNode.currentAngle ;

    const node = {
      element: null,
      svg: null,
      currentAngle: currentAngle,
      position: position,
      previous: (!this.tailNode) ? null : this.tailNode,
      next: null
    };

    // Create a node and add it to the game board
    node.element = document.createElement('div');
    node.element.classList.add('snake-node');
    node.element.style.transform = `translate(${node.position.x}px, ${node.position.y}px)`;
    node.element.innerHTML = `
      <svg class="snake-node__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 117.1 117.1" style="enable-background:new 0 0 117.1 117.1;" xml:space="preserve">
        <circle class="snake-node__svg__body" cx="58.5" cy="58.5" r="58.5"/>
      </svg>
    `;
    this.game.board.appendChild(node.element);

    node.svg = node.element.querySelector('.snake-node__svg');

    if (!this.headNode) {
      this.headNode = node;
      this.tailNode = node;
    } else {
      this.tailNode.next = node;
      this.tailNode = node;
    }
  }

  iterateNodes(cb) {
    if (this.headNode) {
      let node = this.headNode;

      while (node) {
        cb(node);

        node = node.next;
      }
    }
  }
}