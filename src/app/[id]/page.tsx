/* eslint-disable react/button-has-type */
import Link from "next/link";

import api from "@/api";

export async function generateMetadata({params: {id}}: {params: {id: string}}) {
  const product = await api.fetch(id);

  return {
    title: `${product.name} - Comunidad`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await api.list();

  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function RestaurantPage({params: {id}}: {params: {id: string}}) {
  const product = await api.fetch(id);

  return (
    <div>
      <div className="contain_btn_back">
        <Link href="/">
          <button className="button_back mb-5"> Volver</button>
        </Link>
      </div>

      <article key={product.id}>
        <div
          className="img_contain"
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: ".5px",
          }}
        >
          <img alt={product.name} className="style_img_detalle" src={product.image} />
        </div>

        <div className="pt-3">
          <h2 className="inline-flex gap-2 text-lg font-bold">
            <span>{product.name}</span>
          </h2>
          <p className="pt-3 opacity-90">{product.description}</p>
        </div>
        <div className="inline-flex gap-1 pt-3">
          <span>📅 {product.score} de febrero</span>
          <span className="font-normal opacity-75">- Desde las {product.ratings} hs</span>
        </div>
        <div className="pt-3">
          <span>📍 {product.address}</span>
        </div>
      </article>
    </div>
  );
}
