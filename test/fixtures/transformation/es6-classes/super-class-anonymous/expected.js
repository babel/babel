"use strict";

var TestEmpty = (function (_ref) {
    var _TestEmpty = function TestEmpty() {
        babelHelpers.classCallCheck(this, _TestEmpty);

        if (_ref != null) {
            _ref.apply(this, arguments);
        }
    };

    babelHelpers.inherits(_TestEmpty, _ref);
    return _TestEmpty;
})((function () {
    var _class = function () {
        babelHelpers.classCallCheck(this, _class);
    };

    return _class;
})());

var TestConstructorOnly = (function (_ref2) {
    var _TestConstructorOnly = function TestConstructorOnly() {
        babelHelpers.classCallCheck(this, _TestConstructorOnly);

        if (_ref2 != null) {
            _ref2.apply(this, arguments);
        }
    };

    babelHelpers.inherits(_TestConstructorOnly, _ref2);
    return _TestConstructorOnly;
})((function () {
    var _class2 = function () {
        babelHelpers.classCallCheck(this, _class2);
    };

    return _class2;
})());

var TestMethodOnly = (function (_ref3) {
    var _TestMethodOnly = function TestMethodOnly() {
        babelHelpers.classCallCheck(this, _TestMethodOnly);

        if (_ref3 != null) {
            _ref3.apply(this, arguments);
        }
    };

    babelHelpers.inherits(_TestMethodOnly, _ref3);
    return _TestMethodOnly;
})((function () {
    var _class3 = function () {
        babelHelpers.classCallCheck(this, _class3);
    };

    babelHelpers.createClass(_class3, {
        method: {
            value: function method() {}
        }
    });
    return _class3;
})());

var TestConstructorAndMethod = (function (_ref4) {
    var _TestConstructorAndMethod = function TestConstructorAndMethod() {
        babelHelpers.classCallCheck(this, _TestConstructorAndMethod);

        if (_ref4 != null) {
            _ref4.apply(this, arguments);
        }
    };

    babelHelpers.inherits(_TestConstructorAndMethod, _ref4);
    return _TestConstructorAndMethod;
})((function () {
    var _class4 = function () {
        babelHelpers.classCallCheck(this, _class4);
    };

    babelHelpers.createClass(_class4, {
        method: {
            value: function method() {}
        }
    });
    return _class4;
})());

var TestMultipleMethods = (function (_ref5) {
    var _TestMultipleMethods = function TestMultipleMethods() {
        babelHelpers.classCallCheck(this, _TestMultipleMethods);

        if (_ref5 != null) {
            _ref5.apply(this, arguments);
        }
    };

    babelHelpers.inherits(_TestMultipleMethods, _ref5);
    return _TestMultipleMethods;
})((function () {
    var _class5 = function () {
        babelHelpers.classCallCheck(this, _class5);
    };

    babelHelpers.createClass(_class5, {
        m1: {
            value: function m1() {}
        },
        m2: {
            value: function m2() {}
        }
    });
    return _class5;
})());