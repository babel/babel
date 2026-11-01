class A {
  m(...args: unknown[]) {
    return [this, args];
  }
  static s(...args: unknown[]) {
    return [this, args];
  }
}

class B extends A {
  as() {
    return (super.m as any)(1, 2);
  }
  satisfies() {
    return (super.m satisfies any)(1, 2);
  }
  typeAssertion() {
    return (<any>super.m)(1, 2);
  }
  nonNull() {
    return super.m!(1, 2);
  }
  optionalCall() {
    return (super.m as any)?.(1, 2);
  }
  static as() {
    return (super.s as any)(1, 2);
  }
}

const b = new B();
for (const name of ["as", "satisfies", "typeAssertion", "nonNull", "optionalCall"] as const) {
  const [receiver, args] = b[name]();
  expect(receiver).toBe(b);
  expect(args).toEqual([1, 2]);
}

const [staticReceiver, staticArgs] = B.as();
expect(staticReceiver).toBe(B);
expect(staticArgs).toEqual([1, 2]);
