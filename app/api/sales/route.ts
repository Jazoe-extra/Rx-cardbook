import { NextResponse } from "next/server";
import { db } from "@/db";
import { stockMovements, drugs, branches } from "@/db/schema";
import { eq } from "drizzle-orm";

async function branchByName(name?: string) {
  const nm = name || "Branch 1";
  const found = await db.select().from(branches).where(eq(branches.name, nm)).limit(1);
  if (found.length) return found[0];
  const [b] = await db.insert(branches).values({ name: nm }).returning();
  return b;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rows = await db.select({ m: stockMovements, d: drugs }).from(stockMovements).leftJoin(drugs, eq(stockMovements.drugId, drugs.id)).limit(200);
  const bn = searchParams.get("branch");
  if (!bn) return NextResponse.json(rows.map((r) => ({ id: r.m.id, drug: r.d?.name, qty: r.m.qty, price: r.m.priceCharged, reason: r.m.reason, type: r.m.type, branchId: r.m.branchId })));
  const br = await branchByName(bn);
  return NextResponse.json(rows.filter((r) => r.m.branchId === br.id).map((r) => ({ id: r.m.id, drug: r.d?.name, qty: r.m.qty, price: r.m.priceCharged, reason: r.m.reason, type: r.m.type, branchId: r.m.branchId })));
}

export async function POST(req: Request) {
  const b = await req.json();
  if (!b.drugId || !b.qty) return NextResponse.json({ error: "drugId + qty required" }, { status: 400 });
  const br = await branchByName(b.branch);
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
