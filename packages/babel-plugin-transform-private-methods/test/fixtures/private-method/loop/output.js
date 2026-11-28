for (const i of [1, 2]) {
  let _C_brand = /*#__PURE__*/new WeakSet(),
    _C;
  class C {
    constructor() {
      babelHelpers.classPrivateMethodInitSpec(this, _C_brand);
    }
  }
  _C = C;
  function _m() {
    return [_C, i];
  }
}
for (const i of [1, 2]) {
  let _C_brand2 = /*#__PURE__*/new WeakSet(),
    _Class_brand = /*#__PURE__*/new WeakSet();
  switch (i) {
    default:
      class C {
        constructor() {
          babelHelpers.classPrivateMethodInitSpec(this, _C_brand2);
        }
      }
      function _m2() {}
  }
  switch (i) {
    default:
      {
        let _C_brand3 = /*#__PURE__*/new WeakSet();
        class C {
          constructor() {
            babelHelpers.classPrivateMethodInitSpec(this, _C_brand3);
          }
        }
        function _m3() {}
      }
  }
  for (const C of [class {
    constructor() {
      babelHelpers.classPrivateMethodInitSpec(this, _Class_brand);
    }
  }]);
  function _m4() {}
}
for (const i of [1, 2]) {
  let _Class2_brand = /*#__PURE__*/new WeakSet(),
    _x = /*#__PURE__*/new WeakMap(),
    _y;
  try {} catch ({
    C = class {
      constructor() {
        babelHelpers.classPrivateMethodInitSpec(this, _Class2_brand);
      }
    }
  }) {}
  function _m5() {}
  17;
  class D {
    constructor() {
      babelHelpers.classPrivateFieldInitSpec(this, _x, void 0);
    }
  }
  _y = {
    _: 1
  };
}
