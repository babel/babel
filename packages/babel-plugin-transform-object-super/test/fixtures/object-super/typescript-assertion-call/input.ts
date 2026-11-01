const obj = {
  __proto__: {
    m() {
      return this;
    },
  },
  as() {
    return (super.m as any)();
  },
  satisfies() {
    return (super.m satisfies any)();
  },
  typeAssertion() {
    return (<any>super.m)();
  },
  nonNull() {
    return super.m!();
  },
  instantiation() {
    return (super.m<string>)();
  },
  optionalCall() {
    return (super.m as any)?.();
  },
};
