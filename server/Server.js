const express = require("express");
const bodyParser = require("body-parser")
const {
  addUser,
  checkUser,
  addIngredient,
  deleteIngredient,
  getIngredient,
  getSpecificIngredient
} = require("./pgHelper");

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const port = 7700;
let app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  next();
});


// ADD NEW USER
app.post("/SignUp", jsonParser,  async(req, res) => {
  let param = {
    newUserName: req.body.newUserName,
    newUserPassword: req.body.newUserPassword,
    newUserRole: req.body.newUserRole,
    newUserLocation: req.body.newUserLocation
  }
  await addUser(param)
})

// CHECK USER
app.get("/Login", async(req, res) => {
  let param = {
    userName: req.query.userName,
    userPassword: req.query.userPassword
  }
  let data = await checkUser(param)
  res.json(data)
})



app.delete("/Ingredients/:id", async(req, res) => {
  let param = {
    ingredientId: req.params.id,
  }
  let data = await deleteIngredient(param)
  res.json(data)
})

// GET INGREDIENT
app.get("/Ingredients", async(req, res) => {
  let data = await getIngredient()
  res.json(data)
})

// GET SPECIFIC INGREDIENT
app.get("/Ingredients/:id", async(req, res) => {
  let id = req.originalUrl.substring(13,)
  let param = {
    itemId: id,
  }
  let data = await getSpecificIngredient(param)
  res.json(data)
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
