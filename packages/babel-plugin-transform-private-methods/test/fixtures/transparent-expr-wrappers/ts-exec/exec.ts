class C {
  #m(...args: any[]) {
    return [this, ...args];
  }
  as() {
    return (this.#m as any)(1);
  }
  nonNull() {
    return this.#m!(1);
  }
  optional() {
    return (this.#m as any)?.(1);
  }
}

const c = new C();
expect(c.as()).toEqual([c, 1]);
expect(c.nonNull()).toEqual([c, 1]);
expect(c.optional()).toEqual([c, 1]);
