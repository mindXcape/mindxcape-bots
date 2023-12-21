import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const host = process.env.DB_HOST;

const dialect = "postgresql";

const db = new Sequelize(database, username, password, {
  host,
  logging: false,
  dialect,
});

export default db;
