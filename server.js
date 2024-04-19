const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT=3000;
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to the Database :("));
db.once('open', () => console.log("Connected to Database"));
app.post("/sign_up", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var bearer = req.body.bearer;
  var dateTime = req.body.dateTime;
  var data = {
    "name": name,
    "email": email,
    "bearer": bearer,
    "dateTime": dateTime
  }
  db.collection('users').insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully")
  })
  return res.redirect('signupdone.html')
})
app.get("/", (req, res) => {
  res.set({
    "Allow Access-Allow Origin": '*'
  });
  return res.redirect('index.html');
});
app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
