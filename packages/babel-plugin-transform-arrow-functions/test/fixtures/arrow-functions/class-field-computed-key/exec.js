function f() {
  class A {
    static [(() => this.key)()] = 1;
    [(() => this.key)()] = 2;
  }
  return A;
}

const A = f.call({ key: "k" });
expect(A.k).toBe(1);
expect(new A().k).toBe(2);
