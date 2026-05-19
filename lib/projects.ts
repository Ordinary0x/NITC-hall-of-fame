import fs from "node:fs/promises";
import path from "node:path";
import type { ProjectRecord } from "./project-utils";

const DATA_FILE = path.join(
  process.cwd(),
  "public",
  "data",
  "projects-data.json",
);

export async function getProjectsData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw) as ProjectRecord[];
  } catch {
    return [];
  }
}

export { getProjectBySlug } from "./project-utils";
