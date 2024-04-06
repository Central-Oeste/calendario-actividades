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
      <img alt={evento.name} className="style_img" src={evento.image} />

      <div className="container_text">
        <h2 className="inline-flex gap-2 text-lg font-bold">
          <span>{evento.name}</span>
          <small className="inline-flex gap-1" />
          <DynamicFavoriteButton evento={evento} />
        </h2>
        {/* <p className="opacity-90">{restaurant.description}</p> */}

        <div className="pt-3">
          <span>📅 {evento.score}</span>
          <span className="font-normal opacity-75"> - Desde las {evento.ratings}</span>
        </div>
        <Link key={evento.id} prefetch href={`/${evento.id}`}>
          <div className="container_btn_evento pt-3">
            <button className="btn_evento">
              <b>VER EVENTO</b>
            </button>
          </div>
        </Link>
      </div>
    </article>
  );
}
