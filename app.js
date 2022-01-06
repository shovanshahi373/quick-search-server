const express = require("express");
const cors = require("cors");
const db = require("./db");

const PORT = process.env.PORT || 5000;

db.connect()
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/suggest", async (req, res) => {
  const { q } = req.query;
  try {
    const items = await db.query(q);
    res.status(200).json({ data: items });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

app.get("/search", async (req, res) => {
  const { q } = req.query;
  const message = await db.search(q);
  res.status(200).json({ data: message });
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
