require("dotenv").config();

const NAME = "{{name}}.service.hyper";

const definitions = [
    {
        name: "resource",
        applicability: {
            read: true,
            create: false,
            update: false,
            delete: false,
        }
    }
];

const configurations = []

const registry = require("./services/discovery.hyper");

registry
  .register(NAME, { url: process.env.URL, definitions, configurations })
  .catch((error) => {
    console.log(error);
  });

const bodyParser = require("body-parser");
const morgan = require("morgan");
const api = require("express")();

api.use(morgan("dev"));
api.use(bodyParser.json({ limit: "50mb" }));

api.listen(process.env.PORT, () => {
    console.log(`${NAME} is running on port ${process.env.PORT}`);
});
