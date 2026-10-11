"use client";
import { useEffect, useState } from "react";

export default function HqPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [counts, setCounts] = useState<any[]>([]);
  const [days, setDays] = useState<any[]>([]);
  const [drugs, setDrugs] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/sales").then((r) => r.json()).then(setSales);
    fetch("/api/counts").then((r) => r.json()).then(setCounts);
    fetch("/api/day").then((r) => r.json()).then(setDays);
    fetch("/api/drugs").then((r) => r.json()).then(setDrugs);
  }, []);
  const counted = counts.filter((c: any) => c.phys != null).length;
  const diffs = counts.filter((c: any) => c.phys != null && c.phys !== c.exp).length;
  const light = sales.length === 0 || counted < 2 ? "red" : diffs > 0 ? "amber" : "green";
  const total = sales.reduce((a: number, s: any) => a + Number(s.price) * Number(s.qty), 0);
  return (
    <main>
      <div className="card"><h1 className="text-xl font-extrabold">HQ — Branch 1 today</h1>
        <p className="text-sm">Visibility, not surveillance. No rankings.</p>
        <p><span className="pill" style={{ background: light === "green" ? "#1A9E5C" : light === "amber" ? "#C77D0A" : "#C93A3A", color: "#fff" }}>{light.toUpperCase()}</span></p>
      </div>
      <div className="card"><h2 className="font-bold">Today sales ({sales.length}) — £{total.toFixed(2)}</h2>
        {sales.map((s: any) => <p key={s.id}>• {s.qty}x {s.drug} — £{(Number(s.price) * Number(s.qty)).toFixed(2)}</p>)}
      </div>
      <div className="card"><h2 className="font-bold">Physical counts ({counted}/2)</h2>
        {counts.map((c: any) => <p key={c.id}>• {c.drug}: expected {c.exp}, counted {c.phys ?? "—"} {c.phys != null && c.phys !== c.exp ? ` (diff ${c.phys - c.exp}, ${c.reason || "no reason"})` : ""}</p>)}
      </div>
      <div className="card"><h2 className="font-bold">Day closes ({days.length})</h2>
        {days.map((d: any) => <p key={d.id}>• {d.day} — {d.light} by {d.closedBy}</p>)}
      </div>
      <div className="card"><h2 className="font-bold">Catalogue ({drugs.length})</h2>
        <p className="text-sm"><a href="/hq/catalogue">Open table</a> • <a href="/hq/import">Import Excel</a> • <a href="/branch">Branch page</a></p>
      </div>
    </main>
  );
}
