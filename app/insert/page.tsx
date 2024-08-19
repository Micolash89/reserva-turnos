"use client";
import { createUser } from "../lib/actions";

function page() {
  return (
    <>
      <form action={createUser}>
        <button type="submit">enviar</button>
      </form>
    </>
  );
}

export default page;
