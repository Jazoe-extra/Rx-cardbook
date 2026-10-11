import { NextResponse } from "next/server";
import { db } from "@/db";
import { drugs } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { rows } = await req.json();
    if (!Array.isArray(rows)) return NextResponse.json({ error: "rows required" }, { status: 400 });
    const ALLOWED = ["Tablet", "Pack", "Strip", "Bottle", "Ampoule", "Vial", "Other"];
    const mapUnit = (u: string) => {
      if (!u) return "Other";
      const t = u.trim();
      const hit = ALLOWED.find((a) => a.toLowerCase() === t.toLowerCase());
      if (hit) return hit;
      if (/sachet/i.test(t)) return "Other";
      return "Other";
    };
    let added = 0, skipped: any[] = [];
    for (const r of rows) {
      const price = Number(String(r.standardPrice).replace(/[^0-9.]/g, ""));
      if (!r.name || !isFinite(price)) { skipped.push({ name: r.name, reason: "missing name/price" }); continue; }
      try {
        await db.insert(drugs).values({
          code: r.code || null,
          name: r.name,
          strength: r.strength || null,
          form: r.form || "Tablet",
          packSize: r.packSize || null,
          stockUnit: mapUnit(r.stockUnit),
          standardPrice: String(price)
        });
        added++;
      } catch (e: any) {
        skipped.push({ name: r.name, reason: String(e?.message || e).slice(0, 200) });
      }
    }
    return NextResponse.json({ added, skipped, total: rows.length });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
