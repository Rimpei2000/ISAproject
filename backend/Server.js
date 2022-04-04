const express = require("express");
const app = express();
let request = require("request");
const bodyParser = require("body-parser");
const port = 8000;

const {
  addUser,
  checkUser,
  deleteUser,
  updateLocation,
  sendMsg,
  endpointRequested,
  getRequests,
  addFav,
  getDistinctFav,
} = require("./pgHelper");

var jsonParser = bodyParser.json();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://bhupeshduggal.com/comp4537/project/"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.get("/", (req, res) => res.send("HomePage is running"));

app.get("/getWeather", (req, res) => {
  request("https://www.google.com", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body);
    }
  });
});

// Sign up
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

// Log in
app.get("/API/v1/LogIn", async (req, res) => {
  let param = {
    userName: req.query.userName,
    userPassword: req.query.userPassword,
  };
  let data = await checkUser(param);
  await endpointRequested({ endpoint_uri: "/API/v1/LogIn" });
  res.json(data);
});

// Delete user
app.delete("/API/v1/:userId", jsonParser, async (req, res) => {
  console.log(req);
  let param = {
    username: req.params.userId,
  };
  let data = await deleteUser(param);
  await endpointRequested({ endpoint_uri: "/API/v1/:userId" });
  res.json(data);
});

// Update location
app.put("/API/v1/MyInfo", jsonParser, async (req, res) => {
  let param = {
    newLocation: req.body.newLocation,
    userName: req.body.userName,
  };
  let data = await updateLocation(param);
  await endpointRequested({ endpoint_uri: "/API/v1/MyInfo" });
  res.json(data);
});

// Send message
app.post("/API/v1/ContactUs", jsonParser, async (req, res) => {
  let param = {
    username: req.body.username,
    msg: req.body.msg,
  };
  let data = await sendMsg(param);
  await endpointRequested({ endpoint_uri: "/API/v1/ContactUs" });
  res.json(data);
});

// Get endpoints
app.get("/API/v1/endpoints", jsonParser, async (req, res) => {
  let data = await getRequests();
  res.json(data);
});

// Get parks call count
app.get("/API/v1/Parks", async (req, res) => {
  await endpointRequested({ endpoint_uri: "/API/v1/Parks" });
});

// Get food call count
app.get("/API/v1/Foods", async (req, res) => {
  await endpointRequested({ endpoint_uri: "/API/v1/Foods" });
});

// Get buildings call count
app.get("/API/v1/Buildings", async (req, res) => {
  await endpointRequested({ endpoint_uri: "/API/v1/Buildings" });
});

// Add location to favourites
app.post("/API/v1/AddFav", jsonParser, async (req, res) => {
  let paramToAdd = {
    userName: req.body.username,
    favName: req.body.favName,
    favCat: req.body.favCat,
    lat: req.body.lat,
    lng: req.body.lng,
  };
  console.log(paramToAdd);
  let data = await addFav(paramToAdd);
  await endpointRequested({ endpoint_uri: "/API/v1/AddFav" });
  res.json(data);
});

// Get Favourite locations list
app.get("/API/v1/GetFav", jsonParser, async (req, res) => {
  let param = {
    userName: req.query.username,
  };

  let data = await getDistinctFav(param);
  await endpointRequested({ endpoint_uri: "/API/v1/GetFav" });
  res.json(data);
});

app.listen(port, () => console.log(`Outivity app listening on port ${port}!`));
