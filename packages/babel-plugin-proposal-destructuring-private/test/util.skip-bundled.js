import { parseSync, traverse, types as t } from "@babel/core";
import { traversePattern, privateKeyPathIterator } from "../lib/util.js";

function wrapSourceInClassEnvironment(input) {
  const usedPrivateNames = new Set();
  let matched;
  const re = /#[\w_]+/g;
  while ((matched = re.exec(input)) !== null) {
    usedPrivateNames.add(matched[0]);
  }
  let result = "(class {";
  for (const name of usedPrivateNames) {
    result += name + ";";
  }
  result += "m(){ " + input + "}})";
  return result;
}

function getPath(input, parserOpts = { plugins: ["destructuringPrivate"] }) {
  let targetPath;
  traverse(
    parseSync(wrapSourceInClassEnvironment(input), {
      parserOpts,
      filename: "example.js",
      configFile: false,
    }),
    {
      Pattern(path) {
        targetPath = path;
        path.stop();
      },
    },
  );
  return targetPath;
}

describe("traversePattern", () => {
  it("should visit property with private keys in depth-first order", () => {
    const patternPath = getPath(
      "const { #a: { #b: b, c, ...d }, e: [{ #c: [{ #d: { #c: g } }] }, ...{ #b: h }], #a: i } = obj;",
    );
    const keys = [
      ...traversePattern(patternPath.node, function* (node) {
        if (t.isObjectProperty(node)) {
          const propertyKey = node.key;
          if (t.isPrivateName(propertyKey)) {
            yield propertyKey.id.name;
          }
        }
      }),
    ];

    expect(keys).toEqual(["a", "b", "c", "d", "c", "b", "a"]);
  });
});

describe("privateKeyPathIterator", () => {
  const indexPaths = [
    ...privateKeyPathIterator(
      getPath(
        "const { #a: { a, #b: b, c, ...d }, e: [{ #c: [{ d: e, #d: { #c: f } }] }, ...{ #b: g }], #a: i } = obj;",
      ).node,
    ),
  ].map(indexPath => indexPath.join(","));
  expect(indexPaths).toEqual([
    "0",
    "0,1",
    "1,0,0",
    "1,0,0,0,1",
    "1,0,0,0,1,0",
    "1,1,0,0",
    "2",
  ]);
});
