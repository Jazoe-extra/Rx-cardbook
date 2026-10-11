import { NextResponse } from "next/server";
import { parseExcel } from "@/lib/excel";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const form = await req.formData();
  const f = form.get("file") as File | null;
  if (!f) return NextResponse.json({ error: "no file" }, { status: 400 });
  const buf = Buffer.from(await f.arrayBuffer());
  const { headers, rows } = await parseExcel(buf);
  const dir = process.env.UPLOAD_DIR || "./uploads";
  await mkdir(dir, { recursive: true });
  const ref = `${Date.now()}-${f.name}`;
  await writeFile(path.join(dir, ref), buf);
  return NextResponse.json({ fileRef: ref, headers, rows, count: rows.length });
}
