const express = require("express");
const app = express();
let request = require("request");
const port = 3022;

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

app.listen(port, () => console.log(`Outivity app listening on port ${port}!`));
