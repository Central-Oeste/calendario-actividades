/* eslint-disable react/button-has-type */
import Link from "next/link";

import api from "@/api";

export async function generateMetadata({params: {id}}: {params: {id: string}}) {
  const evento = await api.fetch(id);

  return {
    title: `${evento.name} - Comunidad`,
    description: evento.description,
  };
}

export async function generateStaticParams() {
  const evento = await api.list();

  return evento.map((evento) => ({
    id: evento.id,
  }));
}

export default async function RestaurantPage({params: {id}}: {params: {id: string}}) {
  const evento = await api.fetch(id);

  return (
    <div>
      <div className="contain_btn_back">
        <Link href="/">
          <button className="button_back mb-5"> Volver</button>
        </Link>
      </div>

      <article key={evento.id}>
        <div
          className="img_contain"
          style={{
            backgroundImage: `url(${evento.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: ".5px",
          }}
        >
          <img alt={evento.name} className="style_img_detalle" src={evento.image} />
        </div>

        <div className="pt-3">
          <h2 className="inline-flex gap-2 text-lg font-bold">
            <span>{evento.name}</span>
          </h2>
          <div dangerouslySetInnerHTML={{__html: evento.description}} className="pt-3" />
        </div>
        <div className="inline-flex gap-1 pt-3">
          <span>📅 {evento.score} de febrero</span>
          <span className="font-normal opacity-75">- Desde las {evento.ratings}</span>
        </div>
        <div className="pt-3">
          <span>📍 {evento.address}</span>
        </div>
      </article>
    </div>
  );
}
