let didRun = false;

function dec(fn) {
  fn();
  return () => {};
}

@dec(() => {
  expect(() => Foo).toThrow(ReferenceError);
  didRun = true;
}) class Foo {}

expect(didRun).toBe(true);

