const discovery = require("../services/discovery.hyper");
const fs = require("fs");

let URL = process.env.URL;

const exits = ["SIGINT", "SIGTERM", "SIGQUIT", "SIGUSR1", "SIGUSR2"];

class Discovery {
  constructor(name, client) {
    this.name = name;
    this.client = client;
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
      try {
        URL = fs.readFileSync(".tunnel", "utf-8");
      } catch (error) {
        URL = `http://localhost:${process.env.PORT}`
        console.log(error.message);
      }
    }

    await this.client
      .put(`/services/${this.name}`)
      .value(
        JSON.stringify({
          url: URL,
          definitions,
        })
      )
      .then(() => {
        console.log(`registry: service ${this.name} registered.`);
      });
  }

  async unregister() {
    await this.client
      .delete()
      .key(`/services/${this.name}`)
      .then(() => {
        console.log(`registry: service ${this.name} unregistered.`);
      });
  }
}

module.exports = (name) => new Discovery(name, discovery);
