import { NextResponse } from "next/server";
import { db } from "@/db";
import { stockMovements, drugs, branches } from "@/db/schema";
import { eq } from "drizzle-orm";

async function demoBranch() {
  const all = await db.select().from(branches).limit(1);
  if (all.length) return all[0];
  const [b] = await db.insert(branches).values({ name: "Branch 1" }).returning();
  return b;
}

export async function GET() {
  const rows = await db.select({ m: stockMovements, d: drugs }).from(stockMovements).leftJoin(drugs, eq(stockMovements.drugId, drugs.id)).limit(100);
  return NextResponse.json(rows.map((r) => ({ id: r.m.id, drug: r.d?.name, qty: r.m.qty, price: r.m.priceCharged, reason: r.m.reason, type: r.m.type })));
}

export async function POST(req: Request) {
  const b = await req.json();
  if (!b.drugId || !b.qty) return NextResponse.json({ error: "drugId + qty required" }, { status: 400 });
  const br = await demoBranch();
  const [d] = await db.select().from(drugs).where(eq(drugs.id, b.drugId)).limit(1);
  if (!d) return NextResponse.json({ error: "drug not found" }, { status: 404 });
  const price = b.price ?? d.standardPrice;
  if (Number(price) !== Number(d.standardPrice) && !b.reason) {
    return NextResponse.json({ error: "Price differs — reason required" }, { status: 400 });
  }
  const [row] = await db.insert(stockMovements).values({
    branchId: br.id, drugId: d.id, type: "sale", qty: Number(b.qty),
    unit: d.stockUnit, priceCharged: String(price), reason: b.reason || null
  }).returning();
  return NextResponse.json(row);
}
