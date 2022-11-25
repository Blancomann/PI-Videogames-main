const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "147258";
const DB_HOST = process.env.DB_HOST || "localhost";
const API_KEY = process.env.API_KEY || "19ffbe207bf84c358063377e656fbf27";

module.exports = {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_KEY,
};
