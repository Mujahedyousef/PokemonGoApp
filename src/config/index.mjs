export const dbConnections = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 20,
  },
  logging: process.env.NODE_ENV === 'dev',
  define: {
    freezeTableName: true,
  },
};
