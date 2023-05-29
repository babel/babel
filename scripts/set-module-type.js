#!/usr/bin/env node

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const root = rel =>
  path.join(path.dirname(fileURLToPath(import.meta.url)), "../", rel);

// prettier-ignore
let moduleType;
if (process.argv.length >= 3) {
  moduleType = process.argv[2];
} else if (fs.existsSync(root(".module-type"))) {
  moduleType = fs.readFileSync(root(".module-type"), "utf-8").trim();
} else {
  moduleType = "commonjs";
}

if (moduleType === "clean") {
  try {
    fs.unlinkSync(root(".module-type"));
  } catch {}
} else if (moduleType === "module" || moduleType === "commonjs") {
  fs.writeFileSync(root(".module-type"), moduleType);
} else {
  throw new Error(`Unknown module type: ${moduleType}`);
}

["eslint", "codemods", "packages"]
  .flatMap(dir => fs.readdirSync(root(dir)).map(file => root(`${dir}/${file}`)))
  .filter(
    dir =>
      fs.statSync(dir).isDirectory() && fs.existsSync(`${dir}/package.json`)
  )
  .forEach(dir => {
    if (dir.endsWith("babel-register")) {
      // This is a CJS package
      return;
    }

    if (moduleType === "clean") {
      try {
        fs.unlinkSync(`${dir}/lib/package.json`);
      } catch {}
    } else {
      fs.mkdirSync(`${dir}/lib`, { recursive: true });
      fs.writeFileSync(
        `${dir}/lib/package.json`,
        `{ "type": "${moduleType}" }`
      );
    }
  });
