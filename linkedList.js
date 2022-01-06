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

class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.total = 0;
  }

  insert(node) {
    if (!(node instanceof Node)) return;
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.setNext(node);
    node.setPrev(this.tail);
    this.tail = node;
  }

  find(node) {
    let current = this.head;
    while (current && current.data.term !== node.data.term) {
      current = current.next;
    }
    return current;
  }

  update(node) {
    let current = this.head;
    while (current && node.data.count < current.data.count) {
      current = current.next;
    }
    if (current === null) {
      return this.insert(node);
    }
    if (current.prev) {
      current.prev.setNext(node);
    } else {
      current.setPrev(node);
      this.head = node;
      this.tail = current;
    }
    node.setNext(current);
    return current;
  }

  length() {
    let current = this.head;
    let count = 0;
    while (current) {
      ++count;
      current = current.next;
    }
    this.total = count;
    return count;
  }

  explore(string, size) {
    const values = [];
    let current = this.head;
    size = size || this.length();
    let counter = 0;
    while (current && counter < size) {
      if (current.data.term.match(new RegExp(`^${string}`, "gi")))
        counter = values.push(current.data.term);
      current = current.next;
    }
    return values;
  }
}

module.exports = {
  List,
  Node,
};
