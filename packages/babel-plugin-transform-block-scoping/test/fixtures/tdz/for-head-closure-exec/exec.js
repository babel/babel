function withUpdate() {
  for (let i = 0, f = () => i; ; i++) {
    (() => i);
    if (i > 1) return f();
  }
}
expect(withUpdate()).toBe(0);

function forwardRef() {
  for (let f = () => i, i = 0; ; ) {
    (() => i);
    return f();
  }
}
expect(forwardRef()).toBe(0);

expect(() => {
  for (let f = () => i, g = f(), i = 0; ; ) {
    (() => i);
    break;
  }
}).toThrow(ReferenceError);

function shadowsOuter() {
  let i = "outer";
  for (let f = () => i, i = 0; ; ) {
    (() => i);
    f();
    break;
  }
  return i;
}
expect(shadowsOuter()).toBe("outer");

expect(
  (() => {
    for (let i = 0, f = () => i; ; i++) {
      (() => i);
      if (i) return f();
    }
  })(),
).toBe(0);
