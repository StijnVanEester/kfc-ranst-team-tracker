"use client";

import { useMemo, useState } from "react";

type Speler = {
  id: number;
  naam: string;
  rugnummer: number;
  positie: string;
  aanwezig: boolean;
  inzet: number;
  minuten: number;
  goals: number;
  assists: number;
  fouten: number;
};

const startSpelers: Speler[] = [
  {
    id: 1,
    naam: "Robbe Peeters",
    rugnummer: 8,
    positie: "Middenveld",
    aanwezig: true,
    inzet: 4,
    minuten: 55,
    goals: 1,
    assists: 0,
    fouten: 2,
  },
  {
    id: 2,
    naam: "Milan Janssens",
    rugnummer: 10,
    positie: "Aanval",
    aanwezig: true,
    inzet: 5,
    minuten: 70,
    goals: 2,
    assists: 1,
    fouten: 1,
  },
  {
    id: 3,
    naam: "Noah Vermeulen",
    rugnummer: 4,
    positie: "Verdediging",
    aanwezig: false,
    inzet: 0,
    minuten: 0,
    goals: 0,
    assists: 0,
    fouten: 0,
  },
  {
    id: 4,
    naam: "Lars De Smet",
    rugnummer: 1,
    positie: "Doelman",
    aanwezig: true,
    inzet: 3,
    minuten: 70,
    goals: 0,
    assists: 0,
    fouten: 0,
  },
];

export default function Home() {
  const [tab, setTab] = useState("home");
  const [spelers, setSpelers] = useState<Speler[]>(startSpelers);
  const [melding, setMelding] = useState("");

  const statistieken = useMemo(() => {
    const aanwezig = spelers.filter((s) => s.aanwezig).length;
    const totaalGoals = spelers.reduce((som, s) => som + s.goals, 0);
    const totaalMinuten = spelers.reduce((som, s) => som + s.minuten, 0);
    const aanwezigeSpelers = spelers.filter((s) => s.aanwezig && s.inzet > 0);

    const gemiddeldeInzet =
      aanwezigeSpelers.length === 0
        ? "0"
        : (
            aanwezigeSpelers.reduce((som, s) => som + s.inzet, 0) /
            aanwezigeSpelers.length
          ).toFixed(1);

    return { aanwezig, totaalGoals, totaalMinuten, gemiddeldeInzet };
  }, [spelers]);

  function wijzigAanwezigheid(id: number) {
    setMelding("");
    setSpelers((huidig) =>
      huidig.map((speler) =>
        speler.id === id
          ? {
              ...speler,
              aanwezig: !speler.aanwezig,
              inzet: !speler.aanwezig ? 3 : 0,
            }
          : speler
      )
    );
  }

  function wijzigInzet(id: number, inzet: number) {
    setMelding("");
    setSpelers((huidig) =>
      huidig.map((speler) =>
        speler.id === id ? { ...speler, inzet } : speler
      )
    );
  }

  function wijzigCijfer(
    id: number,
    veld: "minuten" | "goals" | "assists" | "fouten",
    stap: number
  ) {
    setMelding("");
    setSpelers((huidig) =>
      huidig.map((speler) =>
        speler.id === id
          ? { ...speler, [veld]: Math.max(0, speler[veld] + stap) }
          : speler
      )
    );
  }

  function demoOpslaan() {
    setMelding(
      "Demo opgeslagen op het scherm. Database koppelen doen we in de volgende stap."
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto min-h-screen max-w-md bg-slate-100 pb-24">
        <header className="sticky top-0 z-10 bg-slate-950 px-5 py-6 text-white shadow">
          <p className="text-sm text-slate-300">Mobiele app voor op het veld</p>
          <h1 className="text-2xl font-bold">KFC Ranst Team Tracker</h1>
          <p className="mt-1 text-xs text-slate-400">
            Eerste propere testversie
          </p>
        </header>

        {melding && (
          <div className="m-5 rounded-3xl bg-green-100 p-4 text-sm font-bold text-green-800">
            {melding}
          </div>
        )}

        {tab === "home" && (
          <section className="space-y-4 p-5">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                titel="Aanwezig"
                waarde={`${statistieken.aanwezig}/${spelers.length}`}
              />
              <StatCard titel="Inzet" waarde={statistieken.gemiddeldeInzet} />
              <StatCard titel="Goals" waarde={statistieken.totaalGoals} />
              <StatCard titel="Minuten" waarde={statistieken.totaalMinuten} />
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Snel registreren</h2>

              <div className="space-y-3">
                <button
                  onClick={() => setTab("training")}
                  className="w-full rounded-2xl bg-slate-950 p-4 text-left font-bold text-white"
                >
                  Training starten
                  <span className="block text-sm font-normal text-slate-300">
                    Aanwezigheid en inzet registreren
                  </span>
                </button>

                <button
                  onClick={() => setTab("wedstrijd")}
                  className="w-full rounded-2xl bg-white p-4 text-left font-bold text-slate-950 ring-1 ring-slate-200"
                >
                  Wedstrijd registreren
                  <span className="block text-sm font-normal text-slate-500">
                    Minuten, goals, assists en fouten
                  </span>
                </button>

                <button
                  onClick={() => setTab("spelers")}
                  className="w-full rounded-2xl bg-white p-4 text-left font-bold text-slate-950 ring-1 ring-slate-200"
                >
                  Spelers bekijken
                  <span className="block text-sm font-normal text-slate-500">
                    Overzicht per speler
                  </span>
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Status</h2>
              <div className="space-y-2 text-sm">
                <p className="rounded-2xl bg-slate-50 p-3">
                  Deze versie werkt nog met voorbeeldspelers.
                </p>
                <p className="rounded-2xl bg-slate-50 p-3">
                  Als dit online werkt, koppelen we opnieuw rustig Supabase.
                </p>
              </div>
            </div>
          </section>
        )}

        {tab === "training" && (
          <section className="space-y-3 p-5">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Training</p>
              <h2 className="text-xl font-bold">Aanwezigheid en inzet</h2>
            </div>

            {spelers.map((speler) => (
              <div
                key={speler.id}
                className="rounded-3xl bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">
                      #{speler.rugnummer} {speler.naam}
                    </p>
                    <p className="text-sm text-slate-500">{speler.positie}</p>
                  </div>

                  <button
                    onClick={() => wijzigAanwezigheid(speler.id)}
                    className={`rounded-2xl px-3 py-2 text-sm font-bold ${
                      speler.aanwezig
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {speler.aanwezig ? "Aanwezig" : "Afwezig"}
                  </button>
                </div>

                {speler.aanwezig && (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => wijzigInzet(speler.id, score)}
                        className={`h-11 w-11 rounded-2xl font-bold ${
                          speler.inzet >= score
                            ? "bg-slate-950 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={demoOpslaan}
              className="w-full rounded-3xl bg-green-600 p-4 font-bold text-white"
            >
              Training opslaan
            </button>
          </section>
        )}

        {tab === "wedstrijd" && (
          <section className="space-y-3 p-5">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Wedstrijd</p>
              <h2 className="text-xl font-bold">Wedstrijddata per speler</h2>
            </div>

            {spelers.map((speler) => (
              <div
                key={speler.id}
                className="rounded-3xl bg-white p-4 shadow-sm"
              >
                <div className="mb-4">
                  <p className="font-bold">
                    #{speler.rugnummer} {speler.naam}
                  </p>
                  <p className="text-sm text-slate-500">{speler.positie}</p>
                </div>

                <CijferRij
                  label="Minuten"
                  waarde={speler.minuten}
                  min={() => wijzigCijfer(speler.id, "minuten", -5)}
                  plus={() => wijzigCijfer(speler.id, "minuten", 5)}
                />
                <CijferRij
                  label="Goals"
                  waarde={speler.goals}
                  min={() => wijzigCijfer(speler.id, "goals", -1)}
                  plus={() => wijzigCijfer(speler.id, "goals", 1)}
                />
                <CijferRij
                  label="Assists"
                  waarde={speler.assists}
                  min={() => wijzigCijfer(speler.id, "assists", -1)}
                  plus={() => wijzigCijfer(speler.id, "assists", 1)}
                />
                <CijferRij
                  label="Fouten"
                  waarde={speler.fouten}
                  min={() => wijzigCijfer(speler.id, "fouten", -1)}
                  plus={() => wijzigCijfer(speler.id, "fouten", 1)}
                />
              </div>
            ))}

            <button
              onClick={demoOpslaan}
              className="w-full rounded-3xl bg-green-600 p-4 font-bold text-white"
            >
              Wedstrijd opslaan
            </button>
          </section>
        )}

        {tab === "spelers" && (
          <section className="space-y-3 p-5">
            {spelers.map((speler) => (
              <div
                key={speler.id}
                className="rounded-3xl bg-white p-4 shadow-sm"
              >
                <p className="text-sm text-slate-500">#{speler.rugnummer}</p>
                <h2 className="text-lg font-bold">{speler.naam}</h2>
                <p className="text-sm text-slate-500">{speler.positie}</p>

                <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
                  <MiniStat label="Min" waarde={speler.minuten} />
                  <MiniStat label="G" waarde={speler.goals} />
                  <MiniStat label="A" waarde={speler.assists} />
                  <MiniStat label="F" waarde={speler.fouten} />
                </div>
              </div>
            ))}
          </section>
        )}

        <nav className="fixed bottom-0 left-1/2 grid w-full max-w-md -translate-x-1/2 grid-cols-4 gap-1 border-t bg-white p-2">
          <NavKnop
            actief={tab === "home"}
            tekst="Home"
            klik={() => setTab("home")}
          />
          <NavKnop
            actief={tab === "training"}
            tekst="Training"
            klik={() => setTab("training")}
          />
          <NavKnop
            actief={tab === "wedstrijd"}
            tekst="Wedstrijd"
            klik={() => setTab("wedstrijd")}
          />
          <NavKnop
            actief={tab === "spelers"}
            tekst="Spelers"
            klik={() => setTab("spelers")}
          />
        </nav>
      </div>
    </main>
  );
}

function StatCard({
  titel,
  waarde,
}: {
  titel: string;
  waarde: string | number;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{titel}</p>
      <p className="text-3xl font-bold">{waarde}</p>
    </div>
  );
}

function MiniStat({
  label,
  waarde,
}: {
  label: string;
  waarde: string | number;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-2">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-bold">{waarde}</p>
    </div>
  );
}

function NavKnop({
  actief,
  tekst,
  klik,
}: {
  actief: boolean;
  tekst: string;
  klik: () => void;
}) {
  return (
    <button
      onClick={klik}
      className={`rounded-2xl px-2 py-3 text-xs font-bold ${
        actief ? "bg-slate-950 text-white" : "text-slate-500"
      }`}
    >
      {tekst}
    </button>
  );
}

function CijferRij({
  label,
  waarde,
  min,
  plus,
}: {
  label: string;
  waarde: number;
  min: () => void;
  plus: () => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-2xl bg-slate-50 p-3">
      <p className="font-bold">{label}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={min}
          className="h-10 w-10 rounded-2xl bg-white font-bold"
        >
          -
        </button>
        <span className="w-10 text-center text-xl font-bold">{waarde}</span>
        <button
          onClick={plus}
          className="h-10 w-10 rounded-2xl bg-slate-950 font-bold text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}
