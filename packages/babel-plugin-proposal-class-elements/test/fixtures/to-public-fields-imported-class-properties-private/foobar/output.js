var _scopedFunctionWithThis = /*#__PURE__*/new WeakMap();

class Child extends Parent {
  constructor() {
    super();

    _scopedFunctionWithThis.set(this, () => {
      this.name = {};
    });
  }

}
