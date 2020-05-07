const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const path = require('path')
const fs = require('fs')
const backendApp = new Koa()
const frontendApp = new Koa()
const backendRouter = new Router()
const frontendRouter = new Router()

const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'))
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8')

const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template: template,
	clientManifest: clientManifest
})

// 未处理的reject
process.on('unhandledRejection', (err, promise) => {
	console.log('custom Unhandled Rejection:', err)
	// 在这里处理
	//process.nextTick(() => {})
})
// 后端Server
backendRouter.get('/', async (ctx, next) => {
	console.log('后端：', ctx.req.url)
	try {
		// 这里直接使用 renderToString 的 Promise 模式，返回的 html 字符串没有样式和 __INITIAL_STATE__，原因暂时还没有查到
		// 所以，只能暂时先自己封装一个 Promise，用 renderToString 的 callback 模式
		let context = { url: ctx.req.url }
		let html = await new Promise(function(resolve, reject) {
			renderer.renderToString(context, function(err, html) {
				if (err) {
					reject(err)
				} else {
					resolve(html)
				}
			})
		})
		ctx.body = html
	} catch (err) {
		console.log(err)
		ctx.status = 500
		ctx.body = '服务器内部错误'
	}
})

backendApp.use(backendRouter.routes()).use(backendRouter.allowedMethods())
backendApp.use(serve(path.resolve(__dirname, '../dist')))
backendApp.listen(5000, () => {
	console.log('服务器端渲染地址： http://localhost:5000')
})

// 前端Server
frontendRouter.get('/', async (ctx, next) => {
	console.log('前端：', ctx.req.url)
	let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
	ctx.type = 'html'
	ctx.status = 200
	ctx.body = html
})

frontendApp.use(frontendRouter.routes()).use(frontendRouter.allowedMethods())
frontendApp.use(serve(path.resolve(__dirname, '../dist')))
frontendApp.listen(5001, () => {
	console.log('浏览器端渲染地址： http://localhost:5001')
})
