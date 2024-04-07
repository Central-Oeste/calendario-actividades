"use client";
import api from "@/api";
import EventoCard from "@/components/EventoCard";
import {searchAction} from "@/components/searchAction";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function HomePage({searchParams}: {searchParams: {q: string}}) {
  const eventos = await api.search(searchParams.q);

  return (
    <div>
      <div className="inline-flex">
        <form
          className="mb-4 inline-flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            searchAction(new FormData(event.currentTarget));
          }}
        >
          <input className="search_style px-2" defaultValue={searchParams.q || ""} name="query" />
          <button className="search_btn_style p-2" type="submit">
            Buscar
          </button>
        </form>
        <form
          className="mx-4 mb-4 inline-flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            searchAction(new FormData(event.currentTarget));
          }}
        >
          <select className="search_style px-2" defaultValue={searchParams.q || ""} name="query">
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
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {eventos.map((evento) => (
          <EventoCard key={evento.id} evento={evento} />
        ))}
      </section>
    </div>
  );
}
