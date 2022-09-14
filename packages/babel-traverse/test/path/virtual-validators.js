import { parse } from "@babel/parser";

import _traverse from "../../lib/index.js";
const traverse = _traverse.default || _traverse;

function getPath(code) {
  const ast = parse(code, { sourceType: "module" });
  let path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    },
  });
  return path;
}

describe("path.isForAwaitStatement", () => {
  it.each(["for await (const x of []);"])(
    `NodePath(%p).get("body.0").isForAwaitStatement() should be true`,
    input => {
      const path = getPath(input).get("body.0");
      expect(path.node).toBeTruthy();
      expect(path.isForAwaitStatement()).toBe(true);
    },
  );
});
