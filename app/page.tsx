import Image from "next/image";
import { fetGetAllreservars } from "./lib/database";

export default async function Home() {
  const data = await fetGetAllreservars();

  console.log(data);

  return (
    <main>
      <h1>hola</h1>
      <div>
        {data?.map((reserva) => (
          <div key={reserva.id}>
            <p>ID: {reserva.id}</p>
            <p>Usuario: {reserva.usuario_id}</p>
            <p>Negocio: {reserva.negocio_id}</p>
            <p>Fecha reserva: {reserva.fecha_reserva.getDate()}</p>
            <p>Hora inicio: {reserva.hora_inicio}</p>
            <p>Hora fin: {reserva.hora_fin}</p>
            <p>Estado: {reserva.estado}</p>
            <p>Fecha creacion: {reserva.fecha_creacion.getDate()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
