require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { signup, signin } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateSignupUserReqBody, validateSigninUserReqBody } = require('./middlewares/celebrate-req-validators');
const celebrateErrorHandler = require('./middlewares/celebrate-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralizedErrorHandler = require('./middlewares/centralized-error-handler');
const NotFoundError = require('./errors/not-found-error');
const {
  productionEnvKeyWord,
  mongoDBDefaultURI,
  notFoundErrorMessage,
} = require('./utils/constants');

const { NODE_ENV, DB_URI } = process.env;
const mongoDBURI = (NODE_ENV === productionEnvKeyWord ? DB_URI : mongoDBDefaultURI);

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signup', validateSignupUserReqBody, signup);
app.post('/signin', validateSigninUserReqBody, signin);

app.use(auth);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('*', () => {
  throw new NotFoundError(notFoundErrorMessage);
});

app.use(errorLogger);

// обработчик ошибок селебрейт
app.use(celebrateErrorHandler);

// централизованный обработчик ошибок
app.use(centralizedErrorHandler);

app.listen(PORT);
