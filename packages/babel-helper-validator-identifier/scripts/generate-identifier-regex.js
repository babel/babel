import fs from "node:fs";
// Always use the latest available version of Unicode!
// https://tc39.github.io/ecma262/#sec-conformance
import packageJson from "../package.json" with { type: "json" };

const unicodePackageNamePrefix = "@unicode/unicode-";
const unicodePackageName = Object.keys(packageJson.devDependencies).find(name =>
  name.startsWith(unicodePackageNamePrefix)
);

const start = (
  await import(`${unicodePackageName}/Binary_Property/ID_Start/code-points.js`)
).default.filter(function (ch) {
  return ch > 0x7f;
});
let last = -1;
const cont = (
  await import(
    `${unicodePackageName}/Binary_Property/ID_Continue/code-points.js`
  )
).default.filter(function (ch) {
  return ch > 0x7f && search(start, ch, last + 1) === -1;
});

function search(arr, ch, starting) {
  for (let i = starting; arr[i] <= ch && i < arr.length; last = i++) {
    if (arr[i] === ch) return i;
  }
  return -1;
}

function pad(str, width) {
  while (str.length < width) str = "0" + str;
  return str;
}

function esc(code) {
  const hex = code.toString(16);
  if (hex.length <= 2) return "\\x" + pad(hex, 2);
  else return "\\u" + pad(hex, 4);
}

function generate(chars) {
  const supplementary = [];
  let re = "";
  for (let i = 0, at = 0x10000; i < chars.length; i++) {
    const from = chars[i];
    let to = from;
    while (i < chars.length - 1 && chars[i + 1] === to + 1) {
      i++;
      to++;
    }
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

const startData = generate(start);
const contData = generate(cont);

fs.writeFileSync(
  new URL("../data/bmp-identifier-start.json", import.meta.url),
  JSON.stringify(startData.bmp)
);
fs.writeFileSync(
  new URL("../data/bmp-identifier-continue.json", import.meta.url),
  JSON.stringify(contData.bmp)
);
fs.writeFileSync(
  new URL("../data/supplementary-identifier-start.json", import.meta.url),
  JSON.stringify(startData.supplementary)
);
fs.writeFileSync(
  new URL("../data/supplementary-identifier-continue.json", import.meta.url),
  JSON.stringify(contData.supplementary)
);
