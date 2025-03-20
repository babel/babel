// This should print "true true true"
function test() {
  return _test.apply(this, arguments);
}
function _test() {
  _test = babelHelpers.asyncToGenerator(function* () {
    class Foo {
      foo() {
        return this;
      }
    }
    class Bar extends Foo {
      constructor(...args) {
        var _superprop_getFoo = () => super.foo,
          _this,
          _superprop_get = _prop => super[_prop];
        super(...args);
        _this = this;
        babelHelpers.defineProperty(this, "a", /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
          return _superprop_getFoo().bind(_this)``;
        }));
        babelHelpers.defineProperty(this, "b", /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
          return _superprop_get('foo').bind(_this)``;
        }));
        babelHelpers.defineProperty(this, "c", /*#__PURE__*/function () {
          var _ref3 = babelHelpers.asyncToGenerator(function* (foo) {
            return _superprop_get(foo).bind(_this)``;
          });
          return function (_x) {
            return _ref3.apply(this, arguments);
          };
        }());
      }
    }
    const bar = new Bar();
    console.log((yield bar.a()) === bar, (yield bar.b()) === bar, (yield bar.c('foo')) === bar);
  });
  return _test.apply(this, arguments);
}
test();
