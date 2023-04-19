const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const routerAuth = require('./routes/auth')
const routerBlog = require('./routes/blog')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: '*'
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extends : true,
}))

app.use(routerAuth)
app.use(routerBlog)

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = server