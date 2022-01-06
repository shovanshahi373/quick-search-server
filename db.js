const fs = require("fs");
const csv = require("csv-parser");
const { map } = require("./ds");

const SLICE = 10;

async function connect() {
  return new Promise((res, rej) => {
    fs.createReadStream("./SearchTermsDB.csv")
      .pipe(csv())
      .on("data", function (data) {
        let [term, termcount] = Object.values(data);
        try {
          map.update(term, +termcount);
        } catch (err) {
          rej(err.message || "something went wrong!!!");
        }
      })
      .on("end", function () {
        console.log("order the data based on the count...");
        Object.entries(map.data).forEach(([key, list]) => {
          console.log(key, "=>", list.explore("").join("-->"));
        });

        res("successfully connected to db...");
      });
  });
}

async function search(string) {
  return map.updateList(string);
}

async function query(string) {
  const list = map.getList(string);
  return list.explore(string, SLICE);
}

module.exports = {
  connect,
  query,
  search,
};
