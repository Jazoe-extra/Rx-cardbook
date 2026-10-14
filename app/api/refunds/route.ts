import { NextResponse } from "next/server";
import { db } from "@/db";
import { stockMovements, drugs, branches } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const rows = await db.select({ m: stockMovements, d: drugs, b: branches }).from(stockMovements).leftJoin(drugs, eq(stockMovements.drugId, drugs.id)).leftJoin(branches, eq(stockMovements.branchId, branches.id)).limit(200);
  const out = rows.filter((r) => (r.m.reason && r.m.reason !== "-") || r.m.type === "refund").map((r) => ({
    id: r.m.id, drug: r.d?.name, qty: r.m.qty, price: r.m.priceCharged, reason: r.m.reason, type: r.m.type, branch: r.b?.name || "Branch 1"
  }));
  return NextResponse.json(out);
}

export async function POST(req: Request) {
  const { id, action, refundQty, refundReason, explanation } = await req.json();
  const [m] = await db.select().from(stockMovements).where(eq(stockMovements.id, id)).limit(1);
  if (!m) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (action === "approve") {
    const disp = (req as any).body ? null : null;
    return NextResponse.json({ error: "use approve-disposition" }, { status: 400 });
  }
  if (action === "approve-disposition") {
    const { disposition } = await req.json().catch(() => ({}) as any).then((j: any) => j || {});
    return NextResponse.json({ error: "use body" }, { status: 400 });
  }
  if (action === "request-refund") {
    if (!refundReason) return NextResponse.json({ error: "Reason required" }, { status: 400 });
    const q = Math.max(1, Math.min(Number(refundQty) || 1, m.qty));
    await db.update(stockMovements).set({ type: "refund", reason: `Refund requested (${q}/${m.qty}): ${refundReason}${explanation ? " — " + explanation : ""}. Awaiting HQ approval.` }).where(eq(stockMovements.id, id));
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "unknown" }, { status: 400 });
}
