function* f(a, b = () => a) {
  { function a() {} }
  a = 9;
  yield b();
}
