var _class;
var foo = {
  [Symbol.toPrimitive]: () => "foo"
};
expect((_class = /*#__PURE__*/babelHelpers.createClass(function _class() {
  "use strict";

  babelHelpers.classCallCheck(this, _class);
}), babelHelpers.defineProperty(_class, foo, 0), _class).foo).toBe(0);
expect( /*#__PURE__*/function () {
  "use strict";

  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
  }
  babelHelpers.createClass(_class2, null, [{
    key: foo,
    value: function () {
      return 0;
    }
  }]);
  return _class2;
}().foo()).toBe(0);
expect( /*#__PURE__*/function () {
  "use strict";

  function _class3() {
    babelHelpers.classCallCheck(this, _class3);
  }
  babelHelpers.createClass(_class3, null, [{
    key: foo,
    get: function () {
      return 0;
    }
  }]);
  return _class3;
}().foo).toBe(0);
expect( /*#__PURE__*/function () {
  "use strict";

  function _class4() {
    babelHelpers.classCallCheck(this, _class4);
  }
  babelHelpers.createClass(_class4, null, [{
    key: foo,
    set: function (v) {
      return v;
    }
  }]);
  return _class4;
}().foo = 0).toBe(0);
expect(new ( /*#__PURE__*/function () {
  "use strict";

  function _class6() {
    babelHelpers.classCallCheck(this, _class6);
    babelHelpers.defineProperty(this, foo, 0);
  }
  return babelHelpers.createClass(_class6);
}())().foo).toBe(0);
var arrayLike = {
  [Symbol.toPrimitive]: () => []
};
expect(() => {
  var _class7;
  return _class7 = /*#__PURE__*/babelHelpers.createClass(function _class7() {
    "use strict";

    babelHelpers.classCallCheck(this, _class7);
  }), babelHelpers.defineProperty(_class7, arrayLike, 0), _class7;
}).toThrow("@@toPrimitive must return a primitive value.");
expect(() => /*#__PURE__*/function () {
  "use strict";

  function _class8() {
    babelHelpers.classCallCheck(this, _class8);
  }
  babelHelpers.createClass(_class8, null, [{
    key: arrayLike,
    value: function () {
      return 0;
    }
  }]);
  return _class8;
}()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => /*#__PURE__*/function () {
  "use strict";

  function _class9() {
    babelHelpers.classCallCheck(this, _class9);
  }
  babelHelpers.createClass(_class9, null, [{
    key: arrayLike,
    get: function () {
      return 0;
    }
  }]);
  return _class9;
}()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => /*#__PURE__*/function () {
  "use strict";

  function _class10() {
    babelHelpers.classCallCheck(this, _class10);
  }
  babelHelpers.createClass(_class10, null, [{
    key: arrayLike,
    set: function (v) {
      return v;
    }
  }]);
  return _class10;
}()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => new ( /*#__PURE__*/function () {
  "use strict";

  function _class12() {
    babelHelpers.classCallCheck(this, _class12);
    babelHelpers.defineProperty(this, arrayLike, 0);
  }
  return babelHelpers.createClass(_class12);
}())()).toThrow("@@toPrimitive must return a primitive value.");
