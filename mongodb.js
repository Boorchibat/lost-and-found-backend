const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
require('dotenv').config();
const auth = require("./src/routes/auth")

const app = express();
const port = 9000;

app.use(cors({
origin: ["http://localhost:9000"],
credentials: true,
}));

app.use(express.json())

app.get("/", async (request, response) => {
  response.send("Intro to MongoDb and MonGoose");
});

app.use("/auth", auth)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB succesfully!");
    app.listen(port, () => {
      console.log(`✅server is running on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("❌Error connecting to MongoDB", error);
  });