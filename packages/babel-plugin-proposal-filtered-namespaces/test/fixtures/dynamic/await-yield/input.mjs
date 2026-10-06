async function f() {
  await import(await getSpecifier(), opts);
  await import(specifier, { exports: await getExports() });
}
function* g() {
  yield import(yield, opts);
}
async function h() {
  await import(specifier, { exports: (async () => await getExports())() });
}
