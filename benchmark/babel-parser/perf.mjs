import parser from "@babel/parser";
import { readFileSync } from "node:fs";

const content = readFileSync(
  new URL("../fixtures/jquery-3.6.js.txt", import.meta.url),
  "utf8"
);

console.time();
for (let i = 0; i < 1000; i++) {
  parser.parse(content, {
    sourceType: "module",
  });
}
console.timeEnd();
