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
  const { id, action } = await req.json();
  const [m] = await db.select().from(stockMovements).where(eq(stockMovements.id, id)).limit(1);
  if (!m) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (action === "approve") {
    await db.update(stockMovements).set({ reason: `APPROVED by HQ: ${m.reason || ""}`, type: "sale" }).where(eq(stockMovements.id, id));
    return NextResponse.json({ ok: true });
  }
  if (action === "request-refund") {
    await db.update(stockMovements).set({ type: "refund", reason: `Refund requested: ${m.reason || ""}` }).where(eq(stockMovements.id, id));
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "unknown" }, { status: 400 });
}
