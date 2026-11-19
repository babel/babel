var f = [];
loop: for (let i in [1, 2, 3]) {
  f.push(() => i);
  if (i === "1") break loop;
}
expect(f.map(g => g())).toEqual(["0", "1"]);
