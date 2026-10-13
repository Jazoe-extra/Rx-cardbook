"use client";
import { useEffect, useState } from "react";

export default function RefundsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const load = () => fetch("/api/refunds").then((r) => r.json()).then(setRows);
  useEffect(() => { load(); }, []);
  const act = async (id: string, action: string) => {
    await fetch("/api/refunds", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, action }) });
    load();
  };
  return (
    <main>
      <div className="card"><h1 className="text-xl font-extrabold">HQ — Refunds & price reviews</h1>
        <p className="text-sm">Branch requests, HQ approves. Branch cannot approve its own. Pending never changes day totals until approved.</p></div>
      <div className="card">
        {rows.length === 0 ? <p className="text-sm">Nothing to review. Price changes and refund requests appear here.</p> :
          rows.map((r: any) => (
            <div key={r.id} className="border rounded-xl p-2 my-1">
              <b>{r.qty}x {r.drug}</b> — £{r.price} <span className="text-xs">({r.type})</span>
              <p className="text-sm">Reason: {r.reason}</p>
              {!String(r.reason || "").startsWith("APPROVED") && <button className="btn btn-primary" onClick={() => act(r.id, "approve")}>Approve</button>}
              {r.type === "sale" && <button className="btn" style={{ border: "2px solid #0E7C6B" }} onClick={() => act(r.id, "request-refund")}>Request refund</button>}
            </div>
          ))}
      </div>
    </main>
  );
}
