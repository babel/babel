#!/usr/bin/env node

import fs from "fs";

const root = rel => new URL(`../${rel}`, import.meta.url).pathname;

// prettier-ignore
let moduleType;
if (process.argv.length >= 3) {
  moduleType = process.argv[2];
} else if (fs.existsSync(root(".module-type"))) {
  moduleType = fs.readFileSync(root(".module-type"), "utf-8").trim();
} else {
  moduleType = "script";
}

if (moduleType === "clean") {
  try {
    fs.unlinkSync(root(".module-type"));
  } catch {}
} else if (moduleType === "module" || moduleType === "script") {
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
