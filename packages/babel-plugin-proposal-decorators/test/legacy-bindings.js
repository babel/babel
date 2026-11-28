import * as babel from "@babel/core";
import { itBabel9 } from "$repo-utils";

import decorators from "../lib/index.js";

function getClassBinding(code) {
  let result;
  babel.transformSync(code, {
    configFile: false,
    babelrc: false,
    sourceType: "module",
    plugins: [
      [decorators, { version: "legacy" }],
      {
        visitor: {
          Program: {
            exit(path) {
              result = { program: path, binding: path.scope.getBinding("Foo") };
            },
          },
        },
      },
    ],
  });
  return result;
}

function expectDeclaratorBinding({ program, binding }) {
  const declarator = program
    .get("body")
    .find(path => path.isVariableDeclaration({ kind: "let" }))
    .get("declarations.0");
  expect(binding.kind).toBe("let");
  expect(binding.path).toBe(declarator);
  expect(binding.identifier).toBe(declarator.node.id);
  expect(binding.referencePaths).toHaveLength(1);
}

describe("legacy decorators: binding of the decorated class", () => {
  it("class declaration", () => {
    expectDeclaratorBinding(getClassBinding("@dec class Foo {} Foo;"));
  });

  it("class declaration with a decorated method", () => {
    expectDeclaratorBinding(getClassBinding("class Foo { @dec m() {} } Foo;"));
  });

  itBabel9("export default class declaration", () => {
    const result = getClassBinding("export default @dec class Foo {}");
    expectDeclaratorBinding(result);
  });
});
