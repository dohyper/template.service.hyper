require("dotenv").config();

const NAME = "{{service.name}}";

const registry = require("./registry")(NAME);

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

registry.register(definitions);

const bodyParser = require("body-parser");
const morgan = require("morgan");
const api = require("express")();

api.use(morgan("dev"));
api.use(bodyParser.json({ limit: "50mb" }));

api.listen(process.env.PORT, () => {
    console.log(`${NAME}.service.hyper is running on port ${process.env.PORT}`);
});
