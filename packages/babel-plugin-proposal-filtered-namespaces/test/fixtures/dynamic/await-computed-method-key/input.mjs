async function f() {
  await import(s, { [await key()]() {} });
  await import(s, { async [await key()]() { await x; } });
  await import(s, { get [await key()]() {} });
}
function* g() {
  yield import(s, { [yield]() {} });
}
