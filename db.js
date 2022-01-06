const fs = require("fs");
const csv = require("csv-parser");
const { List, Node } = require("./linkedList");

const map = {};

const getList = (string) => {
  const alphabet = string[0].toLowerCase();
  const alplist = map[alphabet];
  if (!alplist) {
    map[alphabet] = new List();
  }
  return map[alphabet];
};

const updateList = (string) => {
  const list = getList(string);
  const node = list.find(new Node(string));
  const oldVal = node.data.count;
  if (node) node.increment();
  const newValue = node.data.count;
  const msg = `${node.data.term} was updated from ${oldVal} to ${newValue}`;
  return msg;
};

const update = (term, termcount = 1) => {
  const list = getList(term);
  if (list) {
    list.update(new Node(term, termcount));
  }
};

async function connect() {
  return new Promise((res, rej) => {
    fs.createReadStream("./SearchTermsDB.csv")
      .pipe(csv())
      .on("data", function (data) {
        let [term, termcount] = Object.values(data);
        try {
          update(term, +termcount);
        } catch (err) {
          rej(err.message || "something went wrong!!!");
        }
      })
      .on("end", function () {
        console.log("order the data based on the count...");
        Object.entries(map).forEach(([key, list]) => {
          console.log(key, "=>", list.explore("").join("-->"));
        });

        res("successfully connected to db...");
      });
  });
}

const SLICE = 10;

async function search(string) {
  return updateList(string);
}

async function query(string) {
  const list = getList(string);
  return list.explore(string, SLICE);
}

module.exports = {
  connect,
  query,
  search,
};
