var _getStatus = Symbol("getStatus");
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
    const fakeGetStatus = babelHelpers.classPrivateFieldGetLoose(this, _getStatus);
    return function () {
      return fakeGetStatus.call({
        status: fakeStatus
      });
    };
  }
  getFakeStatusFunc() {
    return {
      status: 'fake-status',
      getFakeStatus: babelHelpers.classPrivateFieldGetLoose(this, _getStatus)
    };
  }
}
function _getStatus2() {
  return this.status;
}
