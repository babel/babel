import { parse } from "@babel/parser";
import * as t from "@babel/types";

import _generator from "@babel/generator";
import _optimizeCallExpression from "../lib/index.js";
const generator = _generator.default || _generator;
const optimizeCallExpression =
  _optimizeCallExpression.default || _optimizeCallExpression;

function transformInput(input, thisIdentifier) {
  const ast = parse(input);
  const callExpression = ast.program.body[0].expression;
  return generator(
    optimizeCallExpression(
      callExpression.callee,
      thisIdentifier
        ? t.identifier(thisIdentifier)
        : callExpression.callee.object,
      callExpression.arguments,
      callExpression.type === "OptionalCallExpression",
    ),
  ).code;
}

describe("@babel/helper-optimise-call-expression", () => {
  test("optimizeCallExpression should work when thisNode is implied from callee", () => {
    expect(transformInput("a.b(...arguments)")).toMatchInlineSnapshot(
      `"a.b.apply(a, arguments)"`,
    );
    expect(transformInput("a[b](...arguments)")).toMatchInlineSnapshot(
      `"a[b].apply(a, arguments)"`,
    );
    expect(transformInput("a.b?.(...arguments)")).toMatchInlineSnapshot(
      `"a.b?.apply(a, arguments)"`,
    );
    expect(transformInput("a[b]?.(...arguments)")).toMatchInlineSnapshot(
      `"a[b]?.apply(a, arguments)"`,
    );

    expect(transformInput("a.b(...args)")).toMatchInlineSnapshot(
      `"a.b.call(a, ...args)"`,
    );
    expect(transformInput("a[b](...args)")).toMatchInlineSnapshot(
      `"a[b].call(a, ...args)"`,
    );
    expect(transformInput("a.b?.(...args)")).toMatchInlineSnapshot(
      `"a.b?.call(a, ...args)"`,
    );
    expect(transformInput("a[b]?.(...args)")).toMatchInlineSnapshot(
      `"a[b]?.call(a, ...args)"`,
    );

    expect(transformInput("a.b(arg1, arg2)")).toMatchInlineSnapshot(
      `"a.b.call(a, arg1, arg2)"`,
    );
    expect(transformInput("a[b](arg1, arg2)")).toMatchInlineSnapshot(
      `"a[b].call(a, arg1, arg2)"`,
    );
    expect(transformInput("a.b?.(arg1, arg2)")).toMatchInlineSnapshot(
      `"a.b?.call(a, arg1, arg2)"`,
    );
    expect(transformInput("a[b]?.(arg1, arg2)")).toMatchInlineSnapshot(
      `"a[b]?.call(a, arg1, arg2)"`,
    );
  });

  test("optimizeCallExpression should work when thisNode is provided", () => {
    expect(transformInput("a.b(...arguments)", "c")).toMatchInlineSnapshot(
      `"a.b.apply(c, arguments)"`,
    );
    expect(transformInput("a[b](...arguments)", "c")).toMatchInlineSnapshot(
      `"a[b].apply(c, arguments)"`,
    );
    expect(transformInput("a.b?.(...arguments)", "c")).toMatchInlineSnapshot(
      `"a.b?.apply(c, arguments)"`,
    );
    expect(transformInput("a[b]?.(...arguments)", "c")).toMatchInlineSnapshot(
      `"a[b]?.apply(c, arguments)"`,
    );

    expect(transformInput("a.b(...args)", "c")).toMatchInlineSnapshot(
      `"a.b.call(c, ...args)"`,
    );
    expect(transformInput("a[b](...args)", "c")).toMatchInlineSnapshot(
      `"a[b].call(c, ...args)"`,
    );
    expect(transformInput("a.b?.(...args)", "c")).toMatchInlineSnapshot(
      `"a.b?.call(c, ...args)"`,
    );
    expect(transformInput("a[b]?.(...args)", "c")).toMatchInlineSnapshot(
      `"a[b]?.call(c, ...args)"`,
    );

    expect(transformInput("a.b(arg1, arg2)", "c")).toMatchInlineSnapshot(
      `"a.b.call(c, arg1, arg2)"`,
    );
    expect(transformInput("a[b](arg1, arg2)", "c")).toMatchInlineSnapshot(
      `"a[b].call(c, arg1, arg2)"`,
    );
    expect(transformInput("a.b?.(arg1, arg2)", "c")).toMatchInlineSnapshot(
      `"a.b?.call(c, arg1, arg2)"`,
    );
    expect(transformInput("a[b]?.(arg1, arg2)", "c")).toMatchInlineSnapshot(
      `"a[b]?.call(c, arg1, arg2)"`,
    );
  });
});
