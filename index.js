const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const app = express();
const api = require("./apis");

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useUnifiedTopology: true
  })
  .then((success) => {
    console.log("MongoDB Connected!!!", process.env.DB_CONNECT);
  })
  .catch((err) => {
    console.log(process.env.DB_CONNECT);
    console.log("MongoDB failed!!!", err);
  });

app.use(cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  fileupload()
);

app.use('/resume', express.static(__dirname + '/uploads'));

app.get("*.*", express.static(__dirname + "/client/build"));

api(app);

app.all("*", function (req, res) {
  res.status(200).sendFile(`/`, { root: __dirname + "/client/build" });
});


const port = process.env.PORT || 3001;

app.listen(port, function (err) {
  if (err) {
    console.log("error in server setup");
  } else {
    console.log("server listening on port", port);
  }
});
