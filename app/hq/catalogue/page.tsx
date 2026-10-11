"use client";
import { useEffect, useState } from "react";

export default function CataloguePage() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", stockUnit: "Tablet", standardPrice: "", strength: "", form: "Tablet" });
  const load = () => fetch("/api/drugs").then((r) => r.json()).then(setList);
  useEffect(() => { load(); }, []);
  const add = async () => {
    if (!form.name || !form.standardPrice) { alert("Name + price required"); return; }
    const r = await fetch("/api/drugs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!r.ok) { alert("Failed: need name, unit, price"); return; }
    setForm({ name: "", stockUnit: "Tablet", standardPrice: "", strength: "", form: "Tablet" });
    load();
  };
  return (
    <main>
      <div className="card"><h1 className="text-xl font-extrabold">HQ — Drug catalogue</h1>
        <p className="text-sm">Branch cannot change this. One primary unit per drug.</p></div>
      <div className="card">
        <h2 className="font-bold">Add drug</h2>
        <input className="w-full min-h-[56px] border rounded-xl my-1 p-2" placeholder="Name e.g. Paracetamol" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <div className="flex gap-2">
          <input className="flex-1 min-h-[56px] border rounded-xl p-2" placeholder="Strength e.g. 500mg" value={form.strength} onChange={(e) => setForm({ ...form, strength: e.target.value })} />
          <select className="flex-1 min-h-[56px] border rounded-xl" value={form.stockUnit} onChange={(e) => setForm({ ...form, stockUnit: e.target.value })}>
            {["Tablet", "Pack", "Strip", "Bottle", "Ampoule", "Vial", "Sachet", "Other"].map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
        <input className="w-full min-h-[56px] border rounded-xl my-1 p-2" placeholder="Standard price e.g. 5.00" value={form.standardPrice} onChange={(e) => setForm({ ...form, standardPrice: e.target.value })} />
        <button className="btn btn-primary" onClick={add}>Add to catalogue</button>
      </div>
      <div className="card"><h2 className="font-bold">Catalogue ({list.length})</h2>
        <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead><tr style={{ textAlign: "left", borderBottom: "2px solid #C9D9F2" }}>
            <th>Name</th><th>Strength</th><th>Form</th><th>Unit</th><th>Price</th><th>Code</th>
          </tr></thead>
          <tbody>
          {list.map((d: any) => (
            <tr key={d.id} style={{ borderBottom: "1px solid #E3ECF7" }}>
              <td><b>{d.name}</b></td><td>{d.strength || "-"}</td><td>{d.form || "-"}</td>
              <td><span className="pill green">{d.stockUnit}</span></td><td>£{d.standardPrice}</td><td>{d.code || "-"}</td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
      </div>
    </main>
  );
}
