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
      node.element.style.transform = `translate(${node.position.x}px, ${node.position.y}px) translateZ(0)`;
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
    node.element.style.transform = `translate(${node.position.x}px, ${node.position.y}px) translateZ(0)`;
    this.game.board.appendChild(node.element);


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