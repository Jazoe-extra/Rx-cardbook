"use client";
import { useEffect, useState } from "react";

export default function HqPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [counts, setCounts] = useState<any[]>([]);
  const [days, setDays] = useState<any[]>([]);
  const [drugs, setDrugs] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/sales").then((r) => r.json()).then(setSales);
    fetch("/api/counts").then((r) => r.json()).then(setCounts);
    fetch("/api/day").then((r) => r.json()).then(setDays);
    fetch("/api/drugs").then((r) => r.json()).then(setDrugs);
    fetch("/api/branches").then((r) => r.json()).then(setBranches);
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
      <div className="card"><h2 className="font-bold">Branch comparison — today sales (Angela approved, oversight only)</h2>
        {(() => {
          const sum = branches.reduce((a: number, b: any) => a + Number(b.total || 0), 0) || 1;
          const colors = ["#0B4EA2", "#12A68F", "#C77D0A", "#8E44AD"];
          let acc = 0;
          const segs = branches.map((b: any, i: number) => {
            const pct = (Number(b.total || 0) / sum) * 100;
            const s = `${colors[i % colors.length]} ${acc}% ${acc + pct}%`;
            acc += pct;
            return s;
          });
          return (<>
            <div style={{ width: 180, height: 180, borderRadius: "50%", background: `conic-gradient(${segs.join(",")})`, margin: "12px auto" }} />
            {branches.map((b: any, i: number) => (
              <p key={b.id}><span style={{ display: "inline-block", width: 12, height: 12, background: colors[i % colors.length], borderRadius: 3, marginRight: 6 }} />{b.name}: £{Number(b.total || 0).toFixed(2)}</p>
            ))}
            <p className="text-xs text-slate-500">Oversight only — not staff performance. PRD no-rankings exception approved by Angela.</p>
          </>);
        })()}
      </div>
      <div className="card"><h2 className="font-bold">Catalogue ({drugs.length})</h2>
        <p className="text-sm"><a href="/hq/catalogue">Open table</a> • <a href="/hq/import">Import Excel</a> • <a href="/branch">Branch page</a></p>
      </div>
    </main>
  );
}
