#!/usr/bin/env node

import {
  readFileSync,
  writeFileSync,
  rmSync,
  opendirSync,
  existsSync,
} from "node:fs";

for (const root of ["packages", "codemods", "eslint"]) {
  const rootURL = new URL(`../${root}/`, import.meta.url);
  const dir = opendirSync(rootURL);
  for await (const ent of dir) {
    if (ent.isDirectory()) {
      const fixturesURL = new URL(ent.name + "/test/fixtures/", rootURL);
      if (existsSync(fixturesURL)) {
        await traverseFixtures(fixturesURL);
      }
    }
  }
}

async function traverseFixtures(dirURL) {
  try {
    const optionsURL = new URL("options.json", dirURL);
    const optionsRaw = readFileSync(optionsURL, "utf-8");
    const options = JSON.parse(optionsRaw);

    if (options.BABEL_8_BREAKING === false) {
      rmSync(dirURL, { recursive: true, force: true });
      return;
    }

    if (options.BABEL_8_BREAKING === true) {
      if (Object.keys(options).length === 1) {
        rmSync(optionsURL, { force: true });
      } else {
        writeFileSync(
          optionsURL,
          optionsRaw
            .replace(
              /^(\s*)"BABEL_8_BREAKING"\s*:\s*true\s*(?:,\s*)?[\r\n]+/m,
              ""
            )
            // Remove trailing comma from the property before BABEL_8_BREAKING
            .replace(/,(?=\s*\})/, ""),
          "utf-8"
        );
      }
    }
  } catch {}

  for await (const sub of opendirSync(dirURL)) {
    if (sub.isDirectory()) {
      await traverseFixtures(new URL(sub.name + "/", dirURL));
    }
  }
}
