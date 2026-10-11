import { NextResponse } from "next/server";
import { db } from "@/db";
import { drugs } from "@/db/schema";

export async function POST() {
  await db.delete(drugs);
  return NextResponse.json({ cleared: true });
}
