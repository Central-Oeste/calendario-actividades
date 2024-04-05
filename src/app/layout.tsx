import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Eventos - Comunidad Central Mas",
  description: "Calendario de Actividades",
  keywords: ["calendario", "actividades", "comunidad", "central mas", "eventos"],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4">
        <header className="container_header text-xl font-bold leading-[3rem]">
          <Link href="/">
            <h2 className="title_restaurancy">📆 Calendario de Actividades</h2>
          </Link>
        </header>

        <main className="py-8">{children}</main>

        <footer className="text-center leading-[3rem] opacity-70">
          © {new Date().getFullYear()} Farmacias Central Oeste
        </footer>
      </body>
    </html>
  );
}
