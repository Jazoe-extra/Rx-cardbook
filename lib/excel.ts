import ExcelJS from "exceljs";

const ALIASES: Record<string, string[]> = {
  name: ["medicine name", "drug name", "medicine/drug name", "medicine drug name", "name", "medicine", "drug"],
  strength: ["strength"],
  form: ["form", "dosage form", "dosage/form", "dosage"],
  packSize: ["pack size", "packsize"],
  stockUnit: ["stock unit", "stock unit/unit", "stock unit unit", "unit", "uom"],
  standardPrice: ["standard price", "standard/unit price", "standard unit price", "unit price", "price"],
  branchPrice: ["branch price"],
  quantity: ["qty", "quantity", "quantity/qty", "quantity qty"],
  branch: ["branch"],
  code: ["medicine code", "drug code", "code"]
};

function norm(h: string) {
  return h.trim().toLowerCase().replace(/\s+/g, " ");
}

function matchCol(hn: string[], key: string) {
  const aliases = ALIASES[key];
  // 1. exact
  let i = hn.findIndex((h) => aliases.includes(h));
  if (i >= 0) return i;
  // 2. slash-split: "Medicine/Drug Name" -> parts contain alias
  i = hn.findIndex((h) => {
    const parts = h.split("/").map((p) => p.trim());
    return parts.some((p) => aliases.includes(p)) || aliases.some((a) => h.includes(a));
  });
  return i;
}

export async function parseExcel(buffer: Buffer) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buffer as any);
  const ws = wb.worksheets[0];
  if (!ws) return { headers: [], rows: [] };
  const headers: string[] = [];
  ws.getRow(1).eachCell((c) => headers.push(String(c.value ?? "")));
  const hn = headers.map(norm);
  const col = (key: string) => matchCol(hn, key);
  const rows: any[] = [];
  ws.eachRow((row, n) => {
    if (n === 1) return;
    const v = (i: number) => (i < 0 ? "" : String(row.getCell(i + 1).value ?? "").trim());
    const r = {
      code: v(col("code")),
      name: v(col("name")),
      strength: v(col("strength")),
      form: v(col("form")) || "Tablet",
      packSize: v(col("packSize")),
      stockUnit: v(col("stockUnit")) || "Tablet",
      standardPrice: v(col("standardPrice")),
      branchPrice: v(col("branchPrice")),
      quantity: v(col("quantity")),
      branch: v(col("branch"))
    };
    if (!r.name) return;
    const issues: string[] = [];
    if (!r.name) issues.push("missing name");
    if (!r.stockUnit) issues.push("missing unit");
    if (r.quantity && isNaN(Number(r.quantity))) issues.push("invalid qty");
    if (r.standardPrice && isNaN(Number(r.standardPrice))) issues.push("invalid price");
    rows.push({ ...r, issues });
  });
  return { headers, rows };
}
