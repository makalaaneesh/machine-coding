const express = require("express");
const app = express();

const bodyParser = require("body-parser");

var db = require("./config/database");
const product = require("./routes/product.route");
const routes = require("./routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
let port = 5000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Best Seller",
      description: "find the best selling products",
      contact: {
        name: "karajrish",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//initialize our application

// call the database connectivity function
db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Import routes
app.use("/api", routes);

//listening to port
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
