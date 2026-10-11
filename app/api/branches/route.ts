import { NextResponse } from "next/server";
import { db } from "@/db";
import { branches, stockMovements } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  let all = await db.select().from(branches).limit(10);
  for (const n of ["Branch 1", "Branch 2", "Branch 3", "Branch 4"]) {
    if (!all.find((b) => b.name === n)) {
      const [b] = await db.insert(branches).values({ name: n }).returning();
      all.push(b);
    }
  }
  const totals = await db.select({ branchId: stockMovements.branchId, total: sql<number>`COALESCE(SUM((${stockMovements.qty} * ${stockMovements.priceCharged})::numeric),0)` }).from(stockMovements).groupBy(stockMovements.branchId);
  const map: Record<string, number> = {};
  totals.forEach((t: any) => { map[t.branchId] = Number(t.total); });
  return NextResponse.json(all.map((b) => ({ id: b.id, name: b.name, total: map[b.id] || 0 })));
}
