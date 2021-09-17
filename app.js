const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()

const playlist = require('./controller/playlist.js')
router.use('/playlist', playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())

//设置端口号
app.listen(3000, () => {
  console.log('服务开启在3000端口');
})