interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  score: string;
  ratings: string;
}

const api = {
  list: async (): Promise<Restaurant[]> => {
    // Obtenemos la información de Google Sheets en formato texto y la dividimos por líneas, nos saltamos la primera línea porque es el encabezado
    const [, ...data] = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTge7Vwt_Zvi1n2ou2mIA_6HQDYujqGxKOz3cGyrCGOYuEsrBTBusBSupFi_sF53LcLBIBJf1vnuGZq/pub?output=csv",
      {cache: "no-store"},
    )
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    // Convertimos cada línea en un objeto Restaurant, asegúrate de que los campos no posean `,`
    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(",");

      return {
        id,
        name,
        description,
        address,
        score,
        ratings,
        image,
      };
    });

    // Lo retornamos
    return restaurants;
  },

  fetch: async (id: Restaurant["id"]): Promise<Restaurant> => {
    // Realizamos una solicitud a la URL de tu servicio externo para obtener los datos
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/e/2PACX-1vTge7Vwt_Zvi1n2ou2mIA_6HQDYujqGxKOz3cGyrCGOYuEsrBTBusBSupFi_sF53LcLBIBJf1vnuGZq/pub?output=csv`,
      {cache: "no-store"},
    );

    // Verificamos si la solicitud fue exitosa (código de respuesta 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const textData = await response.text();
    const [, ...data] = textData.split("\n");

    // Convertimos cada línea en un objeto Restaurant, similar a la función list
    const restaurants = data.map((row) => {
      const [rowId, name, description, address, score, ratings, image] = row.split(",");

      return {
        id: rowId,
        name,
        description,
        address,
        score,
        ratings,
        image,
      };
    });

    // Buscamos el restaurante por el ID dado
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);

    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  },

  search: async (query: string): Promise<Restaurant[]> => {
    // Obtenemos los restaurantes
    const results = await api.list().then((restaurants) =>
      // Los filtramos por nombre
      restaurants.filter((restaurant) => {
        const restaurantName = restaurant.name || "";
        const lowercaseQuery = query || "";

        return (
          typeof restaurantName === "string" &&
          typeof lowercaseQuery === "string" &&
          restaurantName.toLowerCase().includes(lowercaseQuery.toLowerCase())
        );
      }),
    );

    if (results.length === 0) {
      throw new Error(`No Matching resutls`);
    }

    // Los retornamos
    return results;
  },
};

export default api;
