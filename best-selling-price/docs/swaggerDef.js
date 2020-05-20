const { version } = require("../../package.json");
const config = require("../config/config");

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "node-express-mongoose-boilerplate API documentation",
    version,
    license: {
      name: "MIT",
      url:
        "https://github.com/hagopj13/node-express-mongoose-boilerplate/blob/master/LICENSE",
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: "Best Seller",
//       description: "find the best selling products",
//       contact: {
//         name: "karajrish",
//       },
//       servers: ["http://localhost:5000"],
//     },
//   },
//   apis: ["./routes/*.js"],
// };
module.exports = swaggerDef;
