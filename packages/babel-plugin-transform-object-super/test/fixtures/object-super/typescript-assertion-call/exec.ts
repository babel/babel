const obj = {
  __proto__: {
    m(...args: unknown[]) {
      return [this, args];
    },
  },
  as() {
    return (super.m as any)(1, 2);
  },
  satisfies() {
    return (super.m satisfies any)(1, 2);
  },
  typeAssertion() {
    return (<any>super.m)(1, 2);
  },
  nonNull() {
    return super.m!(1, 2);
  },
  instantiation() {
    return (super.m<string>)(1, 2);
  },
  optionalCall() {
    return (super.m as any)?.(1, 2);
  },
};

for (const name of [
  "as",
  "satisfies",
  "typeAssertion",
  "nonNull",
  "instantiation",
  "optionalCall",
] as const) {
  const [receiver, args] = obj[name]();
  expect(receiver).toBe(obj);
  expect(args).toEqual([1, 2]);
}
