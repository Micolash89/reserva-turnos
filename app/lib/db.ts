import { Pool } from "pg";

const pool = new Pool({
  host: process.env.POSTGRESQL_ADDON_HOST,
  database: process.env.POSTGRESQL_ADDON_DB,
  user: process.env.POSTGRESQL_ADDON_USER,
  password: process.env.POSTGRESQL_ADDON_PASSWORD,
  port: parseInt(process.env.POSTGRESQL_ADDON_PORT || "5432"), // Clever Cloud usa el puerto 5432 por defecto, pero se especifica un puerto distinto.
});

export default pool;
