const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const auth = require("./src/routes/auth");
const item = require("./src/routes/itemRoute");
const claim = require("./src/routes/claimRoute");
const authenication = require("./src/routes/authetication");

const app = express();
const port = process.env.PORT || 9000;

app.use(
  cors({
    origin: [
      "http://localhost:9000",
      "https://lost-and-found-backend-1-zssw.onrender.com",
      "http://localhost:3000/"
    ],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", async (request, response) => {
  response.send("This is the lost and found backend server");
});

app.use("/auth", auth);
app.use("/item", item);
app.use("/claim", claim);
app.use("/authentication", authenication);

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
