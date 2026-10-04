"use client";
import { useState } from "react";

const DRUGS = [
  { n: "Paracetamol 500mg", u: "Tablet", p: 5.0 },
  { n: "Amoxicillin 500mg", u: "Pack", p: 12.0 },
  { n: "Cough syrup", u: "Bottle", p: 8.5 }
];

export default function BranchPage() {
  const [drug, setDrug] = useState(0);
  const [qty, setQty] = useState(1);
  const [sales, setSales] = useState<string[]>([]);
  const d = DRUGS[drug];

  return (
    <main>
      <div className="card" style={{ background: "linear-gradient(135deg,#0B4EA2,#12A68F)", color: "#fff", border: 0 }}>
        <h1 className="text-2xl font-extrabold">Cardbook</h1>
        <p className="font-bold">The daily sales book for branch pharmacies — replaces paper, catches mistakes the same day.</p>
        <p className="text-sm mt-3">If you run a branch: sell fast, count 2 items on the shelf, close the day in minutes.</p>
        <p className="text-sm">If you run HQ: see every branch today, without waiting for month-end.</p>
      </div>

      <div className="card">
        <h2 className="font-bold text-lg">1. Sell something (local DB next)</h2>
        <select className="w-full min-h-[56px] border rounded-xl" value={drug} onChange={(e) => setDrug(Number(e.target.value))}>
          {DRUGS.map((x, i) => (
            <option key={x.n} value={i}>{x.n} — {x.u} — £{x.p.toFixed(2)}</option>
          ))}
        </select>
        <div className="flex gap-2 items-center my-2">
          <button className="btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <div className="flex-1 text-center text-xl font-extrabold">{qty} {d.u}s</div>
          <button className="btn" onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setSales([...sales, `${qty}x ${d.n} — £${(qty * d.p).toFixed(2)}`])}
        >
          Save sale — £{(qty * d.p).toFixed(2)}
        </button>
      </div>

      <div className="card">
        <h2 className="font-bold text-lg">What you sold (this page only for now)</h2>
        {sales.length === 0 ? <p className="text-sm text-slate-500">No sales yet.</p> : sales.map((s, i) => <p key={i}>• {s}</p>)}
        <p className="text-xs text-slate-500 mt-2">Phase 2: saves here. Phase 3+: saves to local Postgres with who + when.</p>
      </div>
    </main>
  );
}
