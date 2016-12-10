async function foo() {
  await Promise.resolve().then(() => babelHelpers.specRequireInterop(require('foo')));
}