"use server";

import { revalidatePath } from "next/cache";
import pool from "./db";
import { z } from "zod";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),

  nombre: z.string({
    invalid_type_error: "error en el nombre",
  }),

  email: z
    .string({
      invalid_type_error: "error en el mail",
    })
    .email(),

  contrasena: z.string({
    invalid_type_error: "error en la contraseña",
  }),

  rol: z.enum(["USUARIO", "ADMINISTRADOR"], {
    invalid_type_error: "seleccione un rol",
  }),

  estado: z.string(),
});

export type State = {
  errors?: {
    nombre?: string[];
    email?: string[];
    contrasena?: string[];
    rol?: string[];
  };
  message?: string | null;
};
const CreateUserForm = FormSchema.omit({ id: true, estado: true });

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUserForm.safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    contrasena: formData.get("contrasena"),
    rol: formData.get("rol"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error en los campos para crear un usuario",
    };
  }

  const { nombre, email, contrasena, rol } = validatedFields.data;

  let sql;
  try {
    sql = await pool.connect();
    const result = await sql.query(
      `INSERT INTO usuario (nombre, email, contrasena, rol, estado) 
            VALUES (${nombre}, ${email}, ${contrasena}, ${rol}, true)`
    );

    console.log(result);
  } catch (error) {
    console.error("Error en la base de datos", error);
    return {
      message: "Error en los campos para crear un usuario",
    };
  } finally {
    if (sql) sql.release();
  }

  revalidatePath("/");
  redirect("/");
}
