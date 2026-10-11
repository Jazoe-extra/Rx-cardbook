"use client";
import { useEffect, useState } from "react";

export default function BranchPage() {
  const [drugs, setDrugs] = useState<any[]>([]);
  const [drug, setDrug] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const [reason, setReason] = useState("");
  const [sales, setSales] = useState<any[]>([]);
  const [counts, setCounts] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const d = await fetch("/api/drugs").then((r) => r.json());
    setDrugs(d);
    if (d.length && !drug) { setDrug(d[0].id); setPrice(d[0].standardPrice); }
    setSales(await fetch("/api/sales").then((r) => r.json()));
    setCounts(await fetch("/api/counts").then((r) => r.json()));
  };
  useEffect(() => { load(); }, []);

  const sel = drugs.find((x) => x.id === drug);
  const unitPrice = Number(price || sel?.standardPrice || 0);
  const total = unitPrice * qty;
  const sell = async () => {
    if (!drug) { setMsg("Pick a drug first — catalogue is empty. Import at /hq/import."); return; }
    if (!qty || qty < 1) { setMsg("Quantity must be 1+."); return; }
    setMsg("Saving sale...");
    const r = await fetch("/api/sales", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ drugId: drug, qty, price: price || sel?.standardPrice, reason }) });
    let j: any = {};
    try { j = await r.json(); } catch { j = { error: "server error" }; }
    if (!r.ok) { setMsg("Sale blocked: " + (j.error || r.status)); return; }
    setMsg(`Saved ${qty}x ${sel?.name} — £${total.toFixed(2)}.`);
    setQty(1); setReason(""); if (sel) setPrice(sel.standardPrice); load();
  };
  const pick = async () => {
    setMsg("Picking today's 2 items...");
    const r = await fetch("/api/counts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "pick" }) });
    const j = await r.json();
    if (!r.ok) { setMsg(j.error); return; }
    setMsg("2 items picked — count them on the shelf.");
    load();
  };
  const saveCount = async (id: string, phys: number, rsn: string) => {
    await fetch("/api/counts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "count", id, physicalQty: phys, reason: rsn }) });
    load();
  };
  const close = async (light: string) => {
    setMsg("Closing day...");
    try {
      const r = await fetch("/api/day", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ light }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setMsg("Close blocked: " + (j.error || r.status)); return; }
      setMsg(`Day closed (${j.light}) by Demo Counter at ${new Date().toLocaleTimeString()}. HQ will see today's sales, counts and reasons.`);
    } catch (e: any) {
      setMsg("Close failed: no server. Is dev running?");
    }
  };

  const counted = counts.filter((c) => c.phys != null).length;
  const diffs = counts.filter((c) => c.phys != null && c.phys !== c.exp).length;
  const light = sales.length === 0 || counted < 2 ? "red" : diffs > 0 ? "amber" : "green";

  return (
    <main>
      <div className="card" style={{ background: "linear-gradient(135deg,#0B4EA2,#12A68F)", color: "#fff", border: 0 }}>
        <h1 className="text-2xl font-extrabold">Cardbook</h1>
        <p className="font-bold">The daily sales book for branch pharmacies — replaces paper, catches mistakes the same day.</p>
        <p className="text-sm mt-2">If you run a branch: sell fast, count 2 items on the shelf, close the day in minutes.</p>
        <p className="text-sm">If you run HQ: see every branch today, without waiting for month-end.</p>
      </div>
      {msg && <div className="card"><p>{msg}</p></div>}

      <div className="card"><h2 className="font-bold">1. Sell something</h2>
        <select className="w-full min-h-[56px] border rounded-xl" value={drug} onChange={(e) => { setDrug(e.target.value); const d = drugs.find((x) => x.id === e.target.value); setPrice(d?.standardPrice || ""); }}>
          {drugs.map((d) => <option key={d.id} value={d.id}>{d.name} {d.strength || ""} — {d.stockUnit} — £{d.standardPrice}</option>)}
        </select>
        <div className="flex gap-2 items-center my-2">
          <button className="btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <div className="flex-1 text-center text-xl font-extrabold">{qty}</div>
          <button className="btn" onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <input className="w-full min-h-[56px] border rounded-xl p-2" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price per unit" />
        <input className="w-full min-h-[56px] border rounded-xl p-2 mt-1" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Changed price? Tell us why" />
        <button className="btn btn-primary" disabled={!drug} onClick={sell}>Save sale — £{total.toFixed(2)} ({qty}x £{unitPrice.toFixed(2)})</button>
        <p className="text-xs text-slate-500">Normal: £{sel?.standardPrice} per {sel?.stockUnit}</p>
      </div>

      <div className="card"><h2 className="font-bold">What you sold ({sales.length})</h2>
        {sales.map((s: any) => <p key={s.id}>• {s.qty}x {s.drug} — £{(Number(s.price) * Number(s.qty)).toFixed(2)} <span className="text-xs text-slate-500">({s.qty}x £{Number(s.price).toFixed(2)})</span></p>)}
      </div>

      <div className="card"><h2 className="font-bold">2. Count 2 items on the shelf</h2>
        <button className="btn g btn" style={{ border: "2px solid #0E7C6B" }} onClick={pick}>Show today's 2 items</button>
        {counts.map((c: any) => (
          <CountRow key={c.id} c={c} onSave={saveCount} />
        ))}
      </div>

      <div className="card"><h2 className="font-bold">3. End of day — can I close?</h2>
        <p><span className="pill" style={{ background: light === "green" ? "#1A9E5C" : light === "amber" ? "#C77D0A" : "#C93A3A", color: "#fff" }}>{light.toUpperCase()}</span></p>
        <p className="text-sm">Sales: {sales.length ? "done" : "missing"} • Counted: {counted}/2 • Differences: {diffs}</p>
        <p className="text-sm">{light === "green" ? "All done — safe to close." : light === "amber" ? "You can close, differences have reasons — HQ will see them." : "Finish 1 sale + both counts first."}</p>
        <button className="btn btn-primary" onClick={() => close(light)}>Close day — I have reviewed</button>
      </div>
    </main>
  );
}

function CountRow({ c, onSave }: any) {
  const [phys, setPhys] = useState(c.phys ?? "");
  const [rsn, setRsn] = useState(c.reason ?? "");
  const diff = phys === "" ? "—" : Number(phys) - c.exp;
  return (
    <div className="border rounded-xl p-2 my-1">
      <b>{c.drug}</b> <span className="text-sm">({c.unit}s, expected {c.exp})</span>
      <input type="number" className="w-full min-h-[56px] border rounded-xl p-2 mt-1" placeholder="Count on shelf" value={phys} onChange={(e) => setPhys(e.target.value)} />
      <select className="w-full min-h-[56px] border rounded-xl mt-1" value={rsn} onChange={(e) => setRsn(e.target.value)}>
        <option value="">What happened?</option>
        {["agree", "counting error", "sale not recorded", "wrong qty entered", "damaged", "expired", "spoiled", "returned", "transferred", "missing/unaccounted", "other"].map((r) => <option key={r}>{r}</option>)}
      </select>
      <p className="text-sm">Difference: <b>{String(diff)}</b></p>
      <button className="btn btn-primary" onClick={() => onSave(c.id, phys === "" ? null : Number(phys), rsn)}>Save count</button>
    </div>
  );
}
