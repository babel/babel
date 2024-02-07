var _i_f = /*#__PURE__*/new WeakMap();
var _i_m = /*#__PURE__*/new WeakSet();
var _i_g = /*#__PURE__*/new WeakMap();
var _i_s = /*#__PURE__*/new WeakMap();
var _i_gs = /*#__PURE__*/new WeakMap();
// @force-old-private-helpers

class A {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _i_gs, {
      get: _get_i_gs,
      set: _set_i_gs
    });
    babelHelpers.classPrivateFieldInitSpec(this, _i_s, {
      get: void 0,
      set: _set_i_s
    });
    babelHelpers.classPrivateFieldInitSpec(this, _i_g, {
      get: _get_i_g,
      set: void 0
    });
    babelHelpers.classPrivateMethodInitSpec(this, _i_m);
    babelHelpers.classPrivateFieldInitSpec(this, _i_f, {
      writable: true,
      value: 0
    });
  }
  static read() {
    babelHelpers.classStaticPrivateFieldSpecGet(A, A, _s_f);
    babelHelpers.classStaticPrivateMethodGet(A, A, _s_m);
    babelHelpers.classStaticPrivateFieldSpecGet(A, A, _s_g);
    babelHelpers.classStaticPrivateFieldSpecGet(A, A, _s_s);
    babelHelpers.classStaticPrivateFieldSpecGet(A, A, _s_gs);
    const a = new A();
    babelHelpers.classPrivateFieldGet(a, _i_f);
    babelHelpers.classPrivateMethodGet(a, _i_m, _i_m2);
    babelHelpers.classPrivateFieldGet(a, _i_g);
    a, babelHelpers.writeOnlyError("#i_s");
    babelHelpers.classPrivateFieldGet(a, _i_gs);
  }
  static write() {
    babelHelpers.classStaticPrivateFieldSpecSet(A, A, _s_f, 1);
    babelHelpers.classStaticPrivateMethodSet(A, A, _s_m, 2);
    babelHelpers.classStaticPrivateFieldSpecSet(A, A, _s_g, 3);
    babelHelpers.classStaticPrivateFieldSpecSet(A, A, _s_s, 4);
    babelHelpers.classStaticPrivateFieldSpecSet(A, A, _s_gs, 5);
    const a = new A();
    babelHelpers.classPrivateFieldSet(a, _i_f, 6);
    a, 7, babelHelpers.readOnlyError("#i_m");
    a, 8, babelHelpers.readOnlyError("#i_g");
    babelHelpers.classPrivateFieldSet(a, _i_s, 9);
    babelHelpers.classPrivateFieldSet(a, _i_gs, 10);
  }
  static write_destructuring() {
    [babelHelpers.classStaticPrivateFieldDestructureSet(A, A, _s_f).value] = [1];
    [babelHelpers.classStaticPrivateFieldDestructureSet(A, A, _s_m).value] = [2];
    [babelHelpers.classStaticPrivateFieldDestructureSet(A, A, _s_g).value] = [3];
    [babelHelpers.classStaticPrivateFieldDestructureSet(A, A, _s_s).value] = [4];
    [babelHelpers.classStaticPrivateFieldDestructureSet(A, A, _s_gs).value] = [5];
    const a = new A();
    [babelHelpers.classPrivateFieldDestructureSet(a, _i_f).value] = [6];
    [babelHelpers.classPrivateFieldDestructureSet(a, _i_m).value] = [7];
    [babelHelpers.classPrivateFieldDestructureSet(a, _i_g).value] = [8];
    [babelHelpers.classPrivateFieldDestructureSet(a, _i_s).value] = [9];
    [babelHelpers.classPrivateFieldDestructureSet(a, _i_gs).value] = [10];
  }
}
function _s_m() {}
function _get_s_g() {}
function _set_s_s(v) {}
function _get_s_gs() {}
function _set_s_gs(v) {}
function _i_m2() {}
function _get_i_g() {}
function _set_i_s(v) {}
function _get_i_gs() {}
function _set_i_gs(v) {}
var _s_gs = {
  get: _get_s_gs,
  set: _set_s_gs
};
var _s_s = {
  get: void 0,
  set: _set_s_s
};
var _s_g = {
  get: _get_s_g,
  set: void 0
};
var _s_f = {
  writable: true,
  value: 0
};
