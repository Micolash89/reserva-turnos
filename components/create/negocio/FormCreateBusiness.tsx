"use client";

import { createBusiness, StateBusiness } from "@/app/lib/actions";
import { useActionState } from "react";

function FormCreateBusiness() {
  const initialState: StateBusiness = { message: null, errors: {} };
  const [state, formAction] = useActionState(createBusiness, initialState);

  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-lg mx-auto">
        <form className="flex flex-col gap-4" action={formAction}>
          <label className="text-xl font-bold">Registro de negocio</label>
          <input
            className="border border-gray-200 rounded px-4 py-2"
            type="text"
            placeholder="Dirección"
            name="direccion"
            aria-describedby="direccion-error"
          />
          <div id="direccion-error" aria-live="polite" aria-atomic="true">
            {state.errors?.direccion &&
              state.errors.direccion.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <input
            className="border border-gray-200 rounded px-4 py-2"
            type="text"
            placeholder="Teléfono"
            id="telefono"
            name="telefono"
            aria-describedby="telefono-error"
          />
          <div id="telefono-error" aria-live="polite" aria-atomic="true">
            {state.errors?.telefono &&
              state.errors.telefono.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <select
            className="border border-gray-200 rounded px-4 py-2"
            name="id_usuario"
            aria-describedby="id_usuario-error"
          >
            <option value="1">Usuario 1</option>
            <option value="1">Usuario 2</option>
          </select>
          <div id="id_usuario-error" aria-live="polite" aria-atomic="true">
            {state.errors?.id_usuario &&
              state.errors.id_usuario.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <input
            className="border border-gray-200 rounded px-4 py-2"
            type="time"
            placeholder="Horario de apertura"
            name="horario_apertura"
            aria-describedby="horario_apertura-error"
          />
          <div
            id="horario_apertura-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.horario_apertura &&
              state.errors.horario_apertura.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <input
            className="border border-gray-200 rounded px-4 py-2"
            type="time"
            placeholder="Horario de cierre"
            name="horario_cierre"
            aria-describedby="horario_cierre-error"
          />
          <div id="horario_cierre-error" aria-live="polite" aria-atomic="true">
            {state.errors?.horario_cierre &&
              state.errors.horario_cierre.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Registrar
          </button>
        </form>
      </div>
    </>
  );
}

export default FormCreateBusiness;
