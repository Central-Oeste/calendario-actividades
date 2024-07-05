interface Evento {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  fecha: string;
  url: string;
  visibilidad: string;
}

const api = {
  list: async (): Promise<Evento[]> => {
    const [, ...data] = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTge7Vwt_Zvi1n2ou2mIA_6HQDYujqGxKOz3cGyrCGOYuEsrBTBusBSupFi_sF53LcLBIBJf1vnuGZq/pub?output=csv",
      {cache: "no-store"},
    )
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    const eventos: Evento[] = data.map((row) => {
      const values = parseCsvRow(row);

      return {
        id: values[0],
        name: values[1],
        description: values[2],
        address: values[3],
        fecha: values[4],
        image: values[5],
        url: values[6],
        visibilidad: values[7],
      };
    });

    return eventos;
  },

  fetch: async (id: Evento["id"]): Promise<Evento> => {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/e/2PACX-1vTge7Vwt_Zvi1n2ou2mIA_6HQDYujqGxKOz3cGyrCGOYuEsrBTBusBSupFi_sF53LcLBIBJf1vnuGZq/pub?output=csv`,
      {cache: "no-store"},
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const textData = await response.text();
    const [, ...data] = textData.split("\n");

    const eventos = data.map((row) => {
      const values = parseCsvRow(row);

      return {
        id: values[0],
        name: values[1],
        description: values[2],
        address: values[3],
        fecha: values[4],
        image: values[5],
        url: values[6],
        visibilidad: values[7],
      };
    });

    const evento = eventos.find((evento) => evento.id === id);

    if (!evento) {
      throw new Error(`Evento with id ${id} not found`);
    }

    return evento;
  },

  search: async (q: string): Promise<Evento[]> => {
    const results = await api.list().then((eventos) =>
      eventos.filter((evento) => {
        const eventName = evento.name || "";
        const eventFecha = evento.fecha || "";
        const lowercaseQuery = q || "";

        return (
          (typeof eventName === "string" &&
            eventName.toLowerCase().includes(lowercaseQuery.toLowerCase())) ||
          (typeof eventFecha === "string" &&
            eventFecha.toLowerCase().includes(lowercaseQuery.toLowerCase()))
        );
      }),
    );

    if (results.length === 0) {
      // eslint-disable-next-line no-console
      console.log(`No Matching results`);
    }

    return results;
  },
};

function parseCsvRow(row: string): string[] {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }

    if (i === row.length - 1) {
      values.push(current.trim());
    }
  }

  return values;
}

export default api;
