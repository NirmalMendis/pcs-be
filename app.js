const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./utils/errors/errorHandler');
const cron = require('node-cron');

const customerRouter = require('./routes/customer-routes');
const userRouter = require('./routes/user-routes');
const authRouter = require('./routes/auth-routes');
const metadataRouter = require('./routes/metadata-routes');
const branchRouter = require('./routes/branch-routes');
const pawnTicketRouter = require('./routes/pawn-ticket-routes');
const invoiceRouter = require('./routes/invoice-routes');
const roleRouter = require('./routes/role-routes');
const itemRouter = require('./routes/item-routes');
const interestRouter = require('./routes/interest-routes');
const statRouter = require('./routes/stat-routes');

const AppError = require('./utils/errors/AppError');
const errorTypes = require('./utils/errors/errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PawnTicketService = require('./services/pawn-ticket-service');
const InterestService = require('./services/interest-service');

const app = express();

app.use(cookieParser());
app.use(
  cors({
    // origin: "*",
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.options('*', cors()); //for put delete.. requests which sends preflight options request from browser

/* use morgan in dev env */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

//live test
app.get('/api/v1/ping', (_, res) => {
  res.status(200).send('Server is live');
});

//comment to remove delay
// app.use(async (req, res, next) => {
//   setTimeout(next, 1000);
// });

app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/metadata', metadataRouter);
app.use('/api/v1/branch', branchRouter);
app.use('/api/v1/pawn-ticket', pawnTicketRouter);
app.use('/api/v1/invoice', invoiceRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/item', itemRouter);
app.use('/api/v1/interest', interestRouter);
app.use('/api/v1/stat', statRouter);

app.all('*', (req, _, next) => {
  next(
    new AppError({
      message: errorTypes.GENERIC.INVALID_ROUTE.message(req.originalUrl),
      statusCode: errorTypes.GENERIC.INVALID_ROUTE.statusCode,
    }),
  );
});

//cron job
cron.schedule(
  '0 1 * * *',
  () => {
    PawnTicketService.updateStatusesJob();
    InterestService.updateStatusesJob();
  },
  {
    scheduled: true,
    timezone: 'Asia/Colombo',
  },
);

app.use(errorHandler);

module.exports = app;
