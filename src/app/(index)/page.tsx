"use client";
import api from "@/api";
import EventoCard from "@/components/EventoCard";
import {searchAction} from "@/components/searchAction";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function HomePage({searchParams}: {searchParams: {q: string}}) {
  const eventos = await api.search(searchParams.q);

  return (
    <div>
      <div className="container-filters">
        <form
          className="mb-4 inline-flex gap-2"
          onSubmit={async (event) => {
            event.preventDefault();
            await searchAction(new FormData(event.currentTarget));
          }}
        >
          <input className="search_style px-2" defaultValue={searchParams.q || ""} name="q" />
          <button className="search_btn_style p-2" type="submit">
            Buscar
          </button>
        </form>
        <div>
          <form
            className="mb-4 me-2 inline-flex gap-2"
            onSubmit={async (event) => {
              event.preventDefault();
              await searchAction(new FormData(event.currentTarget));
            }}
          >
            <select className="search_style px-2" defaultValue={searchParams.q || ""} name="q">
              <option value="">Selecciona un mes</option>
              <option value="enero">Enero</option>
              <option value="febrero">Febrero</option>
              <option value="marzo">Marzo</option>
              <option value="abril">Abril</option>
              <option value="mayo">Mayo</option>
              <option value="junio">Junio</option>
              <option value="julio">Julio</option>
              <option value="agosto">Agosto</option>
              <option value="septiembre">Septiembre</option>
              <option value="octubre">Octubre</option>
              <option value="noviembre">Noviembre</option>
              <option value="diciembre">Diciembre</option>
            </select>
            <button className="search_btn_style p-2" type="submit">
              Buscar
            </button>
          </form>
          <button className="search_btn_style p-2" type="submit">
            <a href="/">Todos</a>
          </button>
        </div>
      </div>
      <section className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {eventos.map((evento) => (
          <EventoCard key={evento.id} evento={evento} />
        ))}
      </section>
    </div>
  );
}
