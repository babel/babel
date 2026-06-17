import fs from "node:fs";
// Always use the latest available version of Unicode!
// https://tc39.github.io/ecma262/#sec-conformance
import packageJson from "../package.json" with { type: "json" };
import regenerate from "regenerate";

const unicodePackageNamePrefix = "@unicode/unicode-";
const unicodePackageName = Object.keys(packageJson.devDependencies).find(name =>
  name.startsWith(unicodePackageNamePrefix)
);

type UnicodeRange = {
  readonly begin: number;
  readonly end: number;
};

const start = (
  await import(`${unicodePackageName}/Binary_Property/ID_Start/ranges.js`)
).default;
const cont = (
  await import(`${unicodePackageName}/Binary_Property/ID_Continue/ranges.js`)
).default;

function rangesToRegenerate(ranges: readonly UnicodeRange[]): regenerate {
  return ranges.reduce(
    (set: regenerate, { begin, end }: UnicodeRange) =>
      set.addRange(begin, end - 1),
    regenerate()
  );
}

const startSet = rangesToRegenerate(start).removeRange(0, 0x7f);
const contSetWithoutStart = rangesToRegenerate(cont)
  .removeRange(0, 0x7f)
  .remove(startSet);

function esc(code: number) {
  return "\\u" + code.toString(16).padStart(4, "0");
}

function generate(regenerateSet: regenerate) {
  const supplementary = [];
  let re = "";
  // @ts-expect-error access internal data property
  const ranges = regenerateSet.data;
  for (let i = 0, at = 0x10000; i < ranges.length; i += 2) {
    const from = ranges[i],
      to = ranges[i + 1] - 1;
    if (to <= 0xffff) {
      if (from === to) re += esc(from);
      else if (from + 1 === to) re += esc(from) + esc(to);
      else re += esc(from) + "-" + esc(to);
    } else {
      supplementary.push(from - at, to - from);
      at = to;
    }
  }
  return { bmp: re, supplementary };
}

const startData = generate(startSet);
const contData = generate(contSetWithoutStart);

fs.writeFileSync(
  new URL("../data/bmp-identifier-start.json", import.meta.url),
  `"${startData.bmp}"`
);
fs.writeFileSync(
  new URL("../data/bmp-identifier-continue.json", import.meta.url),
  `"${contData.bmp}"`
);
fs.writeFileSync(
  new URL("../data/supplementary-identifier-start.json", import.meta.url),
  JSON.stringify(startData.supplementary)
);
fs.writeFileSync(
  new URL("../data/supplementary-identifier-continue.json", import.meta.url),
  JSON.stringify(contData.supplementary)
);
