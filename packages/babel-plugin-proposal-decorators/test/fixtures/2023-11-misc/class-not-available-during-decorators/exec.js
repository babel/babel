let didRun = false;

function dec(fn) {
  fn();
  return () => {};
}

@dec(() => {
  expect(() => Foo.x).toThrow();
  didRun = true;
}) class Foo {}

expect(didRun).toBe(true);

