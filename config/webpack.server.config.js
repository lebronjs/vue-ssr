const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(base, {
	target: 'node',
	entry: {
		server: path.resolve(__dirname, '../src/entry-server.js')
	},
	output: {
		libraryTarget: 'commonjs2'
	},
	// 对 bundle renderer 提供 source map 支持
	devtool: 'source-map',
	externals: [nodeExternals()],
	plugins: [
		new VueSSRServerPlugin(), //还真是要放在最前面，不然HtmlWebpackPlugin不起作用
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.ssr.html'),
			filename: 'index.ssr.html',
			files: {
				js: 'client.bundle.js'
			},
			excludeChunks: ['server']
		})
	]
})
