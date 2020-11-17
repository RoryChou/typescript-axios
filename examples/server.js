const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const multipart = require('connect-multiparty')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const cookieParser = require('cookie-parser')
const config = require('./webpack.config')
const path = require('path')
const atob = require('atob')

require('./server2')

const app = express()
const compiler = webpack(config)
app.use(cookieParser())

/**
 * No files are written to disk, rather it handles files in memory
 * The public path that the middleware is bound to.
 * Best Practice: use the same publicPath defined in your webpack config.
 * */
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSFR-COOKIE-D', '123asd')
  }
}))

app.use(multipart({
  uploadDir: path.resolve(__dirname,'upload-file')
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/simple/get', function (req, res) {
  res.json({
    msg: 'hello world'
  })
})

router.get('/base/get', function (req, res) {
  res.json(req.query)
})

router.post('/base/post', function (req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function (req, res) {
  let msg = []
  req.on('data', chunk => {
    if(chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', function (req, res) {
  if(Math.random() > 0.5) {
    res.json({
      msg: '123123'
    })
  } else {
    res.stats(500)
    res.end()
  }
})

router.get('/error/timeout', function (req, res) {
  setTimeout(function () {
    res.json({
      msg: '123123'
    })
  }, 3000)
})

router.get('/interceptor/get', function (req, res) {
  res.end('hello')
})

router.post('/config/post', function (req, res) {
  res.json(req.body)
})

router.get('/cancel/get', function (req, res) {
  setTimeout(() => {
    res.json('hello')
  }, 1000)
})

router.post('/cancel/post', function (req, res) {
  setTimeout(() => {
    res.json(req.body)
  }, 1000)
})

router.get('/more/get', function (req, res) {
  res.json(req.cookies)
})

router.post('/more/upload', function (req, res) {
  console.log(req.body,req.files)
  res.end('upload success')
})

router.post('/more/post', function (req, res) {
  const auth = req.headers.authorization
  const [type, credentials] = auth.split(' ')

  const [username, password] = atob(credentials).split(':')
  if(type === 'Basic' && username === 'asd' && password === '123') {
    res.json(req.body)
  } else {
    res.status(401)
    res.end('Unauthorization')
  }
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
