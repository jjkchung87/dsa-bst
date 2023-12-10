class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  
  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    
    let newNode = new Node(val=val)
    
    if(!this.root) {
      this.root = newNode
      return this;
    }

    let currentNode = this.root;
    while (true) {
      if (val < currentNode.val) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          break;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      }
    }

    return this;

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
  
      let newNode = new Node(val=val)
  
      if(!this.root) {
        this.root = newNode
        return this;
      }
  
      function insertHelper(currentNode) {
        if (val < currentNode.val) {
          if (currentNode.left === null) {
            currentNode.left = newNode;
            return;
          }
          insertHelper(currentNode.left);
        } else {
          if (currentNode.right === null) {
            currentNode.right = newNode;
            return;
          }
          insertHelper(currentNode.right);
        }
      }
  
      insertHelper(this.root);
      return this;

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    while(currentNode){
      if(currentNode.val === val) return currentNode;
      if(currentNode.val > val) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode = this.root) {
    if (currentNode === null) {
      return undefined;
    }
  
    if (val === currentNode.val) {
      return currentNode;
    } else if (val < currentNode.val) {
      return this.findRecursively(val, currentNode.left);
    } else {
      return this.findRecursively(val, currentNode.right);
    }
  }
  

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {

    if(!this.root) return undefined;
    let array = [];    
    const dfsPreOrderHelper = (node) => {
      array.push(node.val);
      if(node.left) dfsPreOrderHelper(node.left);
      if(node.right) dfsPreOrderHelper(node.right);
    }

    dfsPreOrderHelper(this.root);

    return array;


  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {

    if(!this.root) return undefined;

    let array = [];
    let currentNode = this.root;

    function dfsInOrderHelper(node){
      if(node.left) dfsInOrderHelper(node.left);
      array.push(node.val);
      if(node.right) dfsInOrderHelper(node.right);
    }

    dfsInOrderHelper(currentNode);

    return array;

  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    if (!this.root) return [];
  
    let array = [];
  
    const dfsPostOrderHelper = (node) => {
      if (node.left) dfsPostOrderHelper(node.left);
      if (node.right) dfsPostOrderHelper(node.right);
      array.push(node.val);
    }
  
    dfsPostOrderHelper(this.root);
  
    return array;
  }
  

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if(!this.root) return undefined;

    let visitQueue = [this.root]
    let array = []

    while(visitQueue.length){
      let currentNode = visitQueue.shift();
      array.push(currentNode.val)
      if(currentNode.left) visitQueue.push(currentNode.left)
      if(currentNode.right) visitQueue.push(currentNode.right)
    }
    return array;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    if (!this.root) return undefined;
  
    let currentNode = this.root;
    let parentNode = null;
  
    while (currentNode) {
      if (val < currentNode.val) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        // Node to remove found
        // Case 1: Node with two children
        if (currentNode.left && currentNode.right) {
          // Find the in-order successor (smallest in the right subtree)
          let successor = currentNode.right;
          let successorParent = currentNode;
  
          while (successor.left) {
            successorParent = successor;
            successor = successor.left;
          }
  
          if (successorParent !== currentNode) {
            // Replace successor's position by its right child
            successorParent.left = successor.right;
            successor.right = currentNode.right;
          }
          
          successor.left = currentNode.left;
  
          if (!parentNode) {
            // Replacing root node
            this.root = successor;
          } else if (parentNode.left === currentNode) {
            parentNode.left = successor;
          } else {
            parentNode.right = successor;
          }
  
          return currentNode;
        }
        // Case 2: Node with only one child or no child
        else {
          let newNode = currentNode.left || currentNode.right;
  
          if (!parentNode) {
            // Replacing root node
            this.root = newNode;
          } else if (parentNode.left === currentNode) {
            parentNode.left = newNode;
          } else {
            parentNode.right = newNode;
          }
  
          return currentNode;
        }
      }
    }
  
    return undefined; // Node not found
  }
  
  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {


  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (this.root.left === null && this.root.right === null)) {
      // Tree is empty or has only one node
      return undefined;
    }
  
    let currentNode = this.root;
    let parentNode = null;
  
    // Navigate to the rightmost node
    while (currentNode.right) {
      parentNode = currentNode;
      currentNode = currentNode.right;
    }
  
    if (currentNode.left) {
      // If the rightmost node has a left subtree,
      // the second highest value is the rightmost node in this subtree
      let tempNode = currentNode.left;
      while (tempNode.right) {
        tempNode = tempNode.right;
      }
      return tempNode.val;
    } else {
      // If there's no left subtree,
      // the second highest value is the parent of the rightmost node
      return parentNode.val;
    }
  }
  

  
}

module.exports = BinarySearchTree;
