import { readFileSync } from "node:fs";

const pkg = process.argv.includes("baseline")
  ? "@babel-baseline/parser"
  : "@babel/parser";

const parser = await import(pkg);

const content = readFileSync(
  new URL("../fixtures/jquery-3.6.js.txt", import.meta.url),
  "utf8"
);

console.time(pkg);
for (let i = 0; i < 1000; i++) {
  parser.parse(content, {
    sourceType: "module",
  });
}
console.timeEnd(pkg);
