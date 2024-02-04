var _init_a, _init_a2, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _computedKey, _init_computedKey7, _Foo;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
};
const f = () => {
  logs.push("computing f");
  return {
    [Symbol.toPrimitive]: () => (logs.push("calling toPrimitive"), "f()")
  };
};
_computedKey = babelHelpers.toPropertyKey(f());
class Foo {}
_Foo = Foo;
[_init_a, _init_a2, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7] = babelHelpers.applyDecs(_Foo, [[dec, 5, "a"], [dec, 5, "a", function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, _Foo, _a);
}, function (value) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, _Foo, _a, value);
}], [dec, 5, "b"], [dec, 5, "c"], [dec, 5, 0], [dec, 5, 1], [dec, 5, 2n], [dec, 5, 3n], [dec, 5, _computedKey]], []);
babelHelpers.defineProperty(Foo, "a", _init_a(_Foo));
var _a = {
  writable: true,
  value: _init_a2(_Foo)
};
babelHelpers.defineProperty(Foo, "b", _init_computedKey(_Foo));
babelHelpers.defineProperty(Foo, "c", _init_computedKey2(_Foo));
babelHelpers.defineProperty(Foo, 0, _init_computedKey3(_Foo));
babelHelpers.defineProperty(Foo, 1, _init_computedKey4(_Foo));
babelHelpers.defineProperty(Foo, 2n, _init_computedKey5(_Foo));
babelHelpers.defineProperty(Foo, 3n, _init_computedKey6(_Foo));
babelHelpers.defineProperty(Foo, _computedKey, _init_computedKey7(_Foo));
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
