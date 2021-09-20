const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const ENV = 'test-nridd'

//解决跨域问题
app.use(cors({
  origin: ['http://localhost:9528'],
  credentials: true
}))

// 接收post参数解析
app.use(koaBody({
  multipart: true
}))


app.use(async (ctx, next) => {
  console.log('全局中间件')
  ctx.state.env = ENV
  await next()
})

const playlist = require('./controller/playlist.js')
router.use('/playlist', playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())

//设置端口号
app.listen(3000, () => {
  console.log('服务开启在3000端口');
})