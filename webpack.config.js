const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

// use ExtractText in Production env
const extractSass = new ExtractTextPlugin({
	filename: "styles.css",
	disable: process.env.NODE_ENV === "development"
});

// Constant with our paths
const paths = {
	DIST: path.resolve(__dirname, "dist"),
	SRC: path.resolve(__dirname, "src")
};

module.exports = {
	entry: path.join(paths.SRC, "app.ts"),
	output: {
		path: paths.DIST,
		filename: "[name].bundle.js"
	},
	devServer: {
		contentBase: path.SRC
	},
	resolve: {
		extensions: [".js", ".ts", ".html", "scss"],
		modules: ["src", "node_modules"] // allows to import modules from these folders as default
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.html$/,
				use: "html-loader"
			},
			{
				test: /.ts$/,
				exclude: /node_modules/,
				use: ["awesome-typescript-loader"]
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: ["css-loader", "sass-loader"],
					fallback: "style-loader"
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {}
					}
				]
			},
			{
				enforce: "pre",
				test: /\.html$/,
				exclude: /node_modules/,
				loader: "htmlhint-loader"
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.join(paths.SRC, "index.html")
		}),
		extractSass,
		new StyleLintPlugin({ sintax: "scss" })
	]
};
