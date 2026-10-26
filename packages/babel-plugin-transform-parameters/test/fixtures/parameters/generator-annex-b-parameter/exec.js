function* f(a, b = () => a) {
  { function a() {} }
  a = 9;
  yield b();
}
expect(f(7).next().value).toBe(9);
