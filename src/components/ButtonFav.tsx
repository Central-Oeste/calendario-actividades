import type {Restaurant} from "../app/types";

import {useState, useEffect} from "react";

export default function FavoriteButton({restaurant}: {restaurant: Restaurant}) {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  // Cargar el estado inicial del botón al cargar la página
  useEffect(() => {
    const favorites = window.localStorage.getItem("favorites");

    if (favorites) {
      const isRestaurantFavourite = favorites.includes(restaurant.id);

      setIsFavourite(isRestaurantFavourite);
    }
  }, [restaurant.id]);

  // Función para manejar el clic en el botón de favoritos
  const handleFavoriteClick = () => {
    const favorites = window.localStorage.getItem("favorites");

    if (favorites) {
      const isRestaurantFavourite = favorites.includes(restaurant.id);

      // Actualizar estado y localStorage dependiendo del estado actual
      if (isRestaurantFavourite) {
        const updatedFavorites = favorites.replace(restaurant.id, "");

        window.localStorage.setItem("favorites", updatedFavorites);
        setIsFavourite(false);
      } else {
        const updatedFavorites = favorites.concat(restaurant.id);

        window.localStorage.setItem("favorites", updatedFavorites);
        setIsFavourite(true);
      }
    } else {
      // Si no hay favoritos, agregar este restaurante como favorito
      window.localStorage.setItem("favorites", restaurant.id);
      setIsFavourite(true);
    }
  };

  return (
    <button
      className={`text-xl ${isFavourite ? "text-red-500" : "opacity-20"}`}
      type="button"
      onClick={handleFavoriteClick}
    >
      ♥
    </button>
  );
}
