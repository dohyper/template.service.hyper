require("dotenv").config();

const NAME = "{{service.name}}";
const definitions = require("./definitions");
const registry = require("./services/discovery.hyper");

registry
  .register(NAME, { url: process.env.URL, definitions })
  .catch((error) => {
    console.log(error);
  });

const bodyParser = require("body-parser");
const morgan = require("morgan");
const api = require("express")();

api.use(morgan("dev"));
api.use(bodyParser.json({ limit: "50mb" }));

api.listen(process.env.PORT, () => {
    console.log(`${NAME}.service.hyper is running on port ${process.env.PORT}`);
});
