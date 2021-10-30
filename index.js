const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { port } = require('./config');
const {
  errorHandler,
  logErrors,
  wrapErrors,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const routerApi = require('./routes');
const notFoundHandler = require('./middlewares/notFound.handler');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

routerApi(app);

app.use(notFoundHandler);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
