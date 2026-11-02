var x = "outer";
var seen = [];

for (let i = 0; i < 2; i++) {
  class A {
    static {
      var x = i;
      seen.push(x);
    }
  }
  () => i;
}

expect(seen).toEqual([0, 1]);
expect(x).toBe("outer");
