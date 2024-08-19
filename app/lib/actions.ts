"use server";

import pool from "./db";
export async function createUser(formaData: FormData) {
  let sql;

  try {
    sql = await pool.connect();
    await sql.query(`INSERT INTO usuario (nombre, email, contrasena, rol, estado) 
            VALUES ('Juan Pérez', 'juan@example.com', 'contraseña123', 'USUARIO', TRUE)`);
  } catch (error) {
    console.error(error);
  } finally {
    if (sql) sql.release();
  }
}
