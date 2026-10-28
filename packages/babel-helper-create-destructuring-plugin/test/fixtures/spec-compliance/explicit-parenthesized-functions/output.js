var _source2, _source2$fn;
const _source = source,
  _source$fn = _source.fn,
  fn = _source$fn === void 0 ? babelHelpers.setFunctionName((((function () {}))), "fn") : _source$fn,
  _source$arrow = _source.arrow,
  arrow = _source$arrow === void 0 ? babelHelpers.setFunctionName(((() => 1)), "arrow") : _source$arrow,
  _source$C = _source.C,
  C = _source$C === void 0 ? {
    C: ((class {
      static seen = this.name;
    }))
  }.C : _source$C;
let assigned;
(assigned = (_source2$fn = (_source2 = source).fn) === void 0 ? babelHelpers.setFunctionName(((function () {})), "assigned") : _source2$fn, _source2);
const _ref = (0, ((class {
    static seen = this.name;
  }))),
  name = _ref.name,
  seen = _ref.seen;
for (var _ref2 = babelHelpers.objectDestructuringEmpty(source), loop = ((function () {})); false;) {}
use(fn, arrow, C, assigned, name, seen, loop);
