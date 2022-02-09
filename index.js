const express = require("express");
const dbConnection = require("./dbConfig");
const PORT = 8000;

const routes = require("./routes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("base URL");
});

app.use("/products", routes);

app.listen(PORT, async () => {
  try {
    await dbConnection();
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
