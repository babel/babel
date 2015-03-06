"use strict";

var TestEmpty = (function (_ref) {
    function TestEmpty() {
        babelHelpers.classCallCheck(this, TestEmpty);

        if (_ref != null) {
            _ref.apply(this, arguments);
        }
    }

    babelHelpers.inherits(TestEmpty, _ref);
    return TestEmpty;
})((function () {
    var _class = function () {
        babelHelpers.classCallCheck(this, _class);
    };

    return _class;
})());

var TestConstructorOnly = (function (_ref2) {
    function TestConstructorOnly() {
        babelHelpers.classCallCheck(this, TestConstructorOnly);

        if (_ref2 != null) {
            _ref2.apply(this, arguments);
        }
    }

    babelHelpers.inherits(TestConstructorOnly, _ref2);
    return TestConstructorOnly;
})((function () {
    var _class2 = function () {
        babelHelpers.classCallCheck(this, _class2);
    };

    return _class2;
})());

var TestMethodOnly = (function (_ref3) {
    function TestMethodOnly() {
        babelHelpers.classCallCheck(this, TestMethodOnly);

        if (_ref3 != null) {
            _ref3.apply(this, arguments);
        }
    }

    babelHelpers.inherits(TestMethodOnly, _ref3);
    return TestMethodOnly;
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
    function TestConstructorAndMethod() {
        babelHelpers.classCallCheck(this, TestConstructorAndMethod);

        if (_ref4 != null) {
            _ref4.apply(this, arguments);
        }
    }

    babelHelpers.inherits(TestConstructorAndMethod, _ref4);
    return TestConstructorAndMethod;
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
    function TestMultipleMethods() {
        babelHelpers.classCallCheck(this, TestMultipleMethods);

        if (_ref5 != null) {
            _ref5.apply(this, arguments);
        }
    }

    babelHelpers.inherits(TestMultipleMethods, _ref5);
    return TestMultipleMethods;
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