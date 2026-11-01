var _obj;
const obj = _obj = {
  __proto__: {},
  assign: function () {
    babelHelpers.superPropSet(_obj, "x", 1, this, 0);
  },
  update: function () {
    var _super$x, _super$x2;
    babelHelpers.superPropSet(_obj, "x", (_super$x = babelHelpers.superPropGet(_obj, "x", this), _super$x2 = _super$x++, _super$x), this, 0), _super$x2;
  },
  remove: function () {
    (function () {
      throw new ReferenceError("'delete super.prop' is invalid");
    })();
  }
};
