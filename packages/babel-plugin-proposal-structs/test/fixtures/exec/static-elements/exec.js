const log = [];
struct S {
  static a = (log.push("a"), new S());
  static #b = 2;
  static {
    log.push("block", S.a instanceof S, S.#b);
  }
  static method() {
    return S.#b;
  }
  x = 1;
}
expect(log).toEqual(["a", "block", true, 2]);
expect(S.a.x).toBe(1);
expect(S.method()).toBe(2);
expect(Object.getOwnPropertyDescriptor(S, "a").configurable).toBe(true);
