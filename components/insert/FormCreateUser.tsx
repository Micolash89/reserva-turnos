"use cliente";

import { createUser, State } from "@/app/lib/actions";
import { useActionState } from "react";

function FormCreateUser() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createUser, initialState);
  //const [state, formAction] = useFormState(createUser, initialState);

  return (
    <form
      className="flex flex-col md:flex-row md:justify-center md:gap-x-4"
      action={formAction}
    >
      <div className="flex flex-col md:flex-row md:justify-center md:gap-x-4">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            aria-describedby="nombre-error"
          />
          <div id="nombre-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nombre &&
              state.errors.nombre.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            aria-describedby="email-error"
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-center md:gap-x-4">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="contrasena"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="contrasena"
            id="contrasena"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            aria-describedby="contrasena-error"
          />
          <div id="contrasena-error" aria-live="polite" aria-atomic="true">
            {state.errors?.contrasena &&
              state.errors.contrasena.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <label
            htmlFor="rol"
            className="block text-sm font-medium text-gray-700"
          >
            Rol
          </label>
          <select
            name="rol"
            id="rol"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            aria-describedby="rol-error"
          >
            <option value="USUARIO">Cliente</option>
            <option value="ADMINISTRADOR">Administrador</option>
          </select>
          <div id="rol-error" aria-live="polite" aria-atomic="true">
            {state.errors?.rol &&
              state.errors.rol.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        enviar
      </button>
    </form>
  );
}

export default FormCreateUser;
