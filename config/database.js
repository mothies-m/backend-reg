const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: process.env.DB_LOGGING === "true",
    pool: {
      max: parseInt(process.env.DB_POOL_MAX, 10),
      min: parseInt(process.env.DB_POOL_MIN, 10),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10),
      idle: parseInt(process.env.DB_POOL_IDLE, 10),
    },
  }
);

module.exports = sequelize;
