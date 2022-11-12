var foo = {
  [Symbol.toPrimitive]: () => "foo"
};
expect(new ( /*#__PURE__*/function () {
  "use strict";

  function _class() {
    babelHelpers.classCallCheck(this, _class);
  }
  babelHelpers.createClass(_class, [{
    key: foo,
    value: function value() {
      return 0;
    }
  }]);
  return _class;
}())().foo()).toBe(0);
expect(new ( /*#__PURE__*/function () {
  "use strict";

  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
  }
  babelHelpers.createClass(_class2, [{
    key: foo,
    get: function get() {
      return 0;
    }
  }]);
  return _class2;
}())().foo).toBe(0);
expect(new ( /*#__PURE__*/function () {
  "use strict";

  function _class3() {
    babelHelpers.classCallCheck(this, _class3);
  }
  babelHelpers.createClass(_class3, [{
    key: foo,
    set: function set(v) {
      return v;
    }
  }]);
  return _class3;
}())().foo = 0).toBe(0);
var arrayLike = {
  [Symbol.toPrimitive]: () => []
};
expect(() => new ( /*#__PURE__*/function () {
  "use strict";

  function _class4() {
    babelHelpers.classCallCheck(this, _class4);
  }
  babelHelpers.createClass(_class4, [{
    key: arrayLike,
    value: function value() {
      return 0;
    }
  }]);
  return _class4;
}())()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => new ( /*#__PURE__*/function () {
  "use strict";

  function _class5() {
    babelHelpers.classCallCheck(this, _class5);
  }
  babelHelpers.createClass(_class5, [{
    key: arrayLike,
    get: function get() {
      return 0;
    }
  }]);
  return _class5;
}())()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => new ( /*#__PURE__*/function () {
  "use strict";

  function _class6() {
    babelHelpers.classCallCheck(this, _class6);
  }
  babelHelpers.createClass(_class6, [{
    key: arrayLike,
    set: function set(v) {
      return v;
    }
  }]);
  return _class6;
}())()).toThrow("@@toPrimitive must return a primitive value.");
