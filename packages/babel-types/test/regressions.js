import * as t from "../lib/index.js";
import * as vm from "node:vm";

describe("regressions", () => {
  it(".valueToNode works with objects from different contexts", () => {
    const context = {};
    const script = new vm.Script(`this.obj = { foo: 2 }`);
    script.runInNewContext(context);

    expect(t.valueToNode(context.obj)).toMatchObject({
      properties: [
        {
          computed: false,
          key: { name: "foo", type: "Identifier" },
          shorthand: false,
          type: "ObjectProperty",
          value: { type: "NumericLiteral", value: 2 },
        },
      ],
      type: "ObjectExpression",
    });
  });
});
