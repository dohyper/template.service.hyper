const { Etcd3 } = require('etcd3');
const client = new Etcd3({
    hosts: process.env.DISCOVERY_HYPER_URL ?? `http://${process.env.DISCOVERY_HYPER_HOST ?? "localhost"}:${process.env.DISCOVERY_HYPER_PORT ?? 2379}`
});

let hostname = process.env.HOSTNAME;
let port = process.env.PORT;

const exits = ["SIGINT", "SIGTERM", "SIGQUIT", "SIGUSR1", "SIGUSR2"]

class Discovery {
    constructor(name) {
        this.name = name
        this.client = new Etcd3()
        exits.forEach((exit) => {
            process.on(exit, async () => {
                this.unregister().then(() => {
                    process.exit(0)
                })
            })
        })
    }

    async register(definitions) {
        if (process.env.NODE_ENV == "development") {
            const localtunnel = require('localtunnel');
            const tunnel = await localtunnel({ host: "http://localtunnel.me", port: port, local_https: false });
            hostname = tunnel.url;
            port = 443;
        }

        await client.put(`/services/${this.name}`).value(JSON.stringify({
            hostname,
            port,
            definitions
        })).then(() => {
            console.log(`service ${this.name} registered.`)
        })
    }

    async unregister() {
        await client.delete().key(`/services/${this.name}`).then(() => {
            console.log(`service ${this.name} unregistered.`)
        })
    }
}


module.exports = (name) => new Discovery(name)