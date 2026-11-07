function* f(a, { ...r }) {
  { function a() {} }
  yield typeof a;
}
expect(f(7, {}).next().value).toBe("number");

function* closure(a, { ...r }, read = () => a) {
  {
    expect(typeof a).toBe("function");
    function a() {}
  }
  a = 9;
  yield read();
}
expect(closure(7, {}).next().value).toBe(9);

function* cases(a, { ...r }) {
  switch (a) {
    case 7:
      yield typeof a;
      break;
    case 0:
      function a() { return b; }
      let b = 8;
      yield a();
  }
  yield a;
}
const first = cases(7, {});
expect(first.next().value).toBe("function");
expect(first.next().value).toBe(7);
const second = cases(0, {});
expect(second.next().value).toBe(8);
expect(second.next().value).toBe(0);

function* duplicate(a, { ...r }) {
  {
    function a() { return 1; }
    function a() { return 2; }
    yield a();
  }
  yield a;
}
const third = duplicate(7, {});
expect(third.next().value).toBe(2);
expect(third.next().value).toBe(7);

function* conditional(a, { ...r }) {
  if (true) function a() {}
  yield a;
}
expect(conditional(7, {}).next().value).toBe(7);
