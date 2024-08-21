"use server";

import { revalidatePath } from "next/cache";
import pool from "./db";
import { z } from "zod";
import { redirect } from "next/navigation";

const FormSchema = z.object({
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
const CreateUserForm = FormSchema.omit({ estado: true });

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

    await sql.query(
      `INSERT INTO usuario (nombre, email, contrasena, rol, estado) 
      VALUES ($1, $2, $3, $4, true)`,
      [nombre, email, contrasena, rol]
    );
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

const FormSchemaBusiness = z.object({
  direccion: z
    .string({
      invalid_type_error: "error en el direccion",
    })
    .min(1, { message: "la direccion no puede estar vacia" }),

  telefono: z
    .string({
      invalid_type_error: "error en el telefono",
    })
    .min(1, { message: "el telefono no puede estar vacio" }),
  id_usuario: z.coerce.number({ message: "error en el numero id" }),

  horario_apertura: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Horario de apertura invalida!",
  }),
  horario_cierre: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Horario de cierre invalida!",
  }),
});

const CreateBusinessForm = FormSchemaBusiness.omit({});

export type StateBusiness = {
  errors?: {
    direccion?: string[];
    telefono?: string[];
    id_usuario?: string[];
    horario_apertura?: string[];
    horario_cierre?: string[];
  };
  message?: string | null;
};

export async function createBusiness(
  prevState: StateBusiness,
  formData: FormData
) {
  formData.forEach((e) => {
    console.log(e);
  });

  console.log(formData);

  const validatedFields = CreateBusinessForm.safeParse({
    direccion: formData.get("direccion"),
    telefono: formData.get("telefono"),
    id_usuario: formData.get("id_usuario"),
    horario_apertura: formData.get("horario_apertura"),
    horario_cierre: formData.get("horario_cierre"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error en los campos para crear un negocio",
    };
  }

  const { direccion, telefono, id_usuario, horario_apertura, horario_cierre } =
    validatedFields.data;
  let sql;

  try {
    sql = await pool.connect();
    await sql.query(
      `INSERT INTO negocio (direccion, telefono, id_usuario, horario_apertura, horario_cierre)
      VALUES ($1, $2, $3, $4, $5)`,
      [direccion, telefono, id_usuario, horario_apertura, horario_cierre]
    );
  } catch (error) {
    console.error("Error en la base de datos", error);
    return {
      message: "Error en los campos para crear un negocio",
    };
  }

  revalidatePath("/business");
  redirect("/business");
}
