var _getStatus = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("getStatus");
class Foo {
  constructor(status) {
    Object.defineProperty(this, _getStatus, {
      value: _getStatus2
    });
    this.status = status;
  }
  getCurrentStatus() {
    return this[_getStatus]();
  }
  setCurrentStatus(newStatus) {
    this.status = newStatus;
  }
  getFakeStatus(fakeStatus) {
    var fakeGetStatus = babelHelpers.assertClassBrandLoose(this, _getStatus, 1);
    return function () {
      return fakeGetStatus.call({
        status: fakeStatus
      });
    };
  }
  getFakeStatusFunc() {
    return {
      status: 'fake-status',
      getFakeStatus: babelHelpers.assertClassBrandLoose(this, _getStatus, 1)
    };
  }
}
function _getStatus2() {
  return this.status;
}
