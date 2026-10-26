function* f(a, { ...r }) {
  { function a() {} }
  yield typeof a;
}
