import config from './config/index.mjs';

global.AppConfigs = config;
global.Logger = process.env.NODE_ENV === 'test' ? { info: () => {}, error: () => {} } : console;
