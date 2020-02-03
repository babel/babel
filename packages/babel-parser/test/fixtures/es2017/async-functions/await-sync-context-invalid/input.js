function f() {
  await 0;
  await 2n;
  await foo;
  await new Class();
  await null;
}
