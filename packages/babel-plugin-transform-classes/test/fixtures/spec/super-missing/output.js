var Base = /*#__PURE__*/babelHelpers.createClass(function Base() {
  "use strict";

  babelHelpers.classCallCheck(this, Base);
});
;
expect(() => new (/*#__PURE__*/function (_Base) {
  "use strict";

  function _class() {
    var _this;
    babelHelpers.classCallCheck(this, _class);
    x: {
      break x;
      _this = babelHelpers.callSuper(this, _class);
    }
    return babelHelpers.assertThisInitialized(_this);
  }
  babelHelpers.inherits(_class, _Base);
  return babelHelpers.createClass(_class);
}(Base))()).toThrow();
expect(() => new (/*#__PURE__*/function (_Base2) {
  "use strict";

  function _class2() {
    var _this2;
    babelHelpers.classCallCheck(this, _class2);
    try {} catch {
      _this2 = babelHelpers.callSuper(this, _class2);
    }
    return babelHelpers.assertThisInitialized(_this2);
  }
  babelHelpers.inherits(_class2, _Base2);
  return babelHelpers.createClass(_class2);
}(Base))()).toThrow();
expect(() => new (/*#__PURE__*/function (_Base3) {
  "use strict";

  function _class3() {
    var _this3;
    babelHelpers.classCallCheck(this, _class3);
    try {
      throw 0;
      _this3 = babelHelpers.callSuper(this, _class3);
    } catch {}
    return babelHelpers.assertThisInitialized(_this3);
  }
  babelHelpers.inherits(_class3, _Base3);
  return babelHelpers.createClass(_class3);
}(Base))()).toThrow();
expect(() => new (/*#__PURE__*/function (_Base4) {
  "use strict";

  function _class4() {
    var _this4;
    babelHelpers.classCallCheck(this, _class4);
    true || (_this4 = babelHelpers.callSuper(this, _class4));
    return babelHelpers.assertThisInitialized(_this4);
  }
  babelHelpers.inherits(_class4, _Base4);
  return babelHelpers.createClass(_class4);
}(Base))()).toThrow();
expect(() => new (/*#__PURE__*/function (_Base5) {
  "use strict";

  function _class5() {
    var _this5;
    babelHelpers.classCallCheck(this, _class5);
    ({}) ?? (_this5 = babelHelpers.callSuper(this, _class5));
    return babelHelpers.assertThisInitialized(_this5);
  }
  babelHelpers.inherits(_class5, _Base5);
  return babelHelpers.createClass(_class5);
}(Base))()).toThrow();
expect(() => new (/*#__PURE__*/function (_Base6) {
  "use strict";

  function _class6() {
    var _this6;
    babelHelpers.classCallCheck(this, _class6);
    false && (_this6 = babelHelpers.callSuper(this, _class6));
    return babelHelpers.assertThisInitialized(_this6);
  }
  babelHelpers.inherits(_class6, _Base6);
  return babelHelpers.createClass(_class6);
}(Base))()).toThrow();
expect(() => new (/*#__PURE__*/function (_Base7) {
  "use strict";

  function _class7() {
    var _this7;
    babelHelpers.classCallCheck(this, _class7);
    null?.(_this7 = babelHelpers.callSuper(this, _class7));
    return babelHelpers.assertThisInitialized(_this7);
  }
  babelHelpers.inherits(_class7, _Base7);
  return babelHelpers.createClass(_class7);
}(Base))()).toThrow();
expect(() => new (/*#__PURE__*/function (_Base8) {
  "use strict";

  function _class8() {
    var _this8;
    babelHelpers.classCallCheck(this, _class8);
    null?.[_this8 = babelHelpers.callSuper(this, _class8)];
    return babelHelpers.assertThisInitialized(_this8);
  }
  babelHelpers.inherits(_class8, _Base8);
  return babelHelpers.createClass(_class8);
}(Base))()).toThrow();
