// Dependency-free feed validation for Node.js 20+.
import { readFileSync } from "node:fs";

function validateStatus(json, fileName) {
  if (!json || typeof json !== "object" || Array.isArray(json)) {
    throw new Error(fileName + ": expected a JSON object");
  }
  const counts = ["employees", "pending", "completed", "inReview"];
  const allowed = new Set([...counts, "updatedAt", "source"]);

  for (const field of counts) {
    if (!Number.isInteger(json[field]) || json[field] < 0) {
      throw new Error(fileName + ": " + field + " must be a non-negative integer");
    }
  }
  if (
    typeof json.updatedAt !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(json.updatedAt) ||
    Number.isNaN(Date.parse(json.updatedAt))
  ) {
    throw new Error(fileName + ": updatedAt must be an ISO-8601 date-time");
  }
  if (json.source !== undefined && typeof json.source !== "string") {
    throw new Error(fileName + ": source must be a string");
  }
  for (const key of Object.keys(json)) {
    if (!allowed.has(key)) throw new Error(fileName + ": unexpected field: " + key);
  }
}

for (const fileName of ["status.json", "examples/status.example.json"]) {
  const data = JSON.parse(readFileSync(new URL("../" + fileName, import.meta.url), "utf8"));
  validateStatus(data, fileName);
  console.log("OK " + fileName);
}
