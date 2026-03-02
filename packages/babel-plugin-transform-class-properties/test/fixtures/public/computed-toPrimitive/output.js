var _Class;
var foo = {
  [Symbol.toPrimitive]: () => "foo"
};
expect((_Class = /*#__PURE__*/babelHelpers.createClass(function _Class() {
  "use strict";

  babelHelpers.classCallCheck(this, _Class);
}), babelHelpers.defineProperty(_Class, foo, 0), _Class).foo).toBe(0);
expect(/*#__PURE__*/function () {
  "use strict";

  function _class() {
    babelHelpers.classCallCheck(this, _class);
  }
  return babelHelpers.createClass(_class, null, [{
    key: foo,
    value: function () {
      return 0;
    }
  }]);
}().foo()).toBe(0);
expect(/*#__PURE__*/function () {
  "use strict";

  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
  }
  return babelHelpers.createClass(_class2, null, [{
    key: foo,
    get: function () {
      return 0;
    }
  }]);
}().foo).toBe(0);
expect(/*#__PURE__*/function () {
  "use strict";

  function _class3() {
    babelHelpers.classCallCheck(this, _class3);
  }
  return babelHelpers.createClass(_class3, null, [{
    key: foo,
    set: function (v) {
      return v;
    }
  }]);
}().foo = 0).toBe(0);
expect(new (/*#__PURE__*/babelHelpers.createClass(function _class4() {
  "use strict";

  babelHelpers.classCallCheck(this, _class4);
  babelHelpers.defineProperty(this, foo, 0);
}))().foo).toBe(0);
var arrayLike = {
  [Symbol.toPrimitive]: () => []
};
expect(() => {
  var _Class3;
  return _Class3 = /*#__PURE__*/babelHelpers.createClass(function _Class3() {
    "use strict";

    babelHelpers.classCallCheck(this, _Class3);
  }), babelHelpers.defineProperty(_Class3, arrayLike, 0), _Class3;
}).toThrow("@@toPrimitive must return a primitive value.");
expect(() => /*#__PURE__*/function () {
  "use strict";

  function _class5() {
    babelHelpers.classCallCheck(this, _class5);
  }
  return babelHelpers.createClass(_class5, null, [{
    key: arrayLike,
    value: function () {
      return 0;
    }
  }]);
}()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => /*#__PURE__*/function () {
  "use strict";

  function _class6() {
    babelHelpers.classCallCheck(this, _class6);
  }
  return babelHelpers.createClass(_class6, null, [{
    key: arrayLike,
    get: function () {
      return 0;
    }
  }]);
}()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => /*#__PURE__*/function () {
  "use strict";

  function _class7() {
    babelHelpers.classCallCheck(this, _class7);
  }
  return babelHelpers.createClass(_class7, null, [{
    key: arrayLike,
    set: function (v) {
      return v;
    }
  }]);
}()).toThrow("@@toPrimitive must return a primitive value.");
expect(() => new (/*#__PURE__*/babelHelpers.createClass(function _class8() {
  "use strict";

  babelHelpers.classCallCheck(this, _class8);
  babelHelpers.defineProperty(this, arrayLike, 0);
}))()).toThrow("@@toPrimitive must return a primitive value.");
