const Node = require("./_node");
const List = require("./_list");

class Map {
  constructor() {
    this.map = {};
  }
  get data() {
    return this.map;
  }
  getList(string) {
    const alphabet = string[0].toLowerCase();
    const alplist = this.map[alphabet];
    if (!alplist) {
      this.map[alphabet] = new List();
    }
    return this.map[alphabet];
  }

  updateList(string) {
    const list = this.getList(string);
    const node = list.find(new Node(string));
    const oldVal = node.data.count;
    if (node) node.increment();
    const newValue = node.data.count;
    const msg = `${node.data.term} was updated from ${oldVal} to ${newValue}`;
    return msg;
  }

  update(term, termcount = 1) {
    const list = this.getList(term);
    if (list) {
      list.update(new Node(term, termcount));
    }
  }
  clear() {
    this.map = {};
  }
}

module.exports = Map;
