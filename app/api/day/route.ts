import { NextResponse } from "next/server";
import { db } from "@/db";
import { dayCloses, branches } from "@/db/schema";

async function demoBranch() {
  const all = await db.select().from(branches).limit(1);
  if (all.length) return all[0];
  const [b] = await db.insert(branches).values({ name: "Branch 1" }).returning();
  return b;
}

export async function POST(req: Request) {
  const { light } = await req.json();
  const br = await demoBranch();
  const day = new Date().toDateString();
  if (light === "red") return NextResponse.json({ error: "Red means a required step is missing — finish sales + 2 counts first." }, { status: 400 });
  const [row] = await db.insert(dayCloses).values({ branchId: br.id, day, light: light || "amber", closedBy: "Demo Counter" }).returning();
  return NextResponse.json(row);
}

export async function GET() {
  const rows = await db.select().from(dayCloses).limit(10);
  return NextResponse.json(rows);
}
