var _initProto, _initStatic, _initClass, _init_a, _init_d, _init_e, _call_f, _call_g, _call_g2, _init_h, _get_h, _set_h, _init_i, _init_m, _init_n, _call_o, _call_p, _call_q, _init_r, _get_r, _set_r;
const dec = () => {};
let _Class;
new class extends babelHelpers.identity {
  static {
    class Class {
      static {
        [_init_m, _call_o, _call_p, _call_q, _init_r, _get_r, _set_r, _init_d, _call_f, _call_g, _call_g2, _init_h, _get_h, _set_h, _init_i, _init_n, _init_a, _init_e, _initProto, _initStatic, _Class, _initClass] = babelHelpers.applyDecs(this, [[dec, 7, "j"], [dec, 8, "k"], [dec, 9, "l"], [dec, 6, "m"], [dec, 7, "o", function () {}], [dec, 8, "p", function () {}], [dec, 9, "q", function (v) {}], [dec, 6, "r", function () {
          return this.#D;
        }, function (value) {
          this.#D = value;
        }], [dec, 2, "b"], [dec, 3, "c"], [dec, 4, "c"], [dec, 1, "d"], [dec, 2, "f", function () {}], [dec, 3, "g", function () {}], [dec, 4, "g", function (v) {}], [dec, 1, "h", function () {
          return this.#B;
        }, function (value) {
          this.#B = value;
        }], [dec, 5, "i"], [dec, 5, "n", function () {
          return this.#n;
        }, function (value) {
          this.#n = value;
        }], [dec, 0, "a"], [dec, 0, "e", function () {
          return this.#e;
        }, function (value) {
          this.#e = value;
        }]], [dec]);
        _initStatic(this);
      }
      #f = _call_f;
      a = (_initProto(this), _init_a(this));
      b() {}
      get c() {}
      set c(v) {}
      #A = _init_d(this);
      get d() {
        return this.#A;
      }
      set d(v) {
        this.#A = v;
      }
      #e = _init_e(this);
      get #g() {
        return _call_g(this);
      }
      set #g(v) {
        _call_g2(this, v);
      }
      #B = _init_h(this);
      set #h(v) {
        _set_h(this, v);
      }
      get #h() {
        return _get_h(this);
      }
      static j() {}
      static get k() {}
      static set l(v) {}
      static get m() {
        return this.#C;
      }
      static set m(v) {
        this.#C = v;
      }
      set #r(v) {
        _set_r(this, v);
      }
      get #r() {
        return _get_r(this);
      }
    }
  }
  #o = _call_o;
  i = _init_i(this);
  #C = _init_m(this);
  #n = _init_n(this);
  get #p() {
    return _call_p(this);
  }
  set #q(v) {
    _call_q(this, v);
  }
  #D = _init_r(this);
  constructor() {
    super(_Class), _initClass();
  }
}();
