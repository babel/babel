class Foo {
  #m(...args: unknown[]) {
    return [this, args];
  }
  #f = function (this: unknown, ...args: unknown[]) {
    return [this, args];
  };
  run() {
    return [
      (this.#m as any)(1, 2),
      (this.#m satisfies any)(1, 2),
      (<any>this.#m)(1, 2),
      this.#m!(1, 2),
      (this.#m as any)?.(1, 2),
      (this.#f as any)(1, 2),
    ];
  }
}

const foo = new Foo();
for (const [receiver, args] of foo.run()) {
  expect(receiver).toBe(foo);
  expect(args).toEqual([1, 2]);
}
