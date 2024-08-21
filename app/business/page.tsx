import { fetchGetAllBusiness } from "../lib/database";

async function page() {
  const data = await fetchGetAllBusiness();

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <table className="table-auto w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">id</th>
              <th className="px-4 py-2">Direcci n</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Tel fono</th>
              <th className="px-4 py-2">id_usuario</th>
              <th className="px-4 py-2">Horario apertura</th>
              <th className="px-4 py-2">Horario cierre</th>
              <th className="px-4 py-2">Puntuaci n total</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((negocio) => (
              <tr key={negocio.id} className="border-b">
                <td className="border px-4 py-2">{negocio.id}</td>
                <td className="border px-4 py-2">{negocio.direccion}</td>
                <td className="border px-4 py-2">
                  {negocio.estado ? "Activo" : "Inactivo"}
                </td>
                <td className="border px-4 py-2">{negocio.telefono}</td>
                <td className="border px-4 py-2">{negocio.id_usuario}</td>
                <td className="border px-4 py-2">{negocio.horario_apertura}</td>
                <td className="border px-4 py-2">{negocio.horario_cierre}</td>
                <td className="border px-4 py-2">{negocio.puntuacion_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default page;
