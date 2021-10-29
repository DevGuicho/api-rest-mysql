const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const {
  errorHandler,
  logErrors,
  wrapErrors,
} = require('./middlewares/error.handler');
const routerApi = require('./routes');
const notFoundHandler = require('./middlewares/notFound.handler');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

routerApi(app);

app.use(notFoundHandler);

app.use(wrapErrors);
app.use(logErrors);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () =>
  console.log('Server running on port 3000')
);
