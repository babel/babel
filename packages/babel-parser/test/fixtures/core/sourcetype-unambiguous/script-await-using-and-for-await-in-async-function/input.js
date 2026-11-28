async function f() {
  await using x = y;
  for await (x of xs) {}
}
