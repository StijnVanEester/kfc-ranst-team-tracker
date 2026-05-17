"use client";

import { useState, useEffect } from "react";

type Speler = {
  id: number;
  naam: string;
  rugnummer: number;
  positie: string;
  aanwezig: boolean;
  minuten: number;
  goals: number;
  assists: number;
  fouten: number;
};

export default function Thuis() {
  // Voorlopig mock-data; later kan je dit vervangen door Supabase fetch
  const [spelers, setSpelers] = useState<Speler[]>([
    { id: 1, naam: "Robbe Peeters", rugnummer: 8, positie: "Middenveld", aanwezig: true, minuten: 45, goals: 1, assists: 0, fouten: 0 },
    { id: 2, naam: "Milan Janssens", rugnummer: 10, positie: "Aanval", aanwezig: true, minuten: 45, goals: 2, assists: 1, fouten: 1 },
    { id: 3, naam: "Noah Vermeulen", rugnummer: 4, positie: "Verdediging", aanwezig: true, minuten: 45, goals: 0, assists: 0, fouten: 0 },
    { id: 4, naam: "Lars De Smet", rugnummer: 1, positie: "Doelman", aanwezig: true, minuten: 45, goals: 0, assists: 0, fouten: 0 },
  ]);

  // Voorbeeldfunctie voor button click
  const handleBewerken = (speler: Speler) => {
    alert(`Bewerken: ${speler.naam}`);
  };

  const handleVerwijderen = (speler: Speler) => {
    alert(`Verwijderen: ${speler.naam}`);
  };

  const handleDetails = (speler: Speler) => {
    alert(`Details van: ${speler.naam}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spelerslijst</h1>

      <div className="flex flex-col gap-2">
        {spelers.map((speler) => (
          <div
            key={speler.id}
            className="flex flex-col md:flex-row items-center justify-between p-4 border rounded shadow-sm hover:shadow-md transition"
          >
            <div className="mb-2 md:mb-0">
              <p className="font-semibold">{speler.naam}</p>
              <p className="text-sm text-gray-600">
                Rugnummer: {speler.rugnummer} | Positie: {speler.positie}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleBewerken(speler)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Bewerken
              </button>

              <button
                onClick={() => handleVerwijderen(speler)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Verwijderen
              </button>

              <button
                onClick={() => handleDetails(speler)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
