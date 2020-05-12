let count = 0;

const foo = {
  get a() {
    count++;
    return {
      b() {
        return "b" in this && !("a" in this);
      }
    }
  },
  b() {
    return "b" in this && "a" in this;
  }
}

expect((foo?.b)()).toBe(true);
expect((foo?.b)?.()).toBe(true);
expect(() => (undefined?.b)()).toThrow();

expect((foo?.a.b)()).toBe(true);
expect(count).toBe(1);

expect((foo?.a.b)?.()).toBe(true);
expect(count).toBe(2);
