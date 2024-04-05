import {redirect} from "next/navigation";

import api from "@/api";
import RestaurantCard from "@/components/RestaurantCard";

export default async function HomePage({searchParams}: {searchParams: {q: string}}) {
  const restaurants = await api.search(searchParams.q);

  async function searchAction(formData: FormData) {
    "use server";

    redirect(`/?q=${formData.get("query")}`);
  }

  return (
    <div>
      <form action={searchAction} className="mb-4 inline-flex gap-2">
        <input className="search_style px-2" defaultValue={searchParams.q || ""} name="query" />
        <button className="search_btn_style p-2" type="submit">
          Buscar
        </button>
      </form>
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => {
          return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
        })}
      </section>
    </div>
  );
}
