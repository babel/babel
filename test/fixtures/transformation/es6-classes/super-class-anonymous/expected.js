"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var TestEmpty = (function (_ref) {
    function TestEmpty() {
        _classCallCheck(this, TestEmpty);

        if (_ref != null) {
            _ref.apply(this, arguments);
        }
    }

    _inherits(TestEmpty, _ref);

    return TestEmpty;
})(function _class() {
    _classCallCheck(this, _class);
});

var TestConstructorOnly = (function (_ref2) {
    function TestConstructorOnly() {
        _classCallCheck(this, TestConstructorOnly);

        if (_ref2 != null) {
            _ref2.apply(this, arguments);
        }
    }

    _inherits(TestConstructorOnly, _ref2);

    return TestConstructorOnly;
})(function _class2() {
    _classCallCheck(this, _class2);
});

var TestMethodOnly = (function (_ref3) {
    function TestMethodOnly() {
        _classCallCheck(this, TestMethodOnly);

        if (_ref3 != null) {
            _ref3.apply(this, arguments);
        }
    }

    _inherits(TestMethodOnly, _ref3);

    return TestMethodOnly;
})((function () {
    var _class3 = function () {
        _classCallCheck(this, _class3);
    };

    _prototypeProperties(_class3, null, {
        method: {
            value: function method() {},
            writable: true,
            configurable: true
        }
    });

    return _class3;
})());

var TestConstructorAndMethod = (function (_ref4) {
    function TestConstructorAndMethod() {
        _classCallCheck(this, TestConstructorAndMethod);

        if (_ref4 != null) {
            _ref4.apply(this, arguments);
        }
    }

    _inherits(TestConstructorAndMethod, _ref4);

    return TestConstructorAndMethod;
})((function () {
    var _class4 = function () {
        _classCallCheck(this, _class4);
    };

    _prototypeProperties(_class4, null, {
        method: {
            value: function method() {},
            writable: true,
            configurable: true
        }
    });

    return _class4;
})());

var TestMultipleMethods = (function (_ref5) {
    function TestMultipleMethods() {
        _classCallCheck(this, TestMultipleMethods);

        if (_ref5 != null) {
            _ref5.apply(this, arguments);
        }
    }

    _inherits(TestMultipleMethods, _ref5);

    return TestMultipleMethods;
})((function () {
    var _class5 = function () {
        _classCallCheck(this, _class5);
    };

    _prototypeProperties(_class5, null, {
        m1: {
            value: function m1() {},
            writable: true,
            configurable: true
        },
        m2: {
            value: function m2() {},
            writable: true,
            configurable: true
        }
    });

    return _class5;
})());

