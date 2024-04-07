"use client";

export default function ErrorPage({error}: {error: Error}) {
  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <div className="contain_center">
      <h2 className="error_text">ERROR 404 🙄</h2>
      <br />
      <a className="search_btn_style mt-5 px-3 py-1" href="/">
        Inicio
      </a>
    </div>
  );
}
