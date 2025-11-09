import { NextResponse } from "next/server";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import * as fs from "fs";
import path from "path";

export async function GET() {
  const dataDir = path.join(process.cwd(), "src", "data");
  const files = fs.readdirSync(dataDir);

  const results: Record<string, any> = {};

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const ext = path.extname(file).toLowerCase();
    const key = path.basename(file, ext);


    if (ext === ".csv") {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = Papa.parse(raw, { header: true });
      results[key] = parsed.data;
      continue;
    }

    if (ext === ".xlsx") {
      const buffer = fs.readFileSync(filePath);
      const workbook = XLSX.read(buffer);

      if (workbook.SheetNames.length === 1) {
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        results[key] = XLSX.utils.sheet_to_json(sheet);
        continue;
      }

      const multiSheets: Record<string, any[]> = {};
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        multiSheets[sheetName] = XLSX.utils.sheet_to_json(sheet);
      }

      results[key] = multiSheets;
      continue;
    }
  }

  return NextResponse.json(results);
}









