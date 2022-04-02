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
  sendMsg,
  endpointRequested,
  getRequests,
} = require("./pgHelper");

var jsonParser = bodyParser.json();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
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
app.post("/API/v1/SignUp", jsonParser, async (req, res) => {
  let param = {
    newUserName: req.body.newUserName,
    newUserPassword: req.body.newUserPassword,
    newUserLocation: req.body.newUserLocation,
  };
  let data = await addUser(param);
  await endpointRequested({ endpoint_uri: "/API/v1/SignUp" });
  res.json(data);
});

// LOG IN
app.get("/API/v1/LogIn", async (req, res) => {
  let param = {
    userName: req.query.userName,
    userPassword: req.query.userPassword,
  };
  let data = await checkUser(param);
  await endpointRequested({ endpoint_uri: "/API/v1/LogIn" });
  res.json(data);
});

app.delete("/API/v1/:userId", jsonParser, async (req, res) => {
  console.log(req);
  let param = {
    username: req.params.userId,
  };
  let data = await deleteUser(param);
  await endpointRequested({ endpoint_uri: "/API/v1/:userId" });
  res.json(data);
});

app.put("/API/v1/MyInfo", jsonParser, async (req, res) => {
  let param = {
    newLocation: req.body.newLocation,
    userName: req.body.userName,
  };
  let data = await updateLocation(param);
  await endpointRequested({ endpoint_uri: "/API/v1/MyInfo" });
  res.json(data);
});

app.post("/API/v1/ContactUs", jsonParser, async (req, res) => {
  let param = {
    username: req.body.username,
    msg: req.body.msg,
  };
  let data = await sendMsg(param);
  await endpointRequested({ endpoint_uri: "/API/v1/ContactUs" });
  res.json(data);
});

app.get("/API/v1/endpoints", jsonParser, async (req, res) => {
  let data = await getRequests();
  res.json(data);
});

app.get("/API/v1/Parks", async(req, res) => {
  await endpointRequested({ endpoint_uri: "/API/v1/Parks" });
})

app.get("/API/v1/Foods", async(req, res) => {
  await endpointRequested({ endpoint_uri: "/API/v1/Foods" });
})

app.get("/API/v1/Buildings", async(req, res) => {
  await endpointRequested({ endpoint_uri: "/API/v1/Buildings" });
})

app.listen(port, () => console.log(`Outivity app listening on port ${port}!`));
