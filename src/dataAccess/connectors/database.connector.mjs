import Sequelize from 'sequelize';
import { dbConnections } from '../../config/index.mjs';

export const dbConnector = new Sequelize(dbConnections);
