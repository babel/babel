var _Foo_brand = /*#__PURE__*/Symbol("getStatus");
class Foo {
  constructor(status) {
    Object.defineProperty(this, _Foo_brand, {
      value: _getStatus
    });
    this.status = status;
  }
  getCurrentStatus() {
    return babelHelpers.classPrivateFieldLooseBase(this, _Foo_brand)[_Foo_brand]();
  }
  setCurrentStatus(newStatus) {
    this.status = newStatus;
  }
  getFakeStatus(fakeStatus) {
    const fakeGetStatus = babelHelpers.classPrivateFieldLooseBase(this, _Foo_brand)[_Foo_brand];
    return function () {
      return fakeGetStatus.call({
        status: fakeStatus
      });
    };
  }
  getFakeStatusFunc() {
    return {
      status: 'fake-status',
      getFakeStatus: babelHelpers.classPrivateFieldLooseBase(this, _Foo_brand)[_Foo_brand]
    };
  }
}
function _getStatus() {
  return this.status;
}
