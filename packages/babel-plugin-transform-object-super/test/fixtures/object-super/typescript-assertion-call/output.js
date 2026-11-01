var _obj;
const obj = _obj = {
  __proto__: {
    m: function () {
      return this;
    }
  },
  as: function () {
    return babelHelpers.superPropGet(_obj, "m", this, 2)([]);
  },
  satisfies: function () {
    return babelHelpers.superPropGet(_obj, "m", this, 2)([]);
  },
  typeAssertion: function () {
    return babelHelpers.superPropGet(_obj, "m", this, 2)([]);
  },
  nonNull: function () {
    return babelHelpers.superPropGet(_obj, "m", this, 2)([]);
  },
  instantiation: function () {
    return babelHelpers.superPropGet(_obj, "m", this, 2)([]);
  },
  optionalCall: function () {
    return babelHelpers.superPropGet(_obj, "m", this, 2)?.([]);
  }
};
