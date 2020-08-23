const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
	target: "node",
	mode: "production",
	entry: {
		app: ["./src/server/index.js"]
	},
	output: {
		path: path.resolve(__dirname + "/build"),
		filename: "server.js"
	},
	externals: [nodeExternals()]
}