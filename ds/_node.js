class Node {
  constructor(term, count = 1) {
    this.data = {
      term,
      count,
    };
    this.next = null;
    this.prev = null;
  }
  setNext(node) {
    this.next = node;
  }
  setPrev(node) {
    this.prev = node;
  }
  increment() {
    this.data.count += 1;
  }
}

module.exports = Node;
