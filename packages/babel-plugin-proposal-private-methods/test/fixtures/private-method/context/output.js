var Foo =
/*#__PURE__*/
function () {
  "use strict";

  function Foo(status) {
    babelHelpers.classCallCheck(this, Foo);

    _getStatus.add(this);

    this.status = status;
  }

  babelHelpers.createClass(Foo, [{
    key: "getCurrentStatus",
    value: function getCurrentStatus() {
      return babelHelpers.classPrivateMethodGet(this, _getStatus, _getStatus2).call(this);
    }
  }, {
    key: "setCurrentStatus",
    value: function setCurrentStatus(newStatus) {
      this.status = newStatus;
    }
  }, {
    key: "getFakeStatus",
    value: function getFakeStatus(fakeStatus) {
      var fakeGetStatus = babelHelpers.classPrivateMethodGet(this, _getStatus, _getStatus2);
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
        getFakeStatus: babelHelpers.classPrivateMethodGet(this, _getStatus, _getStatus2)
      };
    }
  }]);
  return Foo;
}();

var _getStatus = new WeakSet();

var _getStatus2 = function _getStatus2() {
  return this.status;
};
