const path = require("path");

module.exports = {
    target: "web",
    mode: "production",
    entry: {
        app: ["./src/client/index.js"]
    },
    output: {
        path: path.resolve(__dirname + "/build"),
        filename: "client.js"
    }
    // TODO: Complete with server details and correct pathing
}