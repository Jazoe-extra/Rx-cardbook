import { NextResponse } from "next/server";
import { db } from "@/db";
import { physicalChecks, drugs, branches, stockMovements } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

async function demoBranch() {
  const all = await db.select().from(branches).limit(1);
  if (all.length) return all[0];
  const [b] = await db.insert(branches).values({ name: "Branch 1" }).returning();
  return b;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bn = searchParams.get("branch");
  let br = null;
  if (bn) {
    const found = await db.select().from(branches).where(eq(branches.name, bn)).limit(1);
    br = found.length ? found[0] : (await db.insert(branches).values({ name: bn }).returning())[0];
  }
  const rows = await db.select({ c: physicalChecks, d: drugs }).from(physicalChecks)
    .leftJoin(drugs, eq(physicalChecks.drugId, drugs.id));
  const list = br ? rows.filter((r) => r.c.branchId === br.id) : rows;
  return NextResponse.json(list.map((r) => ({ id: r.c.id, drug: r.d?.name, unit: r.d?.stockUnit, exp: r.c.expectedQty, phys: r.c.physicalQty, reason: r.c.reason, day: r.c.day })));
}

export async function POST(req: Request) {
  const { action, id, physicalQty, reason, branch } = await req.json();
  const br = await (async () => {
    if (!branch) return demoBranch();
    const found = await db.select().from(branches).where(eq(branches.name, branch)).limit(1);
    if (found.length) return found[0];
    const [b] = await db.insert(branches).values({ name: branch }).returning();
    return b;
  })();
  const day = new Date().toDateString();
  if (action === "pick") {    const all = await db.select().from(drugs).limit(100);
    if (all.length < 2) return NextResponse.json({ error: "Need 2+ drugs in catalogue" }, { status: 400 });
    const two = [...all].sort(() => Math.random() - 0.5).slice(0, 2);
    const out = [];
    for (const d of two) {
      const sold = await db.select({ s: sql<number>`COALESCE(SUM(${stockMovements.qty}),0)` }).from(stockMovements).where(eq(stockMovements.drugId, d.id));
      const exp = 20 - Number(sold[0]?.s || 0);
      const [c] = await db.insert(physicalChecks).values({ branchId: br.id, drugId: d.id, day, expectedQty: exp }).returning();
      out.push(c);
    }
    return NextResponse.json(out);
  }
  if (action === "count") {
    const [c] = await db.select().from(physicalChecks).where(eq(physicalChecks.id, id)).limit(1);
    if (!c) return NextResponse.json({ error: "not found" }, { status: 404 });
    await db.update(physicalChecks).set({ physicalQty: physicalQty ?? null, reason: reason ?? null }).where(eq(physicalChecks.id, id));
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
