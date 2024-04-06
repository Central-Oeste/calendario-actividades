import type {Evento} from "../app/types";

import {useState, useEffect} from "react";

export default function FavoriteButton({evento}: {evento: Evento}) {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  // Cargar el estado inicial del botón al cargar la página
  useEffect(() => {
    const favorites = window.localStorage.getItem("favorites");

    if (favorites) {
      const isEventoFavourite = favorites.includes(evento.id);

      setIsFavourite(isEventoFavourite);
    }
  }, [evento.id]);

  // Función para manejar el clic en el botón de favoritos
  const handleFavoriteClick = () => {
    const favorites = window.localStorage.getItem("favorites");

    if (favorites) {
      const isEventoFavourite = favorites.includes(evento.id);

      // Actualizar estado y localStorage dependiendo del estado actual
      if (isEventoFavourite) {
        const updatedFavorites = favorites.replace(evento.id, "");

        window.localStorage.setItem("favorites", updatedFavorites);
        setIsFavourite(false);
      } else {
        const updatedFavorites = favorites.concat(evento.id);

        window.localStorage.setItem("favorites", updatedFavorites);
        setIsFavourite(true);
      }
    } else {
      // Si no hay favoritos, agregar este evento como favorito
      window.localStorage.setItem("favorites", evento.id);
      setIsFavourite(true);
    }
  };

  return (
    <button
      className={`btn_fav text-xl ${isFavourite ? "text-red-500" : "opacity-100"}`}
      type="button"
      onClick={handleFavoriteClick}
    >
      ♥
    </button>
  );
}
