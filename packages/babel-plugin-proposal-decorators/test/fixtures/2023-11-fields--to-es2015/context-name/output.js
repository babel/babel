var _init_a, _init_extra_a, _init_a2, _init_extra_a2, _init_computedKey, _init_extra_computedKey, _init_computedKey2, _init_extra_computedKey2, _init_computedKey3, _init_extra_computedKey3, _init_computedKey4, _init_extra_computedKey4, _init_computedKey5, _init_extra_computedKey5, _init_computedKey6, _init_extra_computedKey6, _computedKey, _init_computedKey7, _init_extra_computedKey7, _Foo;
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
[_init_a, _init_extra_a, _init_a2, _init_extra_a2, _init_computedKey, _init_extra_computedKey, _init_computedKey2, _init_extra_computedKey2, _init_computedKey3, _init_extra_computedKey3, _init_computedKey4, _init_extra_computedKey4, _init_computedKey5, _init_extra_computedKey5, _init_computedKey6, _init_extra_computedKey6, _init_computedKey7, _init_extra_computedKey7] = babelHelpers.applyDecs2311(_Foo, [[dec, 8, "a"], [dec, 8, "a", o => babelHelpers.classStaticPrivateFieldSpecGet(o, _Foo, _a), (o, v) => babelHelpers.classStaticPrivateFieldSpecSet(o, _Foo, _a, v)], [dec, 8, "b"], [dec, 8, "c"], [dec, 8, 0], [dec, 8, 1], [dec, 8, 2n], [dec, 8, 3n], [dec, 8, _computedKey]], []).e;
babelHelpers.defineProperty(Foo, "a", _init_a(_Foo));
var _a = {
  writable: true,
  value: (_init_extra_a(_Foo), _init_a2(_Foo))
};
babelHelpers.defineProperty(Foo, "b", (_init_extra_a2(_Foo), _init_computedKey(_Foo)));
babelHelpers.defineProperty(Foo, "c", (_init_extra_computedKey(_Foo), _init_computedKey2(_Foo)));
babelHelpers.defineProperty(Foo, 0, (_init_extra_computedKey2(_Foo), _init_computedKey3(_Foo)));
babelHelpers.defineProperty(Foo, 1, (_init_extra_computedKey3(_Foo), _init_computedKey4(_Foo)));
babelHelpers.defineProperty(Foo, 2n, (_init_extra_computedKey4(_Foo), _init_computedKey5(_Foo)));
babelHelpers.defineProperty(Foo, 3n, (_init_extra_computedKey5(_Foo), _init_computedKey6(_Foo)));
babelHelpers.defineProperty(Foo, _computedKey, (_init_extra_computedKey6(_Foo), _init_computedKey7(_Foo)));
_init_extra_computedKey7(_Foo);
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
