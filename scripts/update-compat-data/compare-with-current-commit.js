import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CURRENT_COMMIT_VARIABLE_NAME = "COMPAT_TABLE_COMMIT";

async function getCurrentCommit() {
  const target = path.join(
    __dirname,
    "..",
    "..",
    "packages",
    "babel-compat-data",
    "scripts",
    "download-compat-table.sh"
  );
  const lines = (await readFile(target, { encoding: "utf-8" })).split("\n");

  for (const line of lines) {
    if (line.includes(CURRENT_COMMIT_VARIABLE_NAME)) {
      return line.split("=").at(1);
    }
  }

  return undefined;
}

async function checkCurrentCommit(lastCommit) {
  if (typeof lastCommit !== "string") {
    throw new Error(`Last commit should be provided but got ${lastCommit}`);
  }

  const currentCommit = await getCurrentCommit();
  if (typeof lastCommit !== "string") {
    throw new Error("Not valid current commit found: ${currentCommit}");
  }

  console.log("last commit :", lastCommit);
  console.log("current commit :", currentCommit);

  if (lastCommit === currentCommit) {
    throw new Error("compat-data doesn't need to be updated");
  }

  return lastCommit;
}

checkCurrentCommit(process.argv[2]).then(console.log);
