async function f() {
  await using x = g();
  await x;
}
