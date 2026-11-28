var logged = [];
var console = {
  log(...args) {
    logged.push(args);
  },
};
function foo(cb) {
  if (cb) {
    cb({ b: "b", c1: 1, c2: 2 });
    return { a: "a" };
  }
  return { s: "s", t1: 1, t2: 2 };
}
function bar() {
  return { s: { q1: "q1", r1: 1, r2: 2 }, q3a: 3, q3b: 4 };
}

const { s, ...t } = foo();

const { s: { q1, ...q2 }, ...q3 } = bar();

const { a } = foo(({ b, ...c }) => {
  console.log(b, c);
});

expect(s).toBe("s");
expect(t).toEqual({ t1: 1, t2: 2 });
expect(q1).toBe("q1");
expect(q2).toEqual({ r1: 1, r2: 2 });
expect(q3).toEqual({ q3a: 3, q3b: 4 });
expect(a).toBe("a");
expect(logged).toEqual([["b", { c1: 1, c2: 2 }]]);
