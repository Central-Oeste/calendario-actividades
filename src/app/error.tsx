"use client";

export default function ErrorPage({error}: {error: Error}) {
  console.error(error);

  return <div>Hubo un error intenta de nuevo!</div>;
}
