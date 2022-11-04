var _init_a, _init_a2, _init_computedKey, _computedKey, _init_computedKey2, _init_computedKey3, _computedKey2, _init_computedKey4, _init_computedKey5, _computedKey3, _init_computedKey6, _computedKey4, _init_computedKey7;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
};
const f = () => {
  logs.push("computing f");
  return {
    [Symbol.toPrimitive]: () => "f()"
  };
};
_computedKey = "c";
_computedKey2 = 1;
_computedKey3 = 3n;
_computedKey4 = f();
class Foo {}
[_init_a, _init_a2, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7] = babelHelpers.applyDecs2203(Foo, [[dec, 5, "a"], [dec, 5, "a", function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _a);
}, function (value) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _a, value);
}], [dec, 5, "b"], [dec, 5, _computedKey], [dec, 5, "0"], [dec, 5, _computedKey2], [dec, 5, "2"], [dec, 5, _computedKey3], [dec, 5, _computedKey4]], []);
babelHelpers.defineProperty(Foo, "a", _init_a(Foo));
var _a = {
  writable: true,
  value: _init_a2(Foo)
};
babelHelpers.defineProperty(Foo, "b", _init_computedKey(Foo));
babelHelpers.defineProperty(Foo, _computedKey, _init_computedKey2(Foo));
babelHelpers.defineProperty(Foo, 0, _init_computedKey3(Foo));
babelHelpers.defineProperty(Foo, _computedKey2, _init_computedKey4(Foo));
babelHelpers.defineProperty(Foo, 2n, _init_computedKey5(Foo));
babelHelpers.defineProperty(Foo, _computedKey3, _init_computedKey6(Foo));
babelHelpers.defineProperty(Foo, _computedKey4, _init_computedKey7(Foo));
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
