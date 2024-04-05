"use client";

export default function ErrorPage({error}: {error: Error}) {
  console.error(error);

  return (
    <div>
      <h2>¡No se encontraron resultados!</h2>
    </div>
  );
}
