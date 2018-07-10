var Foo = babelHelpers.decorate([function (_) {
  return desc = _;
}], function (_initialize) {
  "use strict";

  var Foo = function Foo() {
    "use strict";

    babelHelpers.classCallCheck(this, Foo);

    _initialize(this);
  };

  return {
    F: Foo,
    d: [{
      kind: "method",
      key: getKeyI(),
      value: function value() {
        return 1;
      }
    }, {
      kind: "method",
      key: getKeyJ(),
      value: function value() {
        return 2;
      }
    }]
  };
});
