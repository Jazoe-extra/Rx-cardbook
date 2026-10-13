"use client";
import { useEffect, useState } from "react";

export default function LockPage() {
  const [days, setDays] = useState<any[]>([]);
  const load = () => fetch("/api/day").then((r) => r.json()).then(setDays);
  useEffect(() => { load(); }, []);
  const lock = async () => {
    const r = await fetch("/api/day", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ light: "locked" }) });
    const j = await r.json();
    alert(r.ok ? `Period locked (${j.day}). No silent edits after this — corrections become visible adjustments.` : j.error);
    load();
  };
  return (
    <main>
      <div className="card"><h1 className="text-xl font-extrabold">HQ — Period lock</h1>
        <p className="text-sm">Locked records cannot change silently. Corrections after lock = new visible adjustment with who + when.</p>
        <button className="btn btn-primary" onClick={lock}>Lock current period</button></div>
      <div className="card"><h2 className="font-bold">Locks & closes</h2>
        {days.map((d: any) => <p key={d.id}>• {d.day} — {d.light} by {d.closedBy}</p>)}
        <a className="btn" style={{ border: "2px solid #0E7C6B", display: "block", textAlign: "center", lineHeight: "56px" }} href="/api/export">Download auditor CSV</a>
      </div>
    </main>
  );
}
