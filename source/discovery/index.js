const { Etcd3 } = require("etcd3");
const client = new Etcd3({
  hosts:
    process.env.DISCOVERY_HYPER_URL ??
    `http://${process.env.DISCOVERY_HYPER_HOST ?? "localhost"}:${
      process.env.DISCOVERY_HYPER_PORT ?? 2379
    }`,
});

let PORT = process.env.PORT;
let URL = process.env.URL;

const exits = ["SIGINT", "SIGTERM", "SIGQUIT", "SIGUSR1", "SIGUSR2"];

class Discovery {
  constructor(name) {
    this.name = name;
    this.client = new Etcd3();
    exits.forEach((exit) => {
      process.on(exit, async () => {
        this.unregister().then(() => {
          process.exit(0);
        });
      });
    });
  }

  async register(definitions) {
    if (process.env.NODE_ENV == "development") {
      const localtunnel = require("localtunnel");
      const tunnel = await localtunnel({
        port: PORT,
        local_https: false,
      });
      URL = tunnel.url;
    }

    await client
      .put(`/services/${this.name}`)
      .value(
        JSON.stringify({
          url: URL,
          definitions,
        })
      )
      .then(() => {
        console.log(`service ${this.name} registered.`);
      });
  }

  async unregister() {
    await client
      .delete()
      .key(`/services/${this.name}`)
      .then(() => {
        console.log(`service ${this.name} unregistered.`);
      });
  }
}

module.exports = (name) => new Discovery(name);
