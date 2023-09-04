var _ref;
// This should print "true true true"
function test() {
  return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
    class Foo {
      foo() {
        return this;
      }
    }
    class Bar extends Foo {
      constructor(...args) {
        var _superprop_getFoo = () => super.foo,
          _this,
          _superprop_get = _prop => super[_prop],
          _ref4;
        super(...args);
        _this = this;
        babelHelpers.defineProperty(this, "a", /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
          return _superprop_getFoo().bind(_this)``;
        }));
        babelHelpers.defineProperty(this, "b", /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
          return _superprop_get('foo').bind(_this)``;
        }));
        babelHelpers.defineProperty(this, "c", function (_x) {
          return (_ref4 = _ref4 || babelHelpers.asyncToGenerator(function* (foo) {
            return _superprop_get(foo).bind(_this)``;
          })).apply(this, arguments);
        });
      }
    }
    const bar = new Bar();
    console.log((yield bar.a()) === bar, (yield bar.b()) === bar, (yield bar.c('foo')) === bar);
  })).apply(this, arguments);
}
test();
