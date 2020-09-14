const express = require("express");
const cors = require("cors");
const mongoDB = require("mongoose");
const routes = require("./routes");
const server = express();
const port = 3030;
mongoDB
  .connect(
    "mongodb+srv://brownie:643512@cluster0-iwz84.mongodb.net/CarCare?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("MONGODB OK!"))
  .catch(() => console.log("MONGODB OFF"));

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3030, () =>
  console.log(`SERVER RUNNING ${port}`)
);
