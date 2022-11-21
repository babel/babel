import * as t from "../lib/index.js";

describe("prependToMemberExpression", function () {
  it("should throw when prepending node to super property", () => {
    const object = t.super();
    const memberExpression = t.memberExpression(t.super(), t.identifier("foo"));
    expect(() => t.prependToMemberExpression(memberExpression, object)).toThrow(
      "Cannot prepend node to super property access (`super.foo`).",
    );
  });
});
