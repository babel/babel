var Foo =
/*#__PURE__*/
function () {
  "use strict";

  function Foo(status) {
    babelHelpers.classCallCheck(this, Foo);
    Object.defineProperty(this, _getStatus, {
      writable: false,
      value: _getStatus2
    });
    this.status = status;
  }

  babelHelpers.createClass(Foo, [{
    key: "getCurrentStatus",
    value: function getCurrentStatus() {
      return babelHelpers.classPrivateFieldLooseBase(this, _getStatus)[_getStatus]();
    }
  }, {
    key: "setCurrentStatus",
    value: function setCurrentStatus(newStatus) {
      this.status = newStatus;
    }
  }, {
    key: "getFakeStatus",
    value: function getFakeStatus(fakeStatus) {
      var fakeGetStatus = babelHelpers.classPrivateFieldLooseBase(this, _getStatus)[_getStatus];

      return function () {
        return fakeGetStatus.call({
          status: fakeStatus
        });
      };
    }
  }, {
    key: "getFakeStatusFunc",
    value: function getFakeStatusFunc() {
      return {
        status: 'fake-status',
        getFakeStatus: babelHelpers.classPrivateFieldLooseBase(this, _getStatus)[_getStatus]
      };
    }
  }]);
  return Foo;
}();

var _getStatus = babelHelpers.classPrivateFieldLooseKey("getStatus");

var _getStatus2 = function _getStatus2() {
  return this.status;
};
