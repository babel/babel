import { generateData, environments, writeFile } from "./utils-build-data.mjs";

import corejs2BuiltInFeatures from "./data/corejs2-built-in-features.mjs";

if (process.cwd().endsWith("scripts")) {
  throw new Error("Please run this script from the root of the package");
}

export function buildCorejs2BuiltinFeatures() {
  const { data: newData } = generateData(environments, corejs2BuiltInFeatures);
  const dataURL = new URL(`../data/corejs2-built-ins.json`, import.meta.url);

  if (!writeFile(newData, dataURL, "corejs2-built-in")) {
    throw new Error(`Cannot update ${dataURL}`);
  }
}
