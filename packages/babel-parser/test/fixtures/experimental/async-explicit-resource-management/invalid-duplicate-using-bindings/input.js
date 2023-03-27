async function f() {
  {
    await using f, f = foo();
  }
  {
    await using g = foo();
    await using g = foo();
  }
}
