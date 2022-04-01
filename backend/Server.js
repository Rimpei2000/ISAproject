const express = require("express");
const app = express();
let request = require("request");
const bodyParser = require("body-parser");
const port = 3022;

const {
  addUser,
  checkUser,
  deleteUser,
  updateLocation,
} = require("./pgHelper");

var jsonParser = bodyParser.json();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

// First endpoint
app.get("/", (req, res) => res.send("HomePage is running"));

// Second endpoint
app.get("/getWeather", (req, res) => {
  request("https://www.google.com", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
  });
});

// Third endpoint
app.post("/saveActivities", (req, res) => res.send("HomePage is running"));

// Fourth endpoint
app.delete("/deleteActivities", (req, res) => res.send("HomePage is running"));

// Fifth endpoint
app.get("/", (req, res) => res.send("HomePage is running"));

// Sixth endpoint
app.get("/", (req, res) => res.send("HomePage is running"));

// Seventh endpoint
app.get("/aboutUs", (req, res) => res.send("HomePage is running"));

// Eighth endpoint
app.get("/contactUs", (req, res) => res.send("HomePage is running"));

// SIGN UP
app.post("/SignUp", jsonParser, async (req, res) => {
  let param = {
    newUserName: req.body.newUserName,
    newUserPassword: req.body.newUserPassword,
    newUserLocation: req.body.newUserLocation,
  };
  let data = await addUser(param);
  res.json(data);
});

// LOG IN
app.get("/LogIn", async (req, res) => {
  let param = {
    userName: req.query.userName,
    userPassword: req.query.userPassword,
  };
  let data = await checkUser(param);
  res.json(data);
});

app.delete("/:userId", jsonParser, async (req, res) => {
  console.log(req);
  let param = {
    username: req.params.userId,
  };
  let data = await deleteUser(param);
  res.json(data);
});

app.put("/MyInfo", jsonParser, async (req, res) => {
  let param = {
    newLocation: req.body.newLocation,
    userName: req.body.userName,
  };
  let data = await updateLocation(param);
  res.json(data);
});

app.listen(port, () => console.log(`Outivity app listening on port ${port}!`));
