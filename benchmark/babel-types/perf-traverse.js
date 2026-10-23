import { readFileSync } from "node:fs";
import { traverse } from "@babel/types";
import { default as traverse2, NodePath } from "@babel/traverse";
import { parse } from "@babel/parser";
import generate from "@babel/generator";

const content = readFileSync(
  new URL("../fixtures/babel-parser-express.ts.txt", import.meta.url),
  "utf8"
);

console.time("parse");
for (let i = 0; i < 100; i++) {
  // eslint-disable-next-line no-var
  var ast = parse(content, {
    sourceType: "module",
    plugins: ["typescript"],
  });
}
console.timeEnd("parse");

let count = 0;
console.time("types");
for (let i = 0; i < 100; i++) {
  count = 0;
  traverse(ast, {
    enter() {
      count++;
    },
  });
}
console.timeEnd("types");

console.time("traverse");
for (let i = 0; i < 100; i++) {
  traverse2(ast, { noScope: 0 });
}
console.timeEnd("traverse");

console.time("NodePath");
const paths = [];
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < count; j++) {
    paths.push(new NodePath());
  }
}
console.timeEnd("NodePath");
console.log(count, paths.length);

console.time("generate");
for (let i = 0; i < 100; i++) {
  generate(ast);
}
console.timeEnd("generate");
