var x = [
  "a",
  [{ b: "b", c1: 1 }],
  { d: "d", e1: 2 },
  [{ f: "f", g1: 3 }, { h: ["i", { j: "j", k1: 4 }] }],
];

const [a, [{b, ...c}], {d, ...e}, [{ f, ...g}, {h: [i, {j, ...k}] }]] = x;

expect(a).toBe("a");
expect(b).toBe("b");
expect(c).toEqual({ c1: 1 });
expect(d).toBe("d");
expect(e).toEqual({ e1: 2 });
expect(f).toBe("f");
expect(g).toEqual({ g1: 3 });
expect(i).toBe("i");
expect(j).toBe("j");
expect(k).toEqual({ k1: 4 });
