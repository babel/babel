var Foo = babelHelpers.decorate(null, function (_initialize) {
  var Foo = function Foo() {
    "use strict";

    babelHelpers.classCallCheck(this, Foo);

    _initialize(this);
  };

  return {
    F: Foo,
    d: [{
      kind: "method",
      decorators: [dec1(), dec2(), dec3(), dec4(), dec5()()],
      key: "method",
      value: function value() {}
    }]
  };
});
