"use strict";

// Always use the latest available version of Unicode!
// https://tc39.github.io/ecma262/#sec-conformance
const version = "17.0.0";

const start = require(
  "@unicode/unicode-" + version + "/Binary_Property/ID_Start/code-points.js"
).filter(function (ch) {
  return ch > 0x7f;
});
let last = -1;
const cont = require(
  "@unicode/unicode-" + version + "/Binary_Property/ID_Continue/code-points.js"
).filter(function (ch) {
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
  const astral = [];
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
      astral.push(from - at, to - from);
      at = to;
    }
  }
  return { nonASCII: re, astral: astral };
}

const startData = generate(start);
const contData = generate(cont);

console.log("/* prettier-ignore */");
console.log('let nonASCIIidentifierStartChars = "' + startData.nonASCII + '";');
console.log("/* prettier-ignore */");
console.log('let nonASCIIidentifierChars = "' + contData.nonASCII + '";');
console.log("/* prettier-ignore */");
console.log(
  "const astralIdentifierStartCodes = " + JSON.stringify(startData.astral) + ";"
);
console.log("/* prettier-ignore */");
console.log(
  "const astralIdentifierCodes = " + JSON.stringify(contData.astral) + ";"
);
