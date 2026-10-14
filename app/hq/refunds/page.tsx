"use client";
import { useEffect, useState } from "react";

export default function RefundsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [branch, setBranch] = useState("All branches");
  const load = () => fetch("/api/refunds").then((r) => r.json()).then(setRows);
  useEffect(() => { load(); }, []);
  const act = async (id: string, action: string) => {
    await fetch("/api/refunds", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, action }) });
    load();
  };
  const list = branch === "All branches" ? rows : rows.filter((r: any) => r.branch === branch);
  return (
    <main>
      <div className="card"><h1 className="text-xl font-extrabold">HQ — Refunds & price reviews</h1>
        <p className="text-sm">Branch requests, HQ approves. Branch cannot approve its own. Pending never changes day totals until approved.</p>
        <label className="font-bold text-sm">Show branch: <select className="min-h-[48px] border rounded-xl" value={branch} onChange={(e) => setBranch(e.target.value)}>
          {["All branches", "Branch 1", "Branch 2", "Branch 3", "Branch 4"].map((b) => <option key={b}>{b}</option>)}
        </select></label></div>
      <div className="card">
        {list.length === 0 ? <p className="text-sm">Nothing to review{branch === "All branches" ? "." : " in " + branch + "."} Price changes and refund requests appear here.</p> :
          list.map((r: any) => (
            <div key={r.id} className="border rounded-xl p-2 my-1">
              <b>{r.qty}x {r.drug}</b> — £{r.price} <span className="text-xs">({r.type} • {r.branch})</span>
              <p className="text-sm">Reason: {r.reason}</p>
              {!String(r.reason || "").startsWith("APPROVED") && <button className="btn btn-primary" onClick={() => act(r.id, "approve")}>Approve</button>}
              {r.type === "sale" && <button className="btn" style={{ border: "2px solid #0E7C6B" }} onClick={() => act(r.id, "request-refund")}>Request refund</button>}
            </div>
          ))}
      </div>
    </main>
  );
}
