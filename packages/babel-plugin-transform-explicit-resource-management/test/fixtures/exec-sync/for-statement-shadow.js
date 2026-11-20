const dispose = Symbol.dispose || Symbol.for("Symbol.dispose");
const outer = { [dispose]() {} };
const inner = { [dispose]() {} };
let i = 0;

{
  using x = outer;
  for (using x = inner; i < 1; i++) {
    expect(x).toBe(inner);
  }
  expect(x).toBe(outer);
}
expect(i).toBe(1);
