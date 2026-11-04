var f = [], r = [], n = 0;
for (let i = 0; f.push(() => i), (typeof g == "function" ? g() : 0) < 2 && n++ < 4; i++) {
  function g() { return 1; }
  g = function () { return 5; };
  r.push(typeof g);
}
expect(typeof g).toBe("function");
expect(n).toBe(5);
expect(r).toEqual(["function", "function", "function", "function"]);
expect(f.map(g => g())).toEqual([0, 1, 2, 3, 4]);
