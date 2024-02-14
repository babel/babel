var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor(status) {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    this.status = status;
  }
  getCurrentStatus() {
    return babelHelpers.classPrivateMethodGet(this, _Foo_brand, _getStatus).call(this);
  }
  setCurrentStatus(newStatus) {
    this.status = newStatus;
  }
  getFakeStatus(fakeStatus) {
    var fakeGetStatus = babelHelpers.classPrivateMethodGet(this, _Foo_brand, _getStatus);
    return function () {
      return fakeGetStatus.call({
        status: fakeStatus
      });
    };
  }
  getFakeStatusFunc() {
    return {
      status: 'fake-status',
      getFakeStatus: babelHelpers.classPrivateMethodGet(this, _Foo_brand, _getStatus)
    };
  }
}
function _getStatus() {
  return this.status;
}
