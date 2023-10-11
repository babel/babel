import { transformSync } from "@babel/core";
import { Hub } from "../lib/index.js";
import { itBabel8 } from "$repo-utils";

describe("hub", function () {
  it("default buildError should return TypeError", function () {
    const hub = new Hub();
    const msg = "test_msg";
    expect(hub.buildError(null, msg)).toEqual(new TypeError(msg));
  });

  itBabel8("should be preserved across nested traversals", function () {
    let origHub;
    let innerHub = {};
    let exprHub;
    function plugin({ types: t, traverse }) {
      return {
        visitor: {
          Identifier(path) {
            if (path.node.name !== "foo") return;
            origHub = path.hub;

            const mem = t.memberExpression(
              t.identifier("property"),
              t.identifier("access"),
            );
            traverse(mem, {
              noScope: true,
              Identifier(path) {
                if (path.node.name === "property") innerHub = path.hub;
              },
            });
            const [p2] = path.insertAfter(mem);

            exprHub = p2.get("expression").hub;
          },
        },
      };
    }

    transformSync("foo;", { configFile: false, plugins: [plugin] });

    expect(origHub).toBeInstanceOf(Object);
    expect(exprHub).toBe(origHub);
    expect(innerHub).toBeUndefined();
  });
});
