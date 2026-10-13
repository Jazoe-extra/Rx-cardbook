"use client";
import { useEffect, useState } from "react";

const BRANCHES = ["Branch 1", "Branch 2", "Branch 3", "Branch 4"];
const CURS = ["₦", "£", "$", "₵"];

export default function BranchPage() {
  const [branch, setBranch] = useState("Branch 1");
  const [cur, setCur] = useState("₦");
  const [drugs, setDrugs] = useState<any[]>([]);
  const [drug, setDrug] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const [reason, setReason] = useState("");
  const [sales, setSales] = useState<any[]>([]);
  const [counts, setCounts] = useState<any[]>([]);
  const [msg, setMsg] = useState("");
  const [closeMsg, setCloseMsg] = useState("");

  const load = async (br = branch) => {
    const d = await fetch("/api/drugs").then((r) => r.json());
    setDrugs(d);
    if (d.length && !drug) { setDrug(d[0].id); setPrice(d[0].standardPrice); }
    setSales(await fetch("/api/sales?branch=" + encodeURIComponent(br)).then((r) => r.json()));
    setCounts(await fetch("/api/counts?branch=" + encodeURIComponent(br)).then((r) => r.json()));
  };
  useEffect(() => { load(); }, []);

  const sel = drugs.find((x) => x.id === drug);
  const unitPrice = Number(price || sel?.standardPrice || 0);
  const total = unitPrice * qty;
  const changed = sel && !isNaN(unitPrice) && Number(sel.standardPrice) !== unitPrice;
  const soldTotal = sales.reduce((a: number, s: any) => a + Number(s.price) * Number(s.qty), 0);

  const switchBranch = (b: string) => { setBranch(b); setCloseMsg(""); setMsg("You are now in " + b + ". Sales and counts below are for " + b + "."); load(b); };

  const sell = async () => {
    if (!drug) { setMsg("Pick a drug first — catalogue is empty. Import at /hq/import."); return; }
    if (!qty || qty < 1) { setMsg("Quantity must be 1+."); return; }
    setMsg("Saving sale...");
    const r = await fetch("/api/sales", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ drugId: drug, qty, price: price || sel?.standardPrice, reason, branch }) });
    let j: any = {};
    try { j = await r.json(); } catch { j = { error: "server error" }; }
    if (!r.ok) { setMsg("Sale blocked: " + (j.error || r.status)); return; }
    setMsg(`Saved ${qty}x ${sel?.name} in ${branch} — ${cur}${total.toFixed(2)}.`);
    setQty(1); setReason(""); if (sel) setPrice(sel.standardPrice); load();
  };
  const pick = async () => {
    setMsg("Picking today's 2 items for " + branch + "...");
    const r = await fetch("/api/counts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "pick", branch }) });
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
    setCloseMsg("Closing day for " + branch + "...");
    try {
      const r = await fetch("/api/day", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ light }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setCloseMsg("Close blocked: " + (j.error || r.status)); return; }
      setCloseMsg(`Day closed (${j.light}) in ${branch} at ${new Date().toLocaleTimeString()}. HQ will see it.`);
    } catch {
      setCloseMsg("Close failed: no server. Is dev running on this port?");
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
        <div className="flex gap-2 mt-2">
          <label className="text-sm font-bold">You are in:<select className="text-black min-h-[48px] rounded-xl ml-1" value={branch} onChange={(e) => switchBranch(e.target.value)}>
            {BRANCHES.map((b) => <option key={b}>{b}</option>)}
          </select></label>
          <label className="text-sm font-bold">Currency:<select className="text-black min-h-[48px] rounded-xl ml-1" value={cur} onChange={(e) => setCur(e.target.value)}>
            {CURS.map((c) => <option key={c}>{c}</option>)}
          </select></label>
        </div>
      </div>
      {msg && <div className="card"><p>{msg}</p></div>}

      <div className="card"><h2 className="font-bold">1. Sell something ({branch})</h2>
        <select className="w-full min-h-[56px] border rounded-xl" value={drug} onChange={(e) => { setDrug(e.target.value); const d = drugs.find((x) => x.id === e.target.value); setPrice(d?.standardPrice || ""); }}>
          {drugs.map((d) => <option key={d.id} value={d.id}>{d.name} {d.strength || ""} — {d.stockUnit} — {cur}{d.standardPrice}</option>)}
        </select>
        <div className="flex gap-2 items-center my-2">
          <button className="btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <div className="flex-1 text-center text-xl font-extrabold">{qty}</div>
          <button className="btn" onClick={() => setQty(qty + 1)}>+</button>
        </div>
        <div style={{ border: changed ? "2px solid #C77D0A" : "2px solid #C9D9F2", borderRadius: 12, padding: 10 }}>
          <label className="font-bold">Price per item <span className="text-xs text-slate-500">(normal {cur}{sel?.standardPrice})</span></label>
          <input className="w-full min-h-[56px] border rounded-xl p-2" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price per item" />
          <label className="font-bold mt-1" style={{ display: "block" }}>Why is the price different? <span className="text-xs text-slate-500">{changed ? "— needed, you changed it" : "— only if changed"}</span></label>
          <input className="w-full min-h-[56px] border rounded-xl p-2" value={reason} onChange={(e) => setReason(e.target.value)} placeholder={changed ? `You changed ${cur}${sel?.standardPrice} — tell us why` : "e.g. manager allowed discount"} />
        </div>
        <button className="btn btn-primary" disabled={!drug} onClick={sell}>Save sale — {cur}{total.toFixed(2)} ({qty}x {cur}{unitPrice.toFixed(2)}){changed ? " * changed" : ""}</button>
      </div>

      <div className="card"><h2 className="font-bold">What {branch} sold today</h2>
        <details open><summary style={{ fontWeight: 800, cursor: "pointer", minHeight: 44 }}>{sales.length ? `Show ${sales.length} sale(s) — total ${cur}${soldTotal.toFixed(2)} (tap to expand/collapse)` : "No sales yet in " + branch + " (tap to expand)"}</summary>
          {sales.length === 0 ? <p className="text-sm">New sales appear here immediately after Save sale.</p> :
            sales.map((s: any) => <p key={s.id}>• {s.qty}x {s.drug} — {cur}{(Number(s.price) * Number(s.qty)).toFixed(2)} <span className="text-xs text-slate-500">({s.qty}x {cur}{Number(s.price).toFixed(2)})</span></p>)}
        </details>
      </div>

      <div className="card"><h2 className="font-bold">2. Count 2 items on the shelf ({branch})</h2>
        <button className="btn g btn" style={{ border: "2px solid #0E7C6B" }} onClick={pick}>Show today's 2 items</button>
        {counts.map((c: any) => (
          <CountRow key={c.id} c={c} cur={cur} onSave={saveCount} />
        ))}
      </div>

      <div className="card"><h2 className="font-bold">3. End of day — can {branch} close?</h2>
        <p><span className="pill" style={{ background: light === "green" ? "#1A9E5C" : light === "amber" ? "#C77D0A" : "#C93A3A", color: "#fff" }}>{light.toUpperCase()}</span></p>
        <p className="text-sm">Sales: {sales.length ? "done" : "missing"} • Counted: {counted}/2 • Differences: {diffs}</p>
        <p className="text-sm">{light === "green" ? "All done — safe to close." : light === "amber" ? "You can close, differences have reasons — HQ will see them." : "Finish 1 sale + both counts first."}</p>
        <button className="btn btn-primary" onClick={() => close(light)}>Close day — I have reviewed</button>
        {closeMsg && <p style={{ fontWeight: 800 }}>{closeMsg}</p>}
      </div>
    </main>
  );
}

function CountRow({ c, cur, onSave }: any) {
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
