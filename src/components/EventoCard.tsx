/* eslint-disable react/button-has-type */
"use client";

import type {Evento} from "../app/types";

import Link from "next/link";
import dynamic from "next/dynamic";

import FavoriteButton from "./ButtonFav";

// Creamos un componente dinámico para que no se renderice en el servidor
const DynamicFavoriteButton = dynamic(async () => FavoriteButton, {
  ssr: false,
});

export default function EventoCard({evento}: {evento: Evento}) {
  return (
    <article key={evento.id} className="container_card">
      <DynamicFavoriteButton evento={evento} />
      <img alt={evento.name} className="style_img" src={evento.image} />

      <div className="container_text">
        <h2 className="text-md inline-flex">
          <span>{evento.name}</span>
          <small className="inline-flex" />
        </h2>

        <div className="pt-3">
          <span className="font-normal">📅 {evento.fecha}</span>
          <span className="font-normal opacity-75"> - Desde las {evento.hora}</span>
        </div>
        <Link key={evento.id} prefetch href={`/${evento.id}`}>
          <div className="container_btn_evento pt-3">
            <button className="btn_evento"> VER EVENTO </button>
          </div>
        </Link>
      </div>
    </article>
  );
}
