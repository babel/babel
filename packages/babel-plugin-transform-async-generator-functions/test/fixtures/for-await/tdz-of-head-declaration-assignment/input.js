async function method() {
  let a = 0;
  for await (const a of (a = 1, [2])) {}
  return a;
}
