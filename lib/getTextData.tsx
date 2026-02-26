import Papa from "papaparse";
import { TextBoxData } from "./utils";

export async function getTextData(id: string): Promise<TextBoxData> {
  const url = process.env.TEXT_BOX_CSV_URL;

  if (!url) {
    throw new Error("TEXT_BOX_CSV_URL not defined");
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch CSV");

  const csv = await res.text();

  const results = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const row = (results.data as any[]).find((r) => r.id === id);
  if (!row) throw new Error("Text element not found");

  return {
    id: row.id,
    title: row.title,
    text: row.text,
    translate: row.translate
      ? row.translate.split(",").map((t: string) => t.trim())
      : [],
  };
}