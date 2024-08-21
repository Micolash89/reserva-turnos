import pool from "./db";

export async function fetGetAllreservars() {
  let sql;

  try {
    sql = await pool.connect();
    const data = await sql.query("SELECT * FROM reservas");

    return data.rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (sql) sql.release();
  }
}
export async function fetGetUsers() {
  let sql;

  try {
    sql = await pool.connect();
    const data = await sql.query("SELECT * FROM usuario");

    return data.rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (sql) sql.release();
  }
}

export async function fetchGetAllBusiness() {
  let sql;

  try {
    sql = await pool.connect();
    const data = await sql.query("SELECT * FROM negocio");

    return data.rows;
  } catch (error) {
    console.error(error);
  } finally {
    if (sql) sql.release();
  }
}
