function* f([]) {}

expect(() => f()).toThrow();

let called = false;
let run = false;
function* g(x = (called = true)) {
  run = true;
}

g();
expect(called).toBe(true);
expect(run).toBe(false);