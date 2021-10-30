const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const passport = require('passport')

const { port } = require('./config')
const {
  errorHandler,
  logErrors,
  wrapErrors,
  ormErrorHandler
} = require('./middlewares/error.handler')
const routerApi = require('./routes')
const notFoundHandler = require('./middlewares/notFound.handler')
const app = express()

app.use(cors())
app.use(helmet())
app.use(passport.initialize())
app.use(express.json())

require('./utils/auth')

routerApi(app)

app.use(notFoundHandler)

app.use(ormErrorHandler)
app.use(wrapErrors)
app.use(logErrors)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))
