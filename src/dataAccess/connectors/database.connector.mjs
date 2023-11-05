import Sequelize from 'sequelize';

export const dbConnector = new Sequelize(AppConfigs.connections.database);
