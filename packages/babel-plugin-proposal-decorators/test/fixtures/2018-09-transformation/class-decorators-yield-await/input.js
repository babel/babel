async function* f() {
  @(yield dec1)
  @(await dec2)
  class A {}
}
