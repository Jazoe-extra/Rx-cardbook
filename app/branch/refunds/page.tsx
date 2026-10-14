"use client";
import { useEffect, useState } from "react";

const REASONS = ["Customer returned medicine", "Wrong item supplied", "Damaged product", "Other"];

export default function BranchRefundsPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState("");
  const load = () => fetch("/api/sales").then((r) => r.json()).then(setSales);
  useEffect(() => { load(); }, []);

  const open = (s: any) => { setOpenId(s.id); setQty(s.qty); setReason(""); setNote(""); setMsg(""); };
  const submit = async () => {
    if (!reason) { setMsg("⛔ Pick a reason — it is required."); return; }
    const r = await fetch("/api/refunds", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: openId, action: "request-refund", refundQty: qty, refundReason: reason, explanation: note }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { setMsg("⛔ " + (j.error || r.status)); return; }
    setOpenId(null); setMsg("Refund request sent. HQ must approve — day totals unchanged until then."); load();
  };

  return (
    <main>
      <div className="card"><h1 className="text-xl font-extrabold">Request Refund</h1>
        <p className="text-sm">Pick a sale below. HQ approval required — totals don’t change until approved.</p></div>
      {msg && <div className="card"><p style={{ fontWeight: 700 }}>{msg}</p></div>}
      {sales.filter((s) => s.type !== "refund").map((s: any) => (
        <div key={s.id} className="card">
          <p className="font-bold">Original Sale</p>
          <p>{s.drug}</p>
          <p className="text-sm">Quantity: {s.qty} • Sale price: ₦{s.price} • {s.type}</p>
          {openId === s.id ? (
            <div style={{ border: "2px solid #C9D9F2", borderRadius: 12, padding: 10, marginTop: 8 }}>
              <label className="font-bold">Refund Quantity</label>
              <input type="number" min={1} max={s.qty} className="w-full min-h-[56px] border rounded-xl p-2" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
              <p className="font-bold mt-2">Reason *</p>
              {REASONS.map((r) => (
                <label key={r} style={{ display: "block", minHeight: 44 }}><input type="radio" name="rr" checked={reason === r} onChange={() => setReason(r)} /> {r}</label>
              ))}
              <label className="font-bold">Additional explanation</label>
              <input className="w-full min-h-[56px] border rounded-xl p-2" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional details" />
              <p style={{ background: "#FDF0D9", borderRadius: 8, padding: 8 }}>⚠ This refund requires HQ approval.</p>
              <div className="flex gap-2">
                <button className="btn" style={{ border: "2px solid #0E7C6B" }} onClick={() => setOpenId(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={submit}>Submit Refund Request</button>
              </div>
            </div>
          ) : (
            <button className="btn" style={{ border: "2px solid #0E7C6B" }} onClick={() => open(s)}>Request refund</button>
          )}
        </div>
      ))}
    </main>
  );
}
