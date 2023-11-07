import { app } from './express.mjs';

try {
  app.listen(process.env.SERVER_PORT, async err => {
    Logger.info('app::initExpress', `pokemonGo App running on port ${process.env.SERVER_PORT}`);
    if (err) throw err;
  });
} catch (ex) {
  Logger.error('app::initExpress', ex.message, undefined, ex);
  process.exit(-1);
}
