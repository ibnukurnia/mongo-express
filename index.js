const express = require("express");
const cors = require("cors");

const { dbConnectionV1, dbConnectionV2 } = require("./dbConfig");
const PORT = 8000;

const routes = require("./routes");
const app = express();

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => {
  res.send("base URL");
});

app.use("/api", routes);

app.listen(PORT, async () => {
  try {
    await dbConnectionV1();
    await dbConnectionV2();
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
