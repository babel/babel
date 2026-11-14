const order = [];

function coerce(name, value) {
  order.push("eval:" + name);
  return {
    [Symbol.toPrimitive](hint) {
      order.push("coerce:" + name + ":" + hint);
      return value;
    },
  };
}

function* templateWithYield() {
  return `${coerce("a", "A")}${yield "paused"}${coerce("b", "B")}`;
}

const iter = templateWithYield();
expect(iter.next()).toEqual({ value: "paused", done: false });
expect(order).toEqual(["eval:a", "coerce:a:string"]);
expect(iter.next("resumed")).toEqual({ value: "AresumedB", done: true });
expect(order).toEqual([
  "eval:a",
  "coerce:a:string",
  "eval:b",
  "coerce:b:string",
]);

function* templateWithQuasis() {
  return `line1\n${yield "paused"}line2\u{1F600}`;
}

const quasis = templateWithQuasis();
expect(quasis.next().value).toBe("paused");
expect(quasis.next("X").value).toBe("line1\nXline2\u{1F600}");

const throwOrder = [];

function* throwingTemplate() {
  return `${{
    [Symbol.toPrimitive]() {
      throwOrder.push("coerce");
      throw new Error("boom");
    },
  }}${(() => {
    throwOrder.push("next");
    return "next";
  })()}`;
}

const throwing = throwingTemplate();
expect(() => throwing.next()).toThrow("boom");
expect(throwOrder).toEqual(["coerce"]);
