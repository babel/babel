var foo = {
  [Symbol.toPrimitive]: () => "foo"
};
expect(new (/*#__PURE__*/function () {
  "use strict";

  function _class() {
    babelHelpers.classCallCheck(this, _class);
  }
  return babelHelpers.createClass(_class, [{
    key: foo,
    value: function value() {
      return 0;
    }
  }]);
}())().foo()).toBe(0);
expect(new (/*#__PURE__*/function () {
  "use strict";

  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
  }
  return babelHelpers.createClass(_class2, [{
    key: foo,
    get: function get() {
      return 0;
    }
  }]);
}())().foo).toBe(0);
expect(new (/*#__PURE__*/function () {
  "use strict";

  function _class3() {
    babelHelpers.classCallCheck(this, _class3);
  }
  return babelHelpers.createClass(_class3, [{
    key: foo,
    set: function set(v) {
      return v;
    }
  }]);
}())().foo = 0).toBe(0);
var arrayLike = {
  [Symbol.toPrimitive]: () => []
};
expect(() => new (/*#__PURE__*/function () {
  "use strict";

  function _class4() {
    babelHelpers.classCallCheck(this, _class4);
  }
  return babelHelpers.createClass(_class4, [{
    key: arrayLike,
    value: function value() {
      return 0;
    }
  }]);
}())()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => new (/*#__PURE__*/function () {
  "use strict";

  function _class5() {
    babelHelpers.classCallCheck(this, _class5);
  }
  return babelHelpers.createClass(_class5, [{
    key: arrayLike,
    get: function get() {
      return 0;
    }
  }]);
}())()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => new (/*#__PURE__*/function () {
  "use strict";

  function _class6() {
    babelHelpers.classCallCheck(this, _class6);
  }
  return babelHelpers.createClass(_class6, [{
    key: arrayLike,
    set: function set(v) {
      return v;
    }
  }]);
}())()).toThrow("@@toPrimitive must return a primitive value.");
