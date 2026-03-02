import { parse } from "@babel/parser";

import _traverse from "../../lib/index.js";
const traverse = _traverse.default || _traverse;

function getPath(code, options) {
  const ast = parse(code, { sourceType: "module", ...options });
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

describe("path.isReferencedIdentifier", () => {
  it.each([
    ["<A.B />", "openingElement.name.object", undefined],
    ["<A.B />", "openingElement.name.object", { name: "A" }],
    ["<div.A />", "openingElement.name.object", undefined],
    ["<div.A />", "openingElement.name.object", { name: "div" }],

    ["A.B", "object", undefined],
    ["A.B", "object", { name: "A" }],
    ["A.B.C", "object.object", undefined],
    ["A.B.C", "object.object", { name: "A" }],
  ])(
    `NodePath(%p).get(%p).isReferencedIdentifier(%p) should be true`,
    (input, pathSpec, options) => {
      const unwrappedPath = getPath(input, { plugins: ["jsx"] }).get(
        "body.0.expression",
      );
      const path = pathSpec ? unwrappedPath.get(pathSpec) : unwrappedPath;
      expect(path.node).toBeTruthy();
      expect(path.isReferencedIdentifier(options)).toBe(true);
    },
  );
  it.each([
    ["<A.B />", "openingElement.name.object", { name: "NotA" }],
    ["<div></div>", "openingElement.name", undefined],
    ["<div></div>", "openingElement.name", { name: "div" }],

    ["A.B", "object", { name: "NotA" }],
    ["A.B.C", "object.object", { name: "NotA" }],

    ["A.B", "property", undefined],
    ["A.B", "property", { name: "B" }],
    ["A.B.C", "object.property", undefined],
    ["A.B.C", "object.property", { name: "B" }],

    ["0", undefined, undefined],
  ])(
    `NodePath(%p).get(%p).isReferencedIdentifier(%p) should be false`,
    (input, pathSpec, options) => {
      const unwrappedPath = getPath(input, { plugins: ["jsx"] }).get(
        "body.0.expression",
      );
      const path =
        pathSpec != null ? unwrappedPath.get(pathSpec) : unwrappedPath;
      expect(path.node).toBeTruthy();
      expect(path.isReferencedIdentifier(options)).toBe(false);
    },
  );
});
