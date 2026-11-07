const order = [];

const receiver = {
  get tag() {
    order.push("get tag");
    return function (strings, ...values) {
      order.push("call tag");
      return {
        sameThis: this === receiver,
        cooked: [...strings],
        raw: [...strings.raw],
        values,
      };
    };
  },
};

function* taggedWithYield() {
  order.push("start");
  return receiver.tag`before\n${order.push("eval sub1") && (yield "paused")}middle\u{1F600}${order.push("eval sub2") && "after"}end`;
}

const iter = taggedWithYield();
expect(iter.next()).toEqual({ value: "paused", done: false });
expect(order).toEqual(["start", "get tag", "eval sub1"]);

expect(iter.next("resumed")).toEqual({
  value: {
    sameThis: true,
    cooked: ["before\n", "middle\u{1F600}", "end"],
    raw: ["before\\n", "middle\\u{1F600}", "end"],
    values: ["resumed", "after"],
  },
  done: true,
});
expect(order).toEqual([
  "start",
  "get tag",
  "eval sub1",
  "eval sub2",
  "call tag",
]);

function tag(strings, ...values) {
  return { strings: [...strings], values };
}

function* plainTagWithYield() {
  return tag`a${yield 1}b`;
}

const plain = plainTagWithYield();
expect(plain.next()).toEqual({ value: 1, done: false });
expect(plain.next("X")).toEqual({
  value: { strings: ["a", "b"], values: ["X"] },
  done: true,
});
