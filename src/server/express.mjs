import express from 'express';
import expressRequestId from 'express-request-id';
import cors from 'cors';
import helmet from 'helmet';
import morganLogger from '../logger/morganLogger.mjs';
import { StatusCode } from '../constants/index.mjs';
import { PokemonRouter } from '../routers/index.mjs';

Logger.info('app::initExpress', 'express app init');
export const app = express();
app.set('showStackError', true);

Logger.info('app::initExpress', 'express app init middleware');
app.use(express.json());
app.use(expressRequestId());
app.use(morganLogger(true));
app.use(morganLogger());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());

Logger.info('app::initExpress', 'express app init routes');
app.get('/healthcheck', (req, res) => res.json({ name: process.env.npm_package_name, version: process.env.npm_package_version }));

app.use('/pokemon', PokemonRouter);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  Logger.error(err);
  res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message, stack: err.stack });
});
