const obj = {
  async *gen() {
    await 1;
    return function.sent;
  },
};

class A {
  static async *gen() {
    return function.sent;
  }
}

return (async () => {
  for (const it of [obj.gen(), A.gen()]) {
    expect(typeof it[Symbol.asyncIterator]).toBe("function");
    const result = it.next(1);
    expect(result).toBeInstanceOf(Promise);
    expect(await result).toEqual({ value: 1, done: true });
  }
})();
