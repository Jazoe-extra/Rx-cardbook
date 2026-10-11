import { NextResponse } from "next/server";
import { db } from "@/db";
import { drugs } from "@/db/schema";

export async function GET() {
  const all = await db.select().from(drugs).limit(100);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const b = await req.json();
  if (!b.name || !b.stockUnit || !b.standardPrice) {
    return NextResponse.json({ error: "name, stockUnit, standardPrice required" }, { status: 400 });
  }
  const [row] = await db.insert(drugs).values({
    code: b.code || null,
    name: b.name,
    generic: b.generic || null,
    strength: b.strength || null,
    form: b.form || "Tablet",
    packSize: b.packSize || null,
    stockUnit: b.stockUnit,
    standardPrice: String(b.standardPrice)
  }).returning();
  return NextResponse.json(row);
}
