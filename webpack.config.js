const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");
const webpack = require("webpack");

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
	node: {
		__dirname: false
	},
	externals: [],
	plugins: [
		new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
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