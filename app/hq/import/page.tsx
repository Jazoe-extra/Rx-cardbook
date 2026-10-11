"use client";
import { useState } from "react";

export default function ImportPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [ref, setRef] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const up = async (f: File) => {
    setLoading(true);
    setMsg("Reading " + f.name + "... preparing your catalogue");
    setRows([]);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const r = await fetch("/api/import", { method: "POST", body: fd }).then((x) => x.json());
      if (r.error) { setMsg("Error: " + r.error); return; }
      setRows(r.rows || []);
      setHeaders(r.headers || []);
      setRef(r.fileRef || "");
      if (!r.rows || r.rows.length === 0) setMsg(`Found 0 medicines. I saw columns: ${(r.headers || []).join(" | ") || "none"}. Rename first row to e.g. Medicine Name | Strength | Stock Unit | Standard Price | Quantity.`);
      else setMsg(`Found ${r.rows.length} medicines — review below, then Confirm.`);
    } finally {
      setLoading(false);
    }
  };
  const confirm = async () => {
    setConfirming(true);
    try {
      const res = await fetch("/api/import/confirm", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rows }) });
      const txt = await res.text();
      let r: any = {};
      try { r = txt ? JSON.parse(txt) : {}; } catch { r = { error: "Server returned: " + txt.slice(0, 200) }; }
      if (!res.ok) { alert("Confirm failed: " + (r.error || res.status)); return; }
      alert(`Added ${r.added}/${r.total} medicines. ${r.skipped?.length ? "Skipped: " + r.skipped.map((s: any) => s.name).join(", ") : ""} File ${ref} kept for audit.`);
      setRows([]);
    } finally {
      setConfirming(false);
    }
  };
  return (
    <main>
      <div className="card"><h1 className="text-xl font-extrabold">Upload your Excel file</h1>
        <p>Cardbook will read it and show you what it found. Nothing changes until you press Confirm.</p>
        <input type="file" accept=".xlsx,.xls" disabled={loading} onChange={(e) => e.target.files && up(e.target.files[0])} />
        {loading && (
          <p className="text-sm mt-2"><span style={{ display: "inline-block", width: 16, height: 16, border: "3px solid #C9D9F2", borderTop: "3px solid #0E7C6B", borderRadius: "50%", animation: "spin 0.8s linear infinite", verticalAlign: "-3px", marginRight: 8 }} />
          Loading your Excel sheet... preparing your catalogue, please wait.</p>
        )}
        {!loading && msg && <p className="text-sm mt-2">{msg}</p>}
        <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
        {ref && !loading && <p className="text-xs text-slate-500">Saved as {ref} for audit.</p>}</div>
      {rows.length === 0 ? (
        <div className="card"><p className="text-sm">No medicines to confirm yet. Upload a file with first-row headings. I understand: Medicine/Drug Name, Strength, Form, Stock Unit/Unit, Standard/Unit Price, Quantity/Qty, Branch.</p></div>
      ) : (
        <div className="card"><h2 className="font-bold">Review before adding ({rows.length})</h2>
          <p className="text-sm">Fix here. Missing/invalid/duplicates are flagged.</p>
          {rows.map((r, i) => (
            <div key={i} className="border rounded-xl p-2 my-1">
              <b>{r.name}</b> {r.strength} — {r.stockUnit} — £{r.standardPrice} {r.quantity ? `— Qty ${r.quantity}` : ""}
              {r.issues?.length ? <p style={{ color: "#C93A3A" }}>⚠ {r.issues.join(", ")}</p> : <p style={{ color: "#1A9E5C" }}>OK</p>}
            </div>
          ))}
          <button className="btn btn-primary" disabled={confirming} onClick={confirm}>{confirming ? "Adding to Cardbook..." : "Confirm and Add to Cardbook"}</button>
        </div>
      )}
    </main>
  );
}
