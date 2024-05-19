import "dotenv/config";

const { DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const knexConnection = {
  client: "mysql2",
  connection: {
    host: "localhost",
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    charset: "utf8"
  }
};

export default knexConnection;