const proto = {
  m(...args: any[]) {
    return [this, ...args];
  },
};

const obj = {
  __proto__: proto,
  as() {
    return (super.m as any)(1);
  },
  nonNull() {
    return super.m!(1);
  },
  satisfies() {
    return (super.m satisfies Function)(1);
  },
  typeAssertion() {
    return (<any>super.m)(1);
  },
  nested() {
    return (super.m! as any)(1);
  },
  optional() {
    return (super.m as any)?.(1);
  },
};

expect(obj.as()).toEqual([obj, 1]);
expect(obj.nonNull()).toEqual([obj, 1]);
expect(obj.satisfies()).toEqual([obj, 1]);
expect(obj.typeAssertion()).toEqual([obj, 1]);
expect(obj.nested()).toEqual([obj, 1]);
expect(obj.optional()).toEqual([obj, 1]);
