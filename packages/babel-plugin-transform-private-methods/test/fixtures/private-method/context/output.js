var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor(status) {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    this.status = status;
  }
  getCurrentStatus() {
    return babelHelpers.assertClassBrand(_Foo_brand, this, _getStatus).call(this);
  }
  setCurrentStatus(newStatus) {
    this.status = newStatus;
  }
  getFakeStatus(fakeStatus) {
    var fakeGetStatus = babelHelpers.assertClassBrand(_Foo_brand, this, _getStatus);
    return function () {
      return fakeGetStatus.call({
        status: fakeStatus
      });
    };
  }
  getFakeStatusFunc() {
    return {
      status: 'fake-status',
      getFakeStatus: babelHelpers.assertClassBrand(_Foo_brand, this, _getStatus)
    };
  }
}
function _getStatus() {
  return this.status;
}
