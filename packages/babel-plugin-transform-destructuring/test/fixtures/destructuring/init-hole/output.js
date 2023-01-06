var _ref2, _ref2$;
let x = 23;
expect(x).toEqual(23);
const y = 24,
  z = 42;
expect(y).toEqual(24);
expect(z).toEqual(42);
function* foo() {
  yield 1;
  yield 2;
}
let bar = foo();
const _ref = [, bar.next().value],
  _ref$ = _ref[0],
  a = _ref$ === void 0 ? bar.next().value : _ref$,
  b = _ref[1];
expect(a).toEqual(2);
expect(b).toEqual(1);
const arr = (_ref2 = [,], _ref2$ = _ref2[0], c = _ref2$ === void 0 ? 42 : _ref2$, _ref2);
expect(c).toEqual(42);
expect(arr).toStrictEqual([,]);
var iterCount = 0;
for (const x = 23; iterCount < 1;) {
  expect(x).toEqual(23);
  // another statement

  iterCount += 1;
}
expect(iterCount).toEqual(1);
const d = [void 0];
const e = [void 0][0];
expect(d).toStrictEqual([,]);
expect(e).toEqual(undefined);
const f = void 0;
expect(f).toEqual(undefined);
let g = void 0;
expect(g).toEqual(undefined);
let thrown;
try {
  thrown = false;
  babelHelpers.objectDestructuringEmpty();
} catch (e) {
  thrown = true;
}
expect(thrown).toEqual(true);
try {
  thrown = false;
  var _ = babelHelpers.slicedToArray(void 0, 0);
} catch (e) {
  thrown = true;
}
expect(thrown).toEqual(true);
