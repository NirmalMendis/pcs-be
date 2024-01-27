const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./utils/errors/errorHandler');

const customerRouter = require('./routes/customer-routes');
const userRouter = require('./routes/user-routes');
const authRouter = require('./routes/auth-routes');
const AppError = require('./utils/errors/AppError');
const errorTypes = require('./utils/errors/errors');

const app = express();

/* use morgan in dev env */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10kb' }));

//live test
app.get('/api/v1/ping', (_, res) => {
  res.status(200).send('Server is live');
});

app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req, _, next) => {
  next(
    new AppError({
      message: errorTypes.GENERIC.INVALID_ROUTE.message(req.originalUrl),
      statusCode: errorTypes.GENERIC.INVALID_ROUTE.statusCode,
    }),
  );
});

app.use(errorHandler);

module.exports = app;
