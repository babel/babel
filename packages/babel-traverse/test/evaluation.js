import { parse } from "@babel/parser";

import _traverse from "../lib/index.js";
const traverse = _traverse.default || _traverse;

function getPath(code) {
  const ast = parse(code);
  let path;
  traverse(ast, {
    Program: function (_path) {
      path = _path;
      _path.stop();
    },
  });
  return path;
}

function addDeoptTest(code, type, expectedType) {
  it(type + " deopt: " + code, function () {
    const visitor = {};

    visitor[type] = function (path) {
      const evaluate = path.evaluate();
      expect(evaluate.confident).toBeFalsy();
      expect(evaluate.deopt.type).toEqual(expectedType);
    };

    traverse(
      parse(code, {
        plugins: ["*"],
      }),
      visitor,
    );
  });
}

describe("evaluation", function () {
  describe("evaluateTruthy", function () {
    it("should work with null", function () {
      expect(
        getPath("false || a.length === 0;").get("body")[0].evaluateTruthy(),
      ).toBeUndefined();
    });

    it("should not mistake lack of confidence for falsy", function () {
      expect(
        getPath("foo || 'bar'").get("body")[0].evaluate().value,
      ).toBeUndefined();
    });
  });

  it("should bail out on recursive evaluation", function () {
    expect(
      getPath("function fn(a) { var g = a ? 1 : 2, a = g * this.foo; }")
        .get("body.0.body.body.0.declarations.1.init")
        .evaluate().confident,
    ).toBe(false);
  });

  it("should short-circuit && and ||", function () {
    expect(getPath("x === 'y' || 42").get("body")[0].evaluate().confident).toBe(
      false,
    );
    expect(getPath("x === 'y' && 0").get("body")[0].evaluate().confident).toBe(
      false,
    );
    expect(getPath("42 || x === 'y'").get("body")[0].evaluate().value).toBe(42);
    expect(getPath("0 && x === 'y'").get("body")[0].evaluate().value).toBe(0);
  });

  it("should handle ??", function () {
    expect(getPath("null ?? 42").get("body")[0].evaluate().value).toBe(42);
    expect(getPath("void 0 ?? 42").get("body")[0].evaluate().value).toBe(42);
    expect(getPath("0 ?? 42").get("body")[0].evaluate().value).toBe(0);
    expect(getPath("x ?? 42").get("body")[0].evaluate().confident).toBe(false);
    expect(getPath("42 ?? x === 'y'").get("body")[0].evaluate().value).toBe(42);
  });

  it("should work with repeated, indeterminate identifiers", function () {
    expect(
      getPath("var num = foo(); (num > 0 && num < 100);")
        .get("body")[1]
        .evaluateTruthy(),
    ).toBeUndefined();
  });

  it("should work with repeated, determinate identifiers", function () {
    expect(
      getPath("var num = 5; (num > 0 && num < 100);")
        .get("body")[1]
        .evaluateTruthy(),
    ).toBe(true);
  });

  it("should deopt when var is redeclared in the same scope", function () {
    expect(
      getPath("var x = 2; var y = x + 2; { var x = 3 }")
        .get("body.1.declarations.0.init")
        .evaluate().confident,
    ).toBe(false);
  });

  describe("template literals", function () {
    it("should evaluate template literals", function () {
      expect(
        getPath("var x = 8; var y = 1; var z = `value is ${x >>> y}`")
          .get("body.2.declarations.0.init")
          .evaluate().value,
      ).toBe("value is 4");
    });

    it("should evaluate String.raw tags", function () {
      expect(
        getPath("String.raw`a\\n${1}\\u`;").get("body.0.expression").evaluate()
          .value,
      ).toBe("a\\n1\\u");
    });

    addDeoptTest(
      "a`x${b}y`",
      "TaggedTemplateExpression",
      "TaggedTemplateExpression",
    );
  });

  it("should evaluate member expressions", function () {
    expect(
      getPath("var x = 'foo'.length")
        .get("body.0.declarations.0.init")
        .evaluate().value,
    ).toBe(3);
    expect(
      getPath("var x = 'hello world'[6]")
        .get("body.0.declarations.0.init")
        .evaluate().value,
    ).toBe("w");
    expect(
      getPath("var length = 1; var x = 'abc'[length];")
        .get("body.1.declarations.0.init")
        .evaluate().value,
    ).toBe("b");
    const member_expr = getPath(
      "var x = Math.min(2,Math.max(3,4));var y = Math.random();",
    );
    const eval_member_expr = member_expr
      .get("body.0.declarations.0.init")
      .evaluate();
    const eval_invalid_call = member_expr
      .get("body.1.declarations.0.init")
      .evaluate();
    expect(eval_member_expr.value).toBe(2);
    expect(eval_invalid_call.confident).toBe(false);
  });

  it("should not evaluate inherited methods", function () {
    const path = getPath("Math.hasOwnProperty('min')");
    const evalResult = path.get("body.0.expression").evaluate();
    expect(evalResult.confident).toBe(false);
  });

  it("should evaluate global call expressions", function () {
    expect(
      getPath("isFinite(1);").get("body.0.expression").evaluate().value,
    ).toBe(true);

    expect(
      getPath("isFinite(Infinity);").get("body.0.expression").evaluate().value,
    ).toBe(false);

    expect(
      getPath("isNaN(NaN);").get("body.0.expression").evaluate().value,
    ).toBe(true);

    expect(getPath("isNaN(1);").get("body.0.expression").evaluate().value).toBe(
      false,
    );

    expect(
      getPath("parseFloat('1.1');").get("body.0.expression").evaluate().value,
    ).toBe(1.1);

    expect(
      getPath("parseFloat('1');").get("body.0.expression").evaluate().value,
    ).toBe(1);

    expect(
      getPath("encodeURI('x 1');").get("body.0.expression").evaluate().value,
    ).toBe("x%201");

    expect(
      getPath("decodeURI('x%201');").get("body.0.expression").evaluate().value,
    ).toBe("x 1");

    expect(
      getPath("encodeURIComponent('?x=1');").get("body.0.expression").evaluate()
        .value,
    ).toBe("%3Fx%3D1");

    expect(
      getPath("decodeURIComponent('%3Fx%3D1');")
        .get("body.0.expression")
        .evaluate().value,
    ).toBe("?x=1");

    if (process.env.BABEL_8_BREAKING) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(
        getPath("btoa('babel');").get("body.0.expression").evaluate().value,
      ).toBe("YmFiZWw=");

      // eslint-disable-next-line jest/no-conditional-expect
      expect(
        getPath("atob('YmFiZWw=');").get("body.0.expression").evaluate().value,
      ).toBe("babel");
    }
  });

  it("should not deopt vars in different scope", function () {
    const input =
      "var a = 5; function x() { var a = 5; var b = a + 1; } var b = a + 2";
    expect(
      getPath(input).get("body.1.body.body.1.declarations.0.init").evaluate()
        .value,
    ).toBe(6);
    expect(
      getPath(input).get("body.2.declarations.0.init").evaluate().value,
    ).toBe(7);
  });

  it("should not deopt let/const inside blocks", function () {
    expect(
      getPath("let x = 5; { let x = 1; } let y = x + 5")
        .get("body.2.declarations.0.init")
        .evaluate().value,
    ).toBe(10);
    const constExample =
      "const d = true; if (d && true || false) { const d = false; d && 5; }";
    expect(getPath(constExample).get("body.1.test").evaluate().value).toBe(
      true,
    );
    expect(
      getPath(constExample).get("body.1.consequent.body.1").evaluate().value,
    ).toBe(false);
    const test_alternate = "var y = (3 < 4)? 3 + 4: 3 + 4;";
    expect(
      getPath(test_alternate)
        .get("body.0.declarations.0.init.alternate")
        .evaluate().value,
    ).toBe(7);
  });

  it("should deopt ids that are referenced before the bindings", function () {
    expect(
      getPath("let x = y + 5; let y = 5;")
        .get("body.0.declarations.0.init")
        .evaluate().confident,
    ).toBe(false);
    expect(
      getPath("if (typeof x === 'undefined') var x = {}")
        .get("body.0.test")
        .evaluate().confident,
    ).toBe(false);
  });

  it("should evaluate undefined, NaN and Infinity", () => {
    expect(
      getPath("undefined").get("body.0.expression").evaluate().confident,
    ).toBe(true);
    expect(getPath("NaN").get("body.0.expression").evaluate().confident).toBe(
      true,
    );
    expect(
      getPath("Infinity").get("body.0.expression").evaluate().confident,
    ).toBe(true);
  });

  it("should deopt redefined primitives - undefined, NaN and Infinity", () => {
    const eval_undef = getPath("let undefined; undefined;")
      .get("body.1.expression")
      .evaluate();
    const eval_nan = getPath("let NaN; NaN;")
      .get("body.1.expression")
      .evaluate();
    const eval_inf = getPath("let Infinity; Infinity;")
      .get("body.1.expression")
      .evaluate();
    expect(eval_undef.confident).toBe(false);
    expect(eval_nan.confident).toBe(false);
    expect(eval_inf.confident).toBe(false);

    expect(eval_undef.deopt.type).toBe("VariableDeclarator");
    expect(eval_undef.deopt.parentPath.node.kind).toBe("let");
  });

  it("should work with String.raw", function () {
    expect(getPath("String.raw`\\d`").get("body")[0].evaluate().value).toBe(
      "\\d",
    );

    expect(
      getPath("`${String.raw`\\d`}`").get("body")[0].evaluate().value,
    ).toBe("\\d");
  });

  it("sets deopt properly when not confident after evaluating multiple expressions", () => {
    const ast = parse(`
      const parts = [foo, bar];
      console.log(parts.join('-'));
    `);

    let result;

    traverse(ast, {
      MemberExpression: {
        enter(path) {
          result = path.get("object").evaluate();
        },
      },
    });

    expect(result.confident).toBe(false);
    expect(result.deopt.type).toBe("Identifier");
    expect(result.deopt.node.name).toBe("foo");
  });

  it("sets deopt properly when confident after evaluating multiple expressions", () => {
    const ast = parse(`
      const foo = 'foo';
      const bar = 'bar';
      const parts = [foo, bar];
      console.log(parts.join('-'))
    `);

    let result;

    traverse(ast, {
      MemberExpression: {
        enter(path) {
          result = path.get("object").evaluate();
        },
      },
    });

    expect(result.confident).toBe(true);
    expect(result.deopt).toBeNull();
    expect(result.value).toEqual(["foo", "bar"]);
  });

  addDeoptTest("({a:{b}})", "ObjectExpression", "Identifier");
  addDeoptTest("({[a + 'b']: 1})", "ObjectExpression", "Identifier");
  addDeoptTest("[{a}]", "ArrayExpression", "Identifier");
});
