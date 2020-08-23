const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
const terser = require('terser');
const path = require("path");

module.exports = {
	target: "node",
	mode: "production",
	entry: {
		app: ["./src/index.js"]
	},
	output: {
		path: path.resolve(__dirname + "/build"),
		filename: "server.js"
	},
	externals: [nodeExternals()],
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: "src/client/",
					to: "client/"
				}
			]
		})
	]
}