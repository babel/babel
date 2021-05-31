let calls = 0;
const baz = {
  [Symbol.toPrimitive]() {
    calls++;
    return "baz";
  }
}

function dec() {}

@dec
class A {
  [baz]() {}
}

expect(calls).toBe(1);
