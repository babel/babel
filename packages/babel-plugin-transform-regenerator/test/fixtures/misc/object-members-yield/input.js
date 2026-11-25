function* gen(__proto__) {
  return {
    ...(yield "spread"),
    [yield "key"]: 1,
    [yield "method"]() {},
    get [yield "getter"]() {},
    __proto__,
    last: yield "last",
  };
}
