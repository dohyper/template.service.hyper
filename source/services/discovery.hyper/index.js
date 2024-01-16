const { Etcd3 } = require("etcd3");

const client = new Etcd3({
  hosts:
    process.env.DISCOVERY_HYPER_URL ??
    `http://${process.env.DISCOVERY_HYPER_HOST ?? "localhost"}:${
      process.env.DISCOVERY_HYPER_PORT ?? 2379
    }`,
});

module.exports = client;
