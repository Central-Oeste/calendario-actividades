/* eslint-disable react/button-has-type */
"use client";

import type {Restaurant} from "../app/types";

import Link from "next/link";
import dynamic from "next/dynamic";

import FavoriteButton from "./ButtonFav";

// Creamos un componente dinámico para que no se renderice en el servidor
const DynamicFavoriteButton = dynamic(async () => FavoriteButton, {
  ssr: false,
});

export default function RestaurantCard({restaurant}: {restaurant: Restaurant}) {
  return (
    <article key={restaurant.id} className="container_card">
      <img alt={restaurant.name} className="style_img" src={restaurant.image} />

      <div className="container_text">
        <h2 className="inline-flex gap-2 text-lg font-bold">
          <span>{restaurant.name}</span>
          <small className="inline-flex gap-1" />
          <DynamicFavoriteButton restaurant={restaurant} />
        </h2>
        {/* <p className="opacity-90">{restaurant.description}</p> */}

        <div className="pt-3">
          <span>📅 {restaurant.score}</span>
          <span className="font-normal opacity-75"> - Desde las {restaurant.ratings}</span>
        </div>
        <Link key={restaurant.id} prefetch href={`/${restaurant.id}`}>
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
