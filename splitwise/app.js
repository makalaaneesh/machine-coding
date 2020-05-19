const express = require("express");
const bodyParser = require("body-parser");

var db = require("./config/database");
const product = require("./routes/product.route");
const routes = require("./routes");
//initialize our application
const app = express();

// call the database connectivity function
db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Import routes
app.use("/api", routes);

//listening to port
let port = 5000;
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
