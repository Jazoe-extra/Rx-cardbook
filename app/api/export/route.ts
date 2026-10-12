import { NextResponse } from "next/server";
import { db } from "@/db";
import { stockMovements, drugs, dayCloses } from "@/db/schema";

export async function GET() {
  const srows = await db.select().from(stockMovements).limit(200);
  const drows = await db.select().from(drugs).limit(200);
  const crows = await db.select().from(dayCloses).limit(50);
  const dmap: Record<string, any> = {};
  drows.forEach((d: any) => { dmap[d.id] = d; });
  const lines = ["type,drug,qty,unit,price,reason,day"];
  srows.forEach((m: any) => {
    const d = dmap[m.drugId];
    lines.push(["sale", `"${d?.name || ""}"`, m.qty, m.unit, m.priceCharged || "", `"${(m.reason || "").replace(/"/g, "")}"`, ""].join(","));
  });
  crows.forEach((c: any) => lines.push(["close", "", "", "", "", c.light, c.day]));
  return new NextResponse(lines.join("\n"), { headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=cardbook-export.csv" } });
}
