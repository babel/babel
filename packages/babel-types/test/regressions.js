import * as t from "../lib/index.js";
import * as vm from "vm";

describe("regressions", () => {
  const babel7 = process.env.BABEL_TYPES_8_BREAKING ? it.skip : it;

  babel7("jest .toMatchInlineSnapshot used 'Line' for comments", () => {
    expect(() => {
      t.file(t.program([]), [{ type: "Line" }]);
    }).not.toThrow();
  });

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
