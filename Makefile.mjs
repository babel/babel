// source hash: 3736094404add1f3f1554d0b49c427d6e05d83f5
/* eslint-disable */
// prettier-ignore
import e from"os";
import t, {
  writeFileSync as r,
  readFileSync as n,
  readdirSync as o,
  existsSync as i,
  mkdirSync as s,
} from "fs";
import a from "path";
import c from "events";
import l from "assert";
import u from "util";
import f from "child_process";
import { fileURLToPath as p } from "node:url";
import {
  ChildProcess as d,
  spawnSync as h,
  spawn as m,
} from "node:child_process";
import { StringDecoder as g } from "node:string_decoder";
import {
  debuglog as y,
  stripVTControlCharacters as b,
  inspect as v,
  promisify as w,
  callbackify as E,
  aborted as S,
} from "node:util";
import O, {
  platform as I,
  hrtime as T,
  execPath as j,
  execArgv as x,
} from "node:process";
import {
  writeFileSync as R,
  statSync as A,
  readFileSync as D,
  appendFileSync as N,
  createReadStream as L,
  createWriteStream as k,
} from "node:fs";
import C from "node:tty";
import P, { resolve as M, basename as _ } from "node:path";
import {
  setTimeout as $,
  scheduler as B,
  setImmediate as F,
} from "node:timers/promises";
import { constants as U } from "node:os";
import {
  once as G,
  addAbortListener as W,
  EventEmitter as z,
  on as V,
  setMaxListeners as H,
} from "node:events";
import { serialize as X } from "node:v8";
import {
  Transform as q,
  getDefaultHighWaterMark as K,
  PassThrough as Y,
  Readable as Q,
  Writable as J,
  Duplex as Z,
} from "node:stream";
import { Buffer as ee } from "node:buffer";
import { finished as te } from "node:stream/promises";
var re =
  "undefined" != typeof globalThis
    ? globalThis
    : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
          ? self
          : {};
function ne(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var oe = function (e) {
    return e && e.Math === Math && e;
  },
  ie =
    oe("object" == typeof globalThis && globalThis) ||
    oe("object" == typeof window && window) ||
    oe("object" == typeof self && self) ||
    oe("object" == typeof re && re) ||
    oe("object" == typeof re && re) ||
    (function () {
      return this;
    })() ||
    Function("return this")(),
  se = {},
  ae = function (e) {
    try {
      return !!e();
    } catch (e) {
      return !0;
    }
  },
  ce = !ae(function () {
    return (
      7 !==
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        },
      })[1]
    );
  }),
  le = !ae(function () {
    var e = function () {}.bind();
    return "function" != typeof e || e.hasOwnProperty("prototype");
  }),
  ue = le,
  fe = Function.prototype.call,
  pe = ue
    ? fe.bind(fe)
    : function () {
        return fe.apply(fe, arguments);
      },
  de = {},
  he = {}.propertyIsEnumerable,
  me = Object.getOwnPropertyDescriptor,
  ge = me && !he.call({ 1: 2 }, 1);
de.f = ge
  ? function (e) {
      var t = me(this, e);
      return !!t && t.enumerable;
    }
  : he;
var ye,
  be,
  ve = function (e, t) {
    return {
      enumerable: !(1 & e),
      configurable: !(2 & e),
      writable: !(4 & e),
      value: t,
    };
  },
  we = le,
  Ee = Function.prototype,
  Se = Ee.call,
  Oe = we && Ee.bind.bind(Se, Se),
  Ie = we
    ? Oe
    : function (e) {
        return function () {
          return Se.apply(e, arguments);
        };
      },
  Te = Ie,
  je = Te({}.toString),
  xe = Te("".slice),
  Re = function (e) {
    return xe(je(e), 8, -1);
  },
  Ae = ae,
  De = Re,
  Ne = Object,
  Le = Ie("".split),
  ke = Ae(function () {
    return !Ne("z").propertyIsEnumerable(0);
  })
    ? function (e) {
        return "String" === De(e) ? Le(e, "") : Ne(e);
      }
    : Ne,
  Ce = function (e) {
    return null == e;
  },
  Pe = Ce,
  Me = TypeError,
  _e = function (e) {
    if (Pe(e)) throw new Me("Can't call method on " + e);
    return e;
  },
  $e = ke,
  Be = _e,
  Fe = function (e) {
    return $e(Be(e));
  },
  Ue = "object" == typeof document && document.all,
  Ge =
    void 0 === Ue && void 0 !== Ue
      ? function (e) {
          return "function" == typeof e || e === Ue;
        }
      : function (e) {
          return "function" == typeof e;
        },
  We = Ge,
  ze = function (e) {
    return "object" == typeof e ? null !== e : We(e);
  },
  Ve = ie,
  He = Ge,
  Xe = function (e, t) {
    return arguments.length < 2
      ? ((r = Ve[e]), He(r) ? r : void 0)
      : Ve[e] && Ve[e][t];
    var r;
  },
  qe = Ie({}.isPrototypeOf),
  Ke = ie,
  Ye = ("undefined" != typeof navigator && String(navigator.userAgent)) || "",
  Qe = Ke.process,
  Je = Ke.Deno,
  Ze = (Qe && Qe.versions) || (Je && Je.version),
  et = Ze && Ze.v8;
et && (be = (ye = et.split("."))[0] > 0 && ye[0] < 4 ? 1 : +(ye[0] + ye[1])),
  !be &&
    Ye &&
    (!(ye = Ye.match(/Edge\/(\d+)/)) || ye[1] >= 74) &&
    (ye = Ye.match(/Chrome\/(\d+)/)) &&
    (be = +ye[1]);
var tt = be,
  rt = tt,
  nt = ae,
  ot = ie.String,
  it =
    !!Object.getOwnPropertySymbols &&
    !nt(function () {
      var e = Symbol("symbol detection");
      return (
        !ot(e) ||
        !(Object(e) instanceof Symbol) ||
        (!Symbol.sham && rt && rt < 41)
      );
    }),
  st = it && !Symbol.sham && "symbol" == typeof Symbol.iterator,
  at = Xe,
  ct = Ge,
  lt = qe,
  ut = Object,
  ft = st
    ? function (e) {
        return "symbol" == typeof e;
      }
    : function (e) {
        var t = at("Symbol");
        return ct(t) && lt(t.prototype, ut(e));
      },
  pt = String,
  dt = function (e) {
    try {
      return pt(e);
    } catch (e) {
      return "Object";
    }
  },
  ht = Ge,
  mt = dt,
  gt = TypeError,
  yt = function (e) {
    if (ht(e)) return e;
    throw new gt(mt(e) + " is not a function");
  },
  bt = yt,
  vt = Ce,
  wt = function (e, t) {
    var r = e[t];
    return vt(r) ? void 0 : bt(r);
  },
  Et = pe,
  St = Ge,
  Ot = ze,
  It = TypeError,
  Tt = { exports: {} },
  jt = ie,
  xt = Object.defineProperty,
  Rt = function (e, t) {
    try {
      xt(jt, e, { value: t, configurable: !0, writable: !0 });
    } catch (r) {
      jt[e] = t;
    }
    return t;
  },
  At = ie,
  Dt = Rt,
  Nt = "__core-js_shared__",
  Lt = (Tt.exports = At[Nt] || Dt(Nt, {}));
(Lt.versions || (Lt.versions = [])).push({
  version: "3.36.1",
  mode: "global",
  copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.36.1/LICENSE",
  source: "https://github.com/zloirock/core-js",
});
var kt = Tt.exports,
  Ct = kt,
  Pt = function (e, t) {
    return Ct[e] || (Ct[e] = t || {});
  },
  Mt = _e,
  _t = Object,
  $t = function (e) {
    return _t(Mt(e));
  },
  Bt = $t,
  Ft = Ie({}.hasOwnProperty),
  Ut =
    Object.hasOwn ||
    function (e, t) {
      return Ft(Bt(e), t);
    },
  Gt = Ie,
  Wt = 0,
  zt = Math.random(),
  Vt = Gt((1).toString),
  Ht = function (e) {
    return "Symbol(" + (void 0 === e ? "" : e) + ")_" + Vt(++Wt + zt, 36);
  },
  Xt = Pt,
  qt = Ut,
  Kt = Ht,
  Yt = it,
  Qt = st,
  Jt = ie.Symbol,
  Zt = Xt("wks"),
  er = Qt ? Jt.for || Jt : (Jt && Jt.withoutSetter) || Kt,
  tr = function (e) {
    return (
      qt(Zt, e) || (Zt[e] = Yt && qt(Jt, e) ? Jt[e] : er("Symbol." + e)), Zt[e]
    );
  },
  rr = pe,
  nr = ze,
  or = ft,
  ir = wt,
  sr = function (e, t) {
    var r, n;
    if ("string" === t && St((r = e.toString)) && !Ot((n = Et(r, e)))) return n;
    if (St((r = e.valueOf)) && !Ot((n = Et(r, e)))) return n;
    if ("string" !== t && St((r = e.toString)) && !Ot((n = Et(r, e)))) return n;
    throw new It("Can't convert object to primitive value");
  },
  ar = TypeError,
  cr = tr("toPrimitive"),
  lr = function (e, t) {
    if (!nr(e) || or(e)) return e;
    var r,
      n = ir(e, cr);
    if (n) {
      if ((void 0 === t && (t = "default"), (r = rr(n, e, t)), !nr(r) || or(r)))
        return r;
      throw new ar("Can't convert object to primitive value");
    }
    return void 0 === t && (t = "number"), sr(e, t);
  },
  ur = lr,
  fr = ft,
  pr = function (e) {
    var t = ur(e, "string");
    return fr(t) ? t : t + "";
  },
  dr = ze,
  hr = ie.document,
  mr = dr(hr) && dr(hr.createElement),
  gr = function (e) {
    return mr ? hr.createElement(e) : {};
  },
  yr = gr,
  br =
    !ce &&
    !ae(function () {
      return (
        7 !==
        Object.defineProperty(yr("div"), "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    }),
  vr = ce,
  wr = pe,
  Er = de,
  Sr = ve,
  Or = Fe,
  Ir = pr,
  Tr = Ut,
  jr = br,
  xr = Object.getOwnPropertyDescriptor;
se.f = vr
  ? xr
  : function (e, t) {
      if (((e = Or(e)), (t = Ir(t)), jr))
        try {
          return xr(e, t);
        } catch (e) {}
      if (Tr(e, t)) return Sr(!wr(Er.f, e, t), e[t]);
    };
var Rr = {},
  Ar =
    ce &&
    ae(function () {
      return (
        42 !==
        Object.defineProperty(function () {}, "prototype", {
          value: 42,
          writable: !1,
        }).prototype
      );
    }),
  Dr = ze,
  Nr = String,
  Lr = TypeError,
  kr = function (e) {
    if (Dr(e)) return e;
    throw new Lr(Nr(e) + " is not an object");
  },
  Cr = ce,
  Pr = br,
  Mr = Ar,
  _r = kr,
  $r = pr,
  Br = TypeError,
  Fr = Object.defineProperty,
  Ur = Object.getOwnPropertyDescriptor,
  Gr = "enumerable",
  Wr = "configurable",
  zr = "writable";
Rr.f = Cr
  ? Mr
    ? function (e, t, r) {
        if (
          (_r(e),
          (t = $r(t)),
          _r(r),
          "function" == typeof e &&
            "prototype" === t &&
            "value" in r &&
            zr in r &&
            !r[zr])
        ) {
          var n = Ur(e, t);
          n &&
            n[zr] &&
            ((e[t] = r.value),
            (r = {
              configurable: Wr in r ? r[Wr] : n[Wr],
              enumerable: Gr in r ? r[Gr] : n[Gr],
              writable: !1,
            }));
        }
        return Fr(e, t, r);
      }
    : Fr
  : function (e, t, r) {
      if ((_r(e), (t = $r(t)), _r(r), Pr))
        try {
          return Fr(e, t, r);
        } catch (e) {}
      if ("get" in r || "set" in r) throw new Br("Accessors not supported");
      return "value" in r && (e[t] = r.value), e;
    };
var Vr = Rr,
  Hr = ve,
  Xr = ce
    ? function (e, t, r) {
        return Vr.f(e, t, Hr(1, r));
      }
    : function (e, t, r) {
        return (e[t] = r), e;
      },
  qr = { exports: {} },
  Kr = ce,
  Yr = Ut,
  Qr = Function.prototype,
  Jr = Kr && Object.getOwnPropertyDescriptor,
  Zr = Yr(Qr, "name"),
  en = {
    EXISTS: Zr,
    PROPER: Zr && "something" === function () {}.name,
    CONFIGURABLE: Zr && (!Kr || (Kr && Jr(Qr, "name").configurable)),
  },
  tn = Ge,
  rn = kt,
  nn = Ie(Function.toString);
tn(rn.inspectSource) ||
  (rn.inspectSource = function (e) {
    return nn(e);
  });
var on,
  sn,
  an,
  cn = rn.inspectSource,
  ln = Ge,
  un = ie.WeakMap,
  fn = ln(un) && /native code/.test(String(un)),
  pn = Ht,
  dn = Pt("keys"),
  hn = function (e) {
    return dn[e] || (dn[e] = pn(e));
  },
  mn = {},
  gn = fn,
  yn = ie,
  bn = ze,
  vn = Xr,
  wn = Ut,
  En = kt,
  Sn = hn,
  On = mn,
  In = "Object already initialized",
  Tn = yn.TypeError,
  jn = yn.WeakMap;
if (gn || En.state) {
  var xn = En.state || (En.state = new jn());
  (xn.get = xn.get),
    (xn.has = xn.has),
    (xn.set = xn.set),
    (on = function (e, t) {
      if (xn.has(e)) throw new Tn(In);
      return (t.facade = e), xn.set(e, t), t;
    }),
    (sn = function (e) {
      return xn.get(e) || {};
    }),
    (an = function (e) {
      return xn.has(e);
    });
} else {
  var Rn = Sn("state");
  (On[Rn] = !0),
    (on = function (e, t) {
      if (wn(e, Rn)) throw new Tn(In);
      return (t.facade = e), vn(e, Rn, t), t;
    }),
    (sn = function (e) {
      return wn(e, Rn) ? e[Rn] : {};
    }),
    (an = function (e) {
      return wn(e, Rn);
    });
}
var An = {
    set: on,
    get: sn,
    has: an,
    enforce: function (e) {
      return an(e) ? sn(e) : on(e, {});
    },
    getterFor: function (e) {
      return function (t) {
        var r;
        if (!bn(t) || (r = sn(t)).type !== e)
          throw new Tn("Incompatible receiver, " + e + " required");
        return r;
      };
    },
  },
  Dn = Ie,
  Nn = ae,
  Ln = Ge,
  kn = Ut,
  Cn = ce,
  Pn = en.CONFIGURABLE,
  Mn = cn,
  _n = An.enforce,
  $n = An.get,
  Bn = String,
  Fn = Object.defineProperty,
  Un = Dn("".slice),
  Gn = Dn("".replace),
  Wn = Dn([].join),
  zn =
    Cn &&
    !Nn(function () {
      return 8 !== Fn(function () {}, "length", { value: 8 }).length;
    }),
  Vn = String(String).split("String"),
  Hn = (qr.exports = function (e, t, r) {
    "Symbol(" === Un(Bn(t), 0, 7) &&
      (t = "[" + Gn(Bn(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"),
      r && r.getter && (t = "get " + t),
      r && r.setter && (t = "set " + t),
      (!kn(e, "name") || (Pn && e.name !== t)) &&
        (Cn ? Fn(e, "name", { value: t, configurable: !0 }) : (e.name = t)),
      zn &&
        r &&
        kn(r, "arity") &&
        e.length !== r.arity &&
        Fn(e, "length", { value: r.arity });
    try {
      r && kn(r, "constructor") && r.constructor
        ? Cn && Fn(e, "prototype", { writable: !1 })
        : e.prototype && (e.prototype = void 0);
    } catch (e) {}
    var n = _n(e);
    return (
      kn(n, "source") || (n.source = Wn(Vn, "string" == typeof t ? t : "")), e
    );
  });
Function.prototype.toString = Hn(function () {
  return (Ln(this) && $n(this).source) || Mn(this);
}, "toString");
var Xn = qr.exports,
  qn = Ge,
  Kn = Rr,
  Yn = Xn,
  Qn = Rt,
  Jn = function (e, t, r, n) {
    n || (n = {});
    var o = n.enumerable,
      i = void 0 !== n.name ? n.name : t;
    if ((qn(r) && Yn(r, i, n), n.global)) o ? (e[t] = r) : Qn(t, r);
    else {
      try {
        n.unsafe ? e[t] && (o = !0) : delete e[t];
      } catch (e) {}
      o
        ? (e[t] = r)
        : Kn.f(e, t, {
            value: r,
            enumerable: !1,
            configurable: !n.nonConfigurable,
            writable: !n.nonWritable,
          });
    }
    return e;
  },
  Zn = {},
  eo = Math.ceil,
  to = Math.floor,
  ro =
    Math.trunc ||
    function (e) {
      var t = +e;
      return (t > 0 ? to : eo)(t);
    },
  no = ro,
  oo = function (e) {
    var t = +e;
    return t != t || 0 === t ? 0 : no(t);
  },
  io = oo,
  so = Math.max,
  ao = Math.min,
  co = oo,
  lo = Math.min,
  uo = function (e) {
    var t = co(e);
    return t > 0 ? lo(t, 9007199254740991) : 0;
  },
  fo = uo,
  po = function (e) {
    return fo(e.length);
  },
  ho = Fe,
  mo = function (e, t) {
    var r = io(e);
    return r < 0 ? so(r + t, 0) : ao(r, t);
  },
  go = po,
  yo = function (e) {
    return function (t, r, n) {
      var o = ho(t),
        i = go(o);
      if (0 === i) return !e && -1;
      var s,
        a = mo(n, i);
      if (e && r != r) {
        for (; i > a; ) if ((s = o[a++]) != s) return !0;
      } else
        for (; i > a; a++) if ((e || a in o) && o[a] === r) return e || a || 0;
      return !e && -1;
    };
  },
  bo = { includes: yo(!0), indexOf: yo(!1) },
  vo = Ut,
  wo = Fe,
  Eo = bo.indexOf,
  So = mn,
  Oo = Ie([].push),
  Io = function (e, t) {
    var r,
      n = wo(e),
      o = 0,
      i = [];
    for (r in n) !vo(So, r) && vo(n, r) && Oo(i, r);
    for (; t.length > o; ) vo(n, (r = t[o++])) && (~Eo(i, r) || Oo(i, r));
    return i;
  },
  To = [
    "constructor",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
    "toString",
    "valueOf",
  ],
  jo = Io,
  xo = To.concat("length", "prototype");
Zn.f =
  Object.getOwnPropertyNames ||
  function (e) {
    return jo(e, xo);
  };
var Ro = {};
Ro.f = Object.getOwnPropertySymbols;
var Ao = Xe,
  Do = Zn,
  No = Ro,
  Lo = kr,
  ko = Ie([].concat),
  Co =
    Ao("Reflect", "ownKeys") ||
    function (e) {
      var t = Do.f(Lo(e)),
        r = No.f;
      return r ? ko(t, r(e)) : t;
    },
  Po = Ut,
  Mo = Co,
  _o = se,
  $o = Rr,
  Bo = ae,
  Fo = Ge,
  Uo = /#|\.prototype\./,
  Go = function (e, t) {
    var r = zo[Wo(e)];
    return r === Ho || (r !== Vo && (Fo(t) ? Bo(t) : !!t));
  },
  Wo = (Go.normalize = function (e) {
    return String(e).replace(Uo, ".").toLowerCase();
  }),
  zo = (Go.data = {}),
  Vo = (Go.NATIVE = "N"),
  Ho = (Go.POLYFILL = "P"),
  Xo = Go,
  qo = ie,
  Ko = se.f,
  Yo = Xr,
  Qo = Jn,
  Jo = Rt,
  Zo = function (e, t, r) {
    for (var n = Mo(t), o = $o.f, i = _o.f, s = 0; s < n.length; s++) {
      var a = n[s];
      Po(e, a) || (r && Po(r, a)) || o(e, a, i(t, a));
    }
  },
  ei = Xo,
  ti = function (e, t) {
    var r,
      n,
      o,
      i,
      s,
      a = e.target,
      c = e.global,
      l = e.stat;
    if ((r = c ? qo : l ? qo[a] || Jo(a, {}) : qo[a] && qo[a].prototype))
      for (n in t) {
        if (
          ((i = t[n]),
          (o = e.dontCallGetSet ? (s = Ko(r, n)) && s.value : r[n]),
          !ei(c ? n : a + (l ? "." : "#") + n, e.forced) && void 0 !== o)
        ) {
          if (typeof i == typeof o) continue;
          Zo(i, o);
        }
        (e.sham || (o && o.sham)) && Yo(i, "sham", !0), Qo(r, n, i, e);
      }
  },
  ri = Re,
  ni = ce,
  oi =
    Array.isArray ||
    function (e) {
      return "Array" === ri(e);
    },
  ii = TypeError,
  si = Object.getOwnPropertyDescriptor,
  ai =
    ni &&
    !(function () {
      if (void 0 !== this) return !0;
      try {
        Object.defineProperty([], "length", { writable: !1 }).length = 1;
      } catch (e) {
        return e instanceof TypeError;
      }
    })(),
  ci = TypeError,
  li = $t,
  ui = po,
  fi = ai
    ? function (e, t) {
        if (oi(e) && !si(e, "length").writable)
          throw new ii("Cannot set read only .length");
        return (e.length = t);
      }
    : function (e, t) {
        return (e.length = t);
      },
  pi = function (e) {
    if (e > 9007199254740991) throw ci("Maximum allowed index exceeded");
    return e;
  };
ti(
  {
    target: "Array",
    proto: !0,
    arity: 1,
    forced:
      ae(function () {
        return 4294967297 !== [].push.call({ length: 4294967296 }, 1);
      }) ||
      !(function () {
        try {
          Object.defineProperty([], "length", { writable: !1 }).push();
        } catch (e) {
          return e instanceof TypeError;
        }
      })(),
  },
  {
    push: function (e) {
      var t = li(this),
        r = ui(t),
        n = arguments.length;
      pi(r + n);
      for (var o = 0; o < n; o++) (t[r] = arguments[o]), r++;
      return fi(t, r), r;
    },
  }
);
var di = qe,
  hi = TypeError,
  mi = !ae(function () {
    function e() {}
    return (
      (e.prototype.constructor = null),
      Object.getPrototypeOf(new e()) !== e.prototype
    );
  }),
  gi = Ut,
  yi = Ge,
  bi = $t,
  vi = mi,
  wi = hn("IE_PROTO"),
  Ei = Object,
  Si = Ei.prototype,
  Oi = vi
    ? Ei.getPrototypeOf
    : function (e) {
        var t = bi(e);
        if (gi(t, wi)) return t[wi];
        var r = t.constructor;
        return yi(r) && t instanceof r
          ? r.prototype
          : t instanceof Ei
            ? Si
            : null;
      },
  Ii = Xn,
  Ti = Rr,
  ji = function (e, t, r) {
    return (
      r.get && Ii(r.get, t, { getter: !0 }),
      r.set && Ii(r.set, t, { setter: !0 }),
      Ti.f(e, t, r)
    );
  },
  xi = ce,
  Ri = Rr,
  Ai = ve,
  Di = {},
  Ni = Io,
  Li = To,
  ki =
    Object.keys ||
    function (e) {
      return Ni(e, Li);
    },
  Ci = ce,
  Pi = Ar,
  Mi = Rr,
  _i = kr,
  $i = Fe,
  Bi = ki;
Di.f =
  Ci && !Pi
    ? Object.defineProperties
    : function (e, t) {
        _i(e);
        for (var r, n = $i(t), o = Bi(t), i = o.length, s = 0; i > s; )
          Mi.f(e, (r = o[s++]), n[r]);
        return e;
      };
var Fi,
  Ui = Xe("document", "documentElement"),
  Gi = kr,
  Wi = Di,
  zi = To,
  Vi = mn,
  Hi = Ui,
  Xi = gr,
  qi = "prototype",
  Ki = "script",
  Yi = hn("IE_PROTO"),
  Qi = function () {},
  Ji = function (e) {
    return "<" + Ki + ">" + e + "</" + Ki + ">";
  },
  Zi = function (e) {
    e.write(Ji("")), e.close();
    var t = e.parentWindow.Object;
    return (e = null), t;
  },
  es = function () {
    try {
      Fi = new ActiveXObject("htmlfile");
    } catch (e) {}
    var e, t, r;
    es =
      "undefined" != typeof document
        ? document.domain && Fi
          ? Zi(Fi)
          : ((t = Xi("iframe")),
            (r = "java" + Ki + ":"),
            (t.style.display = "none"),
            Hi.appendChild(t),
            (t.src = String(r)),
            (e = t.contentWindow.document).open(),
            e.write(Ji("document.F=Object")),
            e.close(),
            e.F)
        : Zi(Fi);
    for (var n = zi.length; n--; ) delete es[qi][zi[n]];
    return es();
  };
Vi[Yi] = !0;
var ts,
  rs,
  ns,
  os =
    Object.create ||
    function (e, t) {
      var r;
      return (
        null !== e
          ? ((Qi[qi] = Gi(e)), (r = new Qi()), (Qi[qi] = null), (r[Yi] = e))
          : (r = es()),
        void 0 === t ? r : Wi.f(r, t)
      );
    },
  is = ae,
  ss = Ge,
  as = ze,
  cs = Oi,
  ls = Jn,
  us = tr("iterator"),
  fs = !1;
[].keys &&
  ("next" in (ns = [].keys())
    ? (rs = cs(cs(ns))) !== Object.prototype && (ts = rs)
    : (fs = !0));
var ps =
  !as(ts) ||
  is(function () {
    var e = {};
    return ts[us].call(e) !== e;
  });
ps && (ts = {}),
  ss(ts[us]) ||
    ls(ts, us, function () {
      return this;
    });
var ds = { IteratorPrototype: ts, BUGGY_SAFARI_ITERATORS: fs },
  hs = ti,
  ms = ie,
  gs = function (e, t) {
    if (di(t, e)) return e;
    throw new hi("Incorrect invocation");
  },
  ys = kr,
  bs = Ge,
  vs = Oi,
  ws = ji,
  Es = function (e, t, r) {
    xi ? Ri.f(e, t, Ai(0, r)) : (e[t] = r);
  },
  Ss = ae,
  Os = Ut,
  Is = ds.IteratorPrototype,
  Ts = ce,
  js = "constructor",
  xs = "Iterator",
  Rs = tr("toStringTag"),
  As = TypeError,
  Ds = ms[xs],
  Ns =
    !bs(Ds) ||
    Ds.prototype !== Is ||
    !Ss(function () {
      Ds({});
    }),
  Ls = function () {
    if ((gs(this, Is), vs(this) === Is))
      throw new As("Abstract class Iterator not directly constructable");
  },
  ks = function (e, t) {
    Ts
      ? ws(Is, e, {
          configurable: !0,
          get: function () {
            return t;
          },
          set: function (t) {
            if ((ys(this), this === Is))
              throw new As("You can't redefine this property");
            Os(this, e) ? (this[e] = t) : Es(this, e, t);
          },
        })
      : (Is[e] = t);
  };
Os(Is, Rs) || ks(Rs, xs),
  (!Ns && Os(Is, js) && Is[js] !== Object) || ks(js, Ls),
  (Ls.prototype = Is),
  hs({ global: !0, constructor: !0, forced: Ns }, { Iterator: Ls });
var Cs = function (e) {
    return { iterator: e, next: e.next, done: !1 };
  },
  Ps = Jn,
  Ms = pe,
  _s = kr,
  $s = wt,
  Bs = function (e, t, r) {
    var n, o;
    _s(e);
    try {
      if (!(n = $s(e, "return"))) {
        if ("throw" === t) throw r;
        return r;
      }
      n = Ms(n, e);
    } catch (e) {
      (o = !0), (n = e);
    }
    if ("throw" === t) throw r;
    if (o) throw n;
    return _s(n), r;
  },
  Fs = pe,
  Us = os,
  Gs = Xr,
  Ws = function (e, t, r) {
    for (var n in t) Ps(e, n, t[n], r);
    return e;
  },
  zs = An,
  Vs = wt,
  Hs = ds.IteratorPrototype,
  Xs = function (e, t) {
    return { value: e, done: t };
  },
  qs = Bs,
  Ks = tr("toStringTag"),
  Ys = "IteratorHelper",
  Qs = "WrapForValidIterator",
  Js = zs.set,
  Zs = function (e) {
    var t = zs.getterFor(e ? Qs : Ys);
    return Ws(Us(Hs), {
      next: function () {
        var r = t(this);
        if (e) return r.nextHandler();
        try {
          var n = r.done ? void 0 : r.nextHandler();
          return Xs(n, r.done);
        } catch (e) {
          throw ((r.done = !0), e);
        }
      },
      return: function () {
        var r = t(this),
          n = r.iterator;
        if (((r.done = !0), e)) {
          var o = Vs(n, "return");
          return o ? Fs(o, n) : Xs(void 0, !0);
        }
        if (r.inner)
          try {
            qs(r.inner.iterator, "normal");
          } catch (e) {
            return qs(n, "throw", e);
          }
        return qs(n, "normal"), Xs(void 0, !0);
      },
    });
  },
  ea = Zs(!0),
  ta = Zs(!1);
Gs(ta, Ks, "Iterator Helper");
var ra = function (e, t) {
    var r = function (r, n) {
      n ? ((n.iterator = r.iterator), (n.next = r.next)) : (n = r),
        (n.type = t ? Qs : Ys),
        (n.nextHandler = e),
        (n.counter = 0),
        (n.done = !1),
        Js(this, n);
    };
    return (r.prototype = t ? ea : ta), r;
  },
  na = kr,
  oa = Bs,
  ia = function (e, t, r, n) {
    try {
      return n ? t(na(r)[0], r[1]) : t(r);
    } catch (t) {
      oa(e, "throw", t);
    }
  },
  sa = ti,
  aa = pe,
  ca = yt,
  la = kr,
  ua = Cs,
  fa = ia,
  pa = ra(function () {
    for (var e, t, r = this.iterator, n = this.predicate, o = this.next; ; ) {
      if (((e = la(aa(o, r))), (this.done = !!e.done))) return;
      if (((t = e.value), fa(r, n, [t, this.counter++], !0))) return t;
    }
  });
sa(
  { target: "Iterator", proto: !0, real: !0, forced: false },
  {
    filter: function (e) {
      return la(this), ca(e), new pa(ua(this), { predicate: e });
    },
  }
);
var da = Re,
  ha = Ie,
  ma = function (e) {
    if ("Function" === da(e)) return ha(e);
  },
  ga = yt,
  ya = le,
  ba = ma(ma.bind),
  va = {},
  wa = va,
  Ea = tr("iterator"),
  Sa = Array.prototype,
  Oa = {};
Oa[tr("toStringTag")] = "z";
var Ia = "[object z]" === String(Oa),
  Ta = Ge,
  ja = Re,
  xa = tr("toStringTag"),
  Ra = Object,
  Aa =
    "Arguments" ===
    ja(
      (function () {
        return arguments;
      })()
    ),
  Da = Ia
    ? ja
    : function (e) {
        var t, r, n;
        return void 0 === e
          ? "Undefined"
          : null === e
            ? "Null"
            : "string" ==
                typeof (r = (function (e, t) {
                  try {
                    return e[t];
                  } catch (e) {}
                })((t = Ra(e)), xa))
              ? r
              : Aa
                ? ja(t)
                : "Object" === (n = ja(t)) && Ta(t.callee)
                  ? "Arguments"
                  : n;
      },
  Na = Da,
  La = wt,
  ka = Ce,
  Ca = va,
  Pa = tr("iterator"),
  Ma = function (e) {
    if (!ka(e)) return La(e, Pa) || La(e, "@@iterator") || Ca[Na(e)];
  },
  _a = pe,
  $a = yt,
  Ba = kr,
  Fa = dt,
  Ua = Ma,
  Ga = TypeError,
  Wa = function (e, t) {
    return (
      ga(e),
      void 0 === t
        ? e
        : ya
          ? ba(e, t)
          : function () {
              return e.apply(t, arguments);
            }
    );
  },
  za = pe,
  Va = kr,
  Ha = dt,
  Xa = function (e) {
    return void 0 !== e && (wa.Array === e || Sa[Ea] === e);
  },
  qa = po,
  Ka = qe,
  Ya = function (e, t) {
    var r = arguments.length < 2 ? Ua(e) : t;
    if ($a(r)) return Ba(_a(r, e));
    throw new Ga(Fa(e) + " is not iterable");
  },
  Qa = Ma,
  Ja = Bs,
  Za = TypeError,
  ec = function (e, t) {
    (this.stopped = e), (this.result = t);
  },
  tc = ec.prototype,
  rc = function (e, t, r) {
    var n,
      o,
      i,
      s,
      a,
      c,
      l,
      u = r && r.that,
      f = !(!r || !r.AS_ENTRIES),
      p = !(!r || !r.IS_RECORD),
      d = !(!r || !r.IS_ITERATOR),
      h = !(!r || !r.INTERRUPTED),
      m = Wa(t, u),
      g = function (e) {
        return n && Ja(n, "normal", e), new ec(!0, e);
      },
      y = function (e) {
        return f
          ? (Va(e), h ? m(e[0], e[1], g) : m(e[0], e[1]))
          : h
            ? m(e, g)
            : m(e);
      };
    if (p) n = e.iterator;
    else if (d) n = e;
    else {
      if (!(o = Qa(e))) throw new Za(Ha(e) + " is not iterable");
      if (Xa(o)) {
        for (i = 0, s = qa(e); s > i; i++)
          if ((a = y(e[i])) && Ka(tc, a)) return a;
        return new ec(!1);
      }
      n = Ya(e, o);
    }
    for (c = p ? e.next : n.next; !(l = za(c, n)).done; ) {
      try {
        a = y(l.value);
      } catch (e) {
        Ja(n, "throw", e);
      }
      if ("object" == typeof a && a && Ka(tc, a)) return a;
    }
    return new ec(!1);
  },
  nc = rc,
  oc = yt,
  ic = kr,
  sc = Cs;
ti(
  { target: "Iterator", proto: !0, real: !0 },
  {
    forEach: function (e) {
      ic(this), oc(e);
      var t = sc(this),
        r = 0;
      nc(
        t,
        function (t) {
          e(t, r++);
        },
        { IS_RECORD: !0 }
      );
    },
  }
);
var ac = pe,
  cc = yt,
  lc = kr,
  uc = Cs,
  fc = ia,
  pc = ra(function () {
    var e = this.iterator,
      t = lc(ac(this.next, e));
    if (!(this.done = !!t.done))
      return fc(e, this.mapper, [t.value, this.counter++], !0);
  });
ti(
  { target: "Iterator", proto: !0, real: !0, forced: false },
  {
    map: function (e) {
      return lc(this), cc(e), new pc(uc(this), { mapper: e });
    },
  }
);
var dc = rc,
  hc = yt,
  mc = kr,
  gc = Cs,
  yc = TypeError;
ti(
  { target: "Iterator", proto: !0, real: !0 },
  {
    reduce: function (e) {
      mc(this), hc(e);
      var t = gc(this),
        r = arguments.length < 2,
        n = r ? void 0 : arguments[1],
        o = 0;
      if (
        (dc(
          t,
          function (t) {
            r ? ((r = !1), (n = t)) : (n = e(n, t, o)), o++;
          },
          { IS_RECORD: !0 }
        ),
        r)
      )
        throw new yc("Reduce of empty iterator with no initial value");
      return n;
    },
  }
);
var bc,
  vc,
  wc,
  Ec = {},
  Sc = {};
function Oc() {
  if (bc) return Sc;
  bc = 1;
  var e = a,
    r = "win32" === process.platform,
    n = t,
    o = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
  function i(e) {
    return "function" == typeof e
      ? e
      : (function () {
          var e;
          if (o) {
            var t = new Error();
            e = function (e) {
              e && ((t.message = e.message), r((e = t)));
            };
          } else e = r;
          return e;
          function r(e) {
            if (e) {
              if (process.throwDeprecation) throw e;
              if (!process.noDeprecation) {
                var t = "fs: missing callback " + (e.stack || e.message);
                process.traceDeprecation ? console.trace(t) : console.error(t);
              }
            }
          }
        })();
  }
  if ((e.normalize, r)) var s = /(.*?)(?:[\/\\]+|$)/g;
  else s = /(.*?)(?:[\/]+|$)/g;
  if (r) var c = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
  else c = /^[\/]*/;
  return (
    (Sc.realpathSync = function (t, o) {
      if (((t = e.resolve(t)), o && Object.prototype.hasOwnProperty.call(o, t)))
        return o[t];
      var i,
        a,
        l,
        u,
        f = t,
        p = {},
        d = {};
      function h() {
        var e = c.exec(t);
        (i = e[0].length),
          (a = e[0]),
          (l = e[0]),
          (u = ""),
          r && !d[l] && (n.lstatSync(l), (d[l] = !0));
      }
      for (h(); i < t.length; ) {
        s.lastIndex = i;
        var m = s.exec(t);
        if (
          ((u = a),
          (a += m[0]),
          (l = u + m[1]),
          (i = s.lastIndex),
          !(d[l] || (o && o[l] === l)))
        ) {
          var g;
          if (o && Object.prototype.hasOwnProperty.call(o, l)) g = o[l];
          else {
            var y = n.lstatSync(l);
            if (!y.isSymbolicLink()) {
              (d[l] = !0), o && (o[l] = l);
              continue;
            }
            var b = null;
            if (!r) {
              var v = y.dev.toString(32) + ":" + y.ino.toString(32);
              p.hasOwnProperty(v) && (b = p[v]);
            }
            null === b && (n.statSync(l), (b = n.readlinkSync(l))),
              (g = e.resolve(u, b)),
              o && (o[l] = g),
              r || (p[v] = b);
          }
          (t = e.resolve(g, t.slice(i))), h();
        }
      }
      return o && (o[f] = t), t;
    }),
    (Sc.realpath = function (t, o, a) {
      if (
        ("function" != typeof a && ((a = i(o)), (o = null)),
        (t = e.resolve(t)),
        o && Object.prototype.hasOwnProperty.call(o, t))
      )
        return process.nextTick(a.bind(null, null, o[t]));
      var l,
        u,
        f,
        p,
        d = t,
        h = {},
        m = {};
      function g() {
        var e = c.exec(t);
        (l = e[0].length),
          (u = e[0]),
          (f = e[0]),
          (p = ""),
          r && !m[f]
            ? n.lstat(f, function (e) {
                if (e) return a(e);
                (m[f] = !0), y();
              })
            : process.nextTick(y);
      }
      function y() {
        if (l >= t.length) return o && (o[d] = t), a(null, t);
        s.lastIndex = l;
        var e = s.exec(t);
        return (
          (p = u),
          (u += e[0]),
          (f = p + e[1]),
          (l = s.lastIndex),
          m[f] || (o && o[f] === f)
            ? process.nextTick(y)
            : o && Object.prototype.hasOwnProperty.call(o, f)
              ? w(o[f])
              : n.lstat(f, b)
        );
      }
      function b(e, t) {
        if (e) return a(e);
        if (!t.isSymbolicLink())
          return (m[f] = !0), o && (o[f] = f), process.nextTick(y);
        if (!r) {
          var i = t.dev.toString(32) + ":" + t.ino.toString(32);
          if (h.hasOwnProperty(i)) return v(null, h[i], f);
        }
        n.stat(f, function (e) {
          if (e) return a(e);
          n.readlink(f, function (e, t) {
            r || (h[i] = t), v(e, t);
          });
        });
      }
      function v(t, r, n) {
        if (t) return a(t);
        var i = e.resolve(p, r);
        o && (o[n] = i), w(i);
      }
      function w(r) {
        (t = e.resolve(r, t.slice(l))), g();
      }
      g();
    }),
    Sc
  );
}
function Ic() {
  if (wc) return vc;
  (wc = 1),
    (vc = c),
    (c.realpath = c),
    (c.sync = l),
    (c.realpathSync = l),
    (c.monkeypatch = function () {
      (e.realpath = c), (e.realpathSync = l);
    }),
    (c.unmonkeypatch = function () {
      (e.realpath = r), (e.realpathSync = n);
    });
  var e = t,
    r = e.realpath,
    n = e.realpathSync,
    o = process.version,
    i = /^v[0-5]\./.test(o),
    s = Oc();
  function a(e) {
    return (
      e &&
      "realpath" === e.syscall &&
      ("ELOOP" === e.code || "ENOMEM" === e.code || "ENAMETOOLONG" === e.code)
    );
  }
  function c(e, t, n) {
    if (i) return r(e, t, n);
    "function" == typeof t && ((n = t), (t = null)),
      r(e, t, function (r, o) {
        a(r) ? s.realpath(e, t, n) : n(r, o);
      });
  }
  function l(e, t) {
    if (i) return n(e, t);
    try {
      return n(e, t);
    } catch (r) {
      if (a(r)) return s.realpathSync(e, t);
      throw r;
    }
  }
  return vc;
}
var Tc,
  jc,
  xc,
  Rc,
  Ac,
  Dc,
  Nc,
  Lc,
  kc = rc,
  Cc = yt,
  Pc = kr,
  Mc = Cs;
function _c() {
  if (jc) return Tc;
  (jc = 1),
    (Tc = function (t, r) {
      for (var n = [], o = 0; o < t.length; o++) {
        var i = r(t[o], o);
        e(i) ? n.push.apply(n, i) : n.push(i);
      }
      return n;
    });
  var e =
    Array.isArray ||
    function (e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    };
  return Tc;
}
function $c() {
  if (Dc) return Ac;
  Dc = 1;
  var e = _c(),
    t = (function () {
      if (Rc) return xc;
      function e(e, n, o) {
        e instanceof RegExp && (e = t(e, o)),
          n instanceof RegExp && (n = t(n, o));
        var i = r(e, n, o);
        return (
          i && {
            start: i[0],
            end: i[1],
            pre: o.slice(0, i[0]),
            body: o.slice(i[0] + e.length, i[1]),
            post: o.slice(i[1] + n.length),
          }
        );
      }
      function t(e, t) {
        var r = t.match(e);
        return r ? r[0] : null;
      }
      function r(e, t, r) {
        var n,
          o,
          i,
          s,
          a,
          c = r.indexOf(e),
          l = r.indexOf(t, c + 1),
          u = c;
        if (c >= 0 && l > 0) {
          for (n = [], i = r.length; u >= 0 && !a; )
            u == c
              ? (n.push(u), (c = r.indexOf(e, u + 1)))
              : 1 == n.length
                ? (a = [n.pop(), l])
                : ((o = n.pop()) < i && ((i = o), (s = l)),
                  (l = r.indexOf(t, u + 1))),
              (u = c < l && c >= 0 ? c : l);
          n.length && (a = [i, s]);
        }
        return a;
      }
      return (Rc = 1), (xc = e), (e.range = r), xc;
    })();
  Ac = function (e) {
    if (!e) return [];
    "{}" === e.substr(0, 2) && (e = "\\{\\}" + e.substr(2));
    return h(
      (function (e) {
        return e
          .split("\\\\")
          .join(r)
          .split("\\{")
          .join(n)
          .split("\\}")
          .join(o)
          .split("\\,")
          .join(i)
          .split("\\.")
          .join(s);
      })(e),
      !0
    ).map(c);
  };
  var r = "\0SLASH" + Math.random() + "\0",
    n = "\0OPEN" + Math.random() + "\0",
    o = "\0CLOSE" + Math.random() + "\0",
    i = "\0COMMA" + Math.random() + "\0",
    s = "\0PERIOD" + Math.random() + "\0";
  function a(e) {
    return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
  }
  function c(e) {
    return e
      .split(r)
      .join("\\")
      .split(n)
      .join("{")
      .split(o)
      .join("}")
      .split(i)
      .join(",")
      .split(s)
      .join(".");
  }
  function l(e) {
    if (!e) return [""];
    var r = [],
      n = t("{", "}", e);
    if (!n) return e.split(",");
    var o = n.pre,
      i = n.body,
      s = n.post,
      a = o.split(",");
    a[a.length - 1] += "{" + i + "}";
    var c = l(s);
    return (
      s.length && ((a[a.length - 1] += c.shift()), a.push.apply(a, c)),
      r.push.apply(r, a),
      r
    );
  }
  function u(e) {
    return "{" + e + "}";
  }
  function f(e) {
    return /^-?0\d/.test(e);
  }
  function p(e, t) {
    return e <= t;
  }
  function d(e, t) {
    return e >= t;
  }
  function h(r, n) {
    var i = [],
      s = t("{", "}", r);
    if (!s || /\$$/.test(s.pre)) return [r];
    var c,
      m = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body),
      g = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body),
      y = m || g,
      b = s.body.indexOf(",") >= 0;
    if (!y && !b)
      return s.post.match(/,.*\}/)
        ? h((r = s.pre + "{" + s.body + o + s.post))
        : [r];
    if (y) c = s.body.split(/\.\./);
    else if (
      1 === (c = l(s.body)).length &&
      1 === (c = h(c[0], !1).map(u)).length
    )
      return (E = s.post.length ? h(s.post, !1) : [""]).map(function (e) {
        return s.pre + c[0] + e;
      });
    var v,
      w = s.pre,
      E = s.post.length ? h(s.post, !1) : [""];
    if (y) {
      var S = a(c[0]),
        O = a(c[1]),
        I = Math.max(c[0].length, c[1].length),
        T = 3 == c.length ? Math.abs(a(c[2])) : 1,
        j = p;
      O < S && ((T *= -1), (j = d));
      var x = c.some(f);
      v = [];
      for (var R = S; j(R, O); R += T) {
        var A;
        if (g) "\\" === (A = String.fromCharCode(R)) && (A = "");
        else if (((A = String(R)), x)) {
          var D = I - A.length;
          if (D > 0) {
            var N = new Array(D + 1).join("0");
            A = R < 0 ? "-" + N + A.slice(1) : N + A;
          }
        }
        v.push(A);
      }
    } else
      v = e(c, function (e) {
        return h(e, !1);
      });
    for (var L = 0; L < v.length; L++)
      for (var k = 0; k < E.length; k++) {
        var C = w + v[L] + E[k];
        (!n || y || C) && i.push(C);
      }
    return i;
  }
  return Ac;
}
function Bc() {
  if (Lc) return Nc;
  (Lc = 1), (Nc = l), (l.Minimatch = u);
  var e = (function () {
    try {
      return require("path");
    } catch (e) {}
  })() || { sep: "/" };
  l.sep = e.sep;
  var t = (l.GLOBSTAR = u.GLOBSTAR = {}),
    r = $c(),
    n = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" },
    },
    o = "[^/]",
    i = o + "*?",
    s = "().*{}+?[]^$\\!".split("").reduce(function (e, t) {
      return (e[t] = !0), e;
    }, {});
  var a = /\/+/;
  function c(e, t) {
    t = t || {};
    var r = {};
    return (
      Object.keys(e).forEach(function (t) {
        r[t] = e[t];
      }),
      Object.keys(t).forEach(function (e) {
        r[e] = t[e];
      }),
      r
    );
  }
  function l(e, t, r) {
    return (
      p(t),
      r || (r = {}),
      !(!r.nocomment && "#" === t.charAt(0)) && new u(t, r).match(e)
    );
  }
  function u(t, r) {
    if (!(this instanceof u)) return new u(t, r);
    p(t),
      r || (r = {}),
      (t = t.trim()),
      r.allowWindowsEscape || "/" === e.sep || (t = t.split(e.sep).join("/")),
      (this.options = r),
      (this.set = []),
      (this.pattern = t),
      (this.regexp = null),
      (this.negate = !1),
      (this.comment = !1),
      (this.empty = !1),
      (this.partial = !!r.partial),
      this.make();
  }
  function f(e, t) {
    return (
      t || (t = this instanceof u ? this.options : {}),
      (e = void 0 === e ? this.pattern : e),
      p(e),
      t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : r(e)
    );
  }
  (l.filter = function (e, t) {
    return (
      (t = t || {}),
      function (r, n, o) {
        return l(r, e, t);
      }
    );
  }),
    (l.defaults = function (e) {
      if (!e || "object" != typeof e || !Object.keys(e).length) return l;
      var t = l,
        r = function (r, n, o) {
          return t(r, n, c(e, o));
        };
      return (
        ((r.Minimatch = function (r, n) {
          return new t.Minimatch(r, c(e, n));
        }).defaults = function (r) {
          return t.defaults(c(e, r)).Minimatch;
        }),
        (r.filter = function (r, n) {
          return t.filter(r, c(e, n));
        }),
        (r.defaults = function (r) {
          return t.defaults(c(e, r));
        }),
        (r.makeRe = function (r, n) {
          return t.makeRe(r, c(e, n));
        }),
        (r.braceExpand = function (r, n) {
          return t.braceExpand(r, c(e, n));
        }),
        (r.match = function (r, n, o) {
          return t.match(r, n, c(e, o));
        }),
        r
      );
    }),
    (u.defaults = function (e) {
      return l.defaults(e).Minimatch;
    }),
    (u.prototype.debug = function () {}),
    (u.prototype.make = function () {
      var e = this.pattern,
        t = this.options;
      if (!t.nocomment && "#" === e.charAt(0)) return void (this.comment = !0);
      if (!e) return void (this.empty = !0);
      this.parseNegate();
      var r = (this.globSet = this.braceExpand());
      t.debug &&
        (this.debug = function () {
          console.error.apply(console, arguments);
        });
      this.debug(this.pattern, r),
        (r = this.globParts =
          r.map(function (e) {
            return e.split(a);
          })),
        this.debug(this.pattern, r),
        (r = r.map(function (e, t, r) {
          return e.map(this.parse, this);
        }, this)),
        this.debug(this.pattern, r),
        (r = r.filter(function (e) {
          return -1 === e.indexOf(!1);
        })),
        this.debug(this.pattern, r),
        (this.set = r);
    }),
    (u.prototype.parseNegate = function () {
      var e = this.pattern,
        t = !1,
        r = this.options,
        n = 0;
      if (r.nonegate) return;
      for (var o = 0, i = e.length; o < i && "!" === e.charAt(o); o++)
        (t = !t), n++;
      n && (this.pattern = e.substr(n));
      this.negate = t;
    }),
    (l.braceExpand = function (e, t) {
      return f(e, t);
    }),
    (u.prototype.braceExpand = f);
  var p = function (e) {
    if ("string" != typeof e) throw new TypeError("invalid pattern");
    if (e.length > 65536) throw new TypeError("pattern is too long");
  };
  u.prototype.parse = function (e, r) {
    p(e);
    var a = this.options;
    if ("**" === e) {
      if (!a.noglobstar) return t;
      e = "*";
    }
    if ("" === e) return "";
    var c,
      l = "",
      u = !!a.nocase,
      f = !1,
      h = [],
      m = [],
      g = !1,
      y = -1,
      b = -1,
      v =
        "." === e.charAt(0)
          ? ""
          : a.dot
            ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))"
            : "(?!\\.)",
      w = this;
    function E() {
      if (c) {
        switch (c) {
          case "*":
            (l += i), (u = !0);
            break;
          case "?":
            (l += o), (u = !0);
            break;
          default:
            l += "\\" + c;
        }
        w.debug("clearStateChar %j %j", c, l), (c = !1);
      }
    }
    for (var S, O = 0, I = e.length; O < I && (S = e.charAt(O)); O++)
      if ((this.debug("%s\t%s %s %j", e, O, l, S), f && s[S]))
        (l += "\\" + S), (f = !1);
      else
        switch (S) {
          case "/":
            return !1;
          case "\\":
            E(), (f = !0);
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            if ((this.debug("%s\t%s %s %j <-- stateChar", e, O, l, S), g)) {
              this.debug("  in class"),
                "!" === S && O === b + 1 && (S = "^"),
                (l += S);
              continue;
            }
            w.debug("call clearStateChar %j", c), E(), (c = S), a.noext && E();
            continue;
          case "(":
            if (g) {
              l += "(";
              continue;
            }
            if (!c) {
              l += "\\(";
              continue;
            }
            h.push({
              type: c,
              start: O - 1,
              reStart: l.length,
              open: n[c].open,
              close: n[c].close,
            }),
              (l += "!" === c ? "(?:(?!(?:" : "(?:"),
              this.debug("plType %j %j", c, l),
              (c = !1);
            continue;
          case ")":
            if (g || !h.length) {
              l += "\\)";
              continue;
            }
            E(), (u = !0);
            var T = h.pop();
            (l += T.close), "!" === T.type && m.push(T), (T.reEnd = l.length);
            continue;
          case "|":
            if (g || !h.length || f) {
              (l += "\\|"), (f = !1);
              continue;
            }
            E(), (l += "|");
            continue;
          case "[":
            if ((E(), g)) {
              l += "\\" + S;
              continue;
            }
            (g = !0), (b = O), (y = l.length), (l += S);
            continue;
          case "]":
            if (O === b + 1 || !g) {
              (l += "\\" + S), (f = !1);
              continue;
            }
            var j = e.substring(b + 1, O);
            try {
              RegExp("[" + j + "]");
            } catch (e) {
              var x = this.parse(j, d);
              (l = l.substr(0, y) + "\\[" + x[0] + "\\]"),
                (u = u || x[1]),
                (g = !1);
              continue;
            }
            (u = !0), (g = !1), (l += S);
            continue;
          default:
            E(),
              f ? (f = !1) : !s[S] || ("^" === S && g) || (l += "\\"),
              (l += S);
        }
    g &&
      ((j = e.substr(b + 1)),
      (x = this.parse(j, d)),
      (l = l.substr(0, y) + "\\[" + x[0]),
      (u = u || x[1]));
    for (T = h.pop(); T; T = h.pop()) {
      var R = l.slice(T.reStart + T.open.length);
      this.debug("setting tail", l, T),
        (R = R.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (e, t, r) {
          return r || (r = "\\"), t + t + r + "|";
        })),
        this.debug("tail=%j\n   %s", R, R, T, l);
      var A = "*" === T.type ? i : "?" === T.type ? o : "\\" + T.type;
      (u = !0), (l = l.slice(0, T.reStart) + A + "\\(" + R);
    }
    E(), f && (l += "\\\\");
    var D = !1;
    switch (l.charAt(0)) {
      case "[":
      case ".":
      case "(":
        D = !0;
    }
    for (var N = m.length - 1; N > -1; N--) {
      var L = m[N],
        k = l.slice(0, L.reStart),
        C = l.slice(L.reStart, L.reEnd - 8),
        P = l.slice(L.reEnd - 8, L.reEnd),
        M = l.slice(L.reEnd);
      P += M;
      var _ = k.split("(").length - 1,
        $ = M;
      for (O = 0; O < _; O++) $ = $.replace(/\)[+*?]?/, "");
      var B = "";
      "" === (M = $) && r !== d && (B = "$"), (l = k + C + M + B + P);
    }
    "" !== l && u && (l = "(?=.)" + l);
    D && (l = v + l);
    if (r === d) return [l, u];
    if (!u)
      return (function (e) {
        return e.replace(/\\(.)/g, "$1");
      })(e);
    var F = a.nocase ? "i" : "";
    try {
      var U = new RegExp("^" + l + "$", F);
    } catch (e) {
      return new RegExp("$.");
    }
    return (U._glob = e), (U._src = l), U;
  };
  var d = {};
  return (
    (l.makeRe = function (e, t) {
      return new u(e, t || {}).makeRe();
    }),
    (u.prototype.makeRe = function () {
      if (this.regexp || !1 === this.regexp) return this.regexp;
      var e = this.set;
      if (!e.length) return (this.regexp = !1), this.regexp;
      var r = this.options,
        n = r.noglobstar
          ? i
          : r.dot
            ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?"
            : "(?:(?!(?:\\/|^)\\.).)*?",
        o = r.nocase ? "i" : "",
        s = e
          .map(function (e) {
            return e
              .map(function (e) {
                return e === t
                  ? n
                  : "string" == typeof e
                    ? (function (e) {
                        return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
                      })(e)
                    : e._src;
              })
              .join("\\/");
          })
          .join("|");
      (s = "^(?:" + s + ")$"), this.negate && (s = "^(?!" + s + ").*$");
      try {
        this.regexp = new RegExp(s, o);
      } catch (e) {
        this.regexp = !1;
      }
      return this.regexp;
    }),
    (l.match = function (e, t, r) {
      var n = new u(t, (r = r || {}));
      return (
        (e = e.filter(function (e) {
          return n.match(e);
        })),
        n.options.nonull && !e.length && e.push(t),
        e
      );
    }),
    (u.prototype.match = function (t, r) {
      if (
        (void 0 === r && (r = this.partial),
        this.debug("match", t, this.pattern),
        this.comment)
      )
        return !1;
      if (this.empty) return "" === t;
      if ("/" === t && r) return !0;
      var n = this.options;
      "/" !== e.sep && (t = t.split(e.sep).join("/")),
        (t = t.split(a)),
        this.debug(this.pattern, "split", t);
      var o,
        i,
        s = this.set;
      for (
        this.debug(this.pattern, "set", s), i = t.length - 1;
        i >= 0 && !(o = t[i]);
        i--
      );
      for (i = 0; i < s.length; i++) {
        var c = s[i],
          l = t;
        if (
          (n.matchBase && 1 === c.length && (l = [o]), this.matchOne(l, c, r))
        )
          return !!n.flipNegate || !this.negate;
      }
      return !n.flipNegate && this.negate;
    }),
    (u.prototype.matchOne = function (e, r, n) {
      var o = this.options;
      this.debug("matchOne", { this: this, file: e, pattern: r }),
        this.debug("matchOne", e.length, r.length);
      for (
        var i = 0, s = 0, a = e.length, c = r.length;
        i < a && s < c;
        i++, s++
      ) {
        this.debug("matchOne loop");
        var l,
          u = r[s],
          f = e[i];
        if ((this.debug(r, u, f), !1 === u)) return !1;
        if (u === t) {
          this.debug("GLOBSTAR", [r, u, f]);
          var p = i,
            d = s + 1;
          if (d === c) {
            for (this.debug("** at the end"); i < a; i++)
              if (
                "." === e[i] ||
                ".." === e[i] ||
                (!o.dot && "." === e[i].charAt(0))
              )
                return !1;
            return !0;
          }
          for (; p < a; ) {
            var h = e[p];
            if (
              (this.debug("\nglobstar while", e, p, r, d, h),
              this.matchOne(e.slice(p), r.slice(d), n))
            )
              return this.debug("globstar found match!", p, a, h), !0;
            if ("." === h || ".." === h || (!o.dot && "." === h.charAt(0))) {
              this.debug("dot detected!", e, p, r, d);
              break;
            }
            this.debug("globstar swallow a segment, and continue"), p++;
          }
          return !(
            !n || (this.debug("\n>>> no match, partial?", e, p, r, d), p !== a)
          );
        }
        if (
          ("string" == typeof u
            ? ((l = f === u), this.debug("string match", u, f, l))
            : ((l = f.match(u)), this.debug("pattern match", u, f, l)),
          !l)
        )
          return !1;
      }
      if (i === a && s === c) return !0;
      if (i === a) return n;
      if (s === c) return i === a - 1 && "" === e[i];
      throw new Error("wtf?");
    }),
    Nc
  );
}
ti(
  { target: "Iterator", proto: !0, real: !0 },
  {
    some: function (e) {
      Pc(this), Cc(e);
      var t = Mc(this),
        r = 0;
      return kc(
        t,
        function (t, n) {
          if (e(t, r++)) return n();
        },
        { IS_RECORD: !0, INTERRUPTED: !0 }
      ).stopped;
    },
  }
);
var Fc,
  Uc,
  Gc = { exports: {} },
  Wc = { exports: {} };
function zc() {
  if (Uc) return Gc.exports;
  Uc = 1;
  try {
    var e = require("util");
    if ("function" != typeof e.inherits) throw "";
    Gc.exports = e.inherits;
  } catch (e) {
    Gc.exports =
      (Fc ||
        ((Fc = 1),
        "function" == typeof Object.create
          ? (Wc.exports = function (e, t) {
              t &&
                ((e.super_ = t),
                (e.prototype = Object.create(t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })));
            })
          : (Wc.exports = function (e, t) {
              if (t) {
                e.super_ = t;
                var r = function () {};
                (r.prototype = t.prototype),
                  (e.prototype = new r()),
                  (e.prototype.constructor = e);
              }
            })),
      Wc.exports);
  }
  return Gc.exports;
}
var Vc,
  Hc = { exports: {} };
function Xc() {
  if (Vc) return Hc.exports;
  function e(e) {
    return "/" === e.charAt(0);
  }
  function t(e) {
    var t =
        /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/.exec(
          e
        ),
      r = t[1] || "",
      n = Boolean(r && ":" !== r.charAt(1));
    return Boolean(t[2] || n);
  }
  return (
    (Vc = 1),
    (Hc.exports = "win32" === process.platform ? t : e),
    (Hc.exports.posix = e),
    (Hc.exports.win32 = t),
    Hc.exports
  );
}
var qc,
  Kc,
  Yc,
  Qc,
  Jc,
  Zc = {};
function el() {
  if (qc) return Zc;
  function e(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  (qc = 1),
    (Zc.setopts = function (t, o, a) {
      a || (a = {});
      if (a.matchBase && -1 === o.indexOf("/")) {
        if (a.noglobstar) throw new Error("base matching requires globstar");
        o = "**/" + o;
      }
      (t.silent = !!a.silent),
        (t.pattern = o),
        (t.strict = !1 !== a.strict),
        (t.realpath = !!a.realpath),
        (t.realpathCache = a.realpathCache || Object.create(null)),
        (t.follow = !!a.follow),
        (t.dot = !!a.dot),
        (t.mark = !!a.mark),
        (t.nodir = !!a.nodir),
        t.nodir && (t.mark = !0);
      (t.sync = !!a.sync),
        (t.nounique = !!a.nounique),
        (t.nonull = !!a.nonull),
        (t.nosort = !!a.nosort),
        (t.nocase = !!a.nocase),
        (t.stat = !!a.stat),
        (t.noprocess = !!a.noprocess),
        (t.absolute = !!a.absolute),
        (t.fs = a.fs || r),
        (t.maxLength = a.maxLength || 1 / 0),
        (t.cache = a.cache || Object.create(null)),
        (t.statCache = a.statCache || Object.create(null)),
        (t.symlinks = a.symlinks || Object.create(null)),
        (function (e, t) {
          (e.ignore = t.ignore || []),
            Array.isArray(e.ignore) || (e.ignore = [e.ignore]);
          e.ignore.length && (e.ignore = e.ignore.map(l));
        })(t, a),
        (t.changedCwd = !1);
      var c = process.cwd();
      e(a, "cwd")
        ? ((t.cwd = n.resolve(a.cwd)), (t.changedCwd = t.cwd !== c))
        : (t.cwd = c);
      (t.root = a.root || n.resolve(t.cwd, "/")),
        (t.root = n.resolve(t.root)),
        "win32" === process.platform && (t.root = t.root.replace(/\\/g, "/"));
      (t.cwdAbs = i(t.cwd) ? t.cwd : u(t, t.cwd)),
        "win32" === process.platform &&
          (t.cwdAbs = t.cwdAbs.replace(/\\/g, "/"));
      (t.nomount = !!a.nomount),
        (a.nonegate = !0),
        (a.nocomment = !0),
        (a.allowWindowsEscape = !1),
        (t.minimatch = new s(o, a)),
        (t.options = t.minimatch.options);
    }),
    (Zc.ownProp = e),
    (Zc.makeAbs = u),
    (Zc.finish = function (e) {
      for (
        var t = e.nounique,
          r = t ? [] : Object.create(null),
          n = 0,
          o = e.matches.length;
        n < o;
        n++
      ) {
        var i = e.matches[n];
        if (i && 0 !== Object.keys(i).length) {
          var s = Object.keys(i);
          t
            ? r.push.apply(r, s)
            : s.forEach(function (e) {
                r[e] = !0;
              });
        } else if (e.nonull) {
          var a = e.minimatch.globSet[n];
          t ? r.push(a) : (r[a] = !0);
        }
      }
      t || (r = Object.keys(r));
      e.nosort || (r = r.sort(c));
      if (e.mark) {
        for (n = 0; n < r.length; n++) r[n] = e._mark(r[n]);
        e.nodir &&
          (r = r.filter(function (t) {
            var r = !/\/$/.test(t),
              n = e.cache[t] || e.cache[u(e, t)];
            return r && n && (r = "DIR" !== n && !Array.isArray(n)), r;
          }));
      }
      e.ignore.length &&
        (r = r.filter(function (t) {
          return !f(e, t);
        }));
      e.found = r;
    }),
    (Zc.mark = function (e, t) {
      var r = u(e, t),
        n = e.cache[r],
        o = t;
      if (n) {
        var i = "DIR" === n || Array.isArray(n),
          s = "/" === t.slice(-1);
        if ((i && !s ? (o += "/") : !i && s && (o = o.slice(0, -1)), o !== t)) {
          var a = u(e, o);
          (e.statCache[a] = e.statCache[r]), (e.cache[a] = e.cache[r]);
        }
      }
      return o;
    }),
    (Zc.isIgnored = f),
    (Zc.childrenIgnored = function (e, t) {
      return (
        !!e.ignore.length &&
        e.ignore.some(function (e) {
          return !(!e.gmatcher || !e.gmatcher.match(t));
        })
      );
    });
  var r = t,
    n = a,
    o = Bc(),
    i = Xc(),
    s = o.Minimatch;
  function c(e, t) {
    return e.localeCompare(t, "en");
  }
  function l(e) {
    var t = null;
    if ("/**" === e.slice(-3)) {
      var r = e.replace(/(\/\*\*)+$/, "");
      t = new s(r, { dot: !0 });
    }
    return { matcher: new s(e, { dot: !0 }), gmatcher: t };
  }
  function u(e, t) {
    var r = t;
    return (
      (r =
        "/" === t.charAt(0)
          ? n.join(e.root, t)
          : i(t) || "" === t
            ? t
            : e.changedCwd
              ? n.resolve(e.cwd, t)
              : n.resolve(t)),
      "win32" === process.platform && (r = r.replace(/\\/g, "/")),
      r
    );
  }
  function f(e, t) {
    return (
      !!e.ignore.length &&
      e.ignore.some(function (e) {
        return e.matcher.match(t) || !(!e.gmatcher || !e.gmatcher.match(t));
      })
    );
  }
  return Zc;
}
function tl() {
  if (Jc) return Qc;
  return (
    (Jc = 1),
    (Qc = function e(t, r) {
      if (t && r) return e(t)(r);
      if ("function" != typeof t) throw new TypeError("need wrapper function");
      return (
        Object.keys(t).forEach(function (e) {
          n[e] = t[e];
        }),
        n
      );
      function n() {
        for (var e = new Array(arguments.length), r = 0; r < e.length; r++)
          e[r] = arguments[r];
        var n = t.apply(this, e),
          o = e[e.length - 1];
        return (
          "function" == typeof n &&
            n !== o &&
            Object.keys(o).forEach(function (e) {
              n[e] = o[e];
            }),
          n
        );
      }
    }),
    Qc
  );
}
var rl,
  nl,
  ol,
  il,
  sl,
  al,
  cl,
  ll,
  ul,
  fl,
  pl,
  dl,
  hl,
  ml,
  gl = { exports: {} };
function yl() {
  if (rl) return gl.exports;
  rl = 1;
  var e = tl();
  function t(e) {
    var t = function () {
      return t.called
        ? t.value
        : ((t.called = !0), (t.value = e.apply(this, arguments)));
    };
    return (t.called = !1), t;
  }
  function r(e) {
    var t = function () {
        if (t.called) throw new Error(t.onceError);
        return (t.called = !0), (t.value = e.apply(this, arguments));
      },
      r = e.name || "Function wrapped with `once`";
    return (
      (t.onceError = r + " shouldn't be called more than once"),
      (t.called = !1),
      t
    );
  }
  return (
    (gl.exports = e(t)),
    (gl.exports.strict = e(r)),
    (t.proto = t(function () {
      Object.defineProperty(Function.prototype, "once", {
        value: function () {
          return t(this);
        },
        configurable: !0,
      }),
        Object.defineProperty(Function.prototype, "onceStrict", {
          value: function () {
            return r(this);
          },
          configurable: !0,
        });
    })),
    gl.exports
  );
}
function bl() {
  if (ol) return nl;
  ol = 1;
  var e = tl(),
    t = Object.create(null),
    r = yl();
  return (
    (nl = e(function (e, n) {
      return t[e]
        ? (t[e].push(n), null)
        : ((t[e] = [n]),
          (function (e) {
            return r(function r() {
              var n = t[e],
                o = n.length,
                i = (function (e) {
                  for (var t = e.length, r = [], n = 0; n < t; n++) r[n] = e[n];
                  return r;
                })(arguments);
              try {
                for (var s = 0; s < o; s++) n[s].apply(null, i);
              } finally {
                n.length > o
                  ? (n.splice(0, o),
                    process.nextTick(function () {
                      r.apply(null, i);
                    }))
                  : delete t[e];
              }
            });
          })(e));
    })),
    nl
  );
}
function vl() {
  if (sl) return il;
  (sl = 1), (il = b);
  var e = Ic(),
    t = Bc();
  t.Minimatch;
  var r = zc(),
    n = c.EventEmitter,
    o = a,
    i = l,
    s = Xc(),
    u = (function () {
      if (Yc) return Kc;
      (Yc = 1), (Kc = p), (p.GlobSync = d);
      var e = Ic(),
        t = Bc();
      t.Minimatch, vl().Glob;
      var r = a,
        n = l,
        o = Xc(),
        i = el(),
        s = i.setopts,
        c = i.ownProp,
        u = i.childrenIgnored,
        f = i.isIgnored;
      function p(e, t) {
        if ("function" == typeof t || 3 === arguments.length)
          throw new TypeError(
            "callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167"
          );
        return new d(e, t).found;
      }
      function d(e, t) {
        if (!e) throw new Error("must provide pattern");
        if ("function" == typeof t || 3 === arguments.length)
          throw new TypeError(
            "callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167"
          );
        if (!(this instanceof d)) return new d(e, t);
        if ((s(this, e, t), this.noprocess)) return this;
        var r = this.minimatch.set.length;
        this.matches = new Array(r);
        for (var n = 0; n < r; n++) this._process(this.minimatch.set[n], n, !1);
        this._finish();
      }
      return (
        (d.prototype._finish = function () {
          if ((n.ok(this instanceof d), this.realpath)) {
            var t = this;
            this.matches.forEach(function (r, n) {
              var o = (t.matches[n] = Object.create(null));
              for (var i in r)
                try {
                  (i = t._makeAbs(i)),
                    (o[e.realpathSync(i, t.realpathCache)] = !0);
                } catch (e) {
                  if ("stat" !== e.syscall) throw e;
                  o[t._makeAbs(i)] = !0;
                }
            });
          }
          i.finish(this);
        }),
        (d.prototype._process = function (e, r, i) {
          n.ok(this instanceof d);
          for (var s, a = 0; "string" == typeof e[a]; ) a++;
          switch (a) {
            case e.length:
              return void this._processSimple(e.join("/"), r);
            case 0:
              s = null;
              break;
            default:
              s = e.slice(0, a).join("/");
          }
          var c,
            l = e.slice(a);
          null === s
            ? (c = ".")
            : o(s) ||
                o(
                  e
                    .map(function (e) {
                      return "string" == typeof e ? e : "[*]";
                    })
                    .join("/")
                )
              ? ((s && o(s)) || (s = "/" + s), (c = s))
              : (c = s);
          var f = this._makeAbs(c);
          u(this, c) ||
            (l[0] === t.GLOBSTAR
              ? this._processGlobStar(s, c, f, l, r, i)
              : this._processReaddir(s, c, f, l, r, i));
        }),
        (d.prototype._processReaddir = function (e, t, n, o, i, s) {
          var a = this._readdir(n, s);
          if (a) {
            for (
              var c = o[0],
                l = !!this.minimatch.negate,
                u = c._glob,
                f = this.dot || "." === u.charAt(0),
                p = [],
                d = 0;
              d < a.length;
              d++
            )
              ("." !== (g = a[d]).charAt(0) || f) &&
                (l && !e ? !g.match(c) : g.match(c)) &&
                p.push(g);
            var h = p.length;
            if (0 !== h)
              if (1 !== o.length || this.mark || this.stat)
                for (o.shift(), d = 0; d < h; d++) {
                  var m;
                  (g = p[d]),
                    (m = e ? [e, g] : [g]),
                    this._process(m.concat(o), i, s);
                }
              else {
                this.matches[i] || (this.matches[i] = Object.create(null));
                for (d = 0; d < h; d++) {
                  var g = p[d];
                  e && (g = "/" !== e.slice(-1) ? e + "/" + g : e + g),
                    "/" !== g.charAt(0) ||
                      this.nomount ||
                      (g = r.join(this.root, g)),
                    this._emitMatch(i, g);
                }
              }
          }
        }),
        (d.prototype._emitMatch = function (e, t) {
          if (!f(this, t)) {
            var r = this._makeAbs(t);
            if (
              (this.mark && (t = this._mark(t)),
              this.absolute && (t = r),
              !this.matches[e][t])
            ) {
              if (this.nodir) {
                var n = this.cache[r];
                if ("DIR" === n || Array.isArray(n)) return;
              }
              (this.matches[e][t] = !0), this.stat && this._stat(t);
            }
          }
        }),
        (d.prototype._readdirInGlobStar = function (e) {
          if (this.follow) return this._readdir(e, !1);
          var t, r;
          try {
            r = this.fs.lstatSync(e);
          } catch (e) {
            if ("ENOENT" === e.code) return null;
          }
          var n = r && r.isSymbolicLink();
          return (
            (this.symlinks[e] = n),
            n || !r || r.isDirectory()
              ? (t = this._readdir(e, !1))
              : (this.cache[e] = "FILE"),
            t
          );
        }),
        (d.prototype._readdir = function (e, t) {
          if (t && !c(this.symlinks, e)) return this._readdirInGlobStar(e);
          if (c(this.cache, e)) {
            var r = this.cache[e];
            if (!r || "FILE" === r) return null;
            if (Array.isArray(r)) return r;
          }
          try {
            return this._readdirEntries(e, this.fs.readdirSync(e));
          } catch (t) {
            return this._readdirError(e, t), null;
          }
        }),
        (d.prototype._readdirEntries = function (e, t) {
          if (!this.mark && !this.stat)
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n = "/" === e ? e + n : e + "/" + n), (this.cache[n] = !0);
            }
          return (this.cache[e] = t), t;
        }),
        (d.prototype._readdirError = function (e, t) {
          switch (t.code) {
            case "ENOTSUP":
            case "ENOTDIR":
              var r = this._makeAbs(e);
              if (((this.cache[r] = "FILE"), r === this.cwdAbs)) {
                var n = new Error(t.code + " invalid cwd " + this.cwd);
                throw ((n.path = this.cwd), (n.code = t.code), n);
              }
              break;
            case "ENOENT":
            case "ELOOP":
            case "ENAMETOOLONG":
            case "UNKNOWN":
              this.cache[this._makeAbs(e)] = !1;
              break;
            default:
              if (((this.cache[this._makeAbs(e)] = !1), this.strict)) throw t;
              this.silent || console.error("glob error", t);
          }
        }),
        (d.prototype._processGlobStar = function (e, t, r, n, o, i) {
          var s = this._readdir(r, i);
          if (s) {
            var a = n.slice(1),
              c = e ? [e] : [],
              l = c.concat(a);
            this._process(l, o, !1);
            var u = s.length;
            if (!this.symlinks[r] || !i)
              for (var f = 0; f < u; f++)
                if ("." !== s[f].charAt(0) || this.dot) {
                  var p = c.concat(s[f], a);
                  this._process(p, o, !0);
                  var d = c.concat(s[f], n);
                  this._process(d, o, !0);
                }
          }
        }),
        (d.prototype._processSimple = function (e, t) {
          var n = this._stat(e);
          if ((this.matches[t] || (this.matches[t] = Object.create(null)), n)) {
            if (e && o(e) && !this.nomount) {
              var i = /[\/\\]$/.test(e);
              "/" === e.charAt(0)
                ? (e = r.join(this.root, e))
                : ((e = r.resolve(this.root, e)), i && (e += "/"));
            }
            "win32" === process.platform && (e = e.replace(/\\/g, "/")),
              this._emitMatch(t, e);
          }
        }),
        (d.prototype._stat = function (e) {
          var t = this._makeAbs(e),
            r = "/" === e.slice(-1);
          if (e.length > this.maxLength) return !1;
          if (!this.stat && c(this.cache, t)) {
            var n = this.cache[t];
            if ((Array.isArray(n) && (n = "DIR"), !r || "DIR" === n)) return n;
            if (r && "FILE" === n) return !1;
          }
          var o = this.statCache[t];
          if (!o) {
            var i;
            try {
              i = this.fs.lstatSync(t);
            } catch (e) {
              if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code))
                return (this.statCache[t] = !1), !1;
            }
            if (i && i.isSymbolicLink())
              try {
                o = this.fs.statSync(t);
              } catch (e) {
                o = i;
              }
            else o = i;
          }
          return (
            (this.statCache[t] = o),
            (n = !0),
            o && (n = o.isDirectory() ? "DIR" : "FILE"),
            (this.cache[t] = this.cache[t] || n),
            (!r || "FILE" !== n) && n
          );
        }),
        (d.prototype._mark = function (e) {
          return i.mark(this, e);
        }),
        (d.prototype._makeAbs = function (e) {
          return i.makeAbs(this, e);
        }),
        Kc
      );
    })(),
    f = el(),
    p = f.setopts,
    d = f.ownProp,
    h = bl(),
    m = f.childrenIgnored,
    g = f.isIgnored,
    y = yl();
  function b(e, t, r) {
    if (
      ("function" == typeof t && ((r = t), (t = {})), t || (t = {}), t.sync)
    ) {
      if (r) throw new TypeError("callback provided to sync glob");
      return u(e, t);
    }
    return new w(e, t, r);
  }
  b.sync = u;
  var v = (b.GlobSync = u.GlobSync);
  function w(e, t, r) {
    if (("function" == typeof t && ((r = t), (t = null)), t && t.sync)) {
      if (r) throw new TypeError("callback provided to sync glob");
      return new v(e, t);
    }
    if (!(this instanceof w)) return new w(e, t, r);
    p(this, e, t), (this._didRealPath = !1);
    var n = this.minimatch.set.length;
    (this.matches = new Array(n)),
      "function" == typeof r &&
        ((r = y(r)),
        this.on("error", r),
        this.on("end", function (e) {
          r(null, e);
        }));
    var o = this;
    if (
      ((this._processing = 0),
      (this._emitQueue = []),
      (this._processQueue = []),
      (this.paused = !1),
      this.noprocess)
    )
      return this;
    if (0 === n) return a();
    for (var i = !0, s = 0; s < n; s++)
      this._process(this.minimatch.set[s], s, !1, a);
    function a() {
      --o._processing,
        o._processing <= 0 &&
          (i
            ? process.nextTick(function () {
                o._finish();
              })
            : o._finish());
    }
    i = !1;
  }
  return (
    (b.glob = b),
    (b.hasMagic = function (e, t) {
      var r = (function (e, t) {
        if (null === t || "object" != typeof t) return e;
        for (var r = Object.keys(t), n = r.length; n--; ) e[r[n]] = t[r[n]];
        return e;
      })({}, t);
      r.noprocess = !0;
      var n = new w(e, r).minimatch.set;
      if (!e) return !1;
      if (n.length > 1) return !0;
      for (var o = 0; o < n[0].length; o++)
        if ("string" != typeof n[0][o]) return !0;
      return !1;
    }),
    (b.Glob = w),
    r(w, n),
    (w.prototype._finish = function () {
      if ((i(this instanceof w), !this.aborted)) {
        if (this.realpath && !this._didRealpath) return this._realpath();
        f.finish(this), this.emit("end", this.found);
      }
    }),
    (w.prototype._realpath = function () {
      if (!this._didRealpath) {
        this._didRealpath = !0;
        var e = this.matches.length;
        if (0 === e) return this._finish();
        for (var t = this, r = 0; r < this.matches.length; r++)
          this._realpathSet(r, n);
      }
      function n() {
        0 == --e && t._finish();
      }
    }),
    (w.prototype._realpathSet = function (t, r) {
      var n = this.matches[t];
      if (!n) return r();
      var o = Object.keys(n),
        i = this,
        s = o.length;
      if (0 === s) return r();
      var a = (this.matches[t] = Object.create(null));
      o.forEach(function (n, o) {
        (n = i._makeAbs(n)),
          e.realpath(n, i.realpathCache, function (e, o) {
            e
              ? "stat" === e.syscall
                ? (a[n] = !0)
                : i.emit("error", e)
              : (a[o] = !0),
              0 == --s && ((i.matches[t] = a), r());
          });
      });
    }),
    (w.prototype._mark = function (e) {
      return f.mark(this, e);
    }),
    (w.prototype._makeAbs = function (e) {
      return f.makeAbs(this, e);
    }),
    (w.prototype.abort = function () {
      (this.aborted = !0), this.emit("abort");
    }),
    (w.prototype.pause = function () {
      this.paused || ((this.paused = !0), this.emit("pause"));
    }),
    (w.prototype.resume = function () {
      if (this.paused) {
        if ((this.emit("resume"), (this.paused = !1), this._emitQueue.length)) {
          var e = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var t = 0; t < e.length; t++) {
            var r = e[t];
            this._emitMatch(r[0], r[1]);
          }
        }
        if (this._processQueue.length) {
          var n = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (t = 0; t < n.length; t++) {
            var o = n[t];
            this._processing--, this._process(o[0], o[1], o[2], o[3]);
          }
        }
      }
    }),
    (w.prototype._process = function (e, r, n, o) {
      if ((i(this instanceof w), i("function" == typeof o), !this.aborted))
        if ((this._processing++, this.paused))
          this._processQueue.push([e, r, n, o]);
        else {
          for (var a, c = 0; "string" == typeof e[c]; ) c++;
          switch (c) {
            case e.length:
              return void this._processSimple(e.join("/"), r, o);
            case 0:
              a = null;
              break;
            default:
              a = e.slice(0, c).join("/");
          }
          var l,
            u = e.slice(c);
          null === a
            ? (l = ".")
            : s(a) ||
                s(
                  e
                    .map(function (e) {
                      return "string" == typeof e ? e : "[*]";
                    })
                    .join("/")
                )
              ? ((a && s(a)) || (a = "/" + a), (l = a))
              : (l = a);
          var f = this._makeAbs(l);
          if (m(this, l)) return o();
          u[0] === t.GLOBSTAR
            ? this._processGlobStar(a, l, f, u, r, n, o)
            : this._processReaddir(a, l, f, u, r, n, o);
        }
    }),
    (w.prototype._processReaddir = function (e, t, r, n, o, i, s) {
      var a = this;
      this._readdir(r, i, function (c, l) {
        return a._processReaddir2(e, t, r, n, o, i, l, s);
      });
    }),
    (w.prototype._processReaddir2 = function (e, t, r, n, i, s, a, c) {
      if (!a) return c();
      for (
        var l = n[0],
          u = !!this.minimatch.negate,
          f = l._glob,
          p = this.dot || "." === f.charAt(0),
          d = [],
          h = 0;
        h < a.length;
        h++
      ) {
        if ("." !== (g = a[h]).charAt(0) || p)
          (u && !e ? !g.match(l) : g.match(l)) && d.push(g);
      }
      var m = d.length;
      if (0 === m) return c();
      if (1 === n.length && !this.mark && !this.stat) {
        this.matches[i] || (this.matches[i] = Object.create(null));
        for (h = 0; h < m; h++) {
          var g = d[h];
          e && (g = "/" !== e ? e + "/" + g : e + g),
            "/" !== g.charAt(0) || this.nomount || (g = o.join(this.root, g)),
            this._emitMatch(i, g);
        }
        return c();
      }
      n.shift();
      for (h = 0; h < m; h++) {
        g = d[h];
        e && (g = "/" !== e ? e + "/" + g : e + g),
          this._process([g].concat(n), i, s, c);
      }
      c();
    }),
    (w.prototype._emitMatch = function (e, t) {
      if (!this.aborted && !g(this, t))
        if (this.paused) this._emitQueue.push([e, t]);
        else {
          var r = s(t) ? t : this._makeAbs(t);
          if (
            (this.mark && (t = this._mark(t)),
            this.absolute && (t = r),
            !this.matches[e][t])
          ) {
            if (this.nodir) {
              var n = this.cache[r];
              if ("DIR" === n || Array.isArray(n)) return;
            }
            this.matches[e][t] = !0;
            var o = this.statCache[r];
            o && this.emit("stat", t, o), this.emit("match", t);
          }
        }
    }),
    (w.prototype._readdirInGlobStar = function (e, t) {
      if (!this.aborted) {
        if (this.follow) return this._readdir(e, !1, t);
        var r = this,
          n = h("lstat\0" + e, function (n, o) {
            if (n && "ENOENT" === n.code) return t();
            var i = o && o.isSymbolicLink();
            (r.symlinks[e] = i),
              i || !o || o.isDirectory()
                ? r._readdir(e, !1, t)
                : ((r.cache[e] = "FILE"), t());
          });
        n && r.fs.lstat(e, n);
      }
    }),
    (w.prototype._readdir = function (e, t, r) {
      if (!this.aborted && (r = h("readdir\0" + e + "\0" + t, r))) {
        if (t && !d(this.symlinks, e)) return this._readdirInGlobStar(e, r);
        if (d(this.cache, e)) {
          var n = this.cache[e];
          if (!n || "FILE" === n) return r();
          if (Array.isArray(n)) return r(null, n);
        }
        this.fs.readdir(
          e,
          (function (e, t, r) {
            return function (n, o) {
              n ? e._readdirError(t, n, r) : e._readdirEntries(t, o, r);
            };
          })(this, e, r)
        );
      }
    }),
    (w.prototype._readdirEntries = function (e, t, r) {
      if (!this.aborted) {
        if (!this.mark && !this.stat)
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o = "/" === e ? e + o : e + "/" + o), (this.cache[o] = !0);
          }
        return (this.cache[e] = t), r(null, t);
      }
    }),
    (w.prototype._readdirError = function (e, t, r) {
      if (!this.aborted) {
        switch (t.code) {
          case "ENOTSUP":
          case "ENOTDIR":
            var n = this._makeAbs(e);
            if (((this.cache[n] = "FILE"), n === this.cwdAbs)) {
              var o = new Error(t.code + " invalid cwd " + this.cwd);
              (o.path = this.cwd),
                (o.code = t.code),
                this.emit("error", o),
                this.abort();
            }
            break;
          case "ENOENT":
          case "ELOOP":
          case "ENAMETOOLONG":
          case "UNKNOWN":
            this.cache[this._makeAbs(e)] = !1;
            break;
          default:
            (this.cache[this._makeAbs(e)] = !1),
              this.strict && (this.emit("error", t), this.abort()),
              this.silent || console.error("glob error", t);
        }
        return r();
      }
    }),
    (w.prototype._processGlobStar = function (e, t, r, n, o, i, s) {
      var a = this;
      this._readdir(r, i, function (c, l) {
        a._processGlobStar2(e, t, r, n, o, i, l, s);
      });
    }),
    (w.prototype._processGlobStar2 = function (e, t, r, n, o, i, s, a) {
      if (!s) return a();
      var c = n.slice(1),
        l = e ? [e] : [],
        u = l.concat(c);
      this._process(u, o, !1, a);
      var f = this.symlinks[r],
        p = s.length;
      if (f && i) return a();
      for (var d = 0; d < p; d++) {
        if ("." !== s[d].charAt(0) || this.dot) {
          var h = l.concat(s[d], c);
          this._process(h, o, !0, a);
          var m = l.concat(s[d], n);
          this._process(m, o, !0, a);
        }
      }
      a();
    }),
    (w.prototype._processSimple = function (e, t, r) {
      var n = this;
      this._stat(e, function (o, i) {
        n._processSimple2(e, t, o, i, r);
      });
    }),
    (w.prototype._processSimple2 = function (e, t, r, n, i) {
      if ((this.matches[t] || (this.matches[t] = Object.create(null)), !n))
        return i();
      if (e && s(e) && !this.nomount) {
        var a = /[\/\\]$/.test(e);
        "/" === e.charAt(0)
          ? (e = o.join(this.root, e))
          : ((e = o.resolve(this.root, e)), a && (e += "/"));
      }
      "win32" === process.platform && (e = e.replace(/\\/g, "/")),
        this._emitMatch(t, e),
        i();
    }),
    (w.prototype._stat = function (e, t) {
      var r = this._makeAbs(e),
        n = "/" === e.slice(-1);
      if (e.length > this.maxLength) return t();
      if (!this.stat && d(this.cache, r)) {
        var o = this.cache[r];
        if ((Array.isArray(o) && (o = "DIR"), !n || "DIR" === o))
          return t(null, o);
        if (n && "FILE" === o) return t();
      }
      var i = this.statCache[r];
      if (void 0 !== i) {
        if (!1 === i) return t(null, i);
        var s = i.isDirectory() ? "DIR" : "FILE";
        return n && "FILE" === s ? t() : t(null, s, i);
      }
      var a = this,
        c = h("stat\0" + r, function (n, o) {
          if (o && o.isSymbolicLink())
            return a.fs.stat(r, function (n, i) {
              n ? a._stat2(e, r, null, o, t) : a._stat2(e, r, n, i, t);
            });
          a._stat2(e, r, n, o, t);
        });
      c && a.fs.lstat(r, c);
    }),
    (w.prototype._stat2 = function (e, t, r, n, o) {
      if (r && ("ENOENT" === r.code || "ENOTDIR" === r.code))
        return (this.statCache[t] = !1), o();
      var i = "/" === e.slice(-1);
      if (
        ((this.statCache[t] = n), "/" === t.slice(-1) && n && !n.isDirectory())
      )
        return o(null, !1, n);
      var s = !0;
      return (
        n && (s = n.isDirectory() ? "DIR" : "FILE"),
        (this.cache[t] = this.cache[t] || s),
        i && "FILE" === s ? o() : o(null, s, n)
      );
    }),
    il
  );
}
function wl() {
  if (al) return Ec;
  al = 1;
  var r = e,
    n = t,
    o = vl(),
    i = sf(),
    s = Object.create(i);
  Ec.extend = Object.assign;
  var a = Boolean(process.versions.electron),
    c = {
      fatal: !1,
      globOptions: {},
      maxdepth: 255,
      noglob: !1,
      silent: !1,
      verbose: !1,
      execPath: null,
      bufLength: 65536,
    },
    l = {
      reset: function () {
        Object.assign(this, c), a || (this.execPath = process.execPath);
      },
      resetForTesting: function () {
        this.reset(), (this.silent = !0);
      },
    };
  l.reset(), (Ec.config = l);
  var u = { error: null, errorCode: 0, currentCmd: "shell.js" };
  function f(e) {
    return "object" == typeof e && null !== e;
  }
  function p() {
    l.silent || console.error.apply(console, arguments);
  }
  function d(e) {
    if ("string" != typeof e) throw new TypeError("input must be a string");
    return e.replace(/\\/g, "/");
  }
  function h(e, t, r) {
    if ("string" != typeof e) throw new Error("msg must be a string");
    var n = { continue: !1, code: 1, prefix: u.currentCmd + ": ", silent: !1 };
    "number" == typeof t && f(r)
      ? (r.code = t)
      : f(t)
        ? (r = t)
        : "number" == typeof t
          ? (r = { code: t })
          : "number" != typeof t && (r = {}),
      (r = Object.assign({}, n, r)),
      u.errorCode || (u.errorCode = r.code);
    var o = d(r.prefix + e);
    if (((u.error = u.error ? u.error + "\n" : ""), (u.error += o), l.fatal))
      throw new Error(o);
    if ((e.length > 0 && !r.silent && p(o), !r.continue))
      throw { msg: "earlyExit", retValue: new m("", u.error, u.errorCode) };
  }
  function m(e, t, r) {
    var n;
    return (
      e instanceof Array
        ? (((n = e).stdout = e.join("\n")), e.length > 0 && (n.stdout += "\n"))
        : ((n = new String(e)).stdout = e),
      (n.stderr = t),
      (n.code = r),
      E.forEach(function (e) {
        n[e] = s[e].bind(n);
      }),
      n
    );
  }
  function g(e, t, r) {
    if ("string" != typeof e && !f(e))
      throw new Error("options must be strings or key-value pairs");
    if (!f(t))
      throw new Error("parseOptions() internal error: map must be an object");
    if (r && !f(r))
      throw new Error(
        "parseOptions() internal error: errorOptions must be object"
      );
    if ("--" === e) return {};
    var n = {};
    if (
      (Object.keys(t).forEach(function (e) {
        var r = t[e];
        "!" !== r[0] && (n[r] = !1);
      }),
      "" === e)
    )
      return n;
    if ("string" == typeof e) {
      if ("-" !== e[0]) throw new Error("Options string must start with a '-'");
      e.slice(1)
        .split("")
        .forEach(function (e) {
          if (e in t) {
            var o = t[e];
            "!" === o[0] ? (n[o.slice(1)] = !1) : (n[o] = !0);
          } else h("option not recognized: " + e, r || {});
        });
    } else
      Object.keys(e).forEach(function (o) {
        var i = o[1];
        if (i in t) {
          var s = t[i];
          n[s] = e[o];
        } else h("option not recognized: " + i, r || {});
      });
    return n;
  }
  function y(e) {
    if (!Array.isArray(e)) throw new TypeError("must be an array");
    var t = [];
    return (
      e.forEach(function (e) {
        if ("string" != typeof e) t.push(e);
        else {
          var r;
          try {
            r = (r = o.sync(e, l.globOptions)).length > 0 ? r : [e];
          } catch (t) {
            r = [e];
          }
          t = t.concat(r);
        }
      }),
      t
    );
  }
  (Ec.state = u),
    delete process.env.OLDPWD,
    (Ec.isObject = f),
    (Ec.log = p),
    (Ec.convertErrorOutput = d),
    (Ec.error = h),
    (Ec.ShellString = m),
    (Ec.parseOptions = g),
    (Ec.expand = y);
  var b =
    "function" == typeof Buffer.alloc
      ? function (e) {
          return Buffer.alloc(e || l.bufLength);
        }
      : function (e) {
          return new Buffer(e || l.bufLength);
        };
  function v(e, t, n) {
    return (
      (n = n || {}),
      function () {
        var o = null;
        (u.currentCmd = e), (u.error = null), (u.errorCode = 0);
        try {
          var i = [].slice.call(arguments, 0);
          if (
            (l.verbose && console.error.apply(console, [e].concat(i)),
            (u.pipedValue =
              this && "string" == typeof this.stdout ? this.stdout : ""),
            !1 === n.unix)
          )
            o = t.apply(this, i);
          else {
            (f(i[0]) && "Object" === i[0].constructor.name) ||
              ((0 === i.length ||
                "string" != typeof i[0] ||
                i[0].length <= 1 ||
                "-" !== i[0][0]) &&
                i.unshift("")),
              (i = (i = i.reduce(function (e, t) {
                return Array.isArray(t) ? e.concat(t) : (e.push(t), e);
              }, [])).map(function (e) {
                return f(e) && "String" === e.constructor.name
                  ? e.toString()
                  : e;
              }));
            var s = r.homedir();
            (i = i.map(function (e) {
              return ("string" == typeof e && "~/" === e.slice(0, 2)) ||
                "~" === e
                ? e.replace(/^~/, s)
                : e;
            })),
              l.noglob ||
                !0 !== n.allowGlobbing ||
                (i = i.slice(0, n.globStart).concat(y(i.slice(n.globStart))));
            try {
              f(n.cmdOptions) && (i[0] = g(i[0], n.cmdOptions)),
                (o = t.apply(this, i));
            } catch (e) {
              if ("earlyExit" !== e.msg) throw e;
              o = e.retValue;
            }
          }
        } catch (e) {
          if (!u.error) throw ((e.name = "ShellJSInternalError"), e);
          if (l.fatal) throw e;
        }
        return (
          n.wrapOutput &&
            ("string" == typeof o || Array.isArray(o)) &&
            (o = new m(o, u.error, u.errorCode)),
          (u.currentCmd = "shell.js"),
          o
        );
      }
    );
  }
  (Ec.buffer = b),
    (Ec.unlinkSync = function (e) {
      try {
        n.unlinkSync(e);
      } catch (t) {
        if ("EPERM" !== t.code) throw t;
        n.chmodSync(e, "0666"), n.unlinkSync(e);
      }
    }),
    (Ec.statFollowLinks = function () {
      return n.statSync.apply(n, arguments);
    }),
    (Ec.statNoFollowLinks = function () {
      return n.lstatSync.apply(n, arguments);
    }),
    (Ec.randomFileName = function () {
      return (
        "shelljs_" +
        (function e(t) {
          if (1 === t) return parseInt(16 * Math.random(), 10).toString(16);
          for (var r = "", n = 0; n < t; n++) r += e(1);
          return r;
        })(20)
      );
    }),
    (Ec.wrap = v),
    (Ec.readFromPipe = function () {
      return u.pipedValue;
    });
  var w = {
      allowGlobbing: !0,
      canReceivePipe: !1,
      cmdOptions: null,
      globStart: 1,
      pipeOnly: !1,
      wrapOutput: !0,
      unix: !0,
    },
    E = [];
  return (
    (Ec.register = function (e, t, r) {
      if (
        ((r = r || {}),
        Object.keys(r).forEach(function (e) {
          if (!w.hasOwnProperty(e))
            throw new Error("Unknown option '" + e + "'");
          if (typeof r[e] != typeof w[e])
            throw new TypeError(
              "Unsupported type '" + typeof r[e] + "' for option '" + e + "'"
            );
        }),
        (r = Object.assign({}, w, r)),
        i.hasOwnProperty(e))
      )
        throw new Error("Command `" + e + "` already exists");
      r.pipeOnly
        ? ((r.canReceivePipe = !0), (s[e] = v(e, t, r)))
        : (i[e] = v(e, t, r)),
        r.canReceivePipe && E.push(e);
    }),
    Ec
  );
}
function El() {
  if (ll) return cl;
  ll = 1;
  var e = wl(),
    r = t;
  function n(t, n) {
    var i = e.readFromPipe();
    return (
      n || i || e.error("no paths given"),
      (n = [].slice.call(arguments, 1)).forEach(function (t) {
        r.existsSync(t)
          ? e.statFollowLinks(t).isDirectory() &&
            e.error(t + ": Is a directory")
          : e.error("no such file or directory: " + t),
          (i += r.readFileSync(t, "utf8"));
      }),
      t.number &&
        (i = (function (e) {
          var t = e.split("\n"),
            r = t.pop();
          (t = t.map(function (e, t) {
            return o(t + 1, e);
          })),
            r.length && (r = o(t.length + 1, r));
          return t.push(r), t.join("\n");
        })(i)),
      i
    );
  }
  function o(e, t) {
    return ("     " + e).slice(-6) + "\t" + t;
  }
  return (
    e.register("cat", n, { canReceivePipe: !0, cmdOptions: { n: "number" } }),
    (cl = n)
  );
}
function Sl() {
  if (fl) return ul;
  fl = 1;
  var t = e,
    r = wl();
  function n(e, n) {
    n || (n = t.homedir()),
      "-" === n &&
        (process.env.OLDPWD
          ? (n = process.env.OLDPWD)
          : r.error("could not find previous directory"));
    try {
      var o = process.cwd();
      process.chdir(n), (process.env.OLDPWD = o);
    } catch (e) {
      var i;
      try {
        r.statFollowLinks(n), (i = "not a directory: " + n);
      } catch (e) {
        i = "no such file or directory: " + n;
      }
      i && r.error(i);
    }
    return "";
  }
  return r.register("cd", n, {}), (ul = n);
}
function Ol() {
  if (dl) return pl;
  dl = 1;
  var e,
    r = wl(),
    n = t,
    o = a,
    i = {
      OTHER_EXEC: (e = { EXEC: 1, WRITE: 2, READ: 4 }).EXEC,
      OTHER_WRITE: e.WRITE,
      OTHER_READ: e.READ,
      GROUP_EXEC: e.EXEC << 3,
      GROUP_WRITE: e.WRITE << 3,
      GROUP_READ: e.READ << 3,
      OWNER_EXEC: e.EXEC << 6,
      OWNER_WRITE: e.WRITE << 6,
      OWNER_READ: e.READ << 6,
      STICKY: parseInt("01000", 8),
      SETGID: parseInt("02000", 8),
      SETUID: parseInt("04000", 8),
      TYPE_MASK: parseInt("0770000", 8),
    };
  function s(e, t, s) {
    var a;
    return (
      s ||
        (e.length > 0 && "-" === e.charAt(0)
          ? [].unshift.call(arguments, "")
          : r.error("You must specify a file.")),
      (e = r.parseOptions(e, { R: "recursive", c: "changes", v: "verbose" })),
      (s = [].slice.call(arguments, 2)),
      e.recursive
        ? ((a = []),
          s.forEach(function e(t) {
            var o = r.statNoFollowLinks(t);
            o.isSymbolicLink() ||
              (a.push(t),
              o.isDirectory() &&
                n.readdirSync(t).forEach(function (r) {
                  e(t + "/" + r);
                }));
          }))
        : (a = s),
      a.forEach(function (s) {
        if (
          ((s = o.resolve(s)),
          n.existsSync(s) || r.error("File not found: " + s),
          !e.recursive || !r.statNoFollowLinks(s).isSymbolicLink())
        ) {
          var a = r.statFollowLinks(s),
            c = a.isDirectory(),
            l = a.mode,
            u = l & i.TYPE_MASK,
            f = l;
          isNaN(parseInt(t, 8))
            ? t.split(",").forEach(function (t) {
                var o = /([ugoa]*)([=\+-])([rwxXst]*)/i.exec(t);
                if (o) {
                  var a = o[1],
                    p = o[2],
                    d = o[3],
                    h = -1 !== a.indexOf("u") || "a" === a || "" === a,
                    m = -1 !== a.indexOf("g") || "a" === a || "" === a,
                    g = -1 !== a.indexOf("o") || "a" === a || "" === a,
                    y = -1 !== d.indexOf("r"),
                    b = -1 !== d.indexOf("w"),
                    v = -1 !== d.indexOf("x"),
                    w = -1 !== d.indexOf("X"),
                    E = -1 !== d.indexOf("t"),
                    S = -1 !== d.indexOf("s");
                  w && c && (v = !0);
                  var O = 0;
                  switch (
                    (h &&
                      (O |=
                        (y ? i.OWNER_READ : 0) +
                        (b ? i.OWNER_WRITE : 0) +
                        (v ? i.OWNER_EXEC : 0) +
                        (S ? i.SETUID : 0)),
                    m &&
                      (O |=
                        (y ? i.GROUP_READ : 0) +
                        (b ? i.GROUP_WRITE : 0) +
                        (v ? i.GROUP_EXEC : 0) +
                        (S ? i.SETGID : 0)),
                    g &&
                      (O |=
                        (y ? i.OTHER_READ : 0) +
                        (b ? i.OTHER_WRITE : 0) +
                        (v ? i.OTHER_EXEC : 0)),
                    E && (O |= i.STICKY),
                    p)
                  ) {
                    case "+":
                      f |= O;
                      break;
                    case "-":
                      f &= ~O;
                      break;
                    case "=":
                      (f = u + O),
                        r.statFollowLinks(s).isDirectory() &&
                          (f |= (i.SETUID + i.SETGID) & l);
                      break;
                    default:
                      r.error("Could not recognize operator: `" + p + "`");
                  }
                  e.verbose && console.log(s + " -> " + f.toString(8)),
                    l !== f &&
                      (!e.verbose &&
                        e.changes &&
                        console.log(s + " -> " + f.toString(8)),
                      n.chmodSync(s, f),
                      (l = f));
                } else r.error("Invalid symbolic mode change: " + t);
              })
            : ((f = u + parseInt(t, 8)),
              r.statFollowLinks(s).isDirectory() &&
                (f |= (i.SETUID + i.SETGID) & l),
              n.chmodSync(s, f));
        }
      }),
      ""
    );
  }
  return r.register("chmod", s, {}), (pl = s);
}
function Il() {
  if (ml) return hl;
  ml = 1;
  var e = t,
    r = a,
    n = wl();
  function o(t, r, o) {
    e.existsSync(t) || n.error("copyFileSync: no such file or directory: " + t);
    var i = "win32" === process.platform;
    try {
      if (o.update && n.statFollowLinks(t).mtime < e.statSync(r).mtime) return;
    } catch (e) {}
    if (n.statNoFollowLinks(t).isSymbolicLink() && !o.followsymlink) {
      try {
        n.statNoFollowLinks(r), n.unlinkSync(r);
      } catch (e) {}
      var s = e.readlinkSync(t);
      e.symlinkSync(s, r, i ? "junction" : null);
    } else {
      var a = n.buffer(),
        c = a.length,
        l = c,
        u = 0,
        f = null,
        p = null;
      try {
        f = e.openSync(t, "r");
      } catch (e) {
        n.error("copyFileSync: could not read src file (" + t + ")");
      }
      try {
        p = e.openSync(r, "w");
      } catch (e) {
        n.error(
          "copyFileSync: could not write to dest file (code=" +
            e.code +
            "):" +
            r
        );
      }
      for (; l === c; )
        (l = e.readSync(f, a, 0, c, u)), e.writeSync(p, a, 0, l), (u += l);
      e.closeSync(f), e.closeSync(p), e.chmodSync(r, n.statFollowLinks(t).mode);
    }
  }
  function i(t, r, a, c) {
    if ((c || (c = {}), !(a >= n.config.maxdepth))) {
      a++;
      var l = "win32" === process.platform;
      try {
        e.mkdirSync(r);
      } catch (e) {
        if ("EEXIST" !== e.code) throw e;
      }
      for (var u = e.readdirSync(t), f = 0; f < u.length; f++) {
        var p,
          d = t + "/" + u[f],
          h = r + "/" + u[f],
          m = n.statNoFollowLinks(d);
        if (c.followsymlink && s(t, d))
          console.error("Cycle link found."),
            (p = e.readlinkSync(d)),
            e.symlinkSync(p, h, l ? "junction" : null);
        else if (m.isDirectory()) i(d, h, a, c);
        else if (m.isSymbolicLink() && !c.followsymlink) {
          p = e.readlinkSync(d);
          try {
            n.statNoFollowLinks(h), n.unlinkSync(h);
          } catch (e) {}
          e.symlinkSync(p, h, l ? "junction" : null);
        } else
          m.isSymbolicLink() && c.followsymlink
            ? (m = n.statFollowLinks(d)).isDirectory()
              ? i(d, h, a, c)
              : o(d, h, c)
            : e.existsSync(h) && c.no_force
              ? n.log("skipping existing file: " + u[f])
              : o(d, h, c);
      }
      var g = n.statFollowLinks(t);
      e.chmodSync(r, g.mode);
    }
  }
  function s(t, r) {
    if (
      n.statNoFollowLinks(r).isSymbolicLink() &&
      n.statFollowLinks(r).isDirectory()
    ) {
      var o = e.realpathSync(t),
        i = e.realpathSync(r);
      if (new RegExp(i).test(o)) return !0;
    }
    return !1;
  }
  function c(t, s, a) {
    t.followsymlink && (t.noFollowsymlink = !1),
      t.recursive || t.noFollowsymlink || (t.followsymlink = !0),
      arguments.length < 3
        ? n.error("missing <source> and/or <dest>")
        : ((s = [].slice.call(arguments, 1, arguments.length - 1)),
          (a = arguments[arguments.length - 1]));
    var c = e.existsSync(a),
      l = c && n.statFollowLinks(a);
    return (
      (c && l.isDirectory()) ||
        !(s.length > 1) ||
        n.error("dest is not a directory (too many sources)"),
      c && l.isFile() && t.no_force
        ? new n.ShellString("", "", 0)
        : (s.forEach(function (c, u) {
            if (!e.existsSync(c))
              return (
                "" === c && (c = "''"),
                void n.error("no such file or directory: " + c, {
                  continue: !0,
                })
              );
            var f = n.statFollowLinks(c);
            if (!t.noFollowsymlink && f.isDirectory())
              if (t.recursive) {
                var p = l && l.isDirectory() ? r.join(a, r.basename(c)) : a;
                try {
                  n.statFollowLinks(r.dirname(a)),
                    i(c, p, 0, {
                      no_force: t.no_force,
                      followsymlink: t.followsymlink,
                    });
                } catch (e) {
                  n.error(
                    "cannot create directory '" +
                      a +
                      "': No such file or directory"
                  );
                }
              } else
                n.error("omitting directory '" + c + "'", { continue: !0 });
            else {
              var d = a;
              l &&
                l.isDirectory() &&
                (d = r.normalize(a + "/" + r.basename(c)));
              var h = e.existsSync(d);
              if (
                h &&
                (function (e, t) {
                  var n = e[t];
                  return e.slice(0, t).some(function (e) {
                    return r.basename(e) === r.basename(n);
                  });
                })(s, u)
              )
                return void (
                  t.no_force ||
                  n.error(
                    "will not overwrite just-created '" +
                      d +
                      "' with '" +
                      c +
                      "'",
                    { continue: !0 }
                  )
                );
              if (h && t.no_force) return;
              if ("" === r.relative(c, d))
                return void n.error(
                  "'" + d + "' and '" + c + "' are the same file",
                  { continue: !0 }
                );
              o(c, d, t);
            }
          }),
          new n.ShellString("", n.state.error, n.state.errorCode))
    );
  }
  return (
    n.register("cp", c, {
      cmdOptions: {
        f: "!no_force",
        n: "no_force",
        u: "update",
        R: "recursive",
        r: "recursive",
        L: "followsymlink",
        P: "noFollowsymlink",
      },
      wrapOutput: !1,
    }),
    (hl = c)
  );
}
var Tl,
  jl,
  xl,
  Rl,
  Al,
  Dl = {};
function Nl() {
  if (Tl) return Dl;
  Tl = 1;
  var e = wl(),
    t = Sl(),
    r = a;
  e.register("dirs", u, { wrapOutput: !1 }),
    e.register("pushd", c, { wrapOutput: !1 }),
    e.register("popd", l, { wrapOutput: !1 });
  var n = [];
  function o(e) {
    return /^[\-+]\d+$/.test(e);
  }
  function i(t) {
    if (o(t)) {
      if (Math.abs(t) < n.length + 1)
        return /^-/.test(t) ? Number(t) - 1 : Number(t);
      e.error(t + ": directory stack index out of range");
    } else e.error(t + ": invalid number");
  }
  function s() {
    return [process.cwd()].concat(n);
  }
  function c(a, c) {
    o(a) && ((c = a), (a = "")),
      (a = e.parseOptions(a, { n: "no-cd", q: "quiet" }));
    var l = s();
    if ("+0" === c) return l;
    if (c)
      if (o(c)) {
        var f = i(c);
        l = l.slice(f).concat(l.slice(0, f));
      } else a["no-cd"] ? l.splice(1, 0, c) : l.unshift(c);
    else {
      if (!(l.length > 1)) return e.error("no other directory");
      l = l.splice(1, 1).concat(l);
    }
    return (
      a["no-cd"] ? (l = l.slice(1)) : ((c = r.resolve(l.shift())), t("", c)),
      (n = l),
      u(a.quiet ? "-q" : "")
    );
  }
  function l(s, a) {
    if (
      (o(s) && ((a = s), (s = "")),
      (s = e.parseOptions(s, { n: "no-cd", q: "quiet" })),
      !n.length)
    )
      return e.error("directory stack empty");
    if (((a = i(a || "+0")), s["no-cd"] || a > 0 || n.length + a === 0))
      (a = a > 0 ? a - 1 : a), n.splice(a, 1);
    else {
      var c = r.resolve(n.shift());
      t("", c);
    }
    return u(s.quiet ? "-q" : "");
  }
  function u(t, r) {
    if (
      (o(t) && ((r = t), (t = "")),
      (t = e.parseOptions(t, { c: "clear", q: "quiet" })).clear)
    )
      return (n = []);
    var a = s();
    return r
      ? ((r = i(r)) < 0 && (r = a.length + r), t.quiet || e.log(a[r]), a[r])
      : (t.quiet || e.log(a.join(" ")), a);
  }
  return (Dl.pushd = c), (Dl.popd = l), (Dl.dirs = u), Dl;
}
function Ll() {
  if (xl) return jl;
  xl = 1;
  var e = u.format,
    t = wl();
  function r(r) {
    var n = [].slice.call(arguments, r ? 0 : 1),
      o = {};
    try {
      (o = t.parseOptions(
        n[0],
        { e: "escapes", n: "no_newline" },
        { silent: !0 }
      )),
        n[0] && n.shift();
    } catch (e) {
      t.state.error = null;
    }
    var i = e.apply(null, n);
    return o.no_newline || (i += "\n"), process.stdout.write(i), i;
  }
  return t.register("echo", r, { allowGlobbing: !1 }), (jl = r);
}
function kl() {
  if (Al) return Rl;
  Al = 1;
  var e = wl();
  return (Rl = function () {
    return e.state.error;
  });
}
var Cl,
  Pl = { exports: {} };
function Ml() {
  return (
    Cl ||
      ((Cl = 1),
      (function (e) {
        if (require.main !== e)
          throw new Error("This file should not be required");
        var r = f,
          n = t,
          o = process.argv[2],
          i = n.readFileSync(o, "utf8"),
          s = JSON.parse(i),
          a = s.command,
          c = s.execOptions,
          l = s.pipe,
          u = s.stdoutFile,
          p = s.stderrFile,
          d = r.exec(a, c, function (e) {
            e
              ? void 0 === e.code
                ? (process.exitCode = 1)
                : (process.exitCode = e.code)
              : (process.exitCode = 0);
          }),
          h = n.createWriteStream(u),
          m = n.createWriteStream(p);
        d.stdout.pipe(h),
          d.stderr.pipe(m),
          d.stdout.pipe(process.stdout),
          d.stderr.pipe(process.stderr),
          l && d.stdin.end(l);
      })(Pl)),
    Pl.exports
  );
}
Pl.exports;
var _l,
  $l,
  Bl,
  Fl,
  Ul,
  Gl,
  Wl,
  zl,
  Vl,
  Hl,
  Xl,
  ql,
  Kl,
  Yl,
  Ql,
  Jl,
  Zl,
  eu,
  tu,
  ru,
  nu,
  ou = {};
function iu() {
  if (_l) return ou;
  _l = 1;
  var r,
    n = wl(),
    o = e,
    i = t;
  function s(e) {
    if (!e || !i.existsSync(e)) return !1;
    if (!n.statFollowLinks(e).isDirectory()) return !1;
    var t = e + "/" + n.randomFileName();
    try {
      return i.writeFileSync(t, " "), n.unlinkSync(t), e;
    } catch (e) {
      return !1;
    }
  }
  function a() {
    return (
      r ||
      (r =
        s(o.tmpdir()) ||
        s(process.env.TMPDIR) ||
        s(process.env.TEMP) ||
        s(process.env.TMP) ||
        s(process.env.Wimp$ScrapDir) ||
        s("C:\\TEMP") ||
        s("C:\\TMP") ||
        s("\\TEMP") ||
        s("\\TMP") ||
        s("/tmp") ||
        s("/var/tmp") ||
        s("/usr/tmp") ||
        s("."))
    );
  }
  return (
    n.register("tempdir", a, { allowGlobbing: !1, wrapOutput: !1 }),
    (ou.tempDir = a),
    (ou.isCached = function () {
      return r;
    }),
    (ou.clearCache = function () {
      r = void 0;
    }),
    ou
  );
}
function su() {
  if (Bl) return $l;
  Bl = 1;
  var e = a;
  function t() {
    return e.resolve(process.cwd());
  }
  return wl().register("pwd", t, { allowGlobbing: !1 }), ($l = t);
}
function au() {
  if (Ul) return Fl;
  Ul = 1;
  var e = wl(),
    r = iu().tempDir,
    n = su(),
    o = a,
    i = t,
    s = f,
    c = 20971520,
    l = 1;
  function u(t, a, u) {
    (a = a || {}), t || e.error("must specify command");
    var f = e.readFromPipe();
    return (
      "function" == typeof a && ((u = a), (a = { async: !0 })),
      "object" == typeof a && "function" == typeof u && (a.async = !0),
      (a = e.extend({ silent: e.config.silent, async: !1 }, a)).async
        ? (function (t, r, o, i) {
            r = e.extend(
              {
                silent: e.config.silent,
                cwd: n().toString(),
                env: process.env,
                maxBuffer: c,
                encoding: "utf8",
              },
              r
            );
            var a = s.exec(t, r, function (e, t, r) {
              i &&
                (e
                  ? void 0 === e.code
                    ? i(1, t, r)
                    : i(e.code, t, r)
                  : i(0, t, r));
            });
            return (
              o && a.stdin.end(o),
              r.silent ||
                (a.stdout.pipe(process.stdout), a.stderr.pipe(process.stderr)),
              a
            );
          })(t, a, f, u)
        : (function (t, a, u) {
            e.config.execPath ||
              e.error(
                "Unable to find a path to the node binary. Please manually set config.execPath"
              );
            var f = r(),
              p = o.resolve(f + "/" + e.randomFileName()),
              d = o.resolve(f + "/" + e.randomFileName()),
              h = o.resolve(f + "/" + e.randomFileName());
            (a = e.extend(
              {
                silent: e.config.silent,
                cwd: n().toString(),
                env: process.env,
                maxBuffer: c,
                encoding: "utf8",
              },
              a
            )),
              i.existsSync(p) && e.unlinkSync(p),
              i.existsSync(d) && e.unlinkSync(d),
              i.existsSync(h) && e.unlinkSync(h),
              (a.cwd = o.resolve(a.cwd));
            var m = {
              command: t,
              execOptions: a,
              pipe: u,
              stdoutFile: h,
              stderrFile: d,
            };
            function g(e, t) {
              i.writeFileSync(e, t, {
                encoding: "utf8",
                mode: parseInt("600", 8),
              });
            }
            g(h, ""), g(d, ""), g(p, JSON.stringify(m));
            var y = [o.join(__dirname, "exec-child.js"), p];
            a.silent ? (a.stdio = "ignore") : (a.stdio = [0, 1, 2]);
            var b = 0;
            try {
              delete a.shell, s.execFileSync(e.config.execPath, y, a);
            } catch (e) {
              b = e.status || l;
            }
            var v = "",
              w = "";
            "buffer" === a.encoding
              ? ((v = i.readFileSync(h)), (w = i.readFileSync(d)))
              : ((v = i.readFileSync(h, a.encoding)),
                (w = i.readFileSync(d, a.encoding)));
            try {
              e.unlinkSync(p);
            } catch (e) {}
            try {
              e.unlinkSync(d);
            } catch (e) {}
            try {
              e.unlinkSync(h);
            } catch (e) {}
            return (
              0 !== b && e.error(w, b, { continue: !0, silent: !0 }),
              e.ShellString(v, w, b)
            );
          })(t, a, f)
    );
  }
  return (
    e.register("exec", u, { unix: !1, canReceivePipe: !0, wrapOutput: !1 }),
    (Fl = u)
  );
}
function cu() {
  if (Wl) return Gl;
  Wl = 1;
  var e = a,
    r = t,
    n = wl(),
    o = vl(),
    i = e.sep + "**";
  function s(t, s) {
    t.all_deprecated &&
      (n.log("ls: Option -a is deprecated. Use -A instead"), (t.all = !0)),
      (s = s ? [].slice.call(arguments, 1) : ["."]);
    var a = [];
    function c(e, r, o) {
      var i, s;
      "win32" === process.platform && (r = r.replace(/\\/g, "/")),
        t.long
          ? ((o =
              o || (t.link ? n.statFollowLinks(e) : n.statNoFollowLinks(e))),
            a.push(
              ((i = r),
              ((s = o).name = i),
              (s.toString = function () {
                return [
                  this.mode,
                  this.nlink,
                  this.uid,
                  this.gid,
                  this.size,
                  this.mtime,
                  this.name,
                ].join(" ");
              }),
              s)
            ))
          : a.push(r);
    }
    return (
      s.forEach(function (s) {
        var a;
        try {
          if (
            (a = t.link
              ? n.statFollowLinks(s)
              : n.statNoFollowLinks(s)).isSymbolicLink()
          )
            try {
              var l = n.statFollowLinks(s);
              l.isDirectory() && (a = l);
            } catch (e) {}
        } catch (e) {
          return void n.error("no such file or directory: " + s, 2, {
            continue: !0,
          });
        }
        a.isDirectory() && !t.directory
          ? t.recursive
            ? o
                .sync(s + i, { dot: t.all, follow: t.link })
                .forEach(function (t) {
                  e.relative(s, t) && c(t, e.relative(s, t));
                })
            : t.all
              ? r.readdirSync(s).forEach(function (t) {
                  c(e.join(s, t), t);
                })
              : r.readdirSync(s).forEach(function (t) {
                  "." !== t[0] && c(e.join(s, t), t);
                })
          : c(s, s, a);
      }),
      a
    );
  }
  return (
    n.register("ls", s, {
      cmdOptions: {
        R: "recursive",
        A: "all",
        L: "link",
        a: "all_deprecated",
        d: "directory",
        l: "long",
      },
    }),
    (Gl = s)
  );
}
function lu() {
  if (Vl) return zl;
  Vl = 1;
  var e = a,
    t = wl(),
    r = cu();
  function n(n, o) {
    o
      ? "string" == typeof o && (o = [].slice.call(arguments, 1))
      : t.error("no path specified");
    var i = [];
    function s(e) {
      "win32" === process.platform && (e = e.replace(/\\/g, "/")), i.push(e);
    }
    return (
      o.forEach(function (n) {
        var o;
        try {
          o = t.statFollowLinks(n);
        } catch (e) {
          t.error("no such file or directory: " + n);
        }
        s(n),
          o.isDirectory() &&
            r({ recursive: !0, all: !0 }, n).forEach(function (t) {
              s(e.join(n, t));
            });
      }),
      i
    );
  }
  return t.register("find", n, {}), (zl = n);
}
function uu() {
  if (Xl) return Hl;
  Xl = 1;
  var e = wl(),
    r = t;
  function n(t, n, o) {
    var i = e.readFromPipe();
    o || i || e.error("no paths given", 2),
      (o = [].slice.call(arguments, 2)),
      i && o.unshift("-");
    var s = [];
    return (
      t.ignoreCase && (n = new RegExp(n, "i")),
      o.forEach(function (o) {
        if (r.existsSync(o) || "-" === o) {
          var a = "-" === o ? i : r.readFileSync(o, "utf8");
          if (t.nameOnly) a.match(n) && s.push(o);
          else
            a.split("\n").forEach(function (e) {
              var r = e.match(n);
              ((t.inverse && !r) || (!t.inverse && r)) && s.push(e);
            });
        } else e.error("no such file or directory: " + o, 2, { continue: !0 });
      }),
      s.join("\n") + "\n"
    );
  }
  return (
    e.register("grep", n, {
      globStart: 2,
      canReceivePipe: !0,
      cmdOptions: { v: "inverse", l: "nameOnly", i: "ignoreCase" },
    }),
    (Hl = n)
  );
}
function fu() {
  if (Kl) return ql;
  Kl = 1;
  var e = wl(),
    r = t;
  function n(t, n) {
    var o = [],
      i = e.readFromPipe();
    n || i || e.error("no paths given");
    var s = 1;
    !0 === t.numLines
      ? ((s = 2), (t.numLines = Number(arguments[1])))
      : !1 === t.numLines && (t.numLines = 10),
      (n = [].slice.call(arguments, s)),
      i && n.unshift("-");
    var a = !1;
    return (
      n.forEach(function (n) {
        if ("-" !== n) {
          if (!r.existsSync(n))
            return void e.error("no such file or directory: " + n, {
              continue: !0,
            });
          if (e.statFollowLinks(n).isDirectory())
            return void e.error("error reading '" + n + "': Is a directory", {
              continue: !0,
            });
        }
        var s;
        s =
          "-" === n
            ? i
            : t.numLines < 0
              ? r.readFileSync(n, "utf8")
              : (function (t, n) {
                  for (
                    var o = e.buffer(),
                      i = o.length,
                      s = i,
                      a = 0,
                      c = r.openSync(t, "r"),
                      l = 0,
                      u = "";
                    s === i && l < n;

                  ) {
                    s = r.readSync(c, o, 0, i, a);
                    var f = o.toString("utf8", 0, s);
                    (l += f.split("\n").length - 1), (u += f), (a += s);
                  }
                  return r.closeSync(c), u;
                })(n, t.numLines);
        var c = s.split("\n"),
          l = "" === c[c.length - 1];
        l && c.pop(),
          (a = l || t.numLines < c.length),
          (o = o.concat(c.slice(0, t.numLines)));
      }),
      a && o.push(""),
      o.join("\n")
    );
  }
  return (
    e.register("head", n, {
      canReceivePipe: !0,
      cmdOptions: { n: "numLines" },
    }),
    (ql = n)
  );
}
function pu() {
  if (Ql) return Yl;
  Ql = 1;
  var e = t,
    r = a,
    n = wl();
  function o(t, o, i) {
    (o && i) || n.error("Missing <source> and/or <dest>"), (o = String(o));
    var s = r.normalize(o).replace(RegExp(r.sep + "$"), ""),
      a = r.resolve(o) === s;
    if (
      ((i = r.resolve(process.cwd(), String(i))),
      e.existsSync(i) &&
        (t.force || n.error("Destination file exists", { continue: !0 }),
        e.unlinkSync(i)),
      t.symlink)
    ) {
      var c = "win32" === process.platform,
        l = c ? "file" : null,
        u = a ? s : r.resolve(process.cwd(), r.dirname(i), o);
      e.existsSync(u)
        ? c && n.statFollowLinks(u).isDirectory() && (l = "junction")
        : n.error("Source file does not exist", { continue: !0 });
      try {
        e.symlinkSync("junction" === l ? u : o, i, l);
      } catch (e) {
        n.error(e.message);
      }
    } else {
      e.existsSync(o) ||
        n.error("Source file does not exist", { continue: !0 });
      try {
        e.linkSync(o, i);
      } catch (e) {
        n.error(e.message);
      }
    }
    return "";
  }
  return (
    n.register("ln", o, { cmdOptions: { s: "symlink", f: "force" } }), (Yl = o)
  );
}
function du() {
  if (Zl) return Jl;
  Zl = 1;
  var e = wl(),
    r = t,
    n = a;
  function o(t) {
    var i = n.dirname(t);
    i === t && e.error("dirname() failed: [" + t + "]"),
      r.existsSync(i) || o(i),
      r.mkdirSync(t, parseInt("0777", 8));
  }
  function i(t, i) {
    return (
      i || e.error("no paths given"),
      "string" == typeof i && (i = [].slice.call(arguments, 1)),
      i.forEach(function (i) {
        try {
          var s = e.statNoFollowLinks(i);
          return void (t.fullpath
            ? s.isFile() &&
              e.error("cannot create directory " + i + ": File exists", {
                continue: !0,
              })
            : e.error("path already exists: " + i, { continue: !0 }));
        } catch (e) {}
        var a = n.dirname(i);
        if (r.existsSync(a) || t.fullpath)
          try {
            t.fullpath ? o(n.resolve(i)) : r.mkdirSync(i, parseInt("0777", 8));
          } catch (t) {
            var c;
            if ("EACCES" === t.code) c = "Permission denied";
            else {
              if ("ENOTDIR" !== t.code && "ENOENT" !== t.code) throw t;
              c = "Not a directory";
            }
            e.error("cannot create directory " + i + ": " + c, {
              continue: !0,
            });
          }
        else e.error("no such file or directory: " + a, { continue: !0 });
      }),
      ""
    );
  }
  return e.register("mkdir", i, { cmdOptions: { p: "fullpath" } }), (Jl = i);
}
function hu() {
  if (tu) return eu;
  tu = 1;
  var e = wl(),
    r = t;
  function n(t, i, s) {
    var a;
    a = r.readdirSync(t);
    for (var c = 0; c < a.length; c++) {
      var l = t + "/" + a[c];
      if (e.statNoFollowLinks(l).isDirectory()) n(l, i);
      else if (i || o(l))
        try {
          e.unlinkSync(l);
        } catch (t) {
          e.error("could not remove file (code " + t.code + "): " + l, {
            continue: !0,
          });
        }
    }
    if (!s) {
      var u;
      try {
        for (var f = Date.now(); ; )
          try {
            if (((u = r.rmdirSync(t)), r.existsSync(t)))
              throw { code: "EAGAIN" };
            break;
          } catch (e) {
            if (
              "win32" !== process.platform ||
              ("ENOTEMPTY" !== e.code &&
                "EBUSY" !== e.code &&
                "EPERM" !== e.code &&
                "EAGAIN" !== e.code)
            ) {
              if ("ENOENT" === e.code) break;
              throw e;
            }
            if (Date.now() - f > 1e3) throw e;
          }
      } catch (r) {
        e.error("could not remove directory (code " + r.code + "): " + t, {
          continue: !0,
        });
      }
      return u;
    }
  }
  function o(e) {
    var t = !0;
    try {
      var n = r.openSync(e, "a");
      r.closeSync(n);
    } catch (e) {
      t = !1;
    }
    return t;
  }
  function i(t, r) {
    return (
      r || e.error("no paths given"),
      (r = [].slice.call(arguments, 1)).forEach(function (r) {
        var i;
        try {
          var s = "/" === r[r.length - 1] ? r.slice(0, -1) : r;
          i = e.statNoFollowLinks(s);
        } catch (n) {
          return void (
            t.force ||
            e.error("no such file or directory: " + r, { continue: !0 })
          );
        }
        i.isFile()
          ? (function (t, r) {
              r.force || o(t)
                ? e.unlinkSync(t)
                : e.error("permission denied: " + t, { continue: !0 });
            })(r, t)
          : i.isDirectory()
            ? (function (t, r) {
                r.recursive
                  ? n(t, r.force)
                  : e.error("path is a directory", { continue: !0 });
              })(r, t)
            : i.isSymbolicLink()
              ? (function (t, r) {
                  var o;
                  try {
                    o = e.statFollowLinks(t);
                  } catch (r) {
                    return void e.unlinkSync(t);
                  }
                  o.isFile()
                    ? e.unlinkSync(t)
                    : o.isDirectory() &&
                      ("/" === t[t.length - 1]
                        ? r.recursive
                          ? n(t, r.force, !0)
                          : e.error("path is a directory", { continue: !0 })
                        : e.unlinkSync(t));
                })(r, t)
              : i.isFIFO() &&
                (function (t) {
                  e.unlinkSync(t);
                })(r);
      }),
      ""
    );
  }
  return (
    e.register("rm", i, {
      cmdOptions: { f: "force", r: "recursive", R: "recursive" },
    }),
    (eu = i)
  );
}
function mu() {
  if (nu) return ru;
  nu = 1;
  var e = t,
    r = a,
    n = wl(),
    o = Il(),
    i = hu();
  function s(t, s, a) {
    arguments.length < 3
      ? n.error("missing <source> and/or <dest>")
      : arguments.length > 3
        ? ((s = [].slice.call(arguments, 1, arguments.length - 1)),
          (a = arguments[arguments.length - 1]))
        : "string" == typeof s
          ? (s = [s])
          : n.error("invalid arguments");
    var c = e.existsSync(a),
      l = c && n.statFollowLinks(a);
    return (
      (c && l.isDirectory()) ||
        !(s.length > 1) ||
        n.error("dest is not a directory (too many sources)"),
      c &&
        l.isFile() &&
        t.no_force &&
        n.error("dest file already exists: " + a),
      s.forEach(function (c, l) {
        if (e.existsSync(c)) {
          var u = a;
          if (
            (e.existsSync(a) &&
              n.statFollowLinks(a).isDirectory() &&
              (u = r.normalize(a + "/" + r.basename(c))),
            e.existsSync(u) &&
              (function (e, t) {
                var n = e[t];
                return e.slice(0, t).some(function (e) {
                  return r.basename(e) === r.basename(n);
                });
              })(s, l))
          )
            t.no_force ||
              n.error(
                "will not overwrite just-created '" + u + "' with '" + c + "'",
                { continue: !0 }
              );
          else if (e.existsSync(u) && t.no_force)
            n.error("dest file already exists: " + u, { continue: !0 });
          else if (r.resolve(c) !== r.dirname(r.resolve(u)))
            try {
              e.renameSync(c, u);
            } catch (e) {
              "EXDEV" === e.code && (o("-r", c, u), i("-rf", c));
            }
          else n.error("cannot move to self: " + c, { continue: !0 });
        } else n.error("no such file or directory: " + c, { continue: !0 });
      }),
      ""
    );
  }
  return (
    n.register("mv", s, { cmdOptions: { f: "!no_force", n: "no_force" } }),
    (ru = s)
  );
}
var gu,
  yu = {};
function bu() {
  return gu || (gu = 1), yu;
}
var vu,
  wu,
  Eu,
  Su,
  Ou,
  Iu,
  Tu,
  ju,
  xu,
  Ru,
  Au,
  Du,
  Nu,
  Lu,
  ku,
  Cu,
  Pu,
  Mu,
  _u,
  $u,
  Bu,
  Fu,
  Uu = {};
function Gu() {
  return vu || (vu = 1), Uu;
}
function Wu() {
  if (Eu) return wu;
  Eu = 1;
  var e = wl(),
    r = t;
  function n(t, n, o, i) {
    var s = e.readFromPipe();
    "string" != typeof o &&
      "function" != typeof o &&
      ("number" == typeof o
        ? (o = o.toString())
        : e.error("invalid replacement string")),
      "string" == typeof n && (n = RegExp(n)),
      i || s || e.error("no files given"),
      (i = [].slice.call(arguments, 3)),
      s && i.unshift("-");
    var a = [];
    return (
      i.forEach(function (i) {
        if (r.existsSync(i) || "-" === i) {
          var c = ("-" === i ? s : r.readFileSync(i, "utf8"))
            .split("\n")
            .map(function (e) {
              return e.replace(n, o);
            })
            .join("\n");
          a.push(c), t.inplace && r.writeFileSync(i, c, "utf8");
        } else e.error("no such file or directory: " + i, 2, { continue: !0 });
      }),
      a.join("\n")
    );
  }
  return (
    e.register("sed", n, {
      globStart: 3,
      canReceivePipe: !0,
      cmdOptions: { i: "inplace" },
    }),
    (wu = n)
  );
}
function zu() {
  if (Ou) return Su;
  Ou = 1;
  var e = wl();
  function t(t) {
    if (!t) {
      var r = [].slice.call(arguments, 0);
      r.length < 2 && e.error("must provide an argument"), (t = r[1]);
    }
    var n = "+" === t[0];
    n && (t = "-" + t.slice(1)),
      (t = e.parseOptions(t, { e: "fatal", v: "verbose", f: "noglob" })),
      n &&
        Object.keys(t).forEach(function (e) {
          t[e] = !t[e];
        }),
      Object.keys(t).forEach(function (r) {
        n !== t[r] && (e.config[r] = t[r]);
      });
  }
  return e.register("set", t, { allowGlobbing: !1, wrapOutput: !1 }), (Su = t);
}
function Vu() {
  if (Tu) return Iu;
  Tu = 1;
  var e = wl(),
    r = t;
  function n(e) {
    var t = e.match(/^\s*(\d*)\s*(.*)$/);
    return { num: Number(t[1]), value: t[2] };
  }
  function o(e, t) {
    var r = e.toLowerCase(),
      n = t.toLowerCase();
    return r === n ? -1 * e.localeCompare(t) : r.localeCompare(n);
  }
  function i(e, t) {
    var r = n(e),
      i = n(t);
    return r.hasOwnProperty("num") && i.hasOwnProperty("num") && r.num !== i.num
      ? r.num - i.num
      : o(r.value, i.value);
  }
  function s(t, n) {
    var s = e.readFromPipe();
    n || s || e.error("no files given"),
      (n = [].slice.call(arguments, 1)),
      s && n.unshift("-");
    var a = n
      .reduce(function (t, n) {
        if ("-" !== n) {
          if (!r.existsSync(n))
            return (
              e.error("no such file or directory: " + n, { continue: !0 }), t
            );
          if (e.statFollowLinks(n).isDirectory())
            return (
              e.error("read failed: " + n + ": Is a directory", {
                continue: !0,
              }),
              t
            );
        }
        var o = "-" === n ? s : r.readFileSync(n, "utf8");
        return t.concat(o.trimRight().split("\n"));
      }, [])
      .sort(t.numerical ? i : o);
    return t.reverse && (a = a.reverse()), a.join("\n") + "\n";
  }
  return (
    e.register("sort", s, {
      canReceivePipe: !0,
      cmdOptions: { r: "reverse", n: "numerical" },
    }),
    (Iu = s)
  );
}
function Hu() {
  if (xu) return ju;
  xu = 1;
  var e = wl(),
    r = t;
  function n(t, n) {
    var o = [],
      i = e.readFromPipe();
    n || i || e.error("no paths given");
    var s = 1;
    !0 === t.numLines
      ? ((s = 2), (t.numLines = Number(arguments[1])))
      : !1 === t.numLines && (t.numLines = 10),
      (t.numLines = -1 * Math.abs(t.numLines)),
      (n = [].slice.call(arguments, s)),
      i && n.unshift("-");
    var a = !1;
    return (
      n.forEach(function (n) {
        if ("-" !== n) {
          if (!r.existsSync(n))
            return void e.error("no such file or directory: " + n, {
              continue: !0,
            });
          if (e.statFollowLinks(n).isDirectory())
            return void e.error("error reading '" + n + "': Is a directory", {
              continue: !0,
            });
        }
        var s = ("-" === n ? i : r.readFileSync(n, "utf8")).split("\n");
        "" === s[s.length - 1] ? (s.pop(), (a = !0)) : (a = !1),
          (o = o.concat(s.slice(t.numLines)));
      }),
      a && o.push(""),
      o.join("\n")
    );
  }
  return (
    e.register("tail", n, {
      canReceivePipe: !0,
      cmdOptions: { n: "numLines" },
    }),
    (ju = n)
  );
}
function Xu() {
  if (Au) return Ru;
  Au = 1;
  var e = wl(),
    r = t;
  function n(t, n) {
    n || e.error("no path given");
    var o = !1;
    if (
      (Object.keys(t).forEach(function (e) {
        !0 === t[e] && (o = !0);
      }),
      o || e.error("could not interpret expression"),
      t.link)
    )
      try {
        return e.statNoFollowLinks(n).isSymbolicLink();
      } catch (e) {
        return !1;
      }
    if (!r.existsSync(n)) return !1;
    if (t.exists) return !0;
    var i = e.statFollowLinks(n);
    return t.block
      ? i.isBlockDevice()
      : t.character
        ? i.isCharacterDevice()
        : t.directory
          ? i.isDirectory()
          : t.file
            ? i.isFile()
            : t.pipe
              ? i.isFIFO()
              : !!t.socket && i.isSocket();
  }
  return (
    e.register("test", n, {
      cmdOptions: {
        b: "block",
        c: "character",
        d: "directory",
        e: "exists",
        f: "file",
        L: "link",
        p: "pipe",
        S: "socket",
      },
      wrapOutput: !1,
      allowGlobbing: !1,
    }),
    (Ru = n)
  );
}
function qu() {
  if (Nu) return Du;
  Nu = 1;
  var e = wl(),
    r = t,
    n = a;
  function o(t, o) {
    o || e.error("wrong arguments"),
      r.existsSync(n.dirname(o)) ||
        e.error("no such file or directory: " + n.dirname(o));
    try {
      return r.writeFileSync(o, this.stdout || this.toString(), "utf8"), this;
    } catch (t) {
      e.error("could not write to file (code " + t.code + "): " + o, {
        continue: !0,
      });
    }
  }
  return e.register("to", o, { pipeOnly: !0, wrapOutput: !1 }), (Du = o);
}
function Ku() {
  if (ku) return Lu;
  ku = 1;
  var e = wl(),
    r = t,
    n = a;
  function o(t, o) {
    o || e.error("wrong arguments"),
      r.existsSync(n.dirname(o)) ||
        e.error("no such file or directory: " + n.dirname(o));
    try {
      return r.appendFileSync(o, this.stdout || this.toString(), "utf8"), this;
    } catch (t) {
      e.error("could not append to file (code " + t.code + "): " + o, {
        continue: !0,
      });
    }
  }
  return e.register("toEnd", o, { pipeOnly: !0, wrapOutput: !1 }), (Lu = o);
}
function Yu() {
  if (Pu) return Cu;
  Pu = 1;
  var e = wl(),
    r = t;
  function n(t, n) {
    return (
      n
        ? "string" == typeof n
          ? (n = [].slice.call(arguments, 1))
          : e.error(
              "file arg should be a string file path or an Array of string file paths"
            )
        : e.error("no files given"),
      n.forEach(function (n) {
        !(function (t, n) {
          var i = o(n);
          if (i && i.isDirectory()) return;
          if (!i && t.no_create) return;
          r.closeSync(r.openSync(n, "a"));
          var s = new Date(),
            a = t.date || s,
            c = t.date || s;
          if (t.reference) {
            var l = o(t.reference);
            l || e.error("failed to get attributess of " + t.reference),
              (a = l.mtime),
              (c = l.atime);
          } else t.date && ((a = t.date), (c = t.date));
          (t.atime_only && t.mtime_only) ||
            (t.atime_only ? (a = i.mtime) : t.mtime_only && (c = i.atime));
          r.utimesSync(n, c, a);
        })(t, n);
      }),
      ""
    );
  }
  function o(t) {
    try {
      return e.statFollowLinks(t);
    } catch (e) {
      return null;
    }
  }
  return (
    e.register("touch", n, {
      cmdOptions: {
        a: "atime_only",
        c: "no_create",
        d: "date",
        m: "mtime_only",
        r: "reference",
      },
    }),
    (Cu = n)
  );
}
function Qu() {
  if (_u) return Mu;
  _u = 1;
  var e = wl(),
    r = t;
  function n(t, n, o) {
    var i = e.readFromPipe();
    i ||
      (n || e.error("no input given"),
      r.existsSync(n)
        ? e.statFollowLinks(n).isDirectory() &&
          e.error("error reading '" + n + "'")
        : e.error(n + ": No such file or directory")),
      o &&
        r.existsSync(o) &&
        e.statFollowLinks(o).isDirectory() &&
        e.error(o + ": Is a directory");
    var s = (n ? r.readFileSync(n, "utf8") : i).trimRight().split("\n"),
      a =
        s
          .reduceRight(function (e, r) {
            return 0 === e.length
              ? [{ count: 1, ln: r }]
              : 0 ===
                  (function (e, r) {
                    return t.ignoreCase
                      ? e
                          .toLocaleLowerCase()
                          .localeCompare(r.toLocaleLowerCase())
                      : e.localeCompare(r);
                  })(e[0].ln, r)
                ? [{ count: e[0].count + 1, ln: r }].concat(e.slice(1))
                : [{ count: 1, ln: r }].concat(e);
          }, [])
          .filter(function (e) {
            return !t.duplicates || e.count > 1;
          })
          .map(function (e) {
            return (
              (t.count
                ? (function (e, t) {
                    var r = "" + t;
                    return (
                      r.length < e &&
                        (r = Array(e - r.length + 1).join(" ") + r),
                      r
                    );
                  })(7, e.count) + " "
                : "") + e.ln
            );
          })
          .join("\n") + "\n";
    return o ? (new e.ShellString(a).to(o), "") : a;
  }
  return (
    e.register("uniq", n, {
      canReceivePipe: !0,
      cmdOptions: { i: "ignoreCase", c: "count", d: "duplicates" },
    }),
    (Mu = n)
  );
}
function Ju() {
  if (Bu) return $u;
  Bu = 1;
  var e = wl(),
    r = t,
    n = a;
  e.register("which", u, { allowGlobbing: !1, cmdOptions: { a: "all" } });
  var o = ".com;.exe;.bat;.cmd;.vbs;.vbe;.js;.jse;.wsf;.wsh",
    i = 1;
  function s() {
    return "win32" === process.platform;
  }
  function c(e) {
    return e ? e.split(n.delimiter) : [];
  }
  function l(t) {
    return (
      r.existsSync(t) &&
      !e.statFollowLinks(t).isDirectory() &&
      (s() ||
        (function (e) {
          try {
            r.accessSync(e, i);
          } catch (e) {
            return !1;
          }
          return !0;
        })(t))
    );
  }
  function u(t, r) {
    r || e.error("must specify command");
    var i = s(),
      a = c(process.env.PATH),
      u = [];
    if (-1 === r.indexOf("/")) {
      var f = [""];
      if (i) f = c((process.env.PATHEXT || o).toUpperCase());
      for (var p = 0; p < a.length && (!(u.length > 0) || t.all); p++) {
        var d = n.resolve(a[p], r);
        i && (d = d.toUpperCase());
        var h = d.match(/\.[^<>:"/\|?*.]+$/);
        if (h && f.indexOf(h[0]) >= 0) {
          if (l(d)) {
            u.push(d);
            break;
          }
        } else
          for (var m = 0; m < f.length; m++) {
            var g = d + f[m];
            if (l(g)) {
              u.push(g);
              break;
            }
          }
      }
    } else l(r) && u.push(n.resolve(r));
    return u.length > 0 ? (t.all ? u : u[0]) : t.all ? [] : null;
  }
  return ($u = u);
}
function Zu() {
  return (
    Fu ||
    (Fu = {
      "/node_modules/shelljs/src/cat.js": El,
      "/node_modules/shelljs/src/cd.js": Sl,
      "/node_modules/shelljs/src/chmod.js": Ol,
      "/node_modules/shelljs/src/common.js": wl,
      "/node_modules/shelljs/src/cp.js": Il,
      "/node_modules/shelljs/src/dirs.js": Nl,
      "/node_modules/shelljs/src/echo.js": Ll,
      "/node_modules/shelljs/src/error.js": kl,
      "/node_modules/shelljs/src/exec-child.js": Ml,
      "/node_modules/shelljs/src/exec.js": au,
      "/node_modules/shelljs/src/find.js": lu,
      "/node_modules/shelljs/src/grep.js": uu,
      "/node_modules/shelljs/src/head.js": fu,
      "/node_modules/shelljs/src/ln.js": pu,
      "/node_modules/shelljs/src/ls.js": cu,
      "/node_modules/shelljs/src/mkdir.js": du,
      "/node_modules/shelljs/src/mv.js": mu,
      "/node_modules/shelljs/src/popd.js": bu,
      "/node_modules/shelljs/src/pushd.js": Gu,
      "/node_modules/shelljs/src/pwd.js": su,
      "/node_modules/shelljs/src/rm.js": hu,
      "/node_modules/shelljs/src/sed.js": Wu,
      "/node_modules/shelljs/src/set.js": zu,
      "/node_modules/shelljs/src/sort.js": Vu,
      "/node_modules/shelljs/src/tail.js": Hu,
      "/node_modules/shelljs/src/tempdir.js": iu,
      "/node_modules/shelljs/src/test.js": Xu,
      "/node_modules/shelljs/src/to.js": qu,
      "/node_modules/shelljs/src/toEnd.js": Ku,
      "/node_modules/shelljs/src/touch.js": Yu,
      "/node_modules/shelljs/src/uniq.js": Qu,
      "/node_modules/shelljs/src/which.js": Ju,
    })
  );
}
function ef(e, t) {
  var r,
    n = (function (e) {
      var t = e[0];
      if ("/" === t || "\\" === t) return !1;
      var r = e[1],
        n = e[2];
      return (
        !(
          !("." !== t || (r && "/" !== r && "\\" !== r)) ||
          !("." !== t || "." !== r || (n && "/" !== n && "\\" !== n))
        ) &&
        (":" !== r || ("/" !== n && "\\" !== n))
      );
    })(e);
  "/" === (e = tf(e))[0] && (t = "");
  for (
    var o = Zu(), i = ["", ".js", ".json"];
    !(r = tf(n ? t + "/node_modules/" + e : t + "/" + e)).endsWith("/..");

  ) {
    for (var s = 0; s < i.length; s++) {
      var a = r + i[s];
      if (o[a]) return a;
    }
    if (!n) break;
    var c = tf(t + "/..");
    if (c === t) break;
    t = c;
  }
  return null;
}
function tf(e) {
  for (
    var t = (e = e.replace(/\\/g, "/")).split("/"), r = "" === t[0], n = 1;
    n < t.length;
    n++
  )
    ("." !== t[n] && "" !== t[n]) || t.splice(n--, 1);
  for (n = 1; n < t.length; n++)
    ".." === t[n] &&
      n > 0 &&
      ".." !== t[n - 1] &&
      "." !== t[n - 1] &&
      (t.splice(--n, 2), n--);
  return (
    (e = t.join("/")),
    r && "/" !== e[0] ? (e = "/" + e) : 0 === e.length && (e = "."),
    e
  );
}
var rf,
  nf = {},
  of = [
    "cat",
    "cd",
    "chmod",
    "cp",
    "dirs",
    "echo",
    "exec",
    "find",
    "grep",
    "head",
    "ln",
    "ls",
    "mkdir",
    "mv",
    "pwd",
    "rm",
    "sed",
    "set",
    "sort",
    "tail",
    "tempdir",
    "test",
    "to",
    "toEnd",
    "touch",
    "uniq",
    "which",
  ];
function sf() {
  if (rf) return nf;
  rf = 1;
  var e = wl();
  return (
    of.forEach(function (e) {
      !(function (e) {
        function t(t) {
          var r = ef(t, e);
          if (null !== r) return Zu()[r]();
          throw new Error(
            'Could not dynamically require "' +
              t +
              '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
          );
        }
        return (
          (t.resolve = function (t) {
            var r = ef(t, e);
            return null !== r ? r : require.resolve(t);
          }),
          t
        );
      })("/node_modules/shelljs")("./src/" + e);
    }),
    (nf.exit = process.exit),
    (nf.error = kl()),
    (nf.ShellString = e.ShellString),
    (nf.env = process.env),
    (nf.config = e.config),
    nf
  );
}
ne(of);
var af = sf(),
  cf = wl();
Object.keys(af).forEach(function (e) {
  re[e] = af[e];
});
var lf = qu();
String.prototype.to = cf.wrap("to", lf);
var uf = Ku();
(String.prototype.toEnd = cf.wrap("toEnd", uf)),
  (re.config.fatal = !0),
  (re.target = {});
var ff,
  pf = process.argv.slice(2),
  df = pf.indexOf("--");
df > -1 && ((ff = pf.slice(df + 1, pf.length)), (pf = pf.slice(0, df))),
  setTimeout(function () {
    var e;
    if (1 !== pf.length || "--help" !== pf[0]) {
      for (e in re.target)
        !(function (e, t) {
          re.target[e] = function () {
            return (
              t.done || ((t.done = !0), (t.result = t.apply(t, arguments))),
              t.result
            );
          };
        })(e, re.target[e]);
      pf.length > 0
        ? pf.forEach(function (e) {
            e in re.target
              ? re.target[e](ff)
              : console.log("no such target: " + e);
          })
        : "all" in re.target && re.target.all(ff);
    } else
      for (e in (console.log("Available targets:"), re.target))
        console.log("  " + e);
  }, 0);
var hf = rc,
  mf = yt,
  gf = kr,
  yf = Cs;
ti(
  { target: "Iterator", proto: !0, real: !0 },
  {
    every: function (e) {
      gf(this), mf(e);
      var t = yf(this),
        r = 0;
      return !hf(
        t,
        function (t, n) {
          if (!e(t, r++)) return n();
        },
        { IS_RECORD: !0, INTERRUPTED: !0 }
      ).stopped;
    },
  }
);
var bf = { exports: {} };
!(function (e, t) {
  var r;
  (t = bf.exports = y),
    (r =
      "object" == typeof process &&
      process.env &&
      process.env.NODE_DEBUG &&
      /\bsemver\b/i.test(process.env.NODE_DEBUG)
        ? function () {
            var e = Array.prototype.slice.call(arguments, 0);
            e.unshift("SEMVER"), console.log.apply(console, e);
          }
        : function () {}),
    (t.SEMVER_SPEC_VERSION = "2.0.0");
  var n = 256,
    o = Number.MAX_SAFE_INTEGER || 9007199254740991,
    i = n - 6,
    s = (t.re = []),
    a = (t.safeRe = []),
    c = (t.src = []),
    l = (t.tokens = {}),
    u = 0;
  function f(e) {
    l[e] = u++;
  }
  var p = "[a-zA-Z0-9-]",
    d = [
      ["\\s", 1],
      ["\\d", n],
      [p, i],
    ];
  function h(e) {
    for (var t = 0; t < d.length; t++) {
      var r = d[t][0],
        n = d[t][1];
      e = e
        .split(r + "*")
        .join(r + "{0," + n + "}")
        .split(r + "+")
        .join(r + "{1," + n + "}");
    }
    return e;
  }
  f("NUMERICIDENTIFIER"),
    (c[l.NUMERICIDENTIFIER] = "0|[1-9]\\d*"),
    f("NUMERICIDENTIFIERLOOSE"),
    (c[l.NUMERICIDENTIFIERLOOSE] = "\\d+"),
    f("NONNUMERICIDENTIFIER"),
    (c[l.NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-]" + p + "*"),
    f("MAINVERSION"),
    (c[l.MAINVERSION] =
      "(" +
      c[l.NUMERICIDENTIFIER] +
      ")\\.(" +
      c[l.NUMERICIDENTIFIER] +
      ")\\.(" +
      c[l.NUMERICIDENTIFIER] +
      ")"),
    f("MAINVERSIONLOOSE"),
    (c[l.MAINVERSIONLOOSE] =
      "(" +
      c[l.NUMERICIDENTIFIERLOOSE] +
      ")\\.(" +
      c[l.NUMERICIDENTIFIERLOOSE] +
      ")\\.(" +
      c[l.NUMERICIDENTIFIERLOOSE] +
      ")"),
    f("PRERELEASEIDENTIFIER"),
    (c[l.PRERELEASEIDENTIFIER] =
      "(?:" + c[l.NUMERICIDENTIFIER] + "|" + c[l.NONNUMERICIDENTIFIER] + ")"),
    f("PRERELEASEIDENTIFIERLOOSE"),
    (c[l.PRERELEASEIDENTIFIERLOOSE] =
      "(?:" +
      c[l.NUMERICIDENTIFIERLOOSE] +
      "|" +
      c[l.NONNUMERICIDENTIFIER] +
      ")"),
    f("PRERELEASE"),
    (c[l.PRERELEASE] =
      "(?:-(" +
      c[l.PRERELEASEIDENTIFIER] +
      "(?:\\." +
      c[l.PRERELEASEIDENTIFIER] +
      ")*))"),
    f("PRERELEASELOOSE"),
    (c[l.PRERELEASELOOSE] =
      "(?:-?(" +
      c[l.PRERELEASEIDENTIFIERLOOSE] +
      "(?:\\." +
      c[l.PRERELEASEIDENTIFIERLOOSE] +
      ")*))"),
    f("BUILDIDENTIFIER"),
    (c[l.BUILDIDENTIFIER] = p + "+"),
    f("BUILD"),
    (c[l.BUILD] =
      "(?:\\+(" +
      c[l.BUILDIDENTIFIER] +
      "(?:\\." +
      c[l.BUILDIDENTIFIER] +
      ")*))"),
    f("FULL"),
    f("FULLPLAIN"),
    (c[l.FULLPLAIN] =
      "v?" + c[l.MAINVERSION] + c[l.PRERELEASE] + "?" + c[l.BUILD] + "?"),
    (c[l.FULL] = "^" + c[l.FULLPLAIN] + "$"),
    f("LOOSEPLAIN"),
    (c[l.LOOSEPLAIN] =
      "[v=\\s]*" +
      c[l.MAINVERSIONLOOSE] +
      c[l.PRERELEASELOOSE] +
      "?" +
      c[l.BUILD] +
      "?"),
    f("LOOSE"),
    (c[l.LOOSE] = "^" + c[l.LOOSEPLAIN] + "$"),
    f("GTLT"),
    (c[l.GTLT] = "((?:<|>)?=?)"),
    f("XRANGEIDENTIFIERLOOSE"),
    (c[l.XRANGEIDENTIFIERLOOSE] = c[l.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*"),
    f("XRANGEIDENTIFIER"),
    (c[l.XRANGEIDENTIFIER] = c[l.NUMERICIDENTIFIER] + "|x|X|\\*"),
    f("XRANGEPLAIN"),
    (c[l.XRANGEPLAIN] =
      "[v=\\s]*(" +
      c[l.XRANGEIDENTIFIER] +
      ")(?:\\.(" +
      c[l.XRANGEIDENTIFIER] +
      ")(?:\\.(" +
      c[l.XRANGEIDENTIFIER] +
      ")(?:" +
      c[l.PRERELEASE] +
      ")?" +
      c[l.BUILD] +
      "?)?)?"),
    f("XRANGEPLAINLOOSE"),
    (c[l.XRANGEPLAINLOOSE] =
      "[v=\\s]*(" +
      c[l.XRANGEIDENTIFIERLOOSE] +
      ")(?:\\.(" +
      c[l.XRANGEIDENTIFIERLOOSE] +
      ")(?:\\.(" +
      c[l.XRANGEIDENTIFIERLOOSE] +
      ")(?:" +
      c[l.PRERELEASELOOSE] +
      ")?" +
      c[l.BUILD] +
      "?)?)?"),
    f("XRANGE"),
    (c[l.XRANGE] = "^" + c[l.GTLT] + "\\s*" + c[l.XRANGEPLAIN] + "$"),
    f("XRANGELOOSE"),
    (c[l.XRANGELOOSE] = "^" + c[l.GTLT] + "\\s*" + c[l.XRANGEPLAINLOOSE] + "$"),
    f("COERCE"),
    (c[l.COERCE] =
      "(^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])"),
    f("COERCERTL"),
    (s[l.COERCERTL] = new RegExp(c[l.COERCE], "g")),
    (a[l.COERCERTL] = new RegExp(h(c[l.COERCE]), "g")),
    f("LONETILDE"),
    (c[l.LONETILDE] = "(?:~>?)"),
    f("TILDETRIM"),
    (c[l.TILDETRIM] = "(\\s*)" + c[l.LONETILDE] + "\\s+"),
    (s[l.TILDETRIM] = new RegExp(c[l.TILDETRIM], "g")),
    (a[l.TILDETRIM] = new RegExp(h(c[l.TILDETRIM]), "g"));
  f("TILDE"),
    (c[l.TILDE] = "^" + c[l.LONETILDE] + c[l.XRANGEPLAIN] + "$"),
    f("TILDELOOSE"),
    (c[l.TILDELOOSE] = "^" + c[l.LONETILDE] + c[l.XRANGEPLAINLOOSE] + "$"),
    f("LONECARET"),
    (c[l.LONECARET] = "(?:\\^)"),
    f("CARETTRIM"),
    (c[l.CARETTRIM] = "(\\s*)" + c[l.LONECARET] + "\\s+"),
    (s[l.CARETTRIM] = new RegExp(c[l.CARETTRIM], "g")),
    (a[l.CARETTRIM] = new RegExp(h(c[l.CARETTRIM]), "g"));
  f("CARET"),
    (c[l.CARET] = "^" + c[l.LONECARET] + c[l.XRANGEPLAIN] + "$"),
    f("CARETLOOSE"),
    (c[l.CARETLOOSE] = "^" + c[l.LONECARET] + c[l.XRANGEPLAINLOOSE] + "$"),
    f("COMPARATORLOOSE"),
    (c[l.COMPARATORLOOSE] =
      "^" + c[l.GTLT] + "\\s*(" + c[l.LOOSEPLAIN] + ")$|^$"),
    f("COMPARATOR"),
    (c[l.COMPARATOR] = "^" + c[l.GTLT] + "\\s*(" + c[l.FULLPLAIN] + ")$|^$"),
    f("COMPARATORTRIM"),
    (c[l.COMPARATORTRIM] =
      "(\\s*)" +
      c[l.GTLT] +
      "\\s*(" +
      c[l.LOOSEPLAIN] +
      "|" +
      c[l.XRANGEPLAIN] +
      ")"),
    (s[l.COMPARATORTRIM] = new RegExp(c[l.COMPARATORTRIM], "g")),
    (a[l.COMPARATORTRIM] = new RegExp(h(c[l.COMPARATORTRIM]), "g"));
  f("HYPHENRANGE"),
    (c[l.HYPHENRANGE] =
      "^\\s*(" +
      c[l.XRANGEPLAIN] +
      ")\\s+-\\s+(" +
      c[l.XRANGEPLAIN] +
      ")\\s*$"),
    f("HYPHENRANGELOOSE"),
    (c[l.HYPHENRANGELOOSE] =
      "^\\s*(" +
      c[l.XRANGEPLAINLOOSE] +
      ")\\s+-\\s+(" +
      c[l.XRANGEPLAINLOOSE] +
      ")\\s*$"),
    f("STAR"),
    (c[l.STAR] = "(<|>)?=?\\s*\\*");
  for (var m = 0; m < u; m++)
    r(m, c[m]),
      s[m] || ((s[m] = new RegExp(c[m])), (a[m] = new RegExp(h(c[m]))));
  function g(e, t) {
    if (
      ((t && "object" == typeof t) ||
        (t = { loose: !!t, includePrerelease: !1 }),
      e instanceof y)
    )
      return e;
    if ("string" != typeof e) return null;
    if (e.length > n) return null;
    if (!(t.loose ? a[l.LOOSE] : a[l.FULL]).test(e)) return null;
    try {
      return new y(e, t);
    } catch (e) {
      return null;
    }
  }
  function y(e, t) {
    if (
      ((t && "object" == typeof t) ||
        (t = { loose: !!t, includePrerelease: !1 }),
      e instanceof y)
    ) {
      if (e.loose === t.loose) return e;
      e = e.version;
    } else if ("string" != typeof e)
      throw new TypeError("Invalid Version: " + e);
    if (e.length > n)
      throw new TypeError("version is longer than " + n + " characters");
    if (!(this instanceof y)) return new y(e, t);
    r("SemVer", e, t), (this.options = t), (this.loose = !!t.loose);
    var i = e.trim().match(t.loose ? a[l.LOOSE] : a[l.FULL]);
    if (!i) throw new TypeError("Invalid Version: " + e);
    if (
      ((this.raw = e),
      (this.major = +i[1]),
      (this.minor = +i[2]),
      (this.patch = +i[3]),
      this.major > o || this.major < 0)
    )
      throw new TypeError("Invalid major version");
    if (this.minor > o || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > o || this.patch < 0)
      throw new TypeError("Invalid patch version");
    i[4]
      ? (this.prerelease = i[4].split(".").map(function (e) {
          if (/^[0-9]+$/.test(e)) {
            var t = +e;
            if (t >= 0 && t < o) return t;
          }
          return e;
        }))
      : (this.prerelease = []),
      (this.build = i[5] ? i[5].split(".") : []),
      this.format();
  }
  (t.parse = g),
    (t.valid = function (e, t) {
      var r = g(e, t);
      return r ? r.version : null;
    }),
    (t.clean = function (e, t) {
      var r = g(e.trim().replace(/^[=v]+/, ""), t);
      return r ? r.version : null;
    }),
    (t.SemVer = y),
    (y.prototype.format = function () {
      return (
        (this.version = this.major + "." + this.minor + "." + this.patch),
        this.prerelease.length &&
          (this.version += "-" + this.prerelease.join(".")),
        this.version
      );
    }),
    (y.prototype.toString = function () {
      return this.version;
    }),
    (y.prototype.compare = function (e) {
      return (
        r("SemVer.compare", this.version, this.options, e),
        e instanceof y || (e = new y(e, this.options)),
        this.compareMain(e) || this.comparePre(e)
      );
    }),
    (y.prototype.compareMain = function (e) {
      return (
        e instanceof y || (e = new y(e, this.options)),
        v(this.major, e.major) ||
          v(this.minor, e.minor) ||
          v(this.patch, e.patch)
      );
    }),
    (y.prototype.comparePre = function (e) {
      if (
        (e instanceof y || (e = new y(e, this.options)),
        this.prerelease.length && !e.prerelease.length)
      )
        return -1;
      if (!this.prerelease.length && e.prerelease.length) return 1;
      if (!this.prerelease.length && !e.prerelease.length) return 0;
      var t = 0;
      do {
        var n = this.prerelease[t],
          o = e.prerelease[t];
        if ((r("prerelease compare", t, n, o), void 0 === n && void 0 === o))
          return 0;
        if (void 0 === o) return 1;
        if (void 0 === n) return -1;
        if (n !== o) return v(n, o);
      } while (++t);
    }),
    (y.prototype.compareBuild = function (e) {
      e instanceof y || (e = new y(e, this.options));
      var t = 0;
      do {
        var n = this.build[t],
          o = e.build[t];
        if ((r("prerelease compare", t, n, o), void 0 === n && void 0 === o))
          return 0;
        if (void 0 === o) return 1;
        if (void 0 === n) return -1;
        if (n !== o) return v(n, o);
      } while (++t);
    }),
    (y.prototype.inc = function (e, t) {
      switch (e) {
        case "premajor":
          (this.prerelease.length = 0),
            (this.patch = 0),
            (this.minor = 0),
            this.major++,
            this.inc("pre", t);
          break;
        case "preminor":
          (this.prerelease.length = 0),
            (this.patch = 0),
            this.minor++,
            this.inc("pre", t);
          break;
        case "prepatch":
          (this.prerelease.length = 0),
            this.inc("patch", t),
            this.inc("pre", t);
          break;
        case "prerelease":
          0 === this.prerelease.length && this.inc("patch", t),
            this.inc("pre", t);
          break;
        case "major":
          (0 === this.minor &&
            0 === this.patch &&
            0 !== this.prerelease.length) ||
            this.major++,
            (this.minor = 0),
            (this.patch = 0),
            (this.prerelease = []);
          break;
        case "minor":
          (0 === this.patch && 0 !== this.prerelease.length) || this.minor++,
            (this.patch = 0),
            (this.prerelease = []);
          break;
        case "patch":
          0 === this.prerelease.length && this.patch++, (this.prerelease = []);
          break;
        case "pre":
          if (0 === this.prerelease.length) this.prerelease = [0];
          else {
            for (var r = this.prerelease.length; --r >= 0; )
              "number" == typeof this.prerelease[r] &&
                (this.prerelease[r]++, (r = -2));
            -1 === r && this.prerelease.push(0);
          }
          t &&
            (this.prerelease[0] === t
              ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0])
              : (this.prerelease = [t, 0]));
          break;
        default:
          throw new Error("invalid increment argument: " + e);
      }
      return this.format(), (this.raw = this.version), this;
    }),
    (t.inc = function (e, t, r, n) {
      "string" == typeof r && ((n = r), (r = void 0));
      try {
        return new y(e, r).inc(t, n).version;
      } catch (e) {
        return null;
      }
    }),
    (t.diff = function (e, t) {
      if (O(e, t)) return null;
      var r = g(e),
        n = g(t),
        o = "";
      if (r.prerelease.length || n.prerelease.length) {
        o = "pre";
        var i = "prerelease";
      }
      for (var s in r)
        if (("major" === s || "minor" === s || "patch" === s) && r[s] !== n[s])
          return o + s;
      return i;
    }),
    (t.compareIdentifiers = v);
  var b = /^[0-9]+$/;
  function v(e, t) {
    var r = b.test(e),
      n = b.test(t);
    return (
      r && n && ((e = +e), (t = +t)),
      e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1
    );
  }
  function w(e, t, r) {
    return new y(e, r).compare(new y(t, r));
  }
  function E(e, t, r) {
    return w(e, t, r) > 0;
  }
  function S(e, t, r) {
    return w(e, t, r) < 0;
  }
  function O(e, t, r) {
    return 0 === w(e, t, r);
  }
  function I(e, t, r) {
    return 0 !== w(e, t, r);
  }
  function T(e, t, r) {
    return w(e, t, r) >= 0;
  }
  function j(e, t, r) {
    return w(e, t, r) <= 0;
  }
  function x(e, t, r, n) {
    switch (t) {
      case "===":
        return (
          "object" == typeof e && (e = e.version),
          "object" == typeof r && (r = r.version),
          e === r
        );
      case "!==":
        return (
          "object" == typeof e && (e = e.version),
          "object" == typeof r && (r = r.version),
          e !== r
        );
      case "":
      case "=":
      case "==":
        return O(e, r, n);
      case "!=":
        return I(e, r, n);
      case ">":
        return E(e, r, n);
      case ">=":
        return T(e, r, n);
      case "<":
        return S(e, r, n);
      case "<=":
        return j(e, r, n);
      default:
        throw new TypeError("Invalid operator: " + t);
    }
  }
  function R(e, t) {
    if (
      ((t && "object" == typeof t) ||
        (t = { loose: !!t, includePrerelease: !1 }),
      e instanceof R)
    ) {
      if (e.loose === !!t.loose) return e;
      e = e.value;
    }
    if (!(this instanceof R)) return new R(e, t);
    (e = e.trim().split(/\s+/).join(" ")),
      r("comparator", e, t),
      (this.options = t),
      (this.loose = !!t.loose),
      this.parse(e),
      this.semver === A
        ? (this.value = "")
        : (this.value = this.operator + this.semver.version),
      r("comp", this);
  }
  (t.rcompareIdentifiers = function (e, t) {
    return v(t, e);
  }),
    (t.major = function (e, t) {
      return new y(e, t).major;
    }),
    (t.minor = function (e, t) {
      return new y(e, t).minor;
    }),
    (t.patch = function (e, t) {
      return new y(e, t).patch;
    }),
    (t.compare = w),
    (t.compareLoose = function (e, t) {
      return w(e, t, !0);
    }),
    (t.compareBuild = function (e, t, r) {
      var n = new y(e, r),
        o = new y(t, r);
      return n.compare(o) || n.compareBuild(o);
    }),
    (t.rcompare = function (e, t, r) {
      return w(t, e, r);
    }),
    (t.sort = function (e, r) {
      return e.sort(function (e, n) {
        return t.compareBuild(e, n, r);
      });
    }),
    (t.rsort = function (e, r) {
      return e.sort(function (e, n) {
        return t.compareBuild(n, e, r);
      });
    }),
    (t.gt = E),
    (t.lt = S),
    (t.eq = O),
    (t.neq = I),
    (t.gte = T),
    (t.lte = j),
    (t.cmp = x),
    (t.Comparator = R);
  var A = {};
  function D(e, t) {
    if (
      ((t && "object" == typeof t) ||
        (t = { loose: !!t, includePrerelease: !1 }),
      e instanceof D)
    )
      return e.loose === !!t.loose &&
        e.includePrerelease === !!t.includePrerelease
        ? e
        : new D(e.raw, t);
    if (e instanceof R) return new D(e.value, t);
    if (!(this instanceof D)) return new D(e, t);
    if (
      ((this.options = t),
      (this.loose = !!t.loose),
      (this.includePrerelease = !!t.includePrerelease),
      (this.raw = e.trim().split(/\s+/).join(" ")),
      (this.set = this.raw
        .split("||")
        .map(function (e) {
          return this.parseRange(e.trim());
        }, this)
        .filter(function (e) {
          return e.length;
        })),
      !this.set.length)
    )
      throw new TypeError("Invalid SemVer Range: " + this.raw);
    this.format();
  }
  function N(e, t) {
    for (var r = !0, n = e.slice(), o = n.pop(); r && n.length; )
      (r = n.every(function (e) {
        return o.intersects(e, t);
      })),
        (o = n.pop());
    return r;
  }
  function L(e) {
    return !e || "x" === e.toLowerCase() || "*" === e;
  }
  function k(e, t, r, n, o, i, s, a, c, l, u, f, p) {
    return (
      (t = L(r)
        ? ""
        : L(n)
          ? ">=" + r + ".0.0"
          : L(o)
            ? ">=" + r + "." + n + ".0"
            : ">=" + t) +
      " " +
      (a = L(c)
        ? ""
        : L(l)
          ? "<" + (+c + 1) + ".0.0"
          : L(u)
            ? "<" + c + "." + (+l + 1) + ".0"
            : f
              ? "<=" + c + "." + l + "." + u + "-" + f
              : "<=" + a)
    ).trim();
  }
  function C(e, t, n) {
    for (var o = 0; o < e.length; o++) if (!e[o].test(t)) return !1;
    if (t.prerelease.length && !n.includePrerelease) {
      for (o = 0; o < e.length; o++)
        if (
          (r(e[o].semver),
          e[o].semver !== A && e[o].semver.prerelease.length > 0)
        ) {
          var i = e[o].semver;
          if (i.major === t.major && i.minor === t.minor && i.patch === t.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  }
  function P(e, t, r) {
    try {
      t = new D(t, r);
    } catch (e) {
      return !1;
    }
    return t.test(e);
  }
  function M(e, t, r, n) {
    var o, i, s, a, c;
    switch (((e = new y(e, n)), (t = new D(t, n)), r)) {
      case ">":
        (o = E), (i = j), (s = S), (a = ">"), (c = ">=");
        break;
      case "<":
        (o = S), (i = T), (s = E), (a = "<"), (c = "<=");
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (P(e, t, n)) return !1;
    for (var l = 0; l < t.set.length; ++l) {
      var u = t.set[l],
        f = null,
        p = null;
      if (
        (u.forEach(function (e) {
          e.semver === A && (e = new R(">=0.0.0")),
            (f = f || e),
            (p = p || e),
            o(e.semver, f.semver, n)
              ? (f = e)
              : s(e.semver, p.semver, n) && (p = e);
        }),
        f.operator === a || f.operator === c)
      )
        return !1;
      if ((!p.operator || p.operator === a) && i(e, p.semver)) return !1;
      if (p.operator === c && s(e, p.semver)) return !1;
    }
    return !0;
  }
  (R.prototype.parse = function (e) {
    var t = this.options.loose ? a[l.COMPARATORLOOSE] : a[l.COMPARATOR],
      r = e.match(t);
    if (!r) throw new TypeError("Invalid comparator: " + e);
    (this.operator = void 0 !== r[1] ? r[1] : ""),
      "=" === this.operator && (this.operator = ""),
      r[2]
        ? (this.semver = new y(r[2], this.options.loose))
        : (this.semver = A);
  }),
    (R.prototype.toString = function () {
      return this.value;
    }),
    (R.prototype.test = function (e) {
      if (
        (r("Comparator.test", e, this.options.loose),
        this.semver === A || e === A)
      )
        return !0;
      if ("string" == typeof e)
        try {
          e = new y(e, this.options);
        } catch (e) {
          return !1;
        }
      return x(e, this.operator, this.semver, this.options);
    }),
    (R.prototype.intersects = function (e, t) {
      if (!(e instanceof R)) throw new TypeError("a Comparator is required");
      var r;
      if (
        ((t && "object" == typeof t) ||
          (t = { loose: !!t, includePrerelease: !1 }),
        "" === this.operator)
      )
        return (
          "" === this.value || ((r = new D(e.value, t)), P(this.value, r, t))
        );
      if ("" === e.operator)
        return (
          "" === e.value || ((r = new D(this.value, t)), P(e.semver, r, t))
        );
      var n = !(
          (">=" !== this.operator && ">" !== this.operator) ||
          (">=" !== e.operator && ">" !== e.operator)
        ),
        o = !(
          ("<=" !== this.operator && "<" !== this.operator) ||
          ("<=" !== e.operator && "<" !== e.operator)
        ),
        i = this.semver.version === e.semver.version,
        s = !(
          (">=" !== this.operator && "<=" !== this.operator) ||
          (">=" !== e.operator && "<=" !== e.operator)
        ),
        a =
          x(this.semver, "<", e.semver, t) &&
          (">=" === this.operator || ">" === this.operator) &&
          ("<=" === e.operator || "<" === e.operator),
        c =
          x(this.semver, ">", e.semver, t) &&
          ("<=" === this.operator || "<" === this.operator) &&
          (">=" === e.operator || ">" === e.operator);
      return n || o || (i && s) || a || c;
    }),
    (t.Range = D),
    (D.prototype.format = function () {
      return (
        (this.range = this.set
          .map(function (e) {
            return e.join(" ").trim();
          })
          .join("||")
          .trim()),
        this.range
      );
    }),
    (D.prototype.toString = function () {
      return this.range;
    }),
    (D.prototype.parseRange = function (e) {
      var t = this.options.loose,
        n = t ? a[l.HYPHENRANGELOOSE] : a[l.HYPHENRANGE];
      (e = e.replace(n, k)),
        r("hyphen replace", e),
        (e = e.replace(a[l.COMPARATORTRIM], "$1$2$3")),
        r("comparator trim", e, a[l.COMPARATORTRIM]),
        (e = (e = (e = e.replace(a[l.TILDETRIM], "$1~")).replace(
          a[l.CARETTRIM],
          "$1^"
        ))
          .split(/\s+/)
          .join(" "));
      var o = t ? a[l.COMPARATORLOOSE] : a[l.COMPARATOR],
        i = e
          .split(" ")
          .map(function (e) {
            return (function (e, t) {
              return (
                r("comp", e, t),
                (e = (function (e, t) {
                  return e
                    .trim()
                    .split(/\s+/)
                    .map(function (e) {
                      return (function (e, t) {
                        r("caret", e, t);
                        var n = t.loose ? a[l.CARETLOOSE] : a[l.CARET];
                        return e.replace(n, function (t, n, o, i, s) {
                          var a;
                          return (
                            r("caret", e, t, n, o, i, s),
                            L(n)
                              ? (a = "")
                              : L(o)
                                ? (a = ">=" + n + ".0.0 <" + (+n + 1) + ".0.0")
                                : L(i)
                                  ? (a =
                                      "0" === n
                                        ? ">=" +
                                          n +
                                          "." +
                                          o +
                                          ".0 <" +
                                          n +
                                          "." +
                                          (+o + 1) +
                                          ".0"
                                        : ">=" +
                                          n +
                                          "." +
                                          o +
                                          ".0 <" +
                                          (+n + 1) +
                                          ".0.0")
                                  : s
                                    ? (r("replaceCaret pr", s),
                                      (a =
                                        "0" === n
                                          ? "0" === o
                                            ? ">=" +
                                              n +
                                              "." +
                                              o +
                                              "." +
                                              i +
                                              "-" +
                                              s +
                                              " <" +
                                              n +
                                              "." +
                                              o +
                                              "." +
                                              (+i + 1)
                                            : ">=" +
                                              n +
                                              "." +
                                              o +
                                              "." +
                                              i +
                                              "-" +
                                              s +
                                              " <" +
                                              n +
                                              "." +
                                              (+o + 1) +
                                              ".0"
                                          : ">=" +
                                            n +
                                            "." +
                                            o +
                                            "." +
                                            i +
                                            "-" +
                                            s +
                                            " <" +
                                            (+n + 1) +
                                            ".0.0"))
                                    : (r("no pr"),
                                      (a =
                                        "0" === n
                                          ? "0" === o
                                            ? ">=" +
                                              n +
                                              "." +
                                              o +
                                              "." +
                                              i +
                                              " <" +
                                              n +
                                              "." +
                                              o +
                                              "." +
                                              (+i + 1)
                                            : ">=" +
                                              n +
                                              "." +
                                              o +
                                              "." +
                                              i +
                                              " <" +
                                              n +
                                              "." +
                                              (+o + 1) +
                                              ".0"
                                          : ">=" +
                                            n +
                                            "." +
                                            o +
                                            "." +
                                            i +
                                            " <" +
                                            (+n + 1) +
                                            ".0.0")),
                            r("caret return", a),
                            a
                          );
                        });
                      })(e, t);
                    })
                    .join(" ");
                })(e, t)),
                r("caret", e),
                (e = (function (e, t) {
                  return e
                    .trim()
                    .split(/\s+/)
                    .map(function (e) {
                      return (function (e, t) {
                        var n = t.loose ? a[l.TILDELOOSE] : a[l.TILDE];
                        return e.replace(n, function (t, n, o, i, s) {
                          var a;
                          return (
                            r("tilde", e, t, n, o, i, s),
                            L(n)
                              ? (a = "")
                              : L(o)
                                ? (a = ">=" + n + ".0.0 <" + (+n + 1) + ".0.0")
                                : L(i)
                                  ? (a =
                                      ">=" +
                                      n +
                                      "." +
                                      o +
                                      ".0 <" +
                                      n +
                                      "." +
                                      (+o + 1) +
                                      ".0")
                                  : s
                                    ? (r("replaceTilde pr", s),
                                      (a =
                                        ">=" +
                                        n +
                                        "." +
                                        o +
                                        "." +
                                        i +
                                        "-" +
                                        s +
                                        " <" +
                                        n +
                                        "." +
                                        (+o + 1) +
                                        ".0"))
                                    : (a =
                                        ">=" +
                                        n +
                                        "." +
                                        o +
                                        "." +
                                        i +
                                        " <" +
                                        n +
                                        "." +
                                        (+o + 1) +
                                        ".0"),
                            r("tilde return", a),
                            a
                          );
                        });
                      })(e, t);
                    })
                    .join(" ");
                })(e, t)),
                r("tildes", e),
                (e = (function (e, t) {
                  return (
                    r("replaceXRanges", e, t),
                    e
                      .split(/\s+/)
                      .map(function (e) {
                        return (function (e, t) {
                          e = e.trim();
                          var n = t.loose ? a[l.XRANGELOOSE] : a[l.XRANGE];
                          return e.replace(n, function (n, o, i, s, a, c) {
                            r("xRange", e, n, o, i, s, a, c);
                            var l = L(i),
                              u = l || L(s),
                              f = u || L(a),
                              p = f;
                            return (
                              "=" === o && p && (o = ""),
                              (c = t.includePrerelease ? "-0" : ""),
                              l
                                ? (n =
                                    ">" === o || "<" === o ? "<0.0.0-0" : "*")
                                : o && p
                                  ? (u && (s = 0),
                                    (a = 0),
                                    ">" === o
                                      ? ((o = ">="),
                                        u
                                          ? ((i = +i + 1), (s = 0), (a = 0))
                                          : ((s = +s + 1), (a = 0)))
                                      : "<=" === o &&
                                        ((o = "<"),
                                        u ? (i = +i + 1) : (s = +s + 1)),
                                    (n = o + i + "." + s + "." + a + c))
                                  : u
                                    ? (n =
                                        ">=" +
                                        i +
                                        ".0.0" +
                                        c +
                                        " <" +
                                        (+i + 1) +
                                        ".0.0" +
                                        c)
                                    : f &&
                                      (n =
                                        ">=" +
                                        i +
                                        "." +
                                        s +
                                        ".0" +
                                        c +
                                        " <" +
                                        i +
                                        "." +
                                        (+s + 1) +
                                        ".0" +
                                        c),
                              r("xRange return", n),
                              n
                            );
                          });
                        })(e, t);
                      })
                      .join(" ")
                  );
                })(e, t)),
                r("xrange", e),
                (e = (function (e, t) {
                  return (
                    r("replaceStars", e, t), e.trim().replace(a[l.STAR], "")
                  );
                })(e, t)),
                r("stars", e),
                e
              );
            })(e, this.options);
          }, this)
          .join(" ")
          .split(/\s+/);
      return (
        this.options.loose &&
          (i = i.filter(function (e) {
            return !!e.match(o);
          })),
        (i = i.map(function (e) {
          return new R(e, this.options);
        }, this))
      );
    }),
    (D.prototype.intersects = function (e, t) {
      if (!(e instanceof D)) throw new TypeError("a Range is required");
      return this.set.some(function (r) {
        return (
          N(r, t) &&
          e.set.some(function (e) {
            return (
              N(e, t) &&
              r.every(function (r) {
                return e.every(function (e) {
                  return r.intersects(e, t);
                });
              })
            );
          })
        );
      });
    }),
    (t.toComparators = function (e, t) {
      return new D(e, t).set.map(function (e) {
        return e
          .map(function (e) {
            return e.value;
          })
          .join(" ")
          .trim()
          .split(" ");
      });
    }),
    (D.prototype.test = function (e) {
      if (!e) return !1;
      if ("string" == typeof e)
        try {
          e = new y(e, this.options);
        } catch (e) {
          return !1;
        }
      for (var t = 0; t < this.set.length; t++)
        if (C(this.set[t], e, this.options)) return !0;
      return !1;
    }),
    (t.satisfies = P),
    (t.maxSatisfying = function (e, t, r) {
      var n = null,
        o = null;
      try {
        var i = new D(t, r);
      } catch (e) {
        return null;
      }
      return (
        e.forEach(function (e) {
          i.test(e) && ((n && -1 !== o.compare(e)) || (o = new y((n = e), r)));
        }),
        n
      );
    }),
    (t.minSatisfying = function (e, t, r) {
      var n = null,
        o = null;
      try {
        var i = new D(t, r);
      } catch (e) {
        return null;
      }
      return (
        e.forEach(function (e) {
          i.test(e) && ((n && 1 !== o.compare(e)) || (o = new y((n = e), r)));
        }),
        n
      );
    }),
    (t.minVersion = function (e, t) {
      e = new D(e, t);
      var r = new y("0.0.0");
      if (e.test(r)) return r;
      if (((r = new y("0.0.0-0")), e.test(r))) return r;
      r = null;
      for (var n = 0; n < e.set.length; ++n) {
        e.set[n].forEach(function (e) {
          var t = new y(e.semver.version);
          switch (e.operator) {
            case ">":
              0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0),
                (t.raw = t.format());
            case "":
            case ">=":
              (r && !E(r, t)) || (r = t);
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error("Unexpected operation: " + e.operator);
          }
        });
      }
      if (r && e.test(r)) return r;
      return null;
    }),
    (t.validRange = function (e, t) {
      try {
        return new D(e, t).range || "*";
      } catch (e) {
        return null;
      }
    }),
    (t.ltr = function (e, t, r) {
      return M(e, t, "<", r);
    }),
    (t.gtr = function (e, t, r) {
      return M(e, t, ">", r);
    }),
    (t.outside = M),
    (t.prerelease = function (e, t) {
      var r = g(e, t);
      return r && r.prerelease.length ? r.prerelease : null;
    }),
    (t.intersects = function (e, t, r) {
      return (e = new D(e, r)), (t = new D(t, r)), e.intersects(t);
    }),
    (t.coerce = function (e, t) {
      if (e instanceof y) return e;
      "number" == typeof e && (e = String(e));
      if ("string" != typeof e) return null;
      var r = null;
      if ((t = t || {}).rtl) {
        for (
          var n;
          (n = a[l.COERCERTL].exec(e)) &&
          (!r || r.index + r[0].length !== e.length);

        )
          (r && n.index + n[0].length === r.index + r[0].length) || (r = n),
            (a[l.COERCERTL].lastIndex = n.index + n[1].length + n[2].length);
        a[l.COERCERTL].lastIndex = -1;
      } else r = e.match(a[l.COERCE]);
      if (null === r) return null;
      return g(r[2] + "." + (r[3] || "0") + "." + (r[4] || "0"), t);
    });
})(0, bf.exports);
var vf = ne(bf.exports);
function wf(e) {
  if ("object" != typeof e || null === e) return !1;
  const t = Object.getPrototypeOf(e);
  return !(
    (null !== t &&
      t !== Object.prototype &&
      null !== Object.getPrototypeOf(t)) ||
    Symbol.toStringTag in e ||
    Symbol.iterator in e
  );
}
var Ef = rc,
  Sf = yt,
  Of = kr,
  If = Cs;
ti(
  { target: "Iterator", proto: !0, real: !0 },
  {
    find: function (e) {
      Of(this), Sf(e);
      var t = If(this),
        r = 0;
      return Ef(
        t,
        function (t, n) {
          if (e(t, r++)) return n(t);
        },
        { IS_RECORD: !0, INTERRUPTED: !0 }
      ).result;
    },
  }
);
var Tf = Da,
  jf = String,
  xf = function (e) {
    if ("Symbol" === Tf(e))
      throw new TypeError("Cannot convert a Symbol value to a string");
    return jf(e);
  },
  Rf = TypeError,
  Af = function (e, t) {
    if (e < t) throw new Rf("Not enough arguments");
    return e;
  },
  Df = Jn,
  Nf = Ie,
  Lf = xf,
  kf = Af,
  Cf = URLSearchParams,
  Pf = Cf.prototype,
  Mf = Nf(Pf.append),
  _f = Nf(Pf.delete),
  $f = Nf(Pf.forEach),
  Bf = Nf([].push),
  Ff = new Cf("a=1&a=2&b=3");
Ff.delete("a", 1),
  Ff.delete("b", void 0),
  Ff + "" != "a=2" &&
    Df(
      Pf,
      "delete",
      function (e) {
        var t = arguments.length,
          r = t < 2 ? void 0 : arguments[1];
        if (t && void 0 === r) return _f(this, e);
        var n = [];
        $f(this, function (e, t) {
          Bf(n, { key: t, value: e });
        }),
          kf(t, 1);
        for (
          var o, i = Lf(e), s = Lf(r), a = 0, c = 0, l = !1, u = n.length;
          a < u;

        )
          (o = n[a++]), l || o.key === i ? ((l = !0), _f(this, o.key)) : c++;
        for (; c < u; )
          ((o = n[c++]).key === i && o.value === s) || Mf(this, o.key, o.value);
      },
      { enumerable: !0, unsafe: !0 }
    );
var Uf = Jn,
  Gf = Ie,
  Wf = xf,
  zf = Af,
  Vf = URLSearchParams,
  Hf = Vf.prototype,
  Xf = Gf(Hf.getAll),
  qf = Gf(Hf.has),
  Kf = new Vf("a=1");
(!Kf.has("a", 2) && Kf.has("a", void 0)) ||
  Uf(
    Hf,
    "has",
    function (e) {
      var t = arguments.length,
        r = t < 2 ? void 0 : arguments[1];
      if (t && void 0 === r) return qf(this, e);
      var n = Xf(this, e);
      zf(t, 1);
      for (var o = Wf(r), i = 0; i < n.length; ) if (n[i++] === o) return !0;
      return !1;
    },
    { enumerable: !0, unsafe: !0 }
  );
var Yf = ce,
  Qf = Ie,
  Jf = ji,
  Zf = URLSearchParams.prototype,
  ep = Qf(Zf.forEach);
Yf &&
  !("size" in Zf) &&
  Jf(Zf, "size", {
    get: function () {
      var e = 0;
      return (
        ep(this, function () {
          e++;
        }),
        e
      );
    },
    configurable: !0,
    enumerable: !0,
  });
const tp = (e, t) => {
    const r = rp(e);
    if ("string" != typeof r)
      throw new TypeError(`${t} must be a string or a file URL: ${r}.`);
    return r;
  },
  rp = e => (e instanceof URL ? p(e) : e),
  np = (e, t = [], r = {}) => {
    const n = tp(e, "First argument"),
      [o, i] = wf(t) ? [[], t] : [t, r];
    if (!Array.isArray(o))
      throw new TypeError(
        `Second argument must be either an array of arguments or an options object: ${o}`
      );
    if (o.some(e => "object" == typeof e && null !== e))
      throw new TypeError(`Second argument must be an array of strings: ${o}`);
    const s = o.map(String),
      a = s.find(e => e.includes("\0"));
    if (void 0 !== a)
      throw new TypeError(`Arguments cannot contain null bytes ("\\0"): ${a}`);
    if (!wf(i))
      throw new TypeError(`Last argument must be an options object: ${i}`);
    return [n, s, i];
  };
var op = Ie,
  ip = Set.prototype,
  sp = {
    Set: Set,
    add: op(ip.add),
    has: op(ip.has),
    remove: op(ip.delete),
    proto: ip,
  },
  ap = sp.has,
  cp = function (e) {
    return ap(e), e;
  },
  lp = pe,
  up = function (e, t, r) {
    for (var n, o, i = r ? e : e.iterator, s = e.next; !(n = lp(s, i)).done; )
      if (void 0 !== (o = t(n.value))) return o;
  },
  fp = Ie,
  pp = up,
  dp = sp.Set,
  hp = sp.proto,
  mp = fp(hp.forEach),
  gp = fp(hp.keys),
  yp = gp(new dp()).next,
  bp = function (e, t, r) {
    return r ? pp({ iterator: gp(e), next: yp }, t) : mp(e, t);
  },
  vp = bp,
  wp = sp.Set,
  Ep = sp.add,
  Sp = function (e) {
    var t = new wp();
    return (
      vp(e, function (e) {
        Ep(t, e);
      }),
      t
    );
  },
  Op = Ie,
  Ip = yt,
  Tp = function (e, t, r) {
    try {
      return Op(Ip(Object.getOwnPropertyDescriptor(e, t)[r]));
    } catch (e) {}
  },
  jp =
    Tp(sp.proto, "size", "get") ||
    function (e) {
      return e.size;
    },
  xp = yt,
  Rp = kr,
  Ap = pe,
  Dp = oo,
  Np = Cs,
  Lp = "Invalid size",
  kp = RangeError,
  Cp = TypeError,
  Pp = Math.max,
  Mp = function (e, t) {
    (this.set = e),
      (this.size = Pp(t, 0)),
      (this.has = xp(e.has)),
      (this.keys = xp(e.keys));
  };
Mp.prototype = {
  getIterator: function () {
    return Np(Rp(Ap(this.keys, this.set)));
  },
  includes: function (e) {
    return Ap(this.has, this.set, e);
  },
};
var _p = function (e) {
    Rp(e);
    var t = +e.size;
    if (t != t) throw new Cp(Lp);
    var r = Dp(t);
    if (r < 0) throw new kp(Lp);
    return new Mp(e, r);
  },
  $p = cp,
  Bp = Sp,
  Fp = jp,
  Up = _p,
  Gp = bp,
  Wp = up,
  zp = sp.has,
  Vp = sp.remove,
  Hp = Xe,
  Xp = function (e) {
    return {
      size: e,
      has: function () {
        return !1;
      },
      keys: function () {
        return {
          next: function () {
            return { done: !0 };
          },
        };
      },
    };
  },
  qp = function (e) {
    var t = Hp("Set");
    try {
      new t()[e](Xp(0));
      try {
        return new t()[e](Xp(-1)), !1;
      } catch (e) {
        return !0;
      }
    } catch (e) {
      return !1;
    }
  },
  Kp = function (e) {
    var t = $p(this),
      r = Up(e),
      n = Bp(t);
    return (
      Fp(t) <= r.size
        ? Gp(t, function (e) {
            r.includes(e) && Vp(n, e);
          })
        : Wp(r.getIterator(), function (e) {
            zp(t, e) && Vp(n, e);
          }),
      n
    );
  };
ti(
  { target: "Set", proto: !0, real: !0, forced: !qp("difference") },
  { difference: Kp }
);
var Yp = cp,
  Qp = jp,
  Jp = _p,
  Zp = bp,
  ed = up,
  td = sp.Set,
  rd = sp.add,
  nd = sp.has,
  od = ae,
  id = function (e) {
    var t = Yp(this),
      r = Jp(e),
      n = new td();
    return (
      Qp(t) > r.size
        ? ed(r.getIterator(), function (e) {
            nd(t, e) && rd(n, e);
          })
        : Zp(t, function (e) {
            r.includes(e) && rd(n, e);
          }),
      n
    );
  };
ti(
  {
    target: "Set",
    proto: !0,
    real: !0,
    forced:
      !qp("intersection") ||
      od(function () {
        return (
          "3,2" !==
          String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2]))))
        );
      }),
  },
  { intersection: id }
);
var sd = cp,
  ad = sp.has,
  cd = jp,
  ld = _p,
  ud = bp,
  fd = up,
  pd = Bs,
  dd = function (e) {
    var t = sd(this),
      r = ld(e);
    if (cd(t) <= r.size)
      return (
        !1 !==
        ud(
          t,
          function (e) {
            if (r.includes(e)) return !1;
          },
          !0
        )
      );
    var n = r.getIterator();
    return (
      !1 !==
      fd(n, function (e) {
        if (ad(t, e)) return pd(n, "normal", !1);
      })
    );
  };
ti(
  { target: "Set", proto: !0, real: !0, forced: !qp("isDisjointFrom") },
  { isDisjointFrom: dd }
);
var hd = cp,
  md = jp,
  gd = bp,
  yd = _p,
  bd = function (e) {
    var t = hd(this),
      r = yd(e);
    return (
      !(md(t) > r.size) &&
      !1 !==
        gd(
          t,
          function (e) {
            if (!r.includes(e)) return !1;
          },
          !0
        )
    );
  };
ti(
  { target: "Set", proto: !0, real: !0, forced: !qp("isSubsetOf") },
  { isSubsetOf: bd }
);
var vd = cp,
  wd = sp.has,
  Ed = jp,
  Sd = _p,
  Od = up,
  Id = Bs,
  Td = function (e) {
    var t = vd(this),
      r = Sd(e);
    if (Ed(t) < r.size) return !1;
    var n = r.getIterator();
    return (
      !1 !==
      Od(n, function (e) {
        if (!wd(t, e)) return Id(n, "normal", !1);
      })
    );
  };
ti(
  { target: "Set", proto: !0, real: !0, forced: !qp("isSupersetOf") },
  { isSupersetOf: Td }
);
var jd = cp,
  xd = Sp,
  Rd = _p,
  Ad = up,
  Dd = sp.add,
  Nd = sp.has,
  Ld = sp.remove,
  kd = function (e) {
    var t = jd(this),
      r = Rd(e).getIterator(),
      n = xd(t);
    return (
      Ad(r, function (e) {
        Nd(t, e) ? Ld(n, e) : Dd(n, e);
      }),
      n
    );
  };
ti(
  { target: "Set", proto: !0, real: !0, forced: !qp("symmetricDifference") },
  { symmetricDifference: kd }
);
var Cd = cp,
  Pd = sp.add,
  Md = Sp,
  _d = _p,
  $d = up,
  Bd = function (e) {
    var t = Cd(this),
      r = _d(e).getIterator(),
      n = Md(t);
    return (
      $d(r, function (e) {
        Pd(n, e);
      }),
      n
    );
  };
ti({ target: "Set", proto: !0, real: !0, forced: !qp("union") }, { union: Bd });
var Fd = Re,
  Ud = TypeError,
  Gd =
    Tp(ArrayBuffer.prototype, "byteLength", "get") ||
    function (e) {
      if ("ArrayBuffer" !== Fd(e)) throw new Ud("ArrayBuffer expected");
      return e.byteLength;
    },
  Wd = Gd,
  zd = Ie(ArrayBuffer.prototype.slice),
  Vd = function (e) {
    if (0 !== Wd(e)) return !1;
    try {
      return zd(e, 0, 0), !1;
    } catch (e) {
      return !0;
    }
  },
  Hd = ce,
  Xd = ji,
  qd = Vd,
  Kd = ArrayBuffer.prototype;
Hd &&
  !("detached" in Kd) &&
  Xd(Kd, "detached", {
    configurable: !0,
    get: function () {
      return qd(this);
    },
  });
var Yd,
  Qd,
  Jd,
  Zd,
  eh = oo,
  th = uo,
  rh = RangeError,
  nh = "process" === Re(ie.process),
  oh = nh,
  ih = "object" == typeof Deno && Deno && "object" == typeof Deno.version,
  sh = !ih && !nh && "object" == typeof window && "object" == typeof document,
  ah = ae,
  ch = tt,
  lh = sh,
  uh = ih,
  fh = nh,
  ph = ie.structuredClone,
  dh =
    !!ph &&
    !ah(function () {
      if ((uh && ch > 92) || (fh && ch > 94) || (lh && ch > 97)) return !1;
      var e = new ArrayBuffer(8),
        t = ph(e, { transfer: [e] });
      return 0 !== e.byteLength || 8 !== t.byteLength;
    }),
  hh = ie,
  mh = function (e) {
    try {
      if (oh) return Function('return require("' + e + '")')();
    } catch (e) {}
  },
  gh = dh,
  yh = hh.structuredClone,
  bh = hh.ArrayBuffer,
  vh = hh.MessageChannel,
  wh = !1;
if (gh)
  wh = function (e) {
    yh(e, { transfer: [e] });
  };
else if (bh)
  try {
    vh || ((Yd = mh("worker_threads")) && (vh = Yd.MessageChannel)),
      vh &&
        ((Qd = new vh()),
        (Jd = new bh(2)),
        (Zd = function (e) {
          Qd.port1.postMessage(null, [e]);
        }),
        2 === Jd.byteLength && (Zd(Jd), 0 === Jd.byteLength && (wh = Zd)));
  } catch (e) {}
var Eh = ie,
  Sh = Ie,
  Oh = Tp,
  Ih = function (e) {
    if (void 0 === e) return 0;
    var t = eh(e),
      r = th(t);
    if (t !== r) throw new rh("Wrong length or index");
    return r;
  },
  Th = Vd,
  jh = Gd,
  xh = wh,
  Rh = dh,
  Ah = Eh.structuredClone,
  Dh = Eh.ArrayBuffer,
  Nh = Eh.DataView,
  Lh = Eh.TypeError,
  kh = Math.min,
  Ch = Dh.prototype,
  Ph = Nh.prototype,
  Mh = Sh(Ch.slice),
  _h = Oh(Ch, "resizable", "get"),
  $h = Oh(Ch, "maxByteLength", "get"),
  Bh = Sh(Ph.getInt8),
  Fh = Sh(Ph.setInt8),
  Uh =
    (Rh || xh) &&
    function (e, t, r) {
      var n,
        o = jh(e),
        i = void 0 === t ? o : Ih(t),
        s = !_h || !_h(e);
      if (Th(e)) throw new Lh("ArrayBuffer is detached");
      if (Rh && ((e = Ah(e, { transfer: [e] })), o === i && (r || s))) return e;
      if (o >= i && (!r || s)) n = Mh(e, 0, i);
      else {
        var a = r && !s && $h ? { maxByteLength: $h(e) } : void 0;
        n = new Dh(i, a);
        for (var c = new Nh(e), l = new Nh(n), u = kh(i, o), f = 0; f < u; f++)
          Fh(l, f, Bh(c, f));
      }
      return Rh || xh(e), n;
    },
  Gh = Uh;
Gh &&
  ti(
    { target: "ArrayBuffer", proto: !0 },
    {
      transfer: function () {
        return Gh(this, arguments.length ? arguments[0] : void 0, !0);
      },
    }
  );
var Wh = Uh;
Wh &&
  ti(
    { target: "ArrayBuffer", proto: !0 },
    {
      transferToFixedLength: function () {
        return Wh(this, arguments.length ? arguments[0] : void 0, !1);
      },
    }
  );
var zh,
  Vh,
  Hh,
  Xh = po,
  qh = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView,
  Kh = ze,
  Yh = function (e) {
    return Kh(e) || null === e;
  },
  Qh = String,
  Jh = TypeError,
  Zh = Tp,
  em = ze,
  tm = _e,
  rm = function (e) {
    if (Yh(e)) return e;
    throw new Jh("Can't set " + Qh(e) + " as a prototype");
  },
  nm =
    Object.setPrototypeOf ||
    ("__proto__" in {}
      ? (function () {
          var e,
            t = !1,
            r = {};
          try {
            (e = Zh(Object.prototype, "__proto__", "set"))(r, []),
              (t = r instanceof Array);
          } catch (e) {}
          return function (r, n) {
            return (
              tm(r), rm(n), em(r) ? (t ? e(r, n) : (r.__proto__ = n), r) : r
            );
          };
        })()
      : void 0),
  om = qh,
  im = ce,
  sm = ie,
  am = Ge,
  cm = ze,
  lm = Ut,
  um = Da,
  fm = dt,
  pm = Xr,
  dm = Jn,
  hm = ji,
  mm = qe,
  gm = Oi,
  ym = nm,
  bm = tr,
  vm = Ht,
  wm = An.enforce,
  Em = An.get,
  Sm = sm.Int8Array,
  Om = Sm && Sm.prototype,
  Im = sm.Uint8ClampedArray,
  Tm = Im && Im.prototype,
  jm = Sm && gm(Sm),
  xm = Om && gm(Om),
  Rm = Object.prototype,
  Am = sm.TypeError,
  Dm = bm("toStringTag"),
  Nm = vm("TYPED_ARRAY_TAG"),
  Lm = "TypedArrayConstructor",
  km = om && !!ym && "Opera" !== um(sm.opera),
  Cm = !1,
  Pm = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8,
  },
  Mm = { BigInt64Array: 8, BigUint64Array: 8 },
  _m = function (e) {
    var t = gm(e);
    if (cm(t)) {
      var r = Em(t);
      return r && lm(r, Lm) ? r[Lm] : _m(t);
    }
  },
  $m = function (e) {
    if (!cm(e)) return !1;
    var t = um(e);
    return lm(Pm, t) || lm(Mm, t);
  };
for (zh in Pm)
  (Hh = (Vh = sm[zh]) && Vh.prototype) ? (wm(Hh)[Lm] = Vh) : (km = !1);
for (zh in Mm) (Hh = (Vh = sm[zh]) && Vh.prototype) && (wm(Hh)[Lm] = Vh);
if (
  (!km || !am(jm) || jm === Function.prototype) &&
  ((jm = function () {
    throw new Am("Incorrect invocation");
  }),
  km)
)
  for (zh in Pm) sm[zh] && ym(sm[zh], jm);
if ((!km || !xm || xm === Rm) && ((xm = jm.prototype), km))
  for (zh in Pm) sm[zh] && ym(sm[zh].prototype, xm);
if ((km && gm(Tm) !== xm && ym(Tm, xm), im && !lm(xm, Dm)))
  for (zh in ((Cm = !0),
  hm(xm, Dm, {
    configurable: !0,
    get: function () {
      return cm(this) ? this[Nm] : void 0;
    },
  }),
  Pm))
    sm[zh] && pm(sm[zh], Nm, zh);
var Bm = {
    NATIVE_ARRAY_BUFFER_VIEWS: km,
    TYPED_ARRAY_TAG: Cm && Nm,
    aTypedArray: function (e) {
      if ($m(e)) return e;
      throw new Am("Target is not a typed array");
    },
    aTypedArrayConstructor: function (e) {
      if (am(e) && (!ym || mm(jm, e))) return e;
      throw new Am(fm(e) + " is not a typed array constructor");
    },
    exportTypedArrayMethod: function (e, t, r, n) {
      if (im) {
        if (r)
          for (var o in Pm) {
            var i = sm[o];
            if (i && lm(i.prototype, e))
              try {
                delete i.prototype[e];
              } catch (r) {
                try {
                  i.prototype[e] = t;
                } catch (e) {}
              }
          }
        (xm[e] && !r) || dm(xm, e, r ? t : (km && Om[e]) || t, n);
      }
    },
    exportTypedArrayStaticMethod: function (e, t, r) {
      var n, o;
      if (im) {
        if (ym) {
          if (r)
            for (n in Pm)
              if ((o = sm[n]) && lm(o, e))
                try {
                  delete o[e];
                } catch (e) {}
          if (jm[e] && !r) return;
          try {
            return dm(jm, e, r ? t : (km && jm[e]) || t);
          } catch (e) {}
        }
        for (n in Pm) !(o = sm[n]) || (o[e] && !r) || dm(o, e, t);
      }
    },
    getTypedArrayConstructor: _m,
    isView: function (e) {
      if (!cm(e)) return !1;
      var t = um(e);
      return "DataView" === t || lm(Pm, t) || lm(Mm, t);
    },
    isTypedArray: $m,
    TypedArray: jm,
    TypedArrayPrototype: xm,
  },
  Fm = function (e, t) {
    for (var r = Xh(e), n = new t(r), o = 0; o < r; o++) n[o] = e[r - o - 1];
    return n;
  },
  Um = Bm.aTypedArray,
  Gm = Bm.getTypedArrayConstructor;
(0, Bm.exportTypedArrayMethod)("toReversed", function () {
  return Fm(Um(this), Gm(this));
});
var Wm = po,
  zm = yt,
  Vm = function (e, t, r) {
    for (var n = 0, o = arguments.length > 2 ? r : Wm(t), i = new e(o); o > n; )
      i[n] = t[n++];
    return i;
  },
  Hm = Bm.aTypedArray,
  Xm = Bm.getTypedArrayConstructor,
  qm = Bm.exportTypedArrayMethod,
  Km = Ie(Bm.TypedArrayPrototype.sort);
qm("toSorted", function (e) {
  void 0 !== e && zm(e);
  var t = Hm(this),
    r = Vm(Xm(t), t);
  return Km(r, e);
});
var Ym = po,
  Qm = oo,
  Jm = RangeError,
  Zm = Da,
  eg = lr,
  tg = TypeError,
  rg = function (e, t, r, n) {
    var o = Ym(e),
      i = Qm(r),
      s = i < 0 ? o + i : i;
    if (s >= o || s < 0) throw new Jm("Incorrect index");
    for (var a = new t(o), c = 0; c < o; c++) a[c] = c === s ? n : e[c];
    return a;
  },
  ng = function (e) {
    var t = Zm(e);
    return "BigInt64Array" === t || "BigUint64Array" === t;
  },
  og = oo,
  ig = function (e) {
    var t = eg(e, "number");
    if ("number" == typeof t) throw new tg("Can't convert number to bigint");
    return BigInt(t);
  },
  sg = Bm.aTypedArray,
  ag = Bm.getTypedArrayConstructor,
  cg = Bm.exportTypedArrayMethod,
  lg = !!(function () {
    try {
      new Int8Array(1).with(2, {
        valueOf: function () {
          throw 8;
        },
      });
    } catch (e) {
      return 8 === e;
    }
  })();
cg(
  "with",
  {
    with: function (e, t) {
      var r = sg(this),
        n = og(e),
        o = ng(r) ? ig(t) : +t;
      return rg(r, ag(r), n, o);
    },
  }.with,
  !lg
);
const { toString: ug } = Object.prototype,
  fg = e => "[object Uint8Array]" === ug.call(e),
  pg = e => new Uint8Array(e.buffer, e.byteOffset, e.byteLength),
  dg = new TextEncoder(),
  hg = e => dg.encode(e),
  mg = new TextDecoder(),
  gg = e => mg.decode(e),
  yg = (e, t) => {
    if ("utf8" === t && e.every(e => "string" == typeof e)) return e;
    const r = new g(t),
      n = e.map(e => ("string" == typeof e ? hg(e) : e)).map(e => r.write(e)),
      o = r.end();
    return "" === o ? n : [...n, o];
  },
  bg = e => (1 === e.length && fg(e[0]) ? e[0] : wg(vg(e))),
  vg = e => e.map(e => ("string" == typeof e ? hg(e) : e)),
  wg = e => {
    const t = new Uint8Array(Eg(e));
    let r = 0;
    for (const n of e) t.set(n, r), (r += n.length);
    return t;
  },
  Eg = e => {
    let t = 0;
    for (const r of e) t += r.length;
    return t;
  },
  Sg = ({ templates: e, expressions: t, tokens: r, index: n, template: o }) => {
    if (void 0 === o)
      throw new TypeError(`Invalid backslash sequence: ${e.raw[n]}`);
    const {
        nextTokens: i,
        leadingWhitespaces: s,
        trailingWhitespaces: a,
      } = Og(o, e.raw[n]),
      c = jg(r, i, s);
    if (n === t.length) return c;
    const l = t[n],
      u = Array.isArray(l) ? l.map(e => xg(e)) : [xg(l)];
    return jg(c, u, a);
  },
  Og = (e, t) => {
    if (0 === t.length)
      return {
        nextTokens: [],
        leadingWhitespaces: !1,
        trailingWhitespaces: !1,
      };
    const r = [];
    let n = 0;
    const o = Ig.has(t[0]);
    for (let o = 0, i = 0; o < e.length; o += 1, i += 1) {
      const s = t[i];
      if (Ig.has(s)) n !== o && r.push(e.slice(n, o)), (n = o + 1);
      else if ("\\" === s) {
        const e = t[i + 1];
        "u" === e && "{" === t[i + 2]
          ? (i = t.indexOf("}", i + 3))
          : (i += Tg[e] ?? 1);
      }
    }
    const i = n === e.length;
    return (
      i || r.push(e.slice(n)),
      { nextTokens: r, leadingWhitespaces: o, trailingWhitespaces: i }
    );
  },
  Ig = new Set([" ", "\t", "\r", "\n"]),
  Tg = { x: 3, u: 5 },
  jg = (e, t, r) =>
    r || 0 === e.length || 0 === t.length
      ? [...e, ...t]
      : [...e.slice(0, -1), `${e.at(-1)}${t[0]}`, ...t.slice(1)],
  xg = e => {
    const t = typeof e;
    if ("string" === t) return e;
    if ("number" === t) return String(e);
    if (wf(e) && ("stdout" in e || "isMaxBuffer" in e)) return Rg(e);
    if (
      e instanceof d ||
      "[object Promise]" === Object.prototype.toString.call(e)
    )
      throw new TypeError(
        "Unexpected subprocess in template expression. Please use ${await subprocess} instead of ${subprocess}."
      );
    throw new TypeError(`Unexpected "${t}" in template expression`);
  },
  Rg = ({ stdout: e }) => {
    if ("string" == typeof e) return e;
    if (fg(e)) return gg(e);
    if (void 0 === e)
      throw new TypeError(
        'Missing result.stdout in template expression. This is probably due to the previous subprocess\' "stdout" option.'
      );
    throw new TypeError(
      `Unexpected "${typeof e}" stdout in template expression`
    );
  };
function Ag(e, t) {
  if (null == e) return {};
  var r,
    n,
    o = (function (e, t) {
      if (null == e) return {};
      var r = {};
      for (var n in e)
        if ({}.hasOwnProperty.call(e, n)) {
          if (-1 !== t.indexOf(n)) continue;
          r[n] = e[n];
        }
      return r;
    })(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++)
      (r = i[n]),
        -1 === t.indexOf(r) &&
          {}.propertyIsEnumerable.call(e, r) &&
          (o[r] = e[r]);
  }
  return o;
}
const Dg = e => Ng.includes(e),
  Ng = [O.stdin, O.stdout, O.stderr],
  Lg = ["stdin", "stdout", "stderr"],
  kg = e => Lg[e] ?? `stdio[${e}]`,
  Cg = (e, t) => {
    const r = Array.from({ length: Pg(e) + 1 }),
      n = Mg(e[t], r, t);
    return Wg(n, t);
  },
  Pg = ({ stdio: e }) =>
    Array.isArray(e) ? Math.max(e.length, Lg.length) : Lg.length,
  Mg = (e, t, r) => (wf(e) ? _g(e, t, r) : t.fill(e)),
  _g = (e, t, r) => {
    for (const n of Object.keys(e).sort($g))
      for (const o of Fg(n, r, t)) t[o] = e[n];
    return t;
  },
  $g = (e, t) => (Bg(e) < Bg(t) ? 1 : -1),
  Bg = e => ("stdout" === e || "stderr" === e ? 0 : "all" === e ? 2 : 1),
  Fg = (e, t, r) => {
    if ("ipc" === e) return [r.length - 1];
    const n = Ug(e);
    if (void 0 === n || 0 === n)
      throw new TypeError(
        `"${t}.${e}" is invalid.\nIt must be "${t}.stdout", "${t}.stderr", "${t}.all", "${t}.ipc", or "${t}.fd3", "${t}.fd4" (and so on).`
      );
    if (n >= r.length)
      throw new TypeError(
        `"${t}.${e}" is invalid: that file descriptor does not exist.\nPlease set the "stdio" option to ensure that file descriptor exists.`
      );
    return "all" === n ? [1, 2] : [n];
  },
  Ug = e => {
    if ("all" === e) return e;
    if (Lg.includes(e)) return Lg.indexOf(e);
    const t = Gg.exec(e);
    return null !== t ? Number(t[1]) : void 0;
  },
  Gg = /^fd(\d+)$/,
  Wg = (e, t) => e.map(e => (void 0 === e ? zg[t] : e)),
  zg = {
    lines: !1,
    buffer: !0,
    maxBuffer: 1e8,
    verbose: y("execa").enabled ? "full" : "none",
    stripFinalNewline: !0,
  },
  Vg = ["lines", "buffer", "maxBuffer", "verbose", "stripFinalNewline"],
  Hg = (e, t) => ("ipc" === t ? e.at(-1) : e[t]),
  Xg = ({ verbose: e }, t) => "none" !== Kg(e, t),
  qg = ({ verbose: e }, t) => !["none", "short"].includes(Kg(e, t)),
  Kg = (e, t) => (void 0 === t ? Yg(e) : Hg(e, t)),
  Yg = e => e.find(e => Qg(e)) ?? Jg.findLast(t => e.includes(t)),
  Qg = e => "function" == typeof e,
  Jg = ["none", "short", "full"],
  Zg = e =>
    b(e)
      .split("\n")
      .map(e => ey(e))
      .join("\n"),
  ey = e => e.replaceAll(ry, e => ty(e)),
  ty = e => {
    const t = ny[e];
    if (void 0 !== t) return t;
    const r = e.codePointAt(0),
      n = r.toString(16);
    return r <= oy ? `\\u${n.padStart(4, "0")}` : `\\U${n}`;
  },
  ry = /\p{Separator}|\p{Other}/gu,
  ny = {
    " ": " ",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
  },
  oy = 65535,
  iy = e =>
    sy.test(e)
      ? e
      : "win32" === I
        ? `"${e.replaceAll('"', '""')}"`
        : `'${e.replaceAll("'", "'\\''")}'`,
  sy = /^[\w./-]+$/;
const ay = {
    circleQuestionMark: "(?)",
    questionMarkPrefix: "(?)",
    square: "█",
    squareDarkShade: "▓",
    squareMediumShade: "▒",
    squareLightShade: "░",
    squareTop: "▀",
    squareBottom: "▄",
    squareLeft: "▌",
    squareRight: "▐",
    squareCenter: "■",
    bullet: "●",
    dot: "․",
    ellipsis: "…",
    pointerSmall: "›",
    triangleUp: "▲",
    triangleUpSmall: "▴",
    triangleDown: "▼",
    triangleDownSmall: "▾",
    triangleLeftSmall: "◂",
    triangleRightSmall: "▸",
    home: "⌂",
    heart: "♥",
    musicNote: "♪",
    musicNoteBeamed: "♫",
    arrowUp: "↑",
    arrowDown: "↓",
    arrowLeft: "←",
    arrowRight: "→",
    arrowLeftRight: "↔",
    arrowUpDown: "↕",
    almostEqual: "≈",
    notEqual: "≠",
    lessOrEqual: "≤",
    greaterOrEqual: "≥",
    identical: "≡",
    infinity: "∞",
    subscriptZero: "₀",
    subscriptOne: "₁",
    subscriptTwo: "₂",
    subscriptThree: "₃",
    subscriptFour: "₄",
    subscriptFive: "₅",
    subscriptSix: "₆",
    subscriptSeven: "₇",
    subscriptEight: "₈",
    subscriptNine: "₉",
    oneHalf: "½",
    oneThird: "⅓",
    oneQuarter: "¼",
    oneFifth: "⅕",
    oneSixth: "⅙",
    oneEighth: "⅛",
    twoThirds: "⅔",
    twoFifths: "⅖",
    threeQuarters: "¾",
    threeFifths: "⅗",
    threeEighths: "⅜",
    fourFifths: "⅘",
    fiveSixths: "⅚",
    fiveEighths: "⅝",
    sevenEighths: "⅞",
    line: "─",
    lineBold: "━",
    lineDouble: "═",
    lineDashed0: "┄",
    lineDashed1: "┅",
    lineDashed2: "┈",
    lineDashed3: "┉",
    lineDashed4: "╌",
    lineDashed5: "╍",
    lineDashed6: "╴",
    lineDashed7: "╶",
    lineDashed8: "╸",
    lineDashed9: "╺",
    lineDashed10: "╼",
    lineDashed11: "╾",
    lineDashed12: "−",
    lineDashed13: "–",
    lineDashed14: "‐",
    lineDashed15: "⁃",
    lineVertical: "│",
    lineVerticalBold: "┃",
    lineVerticalDouble: "║",
    lineVerticalDashed0: "┆",
    lineVerticalDashed1: "┇",
    lineVerticalDashed2: "┊",
    lineVerticalDashed3: "┋",
    lineVerticalDashed4: "╎",
    lineVerticalDashed5: "╏",
    lineVerticalDashed6: "╵",
    lineVerticalDashed7: "╷",
    lineVerticalDashed8: "╹",
    lineVerticalDashed9: "╻",
    lineVerticalDashed10: "╽",
    lineVerticalDashed11: "╿",
    lineDownLeft: "┐",
    lineDownLeftArc: "╮",
    lineDownBoldLeftBold: "┓",
    lineDownBoldLeft: "┒",
    lineDownLeftBold: "┑",
    lineDownDoubleLeftDouble: "╗",
    lineDownDoubleLeft: "╖",
    lineDownLeftDouble: "╕",
    lineDownRight: "┌",
    lineDownRightArc: "╭",
    lineDownBoldRightBold: "┏",
    lineDownBoldRight: "┎",
    lineDownRightBold: "┍",
    lineDownDoubleRightDouble: "╔",
    lineDownDoubleRight: "╓",
    lineDownRightDouble: "╒",
    lineUpLeft: "┘",
    lineUpLeftArc: "╯",
    lineUpBoldLeftBold: "┛",
    lineUpBoldLeft: "┚",
    lineUpLeftBold: "┙",
    lineUpDoubleLeftDouble: "╝",
    lineUpDoubleLeft: "╜",
    lineUpLeftDouble: "╛",
    lineUpRight: "└",
    lineUpRightArc: "╰",
    lineUpBoldRightBold: "┗",
    lineUpBoldRight: "┖",
    lineUpRightBold: "┕",
    lineUpDoubleRightDouble: "╚",
    lineUpDoubleRight: "╙",
    lineUpRightDouble: "╘",
    lineUpDownLeft: "┤",
    lineUpBoldDownBoldLeftBold: "┫",
    lineUpBoldDownBoldLeft: "┨",
    lineUpDownLeftBold: "┥",
    lineUpBoldDownLeftBold: "┩",
    lineUpDownBoldLeftBold: "┪",
    lineUpDownBoldLeft: "┧",
    lineUpBoldDownLeft: "┦",
    lineUpDoubleDownDoubleLeftDouble: "╣",
    lineUpDoubleDownDoubleLeft: "╢",
    lineUpDownLeftDouble: "╡",
    lineUpDownRight: "├",
    lineUpBoldDownBoldRightBold: "┣",
    lineUpBoldDownBoldRight: "┠",
    lineUpDownRightBold: "┝",
    lineUpBoldDownRightBold: "┡",
    lineUpDownBoldRightBold: "┢",
    lineUpDownBoldRight: "┟",
    lineUpBoldDownRight: "┞",
    lineUpDoubleDownDoubleRightDouble: "╠",
    lineUpDoubleDownDoubleRight: "╟",
    lineUpDownRightDouble: "╞",
    lineDownLeftRight: "┬",
    lineDownBoldLeftBoldRightBold: "┳",
    lineDownLeftBoldRightBold: "┯",
    lineDownBoldLeftRight: "┰",
    lineDownBoldLeftBoldRight: "┱",
    lineDownBoldLeftRightBold: "┲",
    lineDownLeftRightBold: "┮",
    lineDownLeftBoldRight: "┭",
    lineDownDoubleLeftDoubleRightDouble: "╦",
    lineDownDoubleLeftRight: "╥",
    lineDownLeftDoubleRightDouble: "╤",
    lineUpLeftRight: "┴",
    lineUpBoldLeftBoldRightBold: "┻",
    lineUpLeftBoldRightBold: "┷",
    lineUpBoldLeftRight: "┸",
    lineUpBoldLeftBoldRight: "┹",
    lineUpBoldLeftRightBold: "┺",
    lineUpLeftRightBold: "┶",
    lineUpLeftBoldRight: "┵",
    lineUpDoubleLeftDoubleRightDouble: "╩",
    lineUpDoubleLeftRight: "╨",
    lineUpLeftDoubleRightDouble: "╧",
    lineUpDownLeftRight: "┼",
    lineUpBoldDownBoldLeftBoldRightBold: "╋",
    lineUpDownBoldLeftBoldRightBold: "╈",
    lineUpBoldDownLeftBoldRightBold: "╇",
    lineUpBoldDownBoldLeftRightBold: "╊",
    lineUpBoldDownBoldLeftBoldRight: "╉",
    lineUpBoldDownLeftRight: "╀",
    lineUpDownBoldLeftRight: "╁",
    lineUpDownLeftBoldRight: "┽",
    lineUpDownLeftRightBold: "┾",
    lineUpBoldDownBoldLeftRight: "╂",
    lineUpDownLeftBoldRightBold: "┿",
    lineUpBoldDownLeftBoldRight: "╃",
    lineUpBoldDownLeftRightBold: "╄",
    lineUpDownBoldLeftBoldRight: "╅",
    lineUpDownBoldLeftRightBold: "╆",
    lineUpDoubleDownDoubleLeftDoubleRightDouble: "╬",
    lineUpDoubleDownDoubleLeftRight: "╫",
    lineUpDownLeftDoubleRightDouble: "╪",
    lineCross: "╳",
    lineBackslash: "╲",
    lineSlash: "╱",
  },
  cy = {
    tick: "✔",
    info: "ℹ",
    warning: "⚠",
    cross: "✘",
    squareSmall: "◻",
    squareSmallFilled: "◼",
    circle: "◯",
    circleFilled: "◉",
    circleDotted: "◌",
    circleDouble: "◎",
    circleCircle: "ⓞ",
    circleCross: "ⓧ",
    circlePipe: "Ⓘ",
    radioOn: "◉",
    radioOff: "◯",
    checkboxOn: "☒",
    checkboxOff: "☐",
    checkboxCircleOn: "ⓧ",
    checkboxCircleOff: "Ⓘ",
    pointer: "❯",
    triangleUpOutline: "△",
    triangleLeft: "◀",
    triangleRight: "▶",
    lozenge: "◆",
    lozengeOutline: "◇",
    hamburger: "☰",
    smiley: "㋡",
    mustache: "෴",
    star: "★",
    play: "▶",
    nodejs: "⬢",
    oneSeventh: "⅐",
    oneNinth: "⅑",
    oneTenth: "⅒",
  },
  ly = Object.assign(Object.assign({}, ay), cy),
  uy = Object.assign(Object.assign({}, ay), {
    tick: "√",
    info: "i",
    warning: "‼",
    cross: "×",
    squareSmall: "□",
    squareSmallFilled: "■",
    circle: "( )",
    circleFilled: "(*)",
    circleDotted: "( )",
    circleDouble: "( )",
    circleCircle: "(○)",
    circleCross: "(×)",
    circlePipe: "(│)",
    radioOn: "(*)",
    radioOff: "( )",
    checkboxOn: "[×]",
    checkboxOff: "[ ]",
    checkboxCircleOn: "(×)",
    checkboxCircleOff: "( )",
    pointer: ">",
    triangleUpOutline: "∆",
    triangleLeft: "◄",
    triangleRight: "►",
    lozenge: "♦",
    lozengeOutline: "◊",
    hamburger: "≡",
    smiley: "☺",
    mustache: "┌─┐",
    star: "✶",
    play: "►",
    nodejs: "♦",
    oneSeventh: "1/7",
    oneNinth: "1/9",
    oneTenth: "1/10",
  }),
  fy = (
    "win32" !== O.platform
      ? "linux" !== O.env.TERM
      : Boolean(O.env.WT_SESSION) ||
        Boolean(O.env.TERMINUS_SUBLIME) ||
        "{cmd::Cmder}" === O.env.ConEmuTask ||
        "Terminus-Sublime" === O.env.TERM_PROGRAM ||
        "vscode" === O.env.TERM_PROGRAM ||
        "xterm-256color" === O.env.TERM ||
        "alacritty" === O.env.TERM ||
        "JetBrains-JediTerm" === O.env.TERMINAL_EMULATOR
  )
    ? ly
    : uy;
Object.entries(cy);
const py = C?.WriteStream?.prototype?.hasColors?.() ?? !1,
  dy = (e, t) => {
    if (!py) return e => e;
    const r = `[${e}m`,
      n = `[${t}m`;
    return e => {
      const t = e + "";
      let o = t.indexOf(n);
      if (-1 === o) return r + t + n;
      let i = r,
        s = 0;
      for (; -1 !== o; )
        (i += t.slice(s, o) + r), (s = o + n.length), (o = t.indexOf(n, s));
      return (i += t.slice(s) + n), i;
    };
  },
  hy = dy(1, 22),
  my = dy(90, 39),
  gy = dy(91, 39),
  yy = dy(93, 39),
  by = e =>
    `${vy(e.getHours(), 2)}:${vy(e.getMinutes(), 2)}:${vy(e.getSeconds(), 2)}.${vy(e.getMilliseconds(), 3)}`,
  vy = (e, t) => String(e).padStart(t, "0"),
  wy = ({ failed: e, reject: t }) =>
    e ? (t ? fy.cross : fy.warning) : fy.tick,
  Ey = {
    command: ({ piped: e }) => (e ? "|" : "$"),
    output: () => " ",
    ipc: () => "*",
    error: wy,
    duration: wy,
  },
  Sy = e => e,
  Oy = {
    command: () => hy,
    output: () => Sy,
    ipc: () => Sy,
    error: ({ reject: e }) => (e ? gy : yy),
    duration: () => my,
  },
  Iy = (e, t, r) => {
    const n = (({ verbose: e }, t) => {
      const r = Kg(e, t);
      return Qg(r) ? r : void 0;
    })(t, r);
    return e
      .map(({ verboseLine: e, verboseObject: t }) => Ty(e, t, n))
      .filter(e => void 0 !== e)
      .map(e => jy(e))
      .join("");
  },
  Ty = (e, t, r) => {
    if (void 0 === r) return e;
    const n = r(e, t);
    return "string" == typeof n ? n : void 0;
  },
  jy = e => (e.endsWith("\n") ? e : `${e}\n`),
  xy = ["piped"],
  Ry = ({
    type: e,
    verboseMessage: t,
    fdNumber: r,
    verboseInfo: n,
    result: o,
  }) => {
    const i = Ay({ type: e, result: o, verboseInfo: n }),
      s = Dy(t, i),
      a = Iy(s, n, r);
    R(Ly, a);
  },
  Ay = e => {
    let {
        type: t,
        result: r,
        verboseInfo: {
          escapedCommand: n,
          commandId: o,
          rawOptions: { piped: i = !1 },
        },
      } = e,
      s = Ag(e.verboseInfo.rawOptions, xy);
    return {
      type: t,
      escapedCommand: n,
      commandId: `${o}`,
      timestamp: new Date(),
      piped: i,
      result: r,
      options: s,
    };
  },
  Dy = (e, t) =>
    e
      .split("\n")
      .map(e => Ny(Object.assign(Object.assign({}, t), {}, { message: e }))),
  Ny = e => ({
    verboseLine: (({
      type: e,
      message: t,
      timestamp: r,
      piped: n,
      commandId: o,
      result: { failed: i = !1 } = {},
      options: { reject: s = !0 },
    }) => {
      const a = by(r),
        c = Ey[e]({ failed: i, reject: s, piped: n }),
        l = Oy[e]({ reject: s });
      return `${my(`[${a}]`)} ${my(`[${o}]`)} ${l(c)} ${l(t)}`;
    })(e),
    verboseObject: e,
  }),
  Ly = 2,
  ky = e => {
    const t = "string" == typeof e ? e : v(e);
    return Zg(t).replaceAll("\t", " ".repeat(Cy));
  },
  Cy = 2,
  Py = e => (Xg({ verbose: e }) ? My++ : void 0);
let My = 0n;
const _y = e => {
    for (const t of e) {
      if (!1 === t)
        throw new TypeError(
          'The "verbose: false" option was renamed to "verbose: \'none\'".'
        );
      if (!0 === t)
        throw new TypeError(
          'The "verbose: true" option was renamed to "verbose: \'short\'".'
        );
      if (!Jg.includes(t) && !Qg(t)) {
        const e = Jg.map(e => `'${e}'`).join(", ");
        throw new TypeError(
          `The "verbose" option must not be ${t}. Allowed values are: ${e} or a function.`
        );
      }
    }
  },
  $y = () => T.bigint(),
  By = e => Number(T.bigint() - e) / 1e6,
  Fy = (e, t, r) => {
    const n = $y(),
      { command: o, escapedCommand: i } = ((e, t) => {
        const r = [e, ...t];
        return {
          command: r.join(" "),
          escapedCommand: r.map(e => iy(ey(e))).join(" "),
        };
      })(e, t),
      s = ((e, t, r) => (
        _y(e),
        { verbose: e, escapedCommand: t, commandId: Py(e), rawOptions: r }
      ))(Cg(r, "verbose"), i, Object.assign({}, r));
    return (
      ((e, t) => {
        Xg(t) && Ry({ type: "command", verboseMessage: e, verboseInfo: t });
      })(i, s),
      { command: o, escapedCommand: i, startTime: n, verboseInfo: s }
    );
  };
var Uy,
  Gy,
  Wy,
  zy,
  Vy,
  Hy = { exports: {} };
Vy =
  "win32" === process.platform || re.TESTING_WINDOWS
    ? (function () {
        if (Gy) return Uy;
        (Gy = 1),
          (Uy = n),
          (n.sync = function (t, n) {
            return r(e.statSync(t), t, n);
          });
        var e = t;
        function r(e, t, r) {
          return (
            !(!e.isSymbolicLink() && !e.isFile()) &&
            (function (e, t) {
              var r = void 0 !== t.pathExt ? t.pathExt : process.env.PATHEXT;
              if (!r) return !0;
              if (-1 !== (r = r.split(";")).indexOf("")) return !0;
              for (var n = 0; n < r.length; n++) {
                var o = r[n].toLowerCase();
                if (o && e.substr(-o.length).toLowerCase() === o) return !0;
              }
              return !1;
            })(t, r)
          );
        }
        function n(t, n, o) {
          e.stat(t, function (e, i) {
            o(e, !e && r(i, t, n));
          });
        }
        return Uy;
      })()
    : (function () {
        if (zy) return Wy;
        (zy = 1),
          (Wy = r),
          (r.sync = function (t, r) {
            return n(e.statSync(t), r);
          });
        var e = t;
        function r(t, r, o) {
          e.stat(t, function (e, t) {
            o(e, !e && n(t, r));
          });
        }
        function n(e, t) {
          return (
            e.isFile() &&
            (function (e, t) {
              var r = e.mode,
                n = e.uid,
                o = e.gid,
                i =
                  void 0 !== t.uid ? t.uid : process.getuid && process.getuid(),
                s =
                  void 0 !== t.gid ? t.gid : process.getgid && process.getgid(),
                a = parseInt("100", 8),
                c = parseInt("010", 8);
              return (
                r & parseInt("001", 8) ||
                (r & c && o === s) ||
                (r & a && n === i) ||
                (r & (a | c) && 0 === i)
              );
            })(e, t)
          );
        }
        return Wy;
      })();
var Xy = qy;
function qy(e, t, r) {
  if (("function" == typeof t && ((r = t), (t = {})), !r)) {
    if ("function" != typeof Promise)
      throw new TypeError("callback not provided");
    return new Promise(function (r, n) {
      qy(e, t || {}, function (e, t) {
        e ? n(e) : r(t);
      });
    });
  }
  Vy(e, t || {}, function (e, n) {
    e &&
      ("EACCES" === e.code || (t && t.ignoreErrors)) &&
      ((e = null), (n = !1)),
      r(e, n);
  });
}
(qy.sync = function (e, t) {
  try {
    return Vy.sync(e, t || {});
  } catch (e) {
    if ((t && t.ignoreErrors) || "EACCES" === e.code) return !1;
    throw e;
  }
}),
  ne(Xy);
const Ky =
    "win32" === process.platform ||
    "cygwin" === process.env.OSTYPE ||
    "msys" === process.env.OSTYPE,
  Yy = a,
  Qy = Ky ? ";" : ":",
  Jy = Xy,
  Zy = e => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }),
  eb = (e, t) => {
    const r = t.colon || Qy,
      n =
        e.match(/\//) || (Ky && e.match(/\\/))
          ? [""]
          : [
              ...(Ky ? [process.cwd()] : []),
              ...(t.path || process.env.PATH || "").split(r),
            ],
      o = Ky ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "",
      i = Ky ? o.split(r) : [""];
    return (
      Ky && -1 !== e.indexOf(".") && "" !== i[0] && i.unshift(""),
      { pathEnv: n, pathExt: i, pathExtExe: o }
    );
  },
  tb = (e, t, r) => {
    "function" == typeof t && ((r = t), (t = {})), t || (t = {});
    const { pathEnv: n, pathExt: o, pathExtExe: i } = eb(e, t),
      s = [],
      a = r =>
        new Promise((o, i) => {
          if (r === n.length) return t.all && s.length ? o(s) : i(Zy(e));
          const a = n[r],
            l = /^".*"$/.test(a) ? a.slice(1, -1) : a,
            u = Yy.join(l, e),
            f = !l && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + u : u;
          o(c(f, r, 0));
        }),
      c = (e, r, n) =>
        new Promise((l, u) => {
          if (n === o.length) return l(a(r + 1));
          const f = o[n];
          Jy(e + f, { pathExt: i }, (o, i) => {
            if (!o && i) {
              if (!t.all) return l(e + f);
              s.push(e + f);
            }
            return l(c(e, r, n + 1));
          });
        });
    return r ? a(0).then(e => r(null, e), r) : a(0);
  };
var rb = tb;
(tb.sync = (e, t) => {
  t = t || {};
  const { pathEnv: r, pathExt: n, pathExtExe: o } = eb(e, t),
    i = [];
  for (let s = 0; s < r.length; s++) {
    const a = r[s],
      c = /^".*"$/.test(a) ? a.slice(1, -1) : a,
      l = Yy.join(c, e),
      u = !c && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + l : l;
    for (let e = 0; e < n.length; e++) {
      const r = u + n[e];
      try {
        if (Jy.sync(r, { pathExt: o })) {
          if (!t.all) return r;
          i.push(r);
        }
      } catch (e) {}
    }
  }
  if (t.all && i.length) return i;
  if (t.nothrow) return null;
  throw Zy(e);
}),
  ne(rb);
var nb = { exports: {} };
const ob = (e = {}) => {
  const t = e.env || process.env;
  return "win32" !== (e.platform || process.platform)
    ? "PATH"
    : Object.keys(t)
        .reverse()
        .find(e => "PATH" === e.toUpperCase()) || "Path";
};
(nb.exports = ob), (nb.exports.default = ob);
var ib = nb.exports;
ne(ib);
const sb = a,
  ab = rb,
  cb = ib;
function lb(e, t) {
  const r = e.options.env || process.env,
    n = process.cwd(),
    o = null != e.options.cwd,
    i = o && void 0 !== process.chdir && !process.chdir.disabled;
  if (i)
    try {
      process.chdir(e.options.cwd);
    } catch (e) {}
  let s;
  try {
    s = ab.sync(e.command, {
      path: r[cb({ env: r })],
      pathExt: t ? sb.delimiter : void 0,
    });
  } catch (e) {
  } finally {
    i && process.chdir(n);
  }
  return s && (s = sb.resolve(o ? e.options.cwd : "", s)), s;
}
var ub = function (e) {
  return lb(e) || lb(e, !0);
};
ne(ub);
var fb = {};
const pb = /([()\][%!^"`<>&|;, *?])/g;
(fb.command = function (e) {
  return (e = e.replace(pb, "^$1"));
}),
  (fb.argument = function (e, t) {
    return (
      (e =
        (e = `"${(e = (e = (e = `${e}`).replace(/(?=(\\+?)?)\1"/g, '$1$1\\"')).replace(/(?=(\\+?)?)\1$/, "$1$1"))}"`).replace(
          pb,
          "^$1"
        )),
      t && (e = e.replace(pb, "^$1")),
      e
    );
  });
var db = /^#!(.*)/;
ne(db);
const hb = db;
var mb = (e = "") => {
  const t = e.match(hb);
  if (!t) return null;
  const [r, n] = t[0].replace(/#! ?/, "").split(" "),
    o = r.split("/").pop();
  return "env" === o ? n : n ? `${o} ${n}` : o;
};
ne(mb);
const gb = t,
  yb = mb;
var bb = function (e) {
  const t = Buffer.alloc(150);
  let r;
  try {
    (r = gb.openSync(e, "r")), gb.readSync(r, t, 0, 150, 0), gb.closeSync(r);
  } catch (e) {}
  return yb(t.toString());
};
ne(bb);
const vb = a,
  wb = ub,
  Eb = fb,
  Sb = bb,
  Ob = "win32" === process.platform,
  Ib = /\.(?:com|exe)$/i,
  Tb = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function jb(e) {
  if (!Ob) return e;
  const t = (function (e) {
      e.file = wb(e);
      const t = e.file && Sb(e.file);
      return t ? (e.args.unshift(e.file), (e.command = t), wb(e)) : e.file;
    })(e),
    r = !Ib.test(t);
  if (e.options.forceShell || r) {
    const r = Tb.test(t);
    (e.command = vb.normalize(e.command)),
      (e.command = Eb.command(e.command)),
      (e.args = e.args.map(e => Eb.argument(e, r)));
    const n = [e.command].concat(e.args).join(" ");
    (e.args = ["/d", "/s", "/c", `"${n}"`]),
      (e.command = process.env.comspec || "cmd.exe"),
      (e.options.windowsVerbatimArguments = !0);
  }
  return e;
}
var xb = function (e, t, r) {
  t && !Array.isArray(t) && ((r = t), (t = null));
  const n = {
    command: e,
    args: (t = t ? t.slice(0) : []),
    options: (r = Object.assign({}, r)),
    file: void 0,
    original: { command: e, args: t },
  };
  return r.shell ? n : jb(n);
};
ne(xb);
const Rb = "win32" === process.platform;
function Ab(e, t) {
  return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${t} ${e.command}`,
    path: e.command,
    spawnargs: e.args,
  });
}
function Db(e, t) {
  return Rb && 1 === e && !t.file ? Ab(t.original, "spawn") : null;
}
var Nb = {
  hookChildProcess: function (e, t) {
    if (!Rb) return;
    const r = e.emit;
    e.emit = function (n, o) {
      if ("exit" === n) {
        const n = Db(o, t);
        if (n) return r.call(e, "error", n);
      }
      return r.apply(e, arguments);
    };
  },
  verifyENOENT: Db,
  verifyENOENTSync: function (e, t) {
    return Rb && 1 === e && !t.file ? Ab(t.original, "spawnSync") : null;
  },
  notFoundError: Ab,
};
ne(Nb);
const Lb = f,
  kb = xb,
  Cb = Nb;
function Pb(e, t, r) {
  const n = kb(e, t, r),
    o = Lb.spawn(n.command, n.args, n.options);
  return Cb.hookChildProcess(o, n), o;
}
(Hy.exports = Pb),
  (Hy.exports.spawn = Pb),
  (Hy.exports.sync = function (e, t, r) {
    const n = kb(e, t, r),
      o = Lb.spawnSync(n.command, n.args, n.options);
    return (o.error = o.error || Cb.verifyENOENTSync(o.status, n)), o;
  }),
  (Hy.exports._parse = kb),
  (Hy.exports._enoent = Cb);
var Mb = ne(Hy.exports);
function _b(e = {}) {
  const { env: t = process.env, platform: r = process.platform } = e;
  return "win32" !== r
    ? "PATH"
    : Object.keys(t)
        .reverse()
        .find(e => "PATH" === e.toUpperCase()) || "Path";
}
const $b = ["env"],
  Bb = (e, t) => {
    let r;
    for (; r !== t; )
      e.push(P.join(t, "node_modules/.bin")), (r = t), (t = P.resolve(t, ".."));
  },
  Fb = (e, t, r) => {
    const n = t instanceof URL ? p(t) : t;
    e.push(P.resolve(r, n, ".."));
  },
  Ub = (e = {}) => {
    let { env: t = O.env } = e,
      r = Ag(e, $b);
    t = Object.assign({}, t);
    const n = _b({ env: t });
    return (
      (r.path = t[n]),
      (t[n] = (({
        cwd: e = O.cwd(),
        path: t = O.env[_b()],
        preferLocal: r = !0,
        execPath: n = O.execPath,
        addExecPath: o = !0,
      } = {}) => {
        const i = e instanceof URL ? p(e) : e,
          s = P.resolve(i),
          a = [];
        return r && Bb(a, s), o && Fb(a, n, s), [...a, t].join(P.delimiter);
      })(r)),
      t
    );
  };
class Gb extends Error {}
const Wb = (e, t) => {
    Object.defineProperty(e.prototype, "name", {
      value: t,
      writable: !0,
      enumerable: !1,
      configurable: !0,
    }),
      Object.defineProperty(e.prototype, zb, {
        value: !0,
        writable: !1,
        enumerable: !1,
        configurable: !1,
      });
  },
  zb = Symbol("isExecaError"),
  Vb = e => "[object Error]" === Object.prototype.toString.call(e);
class Hb extends Error {}
Wb(Hb, Hb.name);
class Xb extends Error {}
Wb(Xb, Xb.name);
const qb = (e, t) => ({
    name: `SIGRT${t + 1}`,
    number: Kb + t,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix",
  }),
  Kb = 34,
  Yb = 64,
  Qb = [
    {
      name: "SIGHUP",
      number: 1,
      action: "terminate",
      description: "Terminal closed",
      standard: "posix",
    },
    {
      name: "SIGINT",
      number: 2,
      action: "terminate",
      description: "User interruption with CTRL-C",
      standard: "ansi",
    },
    {
      name: "SIGQUIT",
      number: 3,
      action: "core",
      description: "User interruption with CTRL-\\",
      standard: "posix",
    },
    {
      name: "SIGILL",
      number: 4,
      action: "core",
      description: "Invalid machine instruction",
      standard: "ansi",
    },
    {
      name: "SIGTRAP",
      number: 5,
      action: "core",
      description: "Debugger breakpoint",
      standard: "posix",
    },
    {
      name: "SIGABRT",
      number: 6,
      action: "core",
      description: "Aborted",
      standard: "ansi",
    },
    {
      name: "SIGIOT",
      number: 6,
      action: "core",
      description: "Aborted",
      standard: "bsd",
    },
    {
      name: "SIGBUS",
      number: 7,
      action: "core",
      description:
        "Bus error due to misaligned, non-existing address or paging error",
      standard: "bsd",
    },
    {
      name: "SIGEMT",
      number: 7,
      action: "terminate",
      description: "Command should be emulated but is not implemented",
      standard: "other",
    },
    {
      name: "SIGFPE",
      number: 8,
      action: "core",
      description: "Floating point arithmetic error",
      standard: "ansi",
    },
    {
      name: "SIGKILL",
      number: 9,
      action: "terminate",
      description: "Forced termination",
      standard: "posix",
      forced: !0,
    },
    {
      name: "SIGUSR1",
      number: 10,
      action: "terminate",
      description: "Application-specific signal",
      standard: "posix",
    },
    {
      name: "SIGSEGV",
      number: 11,
      action: "core",
      description: "Segmentation fault",
      standard: "ansi",
    },
    {
      name: "SIGUSR2",
      number: 12,
      action: "terminate",
      description: "Application-specific signal",
      standard: "posix",
    },
    {
      name: "SIGPIPE",
      number: 13,
      action: "terminate",
      description: "Broken pipe or socket",
      standard: "posix",
    },
    {
      name: "SIGALRM",
      number: 14,
      action: "terminate",
      description: "Timeout or timer",
      standard: "posix",
    },
    {
      name: "SIGTERM",
      number: 15,
      action: "terminate",
      description: "Termination",
      standard: "ansi",
    },
    {
      name: "SIGSTKFLT",
      number: 16,
      action: "terminate",
      description: "Stack is empty or overflowed",
      standard: "other",
    },
    {
      name: "SIGCHLD",
      number: 17,
      action: "ignore",
      description: "Child process terminated, paused or unpaused",
      standard: "posix",
    },
    {
      name: "SIGCLD",
      number: 17,
      action: "ignore",
      description: "Child process terminated, paused or unpaused",
      standard: "other",
    },
    {
      name: "SIGCONT",
      number: 18,
      action: "unpause",
      description: "Unpaused",
      standard: "posix",
      forced: !0,
    },
    {
      name: "SIGSTOP",
      number: 19,
      action: "pause",
      description: "Paused",
      standard: "posix",
      forced: !0,
    },
    {
      name: "SIGTSTP",
      number: 20,
      action: "pause",
      description: 'Paused using CTRL-Z or "suspend"',
      standard: "posix",
    },
    {
      name: "SIGTTIN",
      number: 21,
      action: "pause",
      description: "Background process cannot read terminal input",
      standard: "posix",
    },
    {
      name: "SIGBREAK",
      number: 21,
      action: "terminate",
      description: "User interruption with CTRL-BREAK",
      standard: "other",
    },
    {
      name: "SIGTTOU",
      number: 22,
      action: "pause",
      description: "Background process cannot write to terminal output",
      standard: "posix",
    },
    {
      name: "SIGURG",
      number: 23,
      action: "ignore",
      description: "Socket received out-of-band data",
      standard: "bsd",
    },
    {
      name: "SIGXCPU",
      number: 24,
      action: "core",
      description: "Process timed out",
      standard: "bsd",
    },
    {
      name: "SIGXFSZ",
      number: 25,
      action: "core",
      description: "File too big",
      standard: "bsd",
    },
    {
      name: "SIGVTALRM",
      number: 26,
      action: "terminate",
      description: "Timeout or timer",
      standard: "bsd",
    },
    {
      name: "SIGPROF",
      number: 27,
      action: "terminate",
      description: "Timeout or timer",
      standard: "bsd",
    },
    {
      name: "SIGWINCH",
      number: 28,
      action: "ignore",
      description: "Terminal window size changed",
      standard: "bsd",
    },
    {
      name: "SIGIO",
      number: 29,
      action: "terminate",
      description: "I/O is available",
      standard: "other",
    },
    {
      name: "SIGPOLL",
      number: 29,
      action: "terminate",
      description: "Watched event",
      standard: "other",
    },
    {
      name: "SIGINFO",
      number: 29,
      action: "ignore",
      description: "Request for process information",
      standard: "other",
    },
    {
      name: "SIGPWR",
      number: 30,
      action: "terminate",
      description: "Device running out of power",
      standard: "systemv",
    },
    {
      name: "SIGSYS",
      number: 31,
      action: "core",
      description: "Invalid system call",
      standard: "other",
    },
    {
      name: "SIGUNUSED",
      number: 31,
      action: "terminate",
      description: "Invalid system call",
      standard: "other",
    },
  ],
  Jb = () => {
    const e = (() => {
      const e = Yb - Kb + 1;
      return Array.from({ length: e }, qb);
    })();
    return [...Qb, ...e].map(Zb);
  },
  Zb = ({
    name: e,
    number: t,
    description: r,
    action: n,
    forced: o = !1,
    standard: i,
  }) => {
    const {
        signals: { [e]: s },
      } = U,
      a = void 0 !== s;
    return {
      name: e,
      number: a ? s : t,
      description: r,
      supported: a,
      action: n,
      forced: o,
      standard: i,
    };
  },
  ev = ({
    name: e,
    number: t,
    description: r,
    supported: n,
    action: o,
    forced: i,
    standard: s,
  }) => [
    e,
    {
      name: e,
      number: t,
      description: r,
      supported: n,
      action: o,
      forced: i,
      standard: s,
    },
  ],
  tv = (() => {
    const e = Jb();
    return Object.fromEntries(e.map(ev));
  })(),
  rv = (e, t) => {
    const r = nv(e, t);
    if (void 0 === r) return {};
    const {
      name: n,
      description: o,
      supported: i,
      action: s,
      forced: a,
      standard: c,
    } = r;
    return {
      [e]: {
        name: n,
        number: e,
        description: o,
        supported: i,
        action: s,
        forced: a,
        standard: c,
      },
    };
  },
  nv = (e, t) => {
    const r = t.find(({ name: t }) => U.signals[t] === e);
    return void 0 !== r ? r : t.find(t => t.number === e);
  };
(() => {
  const e = Jb(),
    t = Yb + 1,
    r = Array.from({ length: t }, (t, r) => rv(r, e));
  Object.assign({}, ...r);
})();
const ov = e => (0 === e ? e : iv(e, "`subprocess.kill()`'s argument")),
  iv = (e, t) => {
    if (Number.isInteger(e)) return sv(e, t);
    if ("string" == typeof e) return cv(e, t);
    throw new TypeError(
      `Invalid ${t} ${String(e)}: it must be a string or an integer.\n${lv()}`
    );
  },
  sv = (e, t) => {
    if (av.has(e)) return av.get(e);
    throw new TypeError(
      `Invalid ${t} ${e}: this signal integer does not exist.\n${lv()}`
    );
  },
  av = new Map(
    Object.entries(U.signals)
      .reverse()
      .map(([e, t]) => [t, e])
  ),
  cv = (e, t) => {
    if (e in U.signals) return e;
    if (e.toUpperCase() in U.signals)
      throw new TypeError(
        `Invalid ${t} '${e}': please rename it to '${e.toUpperCase()}'.`
      );
    throw new TypeError(
      `Invalid ${t} '${e}': this signal name does not exist.\n${lv()}`
    );
  },
  lv = () =>
    `Available signal names: ${uv()}.\nAvailable signal numbers: ${fv()}.`,
  uv = () =>
    Object.keys(U.signals)
      .sort()
      .map(e => `'${e}'`)
      .join(", "),
  fv = () =>
    [...new Set(Object.values(U.signals).sort((e, t) => e - t))].join(", "),
  pv = e => tv[e].description,
  dv = 5e3,
  hv = (
    {
      kill: e,
      options: { forceKillAfterDelay: t, killSignal: r },
      onInternalError: n,
      context: o,
      controller: i,
    },
    s,
    a
  ) => {
    const { signal: c, error: l } = mv(s, a, r);
    gv(l, n);
    const u = e(c);
    return (
      yv({
        kill: e,
        signal: c,
        forceKillAfterDelay: t,
        killSignal: r,
        killResult: u,
        context: o,
        controller: i,
      }),
      u
    );
  },
  mv = (e, t, r) => {
    const [n = r, o] = Vb(e) ? [void 0, e] : [e, t];
    if ("string" != typeof n && !Number.isInteger(n))
      throw new TypeError(
        `The first argument must be an error instance or a signal name string/integer: ${String(n)}`
      );
    if (void 0 !== o && !Vb(o))
      throw new TypeError(
        `The second argument is optional. If specified, it must be an error instance: ${o}`
      );
    return { signal: ov(n), error: o };
  },
  gv = (e, t) => {
    void 0 !== e && t.reject(e);
  },
  yv = async ({
    kill: e,
    signal: t,
    forceKillAfterDelay: r,
    killSignal: n,
    killResult: o,
    context: i,
    controller: s,
  }) => {
    t === n &&
      o &&
      bv({
        kill: e,
        forceKillAfterDelay: r,
        context: i,
        controllerSignal: s.signal,
      });
  },
  bv = async ({
    kill: e,
    forceKillAfterDelay: t,
    context: r,
    controllerSignal: n,
  }) => {
    if (!1 !== t)
      try {
        await $(t, void 0, { signal: n }),
          e("SIGKILL") && (r.isForcefullyTerminated ??= !0);
      } catch {}
  },
  vv = async (e, t) => {
    e.aborted || (await G(e, "abort", { signal: t }));
  },
  wv = ({
    subprocess: e,
    cancelSignal: t,
    gracefulCancel: r,
    context: n,
    controller: o,
  }) => (void 0 === t || r ? [] : [Ev(e, t, n, o)]),
  Ev = async (e, t, r, { signal: n }) => {
    throw (
      (await vv(t, n), (r.terminationReason ??= "cancel"), e.kill(), t.reason)
    );
  },
  Sv = ({ methodName: e, isSubprocess: t, ipc: r, isConnected: n }) => {
    Ov(e, t, r), Iv(e, t, n);
  },
  Ov = (e, t, r) => {
    if (!r)
      throw new Error(
        `${Av(e, t)} can only be used if the \`ipc\` option is \`true\`.`
      );
  },
  Iv = (e, t, r) => {
    if (!r)
      throw new Error(
        `${Av(e, t)} cannot be used: the ${Nv(t)} has already exited or disconnected.`
      );
  },
  Tv = (e, t) =>
    new Error(
      `${Av("sendMessage", t)} failed when sending an acknowledgment response to the ${Nv(t)}.`,
      { cause: e }
    ),
  jv = ({ code: e, message: t }) => xv.has(e) || Rv.some(e => t.includes(e)),
  xv = new Set(["ERR_MISSING_ARGS", "ERR_INVALID_ARG_TYPE"]),
  Rv = [
    "could not be cloned",
    "circular structure",
    "call stack size exceeded",
  ],
  Av = (e, t, r = "") =>
    "cancelSignal" === e
      ? "`cancelSignal`'s `controller.abort()`"
      : `${Dv(t)}${e}(${r})`,
  Dv = e => (e ? "" : "subprocess."),
  Nv = e => (e ? "parent process" : "subprocess"),
  Lv = e => {
    e.connected && e.disconnect();
  },
  kv = () => {
    const e = {},
      t = new Promise((t, r) => {
        Object.assign(e, { resolve: t, reject: r });
      });
    return Object.assign(t, e);
  },
  Cv = (e, t = "stdin") => {
    const { options: r, fileDescriptors: n } = Mv.get(e),
      o = _v(n, t, true),
      i = e.stdio[o];
    if (null === i) throw new TypeError(Fv(o, t, r, true));
    return i;
  },
  Pv = (e, t = "stdout") => {
    const { options: r, fileDescriptors: n } = Mv.get(e),
      o = _v(n, t, false),
      i = "all" === o ? e.all : e.stdio[o];
    if (null == i) throw new TypeError(Fv(o, t, r, false));
    return i;
  },
  Mv = new WeakMap(),
  _v = (e, t, r) => {
    const n = $v(t, r);
    return Bv(n, t, r, e), n;
  },
  $v = (e, t) => {
    const r = Ug(e);
    if (void 0 !== r) return r;
    const { validOptions: n, defaultValue: o } = t
      ? { validOptions: '"stdin"', defaultValue: "stdin" }
      : { validOptions: '"stdout", "stderr", "all"', defaultValue: "stdout" };
    throw new TypeError(
      `"${Wv(t)}" must not be "${e}".\nIt must be ${n} or "fd3", "fd4" (and so on).\nIt is optional and defaults to "${o}".`
    );
  },
  Bv = (e, t, r, n) => {
    const o = n[Gv(e)];
    if (void 0 === o)
      throw new TypeError(
        `"${Wv(r)}" must not be ${t}. That file descriptor does not exist.\nPlease set the "stdio" option to ensure that file descriptor exists.`
      );
    if ("input" === o.direction && !r)
      throw new TypeError(
        `"${Wv(r)}" must not be ${t}. It must be a readable stream, not writable.`
      );
    if ("input" !== o.direction && r)
      throw new TypeError(
        `"${Wv(r)}" must not be ${t}. It must be a writable stream, not readable.`
      );
  },
  Fv = (e, t, r, n) => {
    if ("all" === e && !r.all)
      return 'The "all" option must be true to use "from: \'all\'".';
    const { optionName: o, optionValue: i } = Uv(e, r);
    return `The "${o}: ${zv(i)}" option is incompatible with using "${Wv(n)}: ${zv(t)}".\nPlease set this option with "pipe" instead.`;
  },
  Uv = (e, { stdin: t, stdout: r, stderr: n, stdio: o }) => {
    const i = Gv(e);
    return 0 === i && void 0 !== t
      ? { optionName: "stdin", optionValue: t }
      : 1 === i && void 0 !== r
        ? { optionName: "stdout", optionValue: r }
        : 2 === i && void 0 !== n
          ? { optionName: "stderr", optionValue: n }
          : { optionName: `stdio[${i}]`, optionValue: o[i] };
  },
  Gv = e => ("all" === e ? 1 : e),
  Wv = e => (e ? "to" : "from"),
  zv = e =>
    "string" == typeof e ? `'${e}'` : "number" == typeof e ? `${e}` : "Stream",
  Vv = (e, t, r) => {
    const n = e.getMaxListeners();
    0 !== n &&
      n !== Number.POSITIVE_INFINITY &&
      (e.setMaxListeners(n + t),
      W(r, () => {
        e.setMaxListeners(e.getMaxListeners() - t);
      }));
  },
  Hv = (e, t) => {
    t && Xv(e);
  },
  Xv = e => {
    e.refCounted();
  },
  qv = (e, t) => {
    t && Kv(e);
  },
  Kv = e => {
    e.unrefCounted();
  },
  Yv = async (
    { anyProcess: e, channel: t, isSubprocess: r, ipcEmitter: n },
    o
  ) => {
    if (sw(o) || Iw(o)) return;
    Jv.has(e) || Jv.set(e, []);
    const i = Jv.get(e);
    if ((i.push(o), !(i.length > 1)))
      for (; i.length > 0; ) {
        await pw(e, n, o), await B.yield();
        const s = await iw({
          wrappedMessage: i[0],
          anyProcess: e,
          channel: t,
          isSubprocess: r,
          ipcEmitter: n,
        });
        i.shift(), n.emit("message", s), n.emit("message:done");
      }
  },
  Qv = async ({
    anyProcess: e,
    channel: t,
    isSubprocess: r,
    ipcEmitter: n,
    boundOnMessage: o,
  }) => {
    jw();
    const i = Jv.get(e);
    for (; i?.length > 0; ) await G(n, "message:done");
    e.removeListener("message", o),
      ((e, t) => {
        t && (Xv(e), Xv(e));
      })(t, r),
      (n.connected = !1),
      n.emit("disconnect");
  },
  Jv = new WeakMap(),
  Zv = (e, t, r) => {
    if (ew.has(e)) return ew.get(e);
    const n = new z();
    return (
      (n.connected = !0),
      ew.set(e, n),
      tw({ ipcEmitter: n, anyProcess: e, channel: t, isSubprocess: r }),
      n
    );
  },
  ew = new WeakMap(),
  tw = ({ ipcEmitter: e, anyProcess: t, channel: r, isSubprocess: n }) => {
    const o = Yv.bind(void 0, {
      anyProcess: t,
      channel: r,
      isSubprocess: n,
      ipcEmitter: e,
    });
    t.on("message", o),
      t.once(
        "disconnect",
        Qv.bind(void 0, {
          anyProcess: t,
          channel: r,
          isSubprocess: n,
          ipcEmitter: e,
          boundOnMessage: o,
        })
      ),
      ((e, t) => {
        t && (Kv(e), Kv(e));
      })(r, n);
  },
  rw = e => {
    const t = ew.get(e);
    return void 0 === t ? null !== e.channel : t.connected;
  };
let nw = 0n;
const ow = (e, t) => {
    if (t?.type === uw && !t.hasListeners)
      for (const { id: t } of e)
        void 0 !== t && cw[t].resolve({ isDeadlock: !0, hasListeners: !1 });
  },
  iw = async ({
    wrappedMessage: e,
    anyProcess: t,
    channel: r,
    isSubprocess: n,
    ipcEmitter: o,
  }) => {
    if (e?.type !== uw || !t.connected) return e;
    const { id: i, message: s } = e,
      a = { id: i, type: fw, message: hw(t, o) };
    try {
      await gw({ anyProcess: t, channel: r, isSubprocess: n, ipc: !0 }, a);
    } catch (e) {
      o.emit("strict:error", e);
    }
    return s;
  },
  sw = e => {
    if (e?.type !== fw) return !1;
    const { id: t, message: r } = e;
    return cw[t]?.resolve({ isDeadlock: !1, hasListeners: r }), !0;
  },
  aw = async (e, t, r) => {
    if (e?.type !== uw) return;
    const n = kv();
    cw[e.id] = n;
    const o = new AbortController();
    try {
      const { isDeadlock: e, hasListeners: i } = await Promise.race([
        n,
        lw(t, r, o),
      ]);
      e &&
        (e => {
          throw new Error(
            `${Av("sendMessage", e)} failed: the ${Nv(e)} is sending a message too, instead of listening to incoming messages.\nThis can be fixed by both sending a message and listening to incoming messages at the same time:\n\nconst [receivedMessage] = await Promise.all([\n\t${Av("getOneMessage", e)},\n\t${Av("sendMessage", e, "message, {strict: true}")},\n]);`
          );
        })(r),
        i ||
          (e => {
            throw new Error(
              `${Av("sendMessage", e)} failed: the ${Nv(e)} is not listening to incoming messages.`
            );
          })(r);
    } finally {
      o.abort(), delete cw[e.id];
    }
  },
  cw = {},
  lw = async (e, t, { signal: r }) => {
    Vv(e, 1, r),
      await G(e, "disconnect", { signal: r }),
      (e => {
        throw new Error(
          `${Av("sendMessage", e)} failed: the ${Nv(e)} exited without listening to incoming messages.`
        );
      })(t);
  },
  uw = "execa:ipc:request",
  fw = "execa:ipc:response",
  pw = async (e, t, r) => {
    for (; !hw(e, t) && dw.get(e)?.size > 0; ) {
      const t = [...dw.get(e)];
      ow(t, r), await Promise.all(t.map(({ onMessageSent: e }) => e));
    }
  },
  dw = new WeakMap(),
  hw = (e, t) => t.listenerCount("message") > mw(e),
  mw = e => (Mv.has(e) && !Hg(Mv.get(e).options.buffer, "ipc") ? 1 : 0),
  gw = (
    { anyProcess: e, channel: t, isSubprocess: r, ipc: n },
    o,
    { strict: i = !1 } = {}
  ) => {
    const s = "sendMessage";
    return (
      Sv({ methodName: s, isSubprocess: r, ipc: n, isConnected: e.connected }),
      yw({
        anyProcess: e,
        channel: t,
        methodName: s,
        isSubprocess: r,
        message: o,
        strict: i,
      })
    );
  },
  yw = async ({
    anyProcess: e,
    channel: t,
    methodName: r,
    isSubprocess: n,
    message: o,
    strict: i,
  }) => {
    const s = (({
        anyProcess: e,
        channel: t,
        isSubprocess: r,
        message: n,
        strict: o,
      }) => {
        if (!o) return n;
        const i = Zv(e, t, r),
          s = hw(e, i);
        return { id: nw++, type: uw, message: n, hasListeners: s };
      })({ anyProcess: e, channel: t, isSubprocess: n, message: o, strict: i }),
      a = ((e, t, r) => {
        dw.has(e) || dw.set(e, new Set());
        const n = dw.get(e),
          o = { onMessageSent: kv(), id: r ? t.id : void 0 };
        return n.add(o), { outgoingMessages: n, outgoingMessage: o };
      })(e, s, i);
    try {
      await bw({
        anyProcess: e,
        methodName: r,
        isSubprocess: n,
        wrappedMessage: s,
        message: o,
      });
    } catch (t) {
      throw (Lv(e), t);
    } finally {
      (({ outgoingMessages: e, outgoingMessage: t }) => {
        e.delete(t), t.onMessageSent.resolve();
      })(a);
    }
  },
  bw = async ({
    anyProcess: e,
    methodName: t,
    isSubprocess: r,
    wrappedMessage: n,
    message: o,
  }) => {
    const i = vw(e);
    try {
      await Promise.all([aw(n, e, r), i(n)]);
    } catch (e) {
      throw (
        ((({ error: e, methodName: t, isSubprocess: r }) => {
          if ("EPIPE" === e.code)
            throw new Error(
              `${Av(t, r)} cannot be used: the ${Nv(r)} is disconnecting.`,
              { cause: e }
            );
        })({ error: e, methodName: t, isSubprocess: r }),
        (({ error: e, methodName: t, isSubprocess: r, message: n }) => {
          if (jv(e))
            throw new Error(
              `${Av(t, r)}'s argument type is invalid: the message cannot be serialized: ${String(n)}.`,
              { cause: e }
            );
        })({ error: e, methodName: t, isSubprocess: r, message: o }),
        e)
      );
    }
  },
  vw = e => {
    if (ww.has(e)) return ww.get(e);
    const t = w(e.send.bind(e));
    return ww.set(e, t), t;
  },
  ww = new WeakMap(),
  Ew = async ({ anyProcess: e, channel: t, isSubprocess: r, ipc: n }) => (
    await Sw({ anyProcess: e, channel: t, isSubprocess: r, ipc: n }), xw.signal
  ),
  Sw = async ({ anyProcess: e, channel: t, isSubprocess: r, ipc: n }) => {
    Ow ||
      ((Ow = !0),
      n
        ? null !== t
          ? (Zv(e, t, r), await B.yield())
          : jw()
        : (() => {
            throw new Error(
              "`getCancelSignal()` cannot be used without setting the `cancelSignal` subprocess option."
            );
          })());
  };
let Ow = !1;
const Iw = e => e?.type === Tw && (xw.abort(e.message), !0),
  Tw = "execa:ipc:cancel",
  jw = () => {
    xw.abort(
      new Error(`\`cancelSignal\` aborted: the ${Nv(!0)} disconnected.`)
    );
  },
  xw = new AbortController(),
  Rw = ({
    subprocess: e,
    cancelSignal: t,
    gracefulCancel: r,
    forceKillAfterDelay: n,
    context: o,
    controller: i,
  }) =>
    r
      ? [
          Aw({
            subprocess: e,
            cancelSignal: t,
            forceKillAfterDelay: n,
            context: o,
            controller: i,
          }),
        ]
      : [],
  Aw = async ({
    subprocess: e,
    cancelSignal: t,
    forceKillAfterDelay: r,
    context: n,
    controller: { signal: o },
  }) => {
    await vv(t, o);
    const i = Dw(t);
    throw (
      (await ((e, t) => {
        const r = "cancelSignal";
        return (
          Iv(r, !1, e.connected),
          bw({
            anyProcess: e,
            methodName: r,
            isSubprocess: !1,
            wrappedMessage: { type: Tw, message: t },
            message: t,
          })
        );
      })(e, i),
      bv({
        kill: e.kill,
        forceKillAfterDelay: r,
        context: n,
        controllerSignal: o,
      }),
      (n.terminationReason ??= "gracefulCancel"),
      t.reason)
    );
  },
  Dw = ({ reason: e }) => {
    if (!(e instanceof DOMException)) return e;
    const t = new Error(e.message);
    return (
      Object.defineProperty(t, "stack", {
        value: e.stack,
        enumerable: !1,
        configurable: !0,
        writable: !0,
      }),
      t
    );
  },
  Nw = (e, t, r, n) => (0 === t || void 0 === t ? [] : [Lw(e, t, r, n)]),
  Lw = async (e, t, r, { signal: n }) => {
    throw (
      (await $(t, void 0, { signal: n }),
      (r.terminationReason ??= "timeout"),
      e.kill(),
      new Gb())
    );
  },
  kw = ["node", "nodePath", "nodeOptions", "cwd", "execPath"],
  Cw = {
    advanced: e => {
      try {
        X(e);
      } catch (e) {
        throw new Error(
          "The `ipcInput` option is not serializable with a structured clone.",
          { cause: e }
        );
      }
    },
    json: e => {
      try {
        JSON.stringify(e);
      } catch (e) {
        throw new Error(
          "The `ipcInput` option is not serializable with JSON.",
          { cause: e }
        );
      }
    },
  },
  Pw = async (e, t) => {
    void 0 !== t && (await e.sendMessage(t));
  },
  Mw = new Set(["utf8", "utf16le"]),
  _w = new Set(["buffer", "hex", "base64", "base64url", "latin1", "ascii"]),
  $w = new Set([...Mw, ..._w]),
  Bw = e => {
    if (null === e) return "buffer";
    if ("string" != typeof e) return;
    const t = e.toLowerCase();
    return t in Fw ? Fw[t] : $w.has(t) ? t : void 0;
  },
  Fw = {
    "utf-8": "utf8",
    "utf-16le": "utf16le",
    "ucs-2": "utf16le",
    ucs2: "utf16le",
    binary: "latin1",
  },
  Uw = e => ("string" == typeof e ? `"${e}"` : String(e)),
  Gw = () => {
    try {
      return O.cwd();
    } catch (e) {
      throw (
        ((e.message = `The current directory does not exist.\n${e.message}`), e)
      );
    }
  },
  Ww = [
    "extendEnv",
    "preferLocal",
    "cwd",
    "localDir",
    "encoding",
    "reject",
    "cleanup",
    "all",
    "windowsHide",
    "killSignal",
    "forceKillAfterDelay",
    "gracefulCancel",
    "ipcInput",
    "ipc",
    "serialization",
  ],
  zw = (e, t, r) => {
    r.cwd = ((e = Gw()) => {
      const t = tp(e, 'The "cwd" option');
      return M(t);
    })(r.cwd);
    const [n, o, i] = ((e, t, r) => {
        let {
            node: n = !1,
            nodePath: o = j,
            nodeOptions: i = x.filter(e => !e.startsWith("--inspect")),
            cwd: s,
            execPath: a,
          } = r,
          c = Ag(r, kw);
        if (void 0 !== a)
          throw new TypeError(
            'The "execPath" option has been removed. Please use the "nodePath" option instead.'
          );
        const l = tp(o, 'The "nodePath" option'),
          u = M(s, l),
          f = Object.assign(
            Object.assign({}, c),
            {},
            { nodePath: u, node: n, cwd: s }
          );
        if (!n) return [e, t, f];
        if ("node" === _(e, ".exe"))
          throw new TypeError(
            'When the "node" option is true, the first argument does not need to be "node".'
          );
        return [
          u,
          [...i, e, ...t],
          Object.assign(Object.assign({ ipc: !0 }, f), {}, { shell: !1 }),
        ];
      })(e, t, r),
      { command: s, args: a, options: c } = Mb._parse(n, o, i),
      l = (e => {
        const t = Object.assign({}, e);
        for (const r of Vg) t[r] = Cg(e, r);
        return t;
      })(c),
      u = Vw(l);
    return (
      (({ timeout: e }) => {
        if (void 0 !== e && (!Number.isFinite(e) || e < 0))
          throw new TypeError(
            `Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`
          );
      })(u),
      (({ encoding: e }) => {
        if ($w.has(e)) return;
        const t = Bw(e);
        if (void 0 !== t)
          throw new TypeError(
            `Invalid option \`encoding: ${Uw(e)}\`.\nPlease rename it to ${Uw(t)}.`
          );
        const r = [...$w].map(e => Uw(e)).join(", ");
        throw new TypeError(
          `Invalid option \`encoding: ${Uw(e)}\`.\nPlease rename it to one of: ${r}.`
        );
      })(u),
      (({ ipcInput: e, ipc: t, serialization: r }) => {
        if (void 0 !== e) {
          if (!t)
            throw new Error(
              "The `ipcInput` option cannot be set unless the `ipc` option is `true`."
            );
          Cw[r](e);
        }
      })(u),
      (({ cancelSignal: e }) => {
        if (
          void 0 !== e &&
          "[object AbortSignal]" !== Object.prototype.toString.call(e)
        )
          throw new Error(
            `The \`cancelSignal\` option must be an AbortSignal: ${String(e)}`
          );
      })(u),
      (({ gracefulCancel: e, cancelSignal: t, ipc: r, serialization: n }) => {
        if (e) {
          if (void 0 === t)
            throw new Error(
              "The `cancelSignal` option must be defined when setting the `gracefulCancel` option."
            );
          if (!r)
            throw new Error(
              "The `ipc` option cannot be false when setting the `gracefulCancel` option."
            );
          if ("json" === n)
            throw new Error(
              "The `serialization` option cannot be 'json' when setting the `gracefulCancel` option."
            );
        }
      })(u),
      (u.shell = rp(u.shell)),
      (u.env = Hw(u)),
      (u.killSignal = (e => {
        const t = "option `killSignal`";
        if (0 === e) throw new TypeError(`Invalid ${t}: 0 cannot be used.`);
        return iv(e, t);
      })(u.killSignal)),
      (u.forceKillAfterDelay = (e => {
        if (!1 === e) return e;
        if (!0 === e) return dv;
        if (!Number.isFinite(e) || e < 0)
          throw new TypeError(
            `Expected the \`forceKillAfterDelay\` option to be a non-negative integer, got \`${e}\` (${typeof e})`
          );
        return e;
      })(u.forceKillAfterDelay)),
      (u.lines = u.lines.map(
        (e, t) => e && !_w.has(u.encoding) && u.buffer[t]
      )),
      "win32" === O.platform && "cmd" === _(s, ".exe") && a.unshift("/q"),
      { file: s, commandArguments: a, options: u }
    );
  },
  Vw = e => {
    let {
        extendEnv: t = !0,
        preferLocal: r = !1,
        cwd: n,
        localDir: o = n,
        encoding: i = "utf8",
        reject: s = !0,
        cleanup: a = !0,
        all: c = !1,
        windowsHide: l = !0,
        killSignal: u = "SIGTERM",
        forceKillAfterDelay: f = !0,
        gracefulCancel: p = !1,
        ipcInput: d,
        ipc: h = void 0 !== d || p,
        serialization: m = "advanced",
      } = e,
      g = Ag(e, Ww);
    return Object.assign(
      Object.assign({}, g),
      {},
      {
        extendEnv: t,
        preferLocal: r,
        cwd: n,
        localDirectory: o,
        encoding: i,
        reject: s,
        cleanup: a,
        all: c,
        windowsHide: l,
        killSignal: u,
        forceKillAfterDelay: f,
        gracefulCancel: p,
        ipcInput: d,
        ipc: h,
        serialization: m,
      }
    );
  },
  Hw = ({
    env: e,
    extendEnv: t,
    preferLocal: r,
    node: n,
    localDirectory: o,
    nodePath: i,
  }) => {
    const s = t ? Object.assign(Object.assign({}, O.env), e) : e;
    return r || n
      ? Ub({ env: s, cwd: o, execPath: i, preferLocal: r, addExecPath: n })
      : s;
  };
function Xw(e) {
  if ("string" == typeof e) return qw(e);
  if (!ArrayBuffer.isView(e) || 1 !== e.BYTES_PER_ELEMENT)
    throw new Error("Input must be a string or a Uint8Array");
  return Kw(e);
}
const qw = e => (e.at(-1) === Yw ? e.slice(0, e.at(-2) === Jw ? -2 : -1) : e),
  Kw = e => (e.at(-1) === Qw ? e.subarray(0, e.at(-2) === Zw ? -2 : -1) : e),
  Yw = "\n",
  Qw = Yw.codePointAt(0),
  Jw = "\r",
  Zw = Jw.codePointAt(0);
function eE(e, { checkOpen: t = !0 } = {}) {
  return (
    null !== e &&
    "object" == typeof e &&
    (e.writable ||
      e.readable ||
      !t ||
      (void 0 === e.writable && void 0 === e.readable)) &&
    "function" == typeof e.pipe
  );
}
function tE(e, { checkOpen: t = !0 } = {}) {
  return (
    eE(e, { checkOpen: t }) &&
    (e.writable || !t) &&
    "function" == typeof e.write &&
    "function" == typeof e.end &&
    "boolean" == typeof e.writable &&
    "boolean" == typeof e.writableObjectMode &&
    "function" == typeof e.destroy &&
    "boolean" == typeof e.destroyed
  );
}
function rE(e, { checkOpen: t = !0 } = {}) {
  return (
    eE(e, { checkOpen: t }) &&
    (e.readable || !t) &&
    "function" == typeof e.read &&
    "boolean" == typeof e.readable &&
    "boolean" == typeof e.readableObjectMode &&
    "function" == typeof e.destroy &&
    "boolean" == typeof e.destroyed
  );
}
function nE(e, t) {
  return tE(e, t) && rE(e, t);
}
const oE = Object.getPrototypeOf(
  Object.getPrototypeOf(async function* () {}).prototype
);
class iE {
  #e;
  #t;
  #r = !1;
  #n = void 0;
  constructor(e, t) {
    (this.#e = e), (this.#t = t);
  }
  next() {
    const e = () => this.#o();
    return (this.#n = this.#n ? this.#n.then(e, e) : e()), this.#n;
  }
  return(e) {
    const t = () => this.#i(e);
    return this.#n ? this.#n.then(t, t) : t();
  }
  async #o() {
    if (this.#r) return { done: !0, value: void 0 };
    let e;
    try {
      e = await this.#e.read();
    } catch (e) {
      throw ((this.#n = void 0), (this.#r = !0), this.#e.releaseLock(), e);
    }
    return (
      e.done && ((this.#n = void 0), (this.#r = !0), this.#e.releaseLock()), e
    );
  }
  async #i(e) {
    if (this.#r) return { done: !0, value: e };
    if (((this.#r = !0), !this.#t)) {
      const t = this.#e.cancel(e);
      return this.#e.releaseLock(), await t, { done: !0, value: e };
    }
    return this.#e.releaseLock(), { done: !0, value: e };
  }
}
const sE = Symbol();
function aE() {
  return this[sE].next();
}
function cE(e) {
  return this[sE].return(e);
}
Object.defineProperty(aE, "name", { value: "next" }),
  Object.defineProperty(cE, "name", { value: "return" });
const lE = Object.create(oE, {
  next: { enumerable: !0, configurable: !0, writable: !0, value: aE },
  return: { enumerable: !0, configurable: !0, writable: !0, value: cE },
});
function uE({ preventCancel: e = !1 } = {}) {
  const t = this.getReader(),
    r = new iE(t, e),
    n = Object.create(lE);
  return (n[sE] = r), n;
}
const fE = e => {
    if (rE(e, { checkOpen: !1 }) && void 0 !== mE.on) return dE(e);
    if ("function" == typeof e?.[Symbol.asyncIterator]) return e;
    if ("[object ReadableStream]" === pE.call(e)) return uE.call(e);
    throw new TypeError(
      "The first argument must be a Readable, a ReadableStream, or an async iterable."
    );
  },
  { toString: pE } = Object.prototype,
  dE = async function* (e) {
    const t = new AbortController(),
      r = {};
    hE(e, t, r);
    try {
      for await (const [r] of mE.on(e, "data", { signal: t.signal })) yield r;
    } catch (e) {
      if (void 0 !== r.error) throw r.error;
      if (!t.signal.aborted) throw e;
    } finally {
      e.destroy();
    }
  },
  hE = async (e, t, r) => {
    try {
      await mE.finished(e, {
        cleanup: !0,
        readable: !0,
        writable: !1,
        error: !1,
      });
    } catch (e) {
      r.error = e;
    } finally {
      t.abort();
    }
  },
  mE = {},
  gE = async (
    e,
    {
      init: t,
      convertChunk: r,
      getSize: n,
      truncateChunk: o,
      addChunk: i,
      getFinalChunk: s,
      finalize: a,
    },
    { maxBuffer: c = Number.POSITIVE_INFINITY } = {}
  ) => {
    const l = fE(e),
      u = t();
    u.length = 0;
    try {
      for await (const e of l) {
        const t = r[wE(e)](e, u);
        bE({
          convertedChunk: t,
          state: u,
          getSize: n,
          truncateChunk: o,
          addChunk: i,
          maxBuffer: c,
        });
      }
      return (
        yE({
          state: u,
          convertChunk: r,
          getSize: n,
          truncateChunk: o,
          addChunk: i,
          getFinalChunk: s,
          maxBuffer: c,
        }),
        a(u)
      );
    } catch (e) {
      const t = "object" == typeof e && null !== e ? e : new Error(e);
      throw ((t.bufferedData = a(u)), t);
    }
  },
  yE = ({
    state: e,
    getSize: t,
    truncateChunk: r,
    addChunk: n,
    getFinalChunk: o,
    maxBuffer: i,
  }) => {
    const s = o(e);
    void 0 !== s &&
      bE({
        convertedChunk: s,
        state: e,
        getSize: t,
        truncateChunk: r,
        addChunk: n,
        maxBuffer: i,
      });
  },
  bE = ({
    convertedChunk: e,
    state: t,
    getSize: r,
    truncateChunk: n,
    addChunk: o,
    maxBuffer: i,
  }) => {
    const s = r(e),
      a = t.length + s;
    if (a <= i) return void vE(e, t, o, a);
    const c = n(e, i - t.length);
    throw (void 0 !== c && vE(c, t, o, i), new SE());
  },
  vE = (e, t, r, n) => {
    (t.contents = r(e, t, n)), (t.length = n);
  },
  wE = e => {
    const t = typeof e;
    if ("string" === t) return "string";
    if ("object" !== t || null === e) return "others";
    if (globalThis.Buffer?.isBuffer(e)) return "buffer";
    const r = EE.call(e);
    return "[object ArrayBuffer]" === r
      ? "arrayBuffer"
      : "[object DataView]" === r
        ? "dataView"
        : Number.isInteger(e.byteLength) &&
            Number.isInteger(e.byteOffset) &&
            "[object ArrayBuffer]" === EE.call(e.buffer)
          ? "typedArray"
          : "others";
  },
  { toString: EE } = Object.prototype;
class SE extends Error {
  name = "MaxBufferError";
  constructor() {
    super("maxBuffer exceeded");
  }
}
const OE = e => e,
  IE = () => {},
  TE = ({ contents: e }) => e,
  jE = e => {
    throw new Error(`Streams in object mode are not supported: ${String(e)}`);
  },
  xE = e => e.length;
const RE = {
  init: () => ({ contents: [] }),
  convertChunk: {
    string: OE,
    buffer: OE,
    arrayBuffer: OE,
    dataView: OE,
    typedArray: OE,
    others: OE,
  },
  getSize: () => 1,
  truncateChunk: IE,
  addChunk: (e, { contents: t }) => (t.push(e), t),
  getFinalChunk: IE,
  finalize: TE,
};
const AE = new TextEncoder(),
  DE = e => new Uint8Array(e),
  NE = e => new Uint8Array(e.buffer, e.byteOffset, e.byteLength),
  LE = (e, t) => {
    if (t <= e.byteLength) return e;
    const r = new ArrayBuffer(CE(t));
    return new Uint8Array(r).set(new Uint8Array(e), 0), r;
  },
  kE = (e, t) => {
    if (t <= e.maxByteLength) return e.resize(t), e;
    const r = new ArrayBuffer(t, { maxByteLength: CE(t) });
    return new Uint8Array(r).set(new Uint8Array(e), 0), r;
  },
  CE = e => PE ** Math.ceil(Math.log(e) / Math.log(PE)),
  PE = 2,
  ME = () => "resize" in ArrayBuffer.prototype,
  _E = {
    init: () => ({ contents: new ArrayBuffer(0) }),
    convertChunk: {
      string: e => AE.encode(e),
      buffer: DE,
      arrayBuffer: DE,
      dataView: NE,
      typedArray: NE,
      others: jE,
    },
    getSize: xE,
    truncateChunk: (e, t) => e.slice(0, t),
    addChunk: (e, { contents: t, length: r }, n) => {
      const o = ME() ? kE(t, n) : LE(t, n);
      return new Uint8Array(o).set(e, r), o;
    },
    getFinalChunk: IE,
    finalize: ({ contents: e, length: t }) => (ME() ? e : e.slice(0, t)),
  };
const $E = (e, { textDecoder: t }) => t.decode(e, { stream: !0 }),
  BE = {
    init: () => ({ contents: "", textDecoder: new TextDecoder() }),
    convertChunk: {
      string: OE,
      buffer: $E,
      arrayBuffer: $E,
      dataView: $E,
      typedArray: $E,
      others: jE,
    },
    getSize: xE,
    truncateChunk: (e, t) => e.slice(0, t),
    addChunk: (e, { contents: t }) => t + e,
    getFinalChunk: ({ textDecoder: e }) => {
      const t = e.decode();
      return "" === t ? void 0 : t;
    },
    finalize: TE,
  },
  FE = (e, t, r) =>
    e ? "objects" : t ? "lines" : "buffer" === r ? "bytes" : "characters",
  UE = (e, t, r) => {
    if (t.length !== r) return;
    const n = new SE();
    throw ((n.maxBufferInfo = { fdNumber: "ipc" }), n);
  },
  GE = (e, t) => {
    if (void 0 === e?.maxBufferInfo)
      return { streamName: "output", threshold: t[1], unit: "bytes" };
    const {
      maxBufferInfo: { fdNumber: r, unit: n },
    } = e;
    delete e.maxBufferInfo;
    const o = Hg(t, r);
    return "ipc" === r
      ? { streamName: "IPC output", threshold: o, unit: "messages" }
      : { streamName: kg(r), threshold: o, unit: n };
  },
  WE = ([, e]) => e,
  zE = ({
    originalError: e,
    timedOut: t,
    timeout: r,
    isMaxBuffer: n,
    maxBuffer: o,
    errorCode: i,
    signal: s,
    signalDescription: a,
    exitCode: c,
    isCanceled: l,
    isGracefullyCanceled: u,
    isForcefullyTerminated: f,
    forceKillAfterDelay: p,
    killSignal: d,
  }) => {
    const h = VE(f, p);
    return t
      ? `Command timed out after ${r} milliseconds${h}`
      : u
        ? void 0 === s
          ? `Command was gracefully canceled with exit code ${c}`
          : f
            ? `Command was gracefully canceled${h}`
            : `Command was gracefully canceled with ${s} (${a})`
        : l
          ? `Command was canceled${h}`
          : n
            ? `${((e, t) => {
                const { streamName: r, threshold: n, unit: o } = GE(e, t);
                return `Command's ${r} was larger than ${n} ${o}`;
              })(e, o)}${h}`
            : void 0 !== i
              ? `Command failed with ${i}${h}`
              : f
                ? `Command was killed with ${d} (${pv(d)})${h}`
                : void 0 !== s
                  ? `Command was killed with ${s} (${a})`
                  : void 0 !== c
                    ? `Command failed with exit code ${c}`
                    : "Command failed";
  },
  VE = (e, t) =>
    e ? ` and was forcefully terminated after ${t} milliseconds` : "",
  HE = (e, t) => {
    if (e instanceof Gb) return;
    const r =
      Vb((n = e)) && zb in n ? e.originalMessage : String(e?.message ?? e);
    var n;
    const o = Zg(
      ((e, t) => {
        if (t === Gw()) return e;
        let r;
        try {
          r = A(t);
        } catch (r) {
          return `The "cwd" option is invalid: ${t}.\n${r.message}\n${e}`;
        }
        return r.isDirectory()
          ? e
          : `The "cwd" option is not a directory: ${t}.\n${e}`;
      })(r, t)
    );
    return "" === o ? void 0 : o;
  },
  XE = e => ("string" == typeof e ? e : v(e)),
  qE = e =>
    Array.isArray(e)
      ? e
          .map(e => Xw(KE(e)))
          .filter(Boolean)
          .join("\n")
      : KE(e),
  KE = e => ("string" == typeof e ? e : fg(e) ? gg(e) : ""),
  YE = ({
    command: e,
    escapedCommand: t,
    stdio: r,
    all: n,
    ipcOutput: o,
    options: { cwd: i },
    startTime: s,
  }) =>
    eS({
      command: e,
      escapedCommand: t,
      cwd: i,
      durationMs: By(s),
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      isGracefullyCanceled: !1,
      isTerminated: !1,
      isMaxBuffer: !1,
      isForcefullyTerminated: !1,
      exitCode: 0,
      stdout: r[1],
      stderr: r[2],
      all: n,
      stdio: r,
      ipcOutput: o,
      pipedFrom: [],
    }),
  QE = ({
    error: e,
    command: t,
    escapedCommand: r,
    fileDescriptors: n,
    options: o,
    startTime: i,
    isSync: s,
  }) =>
    JE({
      error: e,
      command: t,
      escapedCommand: r,
      startTime: i,
      timedOut: !1,
      isCanceled: !1,
      isGracefullyCanceled: !1,
      isMaxBuffer: !1,
      isForcefullyTerminated: !1,
      stdio: Array.from({ length: n.length }),
      ipcOutput: [],
      options: o,
      isSync: s,
    }),
  JE = ({
    error: e,
    command: t,
    escapedCommand: r,
    startTime: n,
    timedOut: o,
    isCanceled: i,
    isGracefullyCanceled: s,
    isMaxBuffer: a,
    isForcefullyTerminated: c,
    exitCode: l,
    signal: u,
    stdio: f,
    all: p,
    ipcOutput: d,
    options: {
      timeoutDuration: h,
      timeout: m = h,
      forceKillAfterDelay: g,
      killSignal: y,
      cwd: b,
      maxBuffer: v,
    },
    isSync: w,
  }) => {
    const { exitCode: E, signal: S, signalDescription: O } = tS(l, u),
      {
        originalMessage: I,
        shortMessage: T,
        message: j,
      } = (({
        stdio: e,
        all: t,
        ipcOutput: r,
        originalError: n,
        signal: o,
        signalDescription: i,
        exitCode: s,
        escapedCommand: a,
        timedOut: c,
        isCanceled: l,
        isGracefullyCanceled: u,
        isMaxBuffer: f,
        isForcefullyTerminated: p,
        forceKillAfterDelay: d,
        killSignal: h,
        maxBuffer: m,
        timeout: g,
        cwd: y,
      }) => {
        const b = n?.code,
          v = zE({
            originalError: n,
            timedOut: c,
            timeout: g,
            isMaxBuffer: f,
            maxBuffer: m,
            errorCode: b,
            signal: o,
            signalDescription: i,
            exitCode: s,
            isCanceled: l,
            isGracefullyCanceled: u,
            isForcefullyTerminated: p,
            forceKillAfterDelay: d,
            killSignal: h,
          }),
          w = HE(n, y),
          E = `${v}: ${a}${void 0 === w ? "" : `\n${w}`}`,
          S = [
            E,
            ...(void 0 === t ? [e[2], e[1]] : [t]),
            ...e.slice(3),
            r.map(e => XE(e)).join("\n"),
          ]
            .map(e => Zg(Xw(qE(e))))
            .filter(Boolean)
            .join("\n\n");
        return { originalMessage: w, shortMessage: E, message: S };
      })({
        stdio: f,
        all: p,
        ipcOutput: d,
        originalError: e,
        signal: S,
        signalDescription: O,
        exitCode: E,
        escapedCommand: r,
        timedOut: o,
        isCanceled: i,
        isGracefullyCanceled: s,
        isMaxBuffer: a,
        isForcefullyTerminated: c,
        forceKillAfterDelay: g,
        killSignal: y,
        maxBuffer: v,
        timeout: m,
        cwd: b,
      }),
      x = ((e, t, r) =>
        new (r ? Xb : Hb)(t, e instanceof Gb ? {} : { cause: e }))(e, j, w);
    return (
      Object.assign(
        x,
        ZE({
          error: x,
          command: t,
          escapedCommand: r,
          startTime: n,
          timedOut: o,
          isCanceled: i,
          isGracefullyCanceled: s,
          isMaxBuffer: a,
          isForcefullyTerminated: c,
          exitCode: E,
          signal: S,
          signalDescription: O,
          stdio: f,
          all: p,
          ipcOutput: d,
          cwd: b,
          originalMessage: I,
          shortMessage: T,
        })
      ),
      x
    );
  },
  ZE = ({
    error: e,
    command: t,
    escapedCommand: r,
    startTime: n,
    timedOut: o,
    isCanceled: i,
    isGracefullyCanceled: s,
    isMaxBuffer: a,
    isForcefullyTerminated: c,
    exitCode: l,
    signal: u,
    signalDescription: f,
    stdio: p,
    all: d,
    ipcOutput: h,
    cwd: m,
    originalMessage: g,
    shortMessage: y,
  }) =>
    eS({
      shortMessage: y,
      originalMessage: g,
      command: t,
      escapedCommand: r,
      cwd: m,
      durationMs: By(n),
      failed: !0,
      timedOut: o,
      isCanceled: i,
      isGracefullyCanceled: s,
      isTerminated: void 0 !== u,
      isMaxBuffer: a,
      isForcefullyTerminated: c,
      exitCode: l,
      signal: u,
      signalDescription: f,
      code: e.cause?.code,
      stdout: p[1],
      stderr: p[2],
      all: d,
      stdio: p,
      ipcOutput: h,
      pipedFrom: [],
    }),
  eS = e =>
    Object.fromEntries(Object.entries(e).filter(([, e]) => void 0 !== e)),
  tS = (e, t) => {
    const r = null === t ? void 0 : t;
    return {
      exitCode: null === e ? void 0 : e,
      signal: r,
      signalDescription: void 0 === r ? void 0 : pv(t),
    };
  },
  rS = e => (Number.isFinite(e) ? e : 0);
function nS(e) {
  switch (typeof e) {
    case "number":
      if (Number.isFinite(e))
        return (function (e) {
          return {
            days: Math.trunc(e / 864e5),
            hours: Math.trunc((e / 36e5) % 24),
            minutes: Math.trunc((e / 6e4) % 60),
            seconds: Math.trunc((e / 1e3) % 60),
            milliseconds: Math.trunc(e % 1e3),
            microseconds: Math.trunc(rS(1e3 * e) % 1e3),
            nanoseconds: Math.trunc(rS(1e6 * e) % 1e3),
          };
        })(e);
      break;
    case "bigint":
      return (function (e) {
        return {
          days: e / 86400000n,
          hours: (e / 3600000n) % 24n,
          minutes: (e / 60000n) % 60n,
          seconds: (e / 1000n) % 60n,
          milliseconds: e % 1000n,
          microseconds: 0n,
          nanoseconds: 0n,
        };
      })(e);
  }
  throw new TypeError("Expected a finite number or bigint");
}
const oS = 24n * 60n * 60n * 1000n;
function iS(e, t) {
  const r = "bigint" == typeof e;
  if (!r && !Number.isFinite(e))
    throw new TypeError("Expected a finite number or bigint");
  (t = Object.assign({}, t)).colonNotation &&
    ((t.compact = !1),
    (t.formatSubMilliseconds = !1),
    (t.separateMilliseconds = !1),
    (t.verbose = !1)),
    t.compact &&
      ((t.unitCount = 1),
      (t.secondsDecimalDigits = 0),
      (t.millisecondsDecimalDigits = 0));
  let n = [];
  const o = (e, r, o, i) => {
      if (
        (0 !== n.length && t.colonNotation) ||
        !(e => 0 === e || 0n === e)(e) ||
        (t.colonNotation && "m" === o)
      ) {
        if (((i = i ?? String(e)), t.colonNotation)) {
          const e = i.includes(".") ? i.split(".")[0].length : i.length,
            t = n.length > 0 ? 2 : 1;
          i = "0".repeat(Math.max(0, t - e)) + i;
        } else
          i += t.verbose
            ? " " + ((e, t) => (1 === t || 1n === t ? e : `${e}s`))(r, e)
            : o;
        n.push(i);
      }
    },
    i = nS(e),
    s = BigInt(i.days);
  if (
    (o(s / 365n, "year", "y"),
    o(s % 365n, "day", "d"),
    o(Number(i.hours), "hour", "h"),
    o(Number(i.minutes), "minute", "m"),
    t.separateMilliseconds ||
      t.formatSubMilliseconds ||
      (!t.colonNotation && e < 1e3))
  ) {
    const e = Number(i.seconds),
      r = Number(i.milliseconds),
      n = Number(i.microseconds),
      s = Number(i.nanoseconds);
    if ((o(e, "second", "s"), t.formatSubMilliseconds))
      o(r, "millisecond", "ms"),
        o(n, "microsecond", "µs"),
        o(s, "nanosecond", "ns");
    else {
      const e = r + n / 1e3 + s / 1e6,
        i =
          "number" == typeof t.millisecondsDecimalDigits
            ? t.millisecondsDecimalDigits
            : 0,
        a = e >= 1 ? Math.round(e) : Math.ceil(e),
        c = i ? e.toFixed(i) : a;
      o(Number.parseFloat(c), "millisecond", "ms", c);
    }
  } else {
    const n = ((e, t) => {
        const r = Math.floor(e * 10 ** t + 1e-7);
        return (Math.round(r) / 10 ** t).toFixed(t);
      })(
        ((r ? Number(e % oS) : e) / 1e3) % 60,
        "number" == typeof t.secondsDecimalDigits ? t.secondsDecimalDigits : 1
      ),
      i = t.keepDecimalsOnWholeSeconds ? n : n.replace(/\.0+$/, "");
    o(Number.parseFloat(i), "second", "s", i);
  }
  if (0 === n.length) return "0" + (t.verbose ? " milliseconds" : "ms");
  const a = t.colonNotation ? ":" : " ";
  return (
    "number" == typeof t.unitCount &&
      (n = n.slice(0, Math.max(t.unitCount, 1))),
    n.join(a)
  );
}
const sS = (e, t) => {
    Xg(t) &&
      (((e, t) => {
        e.failed &&
          Ry({
            type: "error",
            verboseMessage: e.shortMessage,
            verboseInfo: t,
            result: e,
          });
      })(e, t),
      aS(e, t));
  },
  aS = (e, t) => {
    const r = `(done in ${iS(e.durationMs)})`;
    Ry({ type: "duration", verboseMessage: r, verboseInfo: t, result: e });
  },
  cS = (e, t, { reject: r }) => {
    if ((sS(e, t), e.failed && r)) throw e;
    return e;
  },
  lS = (e, t) =>
    bS(e)
      ? "asyncGenerator"
      : vS(e)
        ? "generator"
        : ES(e)
          ? "fileUrl"
          : SS(e)
            ? "filePath"
            : xS(e)
              ? "webStream"
              : eE(e, { checkOpen: !1 })
                ? "native"
                : fg(e)
                  ? "uint8Array"
                  : AS(e)
                    ? "asyncIterable"
                    : DS(e)
                      ? "iterable"
                      : RS(e)
                        ? pS({ transform: e }, t)
                        : wS(e)
                          ? uS(e, t)
                          : "native",
  uS = (e, t) =>
    nE(e.transform, { checkOpen: !1 })
      ? fS(e, t)
      : RS(e.transform)
        ? pS(e, t)
        : mS(e, t),
  fS = (e, t) => (dS(e, t, "Duplex stream"), "duplex"),
  pS = (e, t) => (dS(e, t, "web TransformStream"), "webTransform"),
  dS = ({ final: e, binary: t, objectMode: r }, n, o) => {
    hS(e, `${n}.final`, o), hS(t, `${n}.binary`, o), gS(r, `${n}.objectMode`);
  },
  hS = (e, t, r) => {
    if (void 0 !== e)
      throw new TypeError(
        `The \`${t}\` option can only be defined when using a generator, not a ${r}.`
      );
  },
  mS = ({ transform: e, final: t, binary: r, objectMode: n }, o) => {
    if (void 0 !== e && !yS(e))
      throw new TypeError(
        `The \`${o}.transform\` option must be a generator, a Duplex stream or a web TransformStream.`
      );
    if (nE(t, { checkOpen: !1 }))
      throw new TypeError(
        `The \`${o}.final\` option must not be a Duplex stream.`
      );
    if (RS(t))
      throw new TypeError(
        `The \`${o}.final\` option must not be a web TransformStream.`
      );
    if (void 0 !== t && !yS(t))
      throw new TypeError(`The \`${o}.final\` option must be a generator.`);
    return (
      gS(r, `${o}.binary`),
      gS(n, `${o}.objectMode`),
      bS(e) || bS(t) ? "asyncGenerator" : "generator"
    );
  },
  gS = (e, t) => {
    if (void 0 !== e && "boolean" != typeof e)
      throw new TypeError(`The \`${t}\` option must use a boolean.`);
  },
  yS = e => bS(e) || vS(e),
  bS = e =>
    "[object AsyncGeneratorFunction]" === Object.prototype.toString.call(e),
  vS = e => "[object GeneratorFunction]" === Object.prototype.toString.call(e),
  wS = e => wf(e) && (void 0 !== e.transform || void 0 !== e.final),
  ES = e => "[object URL]" === Object.prototype.toString.call(e),
  SS = e => wf(e) && 1 === Object.keys(e).length && OS(e.file),
  OS = e => "string" == typeof e,
  IS = new Set(["ipc", "ignore", "inherit", "overlapped", "pipe"]),
  TS = e => "[object ReadableStream]" === Object.prototype.toString.call(e),
  jS = e => "[object WritableStream]" === Object.prototype.toString.call(e),
  xS = e => TS(e) || jS(e),
  RS = e => TS(e?.readable) && jS(e?.writable),
  AS = e => NS(e) && "function" == typeof e[Symbol.asyncIterator],
  DS = e => NS(e) && "function" == typeof e[Symbol.iterator],
  NS = e => "object" == typeof e && null !== e,
  LS = new Set(["generator", "asyncGenerator", "duplex", "webTransform"]),
  kS = new Set(["fileUrl", "filePath", "fileNumber"]),
  CS = new Set(["fileUrl", "filePath"]),
  PS = new Set([...CS, "webStream", "nodeStream"]),
  MS = new Set(["webTransform", "duplex"]),
  _S = {
    generator: "a generator",
    asyncGenerator: "an async generator",
    fileUrl: "a file URL",
    filePath: "a file path string",
    fileNumber: "a file descriptor number",
    webStream: "a web stream",
    nodeStream: "a Node.js stream",
    webTransform: "a web TransformStream",
    duplex: "a Duplex stream",
    native: "any value",
    iterable: "an iterable",
    asyncIterable: "an async iterable",
    string: "a string",
    uint8Array: "a Uint8Array",
  },
  $S = (e, t, r, n) => ("output" === n ? BS(e, t, r) : FS(e, t, r)),
  BS = (e, t, r) => {
    const n = 0 !== t && r[t - 1].value.readableObjectMode;
    return { writableObjectMode: n, readableObjectMode: e ?? n };
  },
  FS = (e, t, r) => {
    const n = 0 === t ? !0 === e : r[t - 1].value.readableObjectMode;
    return {
      writableObjectMode: n,
      readableObjectMode: t !== r.length - 1 && (e ?? n),
    };
  },
  US = (e, t, r, { encoding: n }) => {
    const o = e.filter(({ type: e }) => LS.has(e)),
      i = Array.from({ length: o.length });
    for (const [e, s] of Object.entries(o))
      i[e] = GS({
        stdioItem: s,
        index: Number(e),
        newTransforms: i,
        optionName: t,
        direction: r,
        encoding: n,
      });
    return HS(i, r);
  },
  GS = ({
    stdioItem: e,
    stdioItem: { type: t },
    index: r,
    newTransforms: n,
    optionName: o,
    direction: i,
    encoding: s,
  }) =>
    "duplex" === t
      ? WS({ stdioItem: e, optionName: o })
      : "webTransform" === t
        ? zS({ stdioItem: e, index: r, newTransforms: n, direction: i })
        : VS({
            stdioItem: e,
            index: r,
            newTransforms: n,
            direction: i,
            encoding: s,
          }),
  WS = ({
    stdioItem: e,
    stdioItem: {
      value: {
        transform: t,
        transform: { writableObjectMode: r, readableObjectMode: n },
        objectMode: o = n,
      },
    },
    optionName: i,
  }) => {
    if (o && !n)
      throw new TypeError(
        `The \`${i}.objectMode\` option can only be \`true\` if \`new Duplex({objectMode: true})\` is used.`
      );
    if (!o && n)
      throw new TypeError(
        `The \`${i}.objectMode\` option cannot be \`false\` if \`new Duplex({objectMode: true})\` is used.`
      );
    return Object.assign(
      Object.assign({}, e),
      {},
      { value: { transform: t, writableObjectMode: r, readableObjectMode: n } }
    );
  },
  zS = ({
    stdioItem: e,
    stdioItem: { value: t },
    index: r,
    newTransforms: n,
    direction: o,
  }) => {
    const { transform: i, objectMode: s } = wf(t) ? t : { transform: t },
      { writableObjectMode: a, readableObjectMode: c } = $S(s, r, n, o);
    return Object.assign(
      Object.assign({}, e),
      {},
      { value: { transform: i, writableObjectMode: a, readableObjectMode: c } }
    );
  },
  VS = ({
    stdioItem: e,
    stdioItem: { value: t },
    index: r,
    newTransforms: n,
    direction: o,
    encoding: i,
  }) => {
    const {
        transform: s,
        final: a,
        binary: c = !1,
        preserveNewlines: l = !1,
        objectMode: u,
      } = wf(t) ? t : { transform: t },
      f = c || _w.has(i),
      { writableObjectMode: p, readableObjectMode: d } = $S(u, r, n, o);
    return Object.assign(
      Object.assign({}, e),
      {},
      {
        value: {
          transform: s,
          final: a,
          binary: f,
          preserveNewlines: l,
          writableObjectMode: p,
          readableObjectMode: d,
        },
      }
    );
  },
  HS = (e, t) => ("input" === t ? e.reverse() : e),
  XS = ({ type: e, value: t }, r) => qS[r] ?? QS[e](t),
  qS = ["input", "output", "output"],
  KS = () => {},
  YS = () => "input",
  QS = {
    generator: KS,
    asyncGenerator: KS,
    fileUrl: KS,
    filePath: KS,
    iterable: YS,
    asyncIterable: YS,
    uint8Array: YS,
    webStream: e => (jS(e) ? "output" : "input"),
    nodeStream: e =>
      rE(e, { checkOpen: !1 })
        ? tE(e, { checkOpen: !1 })
          ? void 0
          : "input"
        : "output",
    webTransform: KS,
    duplex: KS,
    native(e) {
      const t = JS(e);
      return void 0 !== t
        ? t
        : eE(e, { checkOpen: !1 })
          ? QS.nodeStream(e)
          : void 0;
    },
  },
  JS = e =>
    [0, O.stdin].includes(e)
      ? "input"
      : [1, 2, O.stdout, O.stderr].includes(e)
        ? "output"
        : void 0,
  ZS = "output",
  eO = ["stdio", "ipc", "buffer"],
  tO = (e, t) => {
    if (void 0 === e) return Lg.map(e => t[e]);
    if (rO(t))
      throw new Error(
        `It's not possible to provide \`stdio\` in combination with one of ${Lg.map(e => `\`${e}\``).join(", ")}`
      );
    if ("string" == typeof e) return [e, e, e];
    if (!Array.isArray(e))
      throw new TypeError(
        `Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof e}\``
      );
    const r = Math.max(e.length, Lg.length);
    return Array.from({ length: r }, (t, r) => e[r]);
  },
  rO = e => Lg.some(t => void 0 !== e[t]),
  nO = (e, t) =>
    Array.isArray(e)
      ? e.map(e => nO(e, t))
      : null == e
        ? t >= Lg.length
          ? "ignore"
          : "pipe"
        : e,
  oO = (e, t, r) =>
    e.map((e, n) => (t[n] || 0 === n || qg(r, n) || !iO(e) ? e : "ignore")),
  iO = e => "pipe" === e || (Array.isArray(e) && e.every(e => "pipe" === e)),
  sO = ({
    stdioItem: e,
    stdioItem: { value: t, optionName: r },
    fdNumber: n,
    direction: o,
  }) => {
    const i = aO({ value: t, optionName: r, fdNumber: n, direction: o });
    if (void 0 !== i) return i;
    if (eE(t, { checkOpen: !1 }))
      throw new TypeError(
        `The \`${r}: Stream\` option cannot both be an array and include a stream with synchronous methods.`
      );
    return e;
  },
  aO = ({ value: e, optionName: t, fdNumber: r, direction: n }) => {
    const o = cO(e, r);
    if (void 0 !== o) {
      if ("output" === n)
        return { type: "fileNumber", value: o, optionName: t };
      if (C.isatty(o))
        throw new TypeError(
          `The \`${t}: ${zv(e)}\` option is invalid: it cannot be a TTY with synchronous methods.`
        );
      return { type: "uint8Array", value: pg(D(o)), optionName: t };
    }
  },
  cO = (e, t) => {
    if ("inherit" === e) return t;
    if ("number" == typeof e) return e;
    const r = Ng.indexOf(e);
    return -1 !== r ? r : void 0;
  },
  lO = ({
    stdioItem: e,
    stdioItem: { value: t, optionName: r },
    fdNumber: n,
  }) =>
    "inherit" === t
      ? { type: "nodeStream", value: uO(n, t, r), optionName: r }
      : "number" == typeof t
        ? { type: "nodeStream", value: uO(t, t, r), optionName: r }
        : eE(t, { checkOpen: !1 })
          ? { type: "nodeStream", value: t, optionName: r }
          : e,
  uO = (e, t, r) => {
    const n = Ng[e];
    if (void 0 === n)
      throw new TypeError(
        `The \`${r}: ${t}\` option is invalid: no such standard stream.`
      );
    return n;
  },
  fO = ({ input: e, inputFile: t }, r) => (0 === r ? [...pO(e), ...hO(t)] : []),
  pO = e =>
    void 0 === e ? [] : [{ type: dO(e), value: e, optionName: "input" }],
  dO = e => {
    if (rE(e, { checkOpen: !1 })) return "nodeStream";
    if ("string" == typeof e) return "string";
    if (fg(e)) return "uint8Array";
    throw new Error(
      "The `input` option must be a string, a Uint8Array or a Node.js Readable stream."
    );
  },
  hO = e =>
    void 0 === e
      ? []
      : [
          Object.assign(
            Object.assign({}, mO(e)),
            {},
            { optionName: "inputFile" }
          ),
        ],
  mO = e => {
    if (ES(e)) return { type: "fileUrl", value: e };
    if (OS(e)) return { type: "filePath", value: { file: e } };
    throw new Error(
      "The `inputFile` option must be a file path string or a file URL."
    );
  };
var gO = pe,
  yO = kr,
  bO = Cs,
  vO = Ma,
  wO = ti,
  EO = pe,
  SO = yt,
  OO = kr,
  IO = Cs,
  TO = function (e, t) {
    (t && "string" == typeof e) || yO(e);
    var r = vO(e);
    return bO(yO(void 0 !== r ? gO(r, e) : e));
  },
  jO = Bs,
  xO = ra(function () {
    for (var e, t, r = this.iterator, n = this.mapper; ; ) {
      if ((t = this.inner))
        try {
          if (!(e = OO(EO(t.next, t.iterator))).done) return e.value;
          this.inner = null;
        } catch (e) {
          jO(r, "throw", e);
        }
      if (((e = OO(EO(this.next, r))), (this.done = !!e.done))) return;
      try {
        this.inner = TO(n(e.value, this.counter++), !1);
      } catch (e) {
        jO(r, "throw", e);
      }
    }
  });
wO(
  { target: "Iterator", proto: !0, real: !0, forced: false },
  {
    flatMap: function (e) {
      return OO(this), SO(e), new xO(IO(this), { mapper: e, inner: null });
    },
  }
);
const RO = (e, t) =>
    e.flatMap(({ direction: e, stdioItems: r }) =>
      r
        .filter(e => e.type === t)
        .map(t => Object.assign(Object.assign({}, t), {}, { direction: e }))
    ),
  AO = ({
    otherStdioItems: e,
    type: t,
    value: r,
    optionName: n,
    direction: o,
  }) => {
    CS.has(t) &&
      DO({
        otherStdioItems: e,
        type: t,
        value: r,
        optionName: n,
        direction: o,
      });
  },
  DO = ({
    otherStdioItems: e,
    type: t,
    value: r,
    optionName: n,
    direction: o,
  }) => {
    const i = e.filter(e => NO(e, r));
    if (0 === i.length) return;
    const s = i.find(e => e.direction !== o);
    return kO(s, n, t), "output" === o ? i[0].stream : void 0;
  },
  NO = ({ type: e, value: t }, r) =>
    "filePath" === e
      ? t.file === r.file
      : "fileUrl" === e
        ? t.href === r.href
        : t === r,
  LO = ({ otherStdioItems: e, type: t, value: r, optionName: n }) => {
    const o = e.find(({ value: { transform: e } }) => e === r.transform);
    kO(o, n, t);
  },
  kO = (e, t, r) => {
    if (void 0 !== e)
      throw new TypeError(
        `The \`${e.optionName}\` and \`${t}\` options must not target ${_S[r]} that is the same.`
      );
  },
  CO = (e, t, r, n) => {
    const o = ((e, t, r) => {
        let { stdio: n, ipc: o, buffer: i } = e,
          s = Ag(e, eO);
        const a = tO(n, s).map((e, t) => nO(e, t));
        return r
          ? oO(a, i, t)
          : ((e, t) => (t && !e.includes("ipc") ? [...e, "ipc"] : e))(a, o);
      })(t, r, n),
      i = o.map((e, r) =>
        PO({ stdioOption: e, fdNumber: r, options: t, isSync: n })
      ),
      s = WO({
        initialFileDescriptors: i,
        addProperties: e,
        options: t,
        isSync: n,
      });
    return (t.stdio = s.map(({ stdioItems: e }) => XO(e))), s;
  },
  PO = ({ stdioOption: e, fdNumber: t, options: r, isSync: n }) => {
    const o = kg(t),
      { stdioItems: i, isStdioArray: s } = MO({
        stdioOption: e,
        fdNumber: t,
        options: r,
        optionName: o,
      }),
      a = ((e, t, r) => {
        const n = e.map(e => XS(e, t));
        if (n.includes("input") && n.includes("output"))
          throw new TypeError(
            `The \`${r}\` option must not be an array of both readable and writable values.`
          );
        return n.find(Boolean) ?? ZS;
      })(i, t, o),
      c = i.map(e =>
        (({
          stdioItem: e,
          stdioItem: { type: t },
          isStdioArray: r,
          fdNumber: n,
          direction: o,
          isSync: i,
        }) =>
          r && "native" === t
            ? i
              ? sO({ stdioItem: e, fdNumber: n, direction: o })
              : lO({ stdioItem: e, fdNumber: n })
            : e)({
          stdioItem: e,
          isStdioArray: s,
          fdNumber: t,
          direction: a,
          isSync: n,
        })
      ),
      l = ((e, t, r, n) => [
        ...e.filter(({ type: e }) => !LS.has(e)),
        ...US(e, t, r, n),
      ])(c, o, a, r),
      u = ((e, t) => {
        const r = e.findLast(({ type: e }) => LS.has(e));
        return (
          void 0 !== r &&
          ("input" === t
            ? r.value.writableObjectMode
            : r.value.readableObjectMode)
        );
      })(l, a);
    return GO(l, u), { direction: a, objectMode: u, stdioItems: l };
  },
  MO = ({ stdioOption: e, fdNumber: t, options: r, optionName: n }) => {
    const o = (e =>
        e.filter((t, r) =>
          e.every(
            (e, n) =>
              t.value !== e.value ||
              r >= n ||
              "generator" === t.type ||
              "asyncGenerator" === t.type
          )
        ))([...(Array.isArray(e) ? e : [e]).map(e => _O(e, n)), ...fO(r, t)]),
      i = o.length > 1;
    return $O(o, i, n), FO(o), { stdioItems: o, isStdioArray: i };
  },
  _O = (e, t) => ({ type: lS(e, t), value: e, optionName: t }),
  $O = (e, t, r) => {
    if (0 === e.length)
      throw new TypeError(`The \`${r}\` option must not be an empty array.`);
    if (t)
      for (const { value: t, optionName: r } of e)
        if (BO.has(t))
          throw new Error(`The \`${r}\` option must not include \`${t}\`.`);
  },
  BO = new Set(["ignore", "ipc"]),
  FO = e => {
    for (const t of e) UO(t);
  },
  UO = ({ type: e, value: t, optionName: r }) => {
    if ((e => ES(e) && "file:" !== e.protocol)(t))
      throw new TypeError(
        `The \`${r}: URL\` option must use the \`file:\` scheme.\nFor example, you can use the \`pathToFileURL()\` method of the \`url\` core module.`
      );
    if (((e, t) => "native" === e && "string" == typeof t && !IS.has(t))(e, t))
      throw new TypeError(
        `The \`${r}: { file: '...' }\` option must be used instead of \`${r}: '...'\`.`
      );
  },
  GO = (e, t) => {
    if (!t) return;
    const r = e.find(({ type: e }) => kS.has(e));
    if (void 0 !== r)
      throw new TypeError(
        `The \`${r.optionName}\` option cannot use both files and transforms in objectMode.`
      );
  },
  WO = ({
    initialFileDescriptors: e,
    addProperties: t,
    options: r,
    isSync: n,
  }) => {
    const o = [];
    try {
      for (const i of e)
        o.push(
          zO({
            fileDescriptor: i,
            fileDescriptors: o,
            addProperties: t,
            options: r,
            isSync: n,
          })
        );
      return o;
    } catch (e) {
      throw (HO(o), e);
    }
  },
  zO = ({
    fileDescriptor: { direction: e, objectMode: t, stdioItems: r },
    fileDescriptors: n,
    addProperties: o,
    options: i,
    isSync: s,
  }) => {
    const a = r.map(t =>
      VO({
        stdioItem: t,
        addProperties: o,
        direction: e,
        options: i,
        fileDescriptors: n,
        isSync: s,
      })
    );
    return { direction: e, objectMode: t, stdioItems: a };
  },
  VO = ({
    stdioItem: e,
    addProperties: t,
    direction: r,
    options: n,
    fileDescriptors: o,
    isSync: i,
  }) => {
    const s = (({
      stdioItem: { type: e, value: t, optionName: r },
      direction: n,
      fileDescriptors: o,
      isSync: i,
    }) => {
      const s = RO(o, e);
      if (0 !== s.length) {
        if (!i)
          return PS.has(e)
            ? DO({
                otherStdioItems: s,
                type: e,
                value: t,
                optionName: r,
                direction: n,
              })
            : void (
                MS.has(e) &&
                LO({ otherStdioItems: s, type: e, value: t, optionName: r })
              );
        AO({
          otherStdioItems: s,
          type: e,
          value: t,
          optionName: r,
          direction: n,
        });
      }
    })({ stdioItem: e, direction: r, fileDescriptors: o, isSync: i });
    return void 0 !== s
      ? Object.assign(Object.assign({}, e), {}, { stream: s })
      : Object.assign(Object.assign({}, e), t[r][e.type](e, n));
  },
  HO = e => {
    for (const { stdioItems: t } of e)
      for (const { stream: e } of t) void 0 === e || Dg(e) || e.destroy();
  },
  XO = e => {
    if (e.length > 1)
      return e.some(({ value: e }) => "overlapped" === e)
        ? "overlapped"
        : "pipe";
    const [{ type: t, value: r }] = e;
    return "native" === t ? r : "pipe";
  },
  qO = ({ type: e, optionName: t }) => {
    KO(t, _S[e]);
  },
  KO = (e, t) => {
    throw new TypeError(
      `The \`${e}\` option cannot be ${t} with synchronous methods.`
    );
  },
  YO = {
    generator() {},
    asyncGenerator: qO,
    webStream: qO,
    nodeStream: qO,
    webTransform: qO,
    duplex: qO,
    asyncIterable: qO,
    native: ({ optionName: e, value: t }) => (
      ("ipc" !== t && "overlapped" !== t) || KO(e, `"${t}"`), {}
    ),
  },
  QO = {
    input: Object.assign(
      Object.assign({}, YO),
      {},
      {
        fileUrl: ({ value: e }) => ({ contents: [pg(D(e))] }),
        filePath: ({ value: { file: e } }) => ({ contents: [pg(D(e))] }),
        fileNumber: qO,
        iterable: ({ value: e }) => ({ contents: [...e] }),
        string: ({ value: e }) => ({ contents: [e] }),
        uint8Array: ({ value: e }) => ({ contents: [e] }),
      }
    ),
    output: Object.assign(
      Object.assign({}, YO),
      {},
      {
        fileUrl: ({ value: e }) => ({ path: e }),
        filePath: ({ value: { file: e } }) => ({ path: e }),
        fileNumber: ({ value: e }) => ({ path: e }),
        iterable: qO,
        string: qO,
        uint8Array: qO,
      }
    ),
  },
  JO = (e, { stripFinalNewline: t }, r) =>
    ZO(t, r) && void 0 !== e && !Array.isArray(e) ? Xw(e) : e,
  ZO = (e, t) => ("all" === t ? e[1] || e[2] : e[t]),
  eI = (e, t, r, n) => (e || r ? void 0 : nI(t, n)),
  tI = (e, t, r) => (r ? e.flatMap(e => rI(e, t)) : rI(e, t)),
  rI = (e, t) => {
    const { transform: r, final: n } = nI(t, {});
    return [...r(e), ...n()];
  },
  nI = (e, t) => (
    (t.previousChunks = ""),
    { transform: oI.bind(void 0, t, e), final: sI.bind(void 0, t) }
  ),
  oI = function* (e, t, r) {
    if ("string" != typeof r) return void (yield r);
    let { previousChunks: n } = e,
      o = -1;
    for (let i = 0; i < r.length; i += 1)
      if ("\n" === r[i]) {
        const s = iI(r, i, t, e);
        let a = r.slice(o + 1, i + 1 - s);
        n.length > 0 && ((a = lI(n, a)), (n = "")), yield a, (o = i);
      }
    o !== r.length - 1 && (n = lI(n, r.slice(o + 1))), (e.previousChunks = n);
  },
  iI = (e, t, r, n) =>
    r
      ? 0
      : ((n.isWindowsNewline = 0 !== t && "\r" === e[t - 1]),
        n.isWindowsNewline ? 2 : 1),
  sI = function* ({ previousChunks: e }) {
    e.length > 0 && (yield e);
  },
  aI = ({ binary: e, preserveNewlines: t, readableObjectMode: r, state: n }) =>
    e || t || r ? void 0 : { transform: cI.bind(void 0, n) },
  cI = function* ({ isWindowsNewline: e = !1 }, t) {
    const {
      unixNewline: r,
      windowsNewline: n,
      LF: o,
      concatBytes: i,
    } = "string" == typeof t ? uI : fI;
    if (t.at(-1) === o) return void (yield t);
    const s = e ? n : r;
    yield i(t, s);
  },
  lI = (e, t) => `${e}${t}`,
  uI = { windowsNewline: "\r\n", unixNewline: "\n", LF: "\n", concatBytes: lI },
  fI = {
    windowsNewline: new Uint8Array([13, 10]),
    unixNewline: new Uint8Array([10]),
    LF: 10,
    concatBytes: (e, t) => {
      const r = new Uint8Array(e.length + t.length);
      return r.set(e, 0), r.set(t, e.length), r;
    },
  },
  pI = (e, t) => (e ? void 0 : dI.bind(void 0, t)),
  dI = function* (e, t) {
    if ("string" != typeof t && !fg(t) && !ee.isBuffer(t))
      throw new TypeError(
        `The \`${e}\` option's transform must use "objectMode: true" to receive as input: ${typeof t}.`
      );
    yield t;
  },
  hI = (e, t) => (e ? mI.bind(void 0, t) : gI.bind(void 0, t)),
  mI = function* (e, t) {
    yI(e, t), yield t;
  },
  gI = function* (e, t) {
    if ((yI(e, t), "string" != typeof t && !fg(t)))
      throw new TypeError(
        `The \`${e}\` option's function must yield a string or an Uint8Array, not ${typeof t}.`
      );
    yield t;
  },
  yI = (e, t) => {
    if (null == t)
      throw new TypeError(
        `The \`${e}\` option's function must not call \`yield ${t}\`.\nInstead, \`yield\` should either be called with a value, or not be called at all. For example:\n  if (condition) { yield value; }`
      );
  },
  bI = (e, t, r) => {
    if (r) return;
    if (e) return { transform: vI.bind(void 0, new TextEncoder()) };
    const n = new g(t);
    return { transform: wI.bind(void 0, n), final: EI.bind(void 0, n) };
  },
  vI = function* (e, t) {
    ee.isBuffer(t)
      ? yield pg(t)
      : "string" == typeof t
        ? yield e.encode(t)
        : yield t;
  },
  wI = function* (e, t) {
    yield fg(t) ? e.write(t) : t;
  },
  EI = function* (e) {
    const t = e.end();
    "" !== t && (yield t);
  },
  SI = E(async (e, t, r, n) => {
    t.currentIterable = e(...r);
    try {
      for await (const e of t.currentIterable) n.push(e);
    } finally {
      delete t.currentIterable;
    }
  }),
  OI = async function* (e, t, r) {
    if (r === t.length) return void (yield e);
    const { transform: n = xI } = t[r];
    for await (const o of n(e)) yield* OI(o, t, r + 1);
  },
  II = async function* (e) {
    for (const [t, { final: r }] of Object.entries(e))
      yield* TI(r, Number(t), e);
  },
  TI = async function* (e, t, r) {
    if (void 0 !== e) for await (const n of e()) yield* OI(n, r, t + 1);
  },
  jI = E(async ({ currentIterable: e }, t) => {
    if (void 0 === e) {
      if (t) throw t;
    } else await (t ? e.throw(t) : e.return());
  }),
  xI = function* (e) {
    yield e;
  },
  RI = (e, t, r, n) => {
    try {
      for (const n of e(...t)) r.push(n);
      n();
    } catch (e) {
      n(e);
    }
  },
  AI = (e, t) => [...t.flatMap(t => [...DI(t, e, 0)]), ...NI(e)],
  DI = function* (e, t, r) {
    if (r === t.length) return void (yield e);
    const { transform: n = kI } = t[r];
    for (const o of n(e)) yield* DI(o, t, r + 1);
  },
  NI = function* (e) {
    for (const [t, { final: r }] of Object.entries(e))
      yield* LI(r, Number(t), e);
  },
  LI = function* (e, t, r) {
    if (void 0 !== e) for (const n of e()) yield* DI(n, r, t + 1);
  },
  kI = function* (e) {
    yield e;
  },
  CI = (
    {
      value: e,
      value: {
        transform: t,
        final: r,
        writableObjectMode: n,
        readableObjectMode: o,
      },
      optionName: i,
    },
    { encoding: s }
  ) => {
    const a = {},
      c = MI(e, s, i),
      l = bS(t),
      u = bS(r),
      f = l ? SI.bind(void 0, OI, a) : RI.bind(void 0, DI),
      p = l || u ? SI.bind(void 0, II, a) : RI.bind(void 0, NI),
      d = l || u ? jI.bind(void 0, a) : void 0;
    return {
      stream: new q({
        writableObjectMode: n,
        writableHighWaterMark: K(n),
        readableObjectMode: o,
        readableHighWaterMark: K(o),
        transform(e, t, r) {
          f([e, c, 0], this, r);
        },
        flush(e) {
          p([c], this, e);
        },
        destroy: d,
      }),
    };
  },
  PI = (e, t, r, n) => {
    const o = t.filter(({ type: e }) => "generator" === e),
      i = n ? o.reverse() : o;
    for (const { value: t, optionName: n } of i) {
      const o = MI(t, r, n);
      e = AI(o, e);
    }
    return e;
  },
  MI = (
    {
      transform: e,
      final: t,
      binary: r,
      writableObjectMode: n,
      readableObjectMode: o,
      preserveNewlines: i,
    },
    s,
    a
  ) => {
    const c = {};
    return [
      { transform: pI(n, a) },
      bI(r, s, n),
      eI(r, i, n, c),
      { transform: e, final: t },
      { transform: hI(o, a) },
      aI({ binary: r, preserveNewlines: i, readableObjectMode: o, state: c }),
    ].filter(Boolean);
  },
  _I = e =>
    new Set(
      Object.entries(e)
        .filter(([, { direction: e }]) => "input" === e)
        .map(([e]) => Number(e))
    ),
  $I = (e, t, r) => {
    const { stdioItems: n } = e[t],
      o = n.filter(({ contents: e }) => void 0 !== e);
    if (0 === o.length) return;
    if (0 !== t) {
      const [{ type: e, optionName: t }] = o;
      throw new TypeError(
        `Only the \`stdin\` option, not \`${t}\`, can be ${_S[e]} with synchronous methods.`
      );
    }
    const i = o.map(({ contents: e }) => e).map(e => BI(e, n));
    r.input = bg(i);
  },
  BI = (e, t) => {
    const r = PI(e, t, "utf8", !0);
    return FI(r), bg(r);
  },
  FI = e => {
    const t = e.find(e => "string" != typeof e && !fg(e));
    if (void 0 !== t)
      throw new TypeError(
        `The \`stdin\` option is invalid: when passing objects as input, a transform must be used to serialize them to strings or Uint8Arrays: ${t}.`
      );
  },
  UI = ({ stdioItems: e, encoding: t, verboseInfo: r, fdNumber: n }) =>
    "all" !== n &&
    qg(r, n) &&
    !_w.has(t) &&
    GI(n) &&
    (e.some(({ type: e, value: t }) => "native" === e && WI.has(t)) ||
      e.every(({ type: e }) => LS.has(e))),
  GI = e => 1 === e || 2 === e,
  WI = new Set(["pipe", "overlapped"]),
  zI = e => e._readableState.pipes.length > 0,
  VI = (e, t, r) => {
    const n = ky(e);
    Ry({ type: "output", verboseMessage: n, fdNumber: t, verboseInfo: r });
  },
  HI = (
    {
      result: e,
      fileDescriptors: t,
      fdNumber: r,
      state: n,
      outputFiles: o,
      isMaxBuffer: i,
      verboseInfo: s,
    },
    { buffer: a, encoding: c, lines: l, stripFinalNewline: u, maxBuffer: f }
  ) => {
    if (null === e) return;
    const p = ((e, t, r) => {
        if (!t) return e;
        const n = WE(r);
        return e.length > n ? e.slice(0, n) : e;
      })(e, i, f),
      d = pg(p),
      { stdioItems: h, objectMode: m } = t[r],
      g = XI([d], h, c, n),
      { serializedResult: y, finalResult: b = y } = qI({
        chunks: g,
        objectMode: m,
        encoding: c,
        lines: l,
        stripFinalNewline: u,
        fdNumber: r,
      });
    KI({
      serializedResult: y,
      fdNumber: r,
      state: n,
      verboseInfo: s,
      encoding: c,
      stdioItems: h,
      objectMode: m,
    });
    const v = a[r] ? b : void 0;
    try {
      return void 0 === n.error && YI(y, h, o), v;
    } catch (e) {
      return (n.error = e), v;
    }
  },
  XI = (e, t, r, n) => {
    try {
      return PI(e, t, r, !1);
    } catch (t) {
      return (n.error = t), e;
    }
  },
  qI = ({
    chunks: e,
    objectMode: t,
    encoding: r,
    lines: n,
    stripFinalNewline: o,
    fdNumber: i,
  }) => {
    if (t) return { serializedResult: e };
    if ("buffer" === r) return { serializedResult: bg(e) };
    const s = ((e, t) => yg(e, t).join(""))(e, r);
    return n[i]
      ? { serializedResult: s, finalResult: tI(s, !o[i], t) }
      : { serializedResult: s };
  },
  KI = ({
    serializedResult: e,
    fdNumber: t,
    state: r,
    verboseInfo: n,
    encoding: o,
    stdioItems: i,
    objectMode: s,
  }) => {
    if (!UI({ stdioItems: i, encoding: o, verboseInfo: n, fdNumber: t }))
      return;
    const a = tI(e, !1, s);
    try {
      ((e, t, r) => {
        for (const n of e) VI(n, t, r);
      })(a, t, n);
    } catch (e) {
      r.error ??= e;
    }
  },
  YI = (e, t, r) => {
    for (const { path: n } of t.filter(({ type: e }) => kS.has(e))) {
      const t = "string" == typeof n ? n : n.toString();
      r.has(t) ? N(n, e) : (r.add(t), R(n, e));
    }
  },
  QI = async e => {
    const [t, r] = await Promise.allSettled([G(e, "spawn"), G(e, "exit")]);
    return "rejected" === t.status
      ? []
      : "rejected" === r.status
        ? JI(e)
        : r.value;
  },
  JI = async e => {
    try {
      return await G(e, "exit");
    } catch {
      return JI(e);
    }
  },
  ZI = async e => {
    const [t, r] = await e;
    if (!eT(t, r) && tT(t, r)) throw new Gb();
    return [t, r];
  },
  eT = (e, t) => void 0 === e && void 0 === t,
  tT = (e, t) => 0 !== e || null !== t,
  rT = ({ error: e, status: t, signal: r, output: n }, { maxBuffer: o }) => {
    const i = nT(e, t, r),
      s = "ETIMEDOUT" === i?.code,
      a = ((e, t, r) =>
        "ENOBUFS" === e?.code &&
        null !== t &&
        t.some(e => null !== e && e.length > WE(r)))(i, n, o);
    return {
      resultError: i,
      exitCode: t,
      signal: r,
      timedOut: s,
      isMaxBuffer: a,
    };
  },
  nT = (e, t, r) => (void 0 !== e ? e : tT(t, r) ? new Gb() : void 0),
  oT = ["encoding", "maxBuffer"],
  iT = (e, t, r) => {
    const {
        command: n,
        escapedCommand: o,
        startTime: i,
        verboseInfo: s,
      } = Fy(e, t, r),
      a = sT(r),
      { file: c, commandArguments: l, options: u } = zw(e, t, a);
    aT(u);
    const f = ((e, t) => CO(QO, e, t, !0))(u, s);
    return {
      file: c,
      commandArguments: l,
      command: n,
      escapedCommand: o,
      startTime: i,
      verboseInfo: s,
      options: u,
      fileDescriptors: f,
    };
  },
  sT = e =>
    e.node && !e.ipc ? Object.assign(Object.assign({}, e), {}, { ipc: !1 }) : e,
  aT = ({ ipc: e, ipcInput: t, detached: r, cancelSignal: n }) => {
    t && cT("ipcInput"),
      e && cT("ipc: true"),
      r && cT("detached: true"),
      n && cT("cancelSignal");
  },
  cT = e => {
    throw new TypeError(
      `The "${e}" option cannot be used with synchronous methods.`
    );
  },
  lT = ({
    file: e,
    commandArguments: t,
    options: r,
    command: n,
    escapedCommand: o,
    verboseInfo: i,
    fileDescriptors: s,
    startTime: a,
  }) => {
    const c = uT({
      file: e,
      commandArguments: t,
      options: r,
      command: n,
      escapedCommand: o,
      fileDescriptors: s,
      startTime: a,
    });
    if (c.failed) return c;
    const {
        resultError: l,
        exitCode: u,
        signal: f,
        timedOut: p,
        isMaxBuffer: d,
      } = rT(c, r),
      { output: h, error: m = l } = (({
        fileDescriptors: e,
        syncResult: { output: t },
        options: r,
        isMaxBuffer: n,
        verboseInfo: o,
      }) => {
        if (null === t) return { output: Array.from({ length: 3 }) };
        const i = {},
          s = new Set([]),
          a = t.map((t, a) =>
            HI(
              {
                result: t,
                fileDescriptors: e,
                fdNumber: a,
                state: i,
                outputFiles: s,
                isMaxBuffer: n,
                verboseInfo: o,
              },
              r
            )
          );
        return Object.assign({ output: a }, i);
      })({
        fileDescriptors: s,
        syncResult: c,
        options: r,
        isMaxBuffer: d,
        verboseInfo: i,
      }),
      g = h.map((e, t) => JO(e, r, t)),
      y = JO(
        (([, e, t], r) => {
          if (r.all)
            return void 0 === e
              ? t
              : void 0 === t
                ? e
                : Array.isArray(e)
                  ? Array.isArray(t)
                    ? [...e, ...t]
                    : [...e, JO(t, r, "all")]
                  : Array.isArray(t)
                    ? [JO(e, r, "all"), ...t]
                    : fg(e) && fg(t)
                      ? wg([e, t])
                      : `${e}${t}`;
        })(h, r),
        r,
        "all"
      );
    return pT({
      error: m,
      exitCode: u,
      signal: f,
      timedOut: p,
      isMaxBuffer: d,
      stdio: g,
      all: y,
      options: r,
      command: n,
      escapedCommand: o,
      startTime: a,
    });
  },
  uT = ({
    file: e,
    commandArguments: t,
    options: r,
    command: n,
    escapedCommand: o,
    fileDescriptors: i,
    startTime: s,
  }) => {
    try {
      ((e, t) => {
        for (const r of _I(e)) $I(e, r, t);
      })(i, r);
      const n = fT(r);
      return h(e, t, n);
    } catch (e) {
      return QE({
        error: e,
        command: n,
        escapedCommand: o,
        fileDescriptors: i,
        options: r,
        startTime: s,
        isSync: !0,
      });
    }
  },
  fT = e => {
    let { encoding: t, maxBuffer: r } = e,
      n = Ag(e, oT);
    return Object.assign(
      Object.assign({}, n),
      {},
      { encoding: "buffer", maxBuffer: WE(r) }
    );
  },
  pT = ({
    error: e,
    exitCode: t,
    signal: r,
    timedOut: n,
    isMaxBuffer: o,
    stdio: i,
    all: s,
    options: a,
    command: c,
    escapedCommand: l,
    startTime: u,
  }) =>
    void 0 === e
      ? YE({
          command: c,
          escapedCommand: l,
          stdio: i,
          all: s,
          ipcOutput: [],
          options: a,
          startTime: u,
        })
      : JE({
          error: e,
          command: c,
          escapedCommand: l,
          timedOut: n,
          isCanceled: !1,
          isGracefullyCanceled: !1,
          isMaxBuffer: o,
          isForcefullyTerminated: !1,
          exitCode: t,
          signal: r,
          stdio: i,
          all: s,
          ipcOutput: [],
          options: a,
          startTime: u,
          isSync: !0,
        }),
  dT = (
    { anyProcess: e, channel: t, isSubprocess: r, ipc: n },
    { reference: o = !0, filter: i } = {}
  ) => (
    Sv({
      methodName: "getOneMessage",
      isSubprocess: r,
      ipc: n,
      isConnected: rw(e),
    }),
    hT({ anyProcess: e, channel: t, isSubprocess: r, filter: i, reference: o })
  ),
  hT = async ({
    anyProcess: e,
    channel: t,
    isSubprocess: r,
    filter: n,
    reference: o,
  }) => {
    Hv(t, o);
    const i = Zv(e, t, r),
      s = new AbortController();
    try {
      return await Promise.race([mT(i, n, s), gT(i, r, s), yT(i, r, s)]);
    } catch (t) {
      throw (Lv(e), t);
    } finally {
      s.abort(), qv(t, o);
    }
  },
  mT = async (e, t, { signal: r }) => {
    if (void 0 === t) {
      const [t] = await G(e, "message", { signal: r });
      return t;
    }
    for await (const [n] of V(e, "message", { signal: r })) if (t(n)) return n;
  },
  gT = async (e, t, { signal: r }) => {
    await G(e, "disconnect", { signal: r }),
      (e => {
        throw new Error(
          `${Av("getOneMessage", e)} could not complete: the ${Nv(e)} exited or disconnected.`
        );
      })(t);
  },
  yT = async (e, t, { signal: r }) => {
    const [n] = await G(e, "strict:error", { signal: r });
    throw Tv(n, t);
  },
  bT = (
    { anyProcess: e, channel: t, isSubprocess: r, ipc: n },
    { reference: o = !0 } = {}
  ) =>
    vT({
      anyProcess: e,
      channel: t,
      isSubprocess: r,
      ipc: n,
      shouldAwait: !r,
      reference: o,
    }),
  vT = ({
    anyProcess: e,
    channel: t,
    isSubprocess: r,
    ipc: n,
    shouldAwait: o,
    reference: i,
  }) => {
    Sv({
      methodName: "getEachMessage",
      isSubprocess: r,
      ipc: n,
      isConnected: rw(e),
    }),
      Hv(t, i);
    const s = Zv(e, t, r),
      a = new AbortController(),
      c = {};
    return (
      wT(e, s, a),
      ET({ ipcEmitter: s, isSubprocess: r, controller: a, state: c }),
      ST({
        anyProcess: e,
        channel: t,
        ipcEmitter: s,
        isSubprocess: r,
        shouldAwait: o,
        controller: a,
        state: c,
        reference: i,
      })
    );
  },
  wT = async (e, t, r) => {
    try {
      await G(t, "disconnect", { signal: r.signal }), r.abort();
    } catch {}
  },
  ET = async ({ ipcEmitter: e, isSubprocess: t, controller: r, state: n }) => {
    try {
      const [o] = await G(e, "strict:error", { signal: r.signal });
      (n.error = Tv(o, t)), r.abort();
    } catch {}
  },
  ST = async function* ({
    anyProcess: e,
    channel: t,
    ipcEmitter: r,
    isSubprocess: n,
    shouldAwait: o,
    controller: i,
    state: s,
    reference: a,
  }) {
    try {
      for await (const [e] of V(r, "message", { signal: i.signal }))
        OT(s), yield e;
    } catch {
      OT(s);
    } finally {
      i.abort(), qv(t, a), n || Lv(e), o && (await e);
    }
  },
  OT = ({ error: e }) => {
    if (e) throw e;
  },
  IT = (e, t, r) => ({
    sendMessage: gw.bind(void 0, {
      anyProcess: e,
      channel: e.channel,
      isSubprocess: t,
      ipc: r,
    }),
    getOneMessage: dT.bind(void 0, {
      anyProcess: e,
      channel: e.channel,
      isSubprocess: t,
      ipc: r,
    }),
    getEachMessage: bT.bind(void 0, {
      anyProcess: e,
      channel: e.channel,
      isSubprocess: t,
      ipc: r,
    }),
  }),
  TT = (e, t) => {
    const r = jT(),
      n = jT(),
      o = jT(),
      i = Array.from({ length: t.length - 3 }, jT),
      s = jT(),
      a = [r, n, o, ...i];
    Object.assign(e, { stdin: r, stdout: n, stderr: o, all: s, stdio: a });
  },
  jT = () => {
    const e = new Y();
    return e.end(), e;
  },
  xT = () => new Q({ read() {} }),
  RT = () => new J({ write() {} }),
  AT = () => new Z({ read() {}, write() {} }),
  DT = async (e, t, r) => cS(e, t, r),
  NT = ({ type: e, optionName: t }) => {
    throw new TypeError(`The \`${t}\` option cannot be ${_S[e]}.`);
  },
  LT = {
    fileNumber: NT,
    generator: CI,
    asyncGenerator: CI,
    nodeStream: ({ value: e }) => ({ stream: e }),
    webTransform({
      value: { transform: e, writableObjectMode: t, readableObjectMode: r },
    }) {
      const n = t || r;
      return { stream: Z.fromWeb(e, { objectMode: n }) };
    },
    duplex: ({ value: { transform: e } }) => ({ stream: e }),
    native() {},
  },
  kT = {
    input: Object.assign(
      Object.assign({}, LT),
      {},
      {
        fileUrl: ({ value: e }) => ({ stream: L(e) }),
        filePath: ({ value: { file: e } }) => ({ stream: L(e) }),
        webStream: ({ value: e }) => ({ stream: Q.fromWeb(e) }),
        iterable: ({ value: e }) => ({ stream: Q.from(e) }),
        asyncIterable: ({ value: e }) => ({ stream: Q.from(e) }),
        string: ({ value: e }) => ({ stream: Q.from(e) }),
        uint8Array: ({ value: e }) => ({ stream: Q.from(ee.from(e)) }),
      }
    ),
    output: Object.assign(
      Object.assign({}, LT),
      {},
      {
        fileUrl: ({ value: e }) => ({ stream: k(e) }),
        filePath: ({ value: { file: e } }) => ({ stream: k(e) }),
        webStream: ({ value: e }) => ({ stream: J.fromWeb(e) }),
        iterable: NT,
        asyncIterable: NT,
        string: NT,
        uint8Array: NT,
      }
    ),
  };
function CT(e) {
  if (!Array.isArray(e))
    throw new TypeError(`Expected an array, got \`${typeof e}\`.`);
  for (const t of e) FT(t);
  const t = e.some(({ readableObjectMode: e }) => e),
    r = PT(e, t),
    n = new MT({
      objectMode: t,
      writableHighWaterMark: r,
      readableHighWaterMark: r,
    });
  for (const t of e) n.add(t);
  return n;
}
const PT = (e, t) => {
  if (0 === e.length) return K(t);
  const r = e
    .filter(({ readableObjectMode: e }) => e === t)
    .map(({ readableHighWaterMark: e }) => e);
  return Math.max(...r);
};
class MT extends Y {
  #s = new Set([]);
  #a = new Set([]);
  #c = new Set([]);
  #l;
  #u = Symbol("unpipe");
  #f = new WeakMap();
  add(e) {
    if ((FT(e), this.#s.has(e))) return;
    this.#s.add(e), (this.#l ??= _T(this, this.#s, this.#u));
    const t = UT({
      passThroughStream: this,
      stream: e,
      streams: this.#s,
      ended: this.#a,
      aborted: this.#c,
      onFinished: this.#l,
      unpipeEvent: this.#u,
    });
    this.#f.set(e, t), e.pipe(this, { end: !1 });
  }
  async remove(e) {
    if ((FT(e), !this.#s.has(e))) return !1;
    const t = this.#f.get(e);
    return void 0 !== t && (this.#f.delete(e), e.unpipe(this), await t, !0);
  }
}
const _T = async (e, t, r) => {
    QT(e, JT);
    const n = new AbortController();
    try {
      await Promise.race([$T(e, n), BT(e, t, r, n)]);
    } finally {
      n.abort(), QT(e, -JT);
    }
  },
  $T = async (e, { signal: t }) => {
    try {
      await te(e, { signal: t, cleanup: !0 });
    } catch (t) {
      throw (HT(e, t), t);
    }
  },
  BT = async (e, t, r, { signal: n }) => {
    for await (const [o] of V(e, "unpipe", { signal: n }))
      t.has(o) && o.emit(r);
  },
  FT = e => {
    if ("function" != typeof e?.pipe)
      throw new TypeError(`Expected a readable stream, got: \`${typeof e}\`.`);
  },
  UT = async ({
    passThroughStream: e,
    stream: t,
    streams: r,
    ended: n,
    aborted: o,
    onFinished: i,
    unpipeEvent: s,
  }) => {
    QT(e, ZT);
    const a = new AbortController();
    try {
      await Promise.race([
        GT(i, t, a),
        WT({
          passThroughStream: e,
          stream: t,
          streams: r,
          ended: n,
          aborted: o,
          controller: a,
        }),
        zT({
          stream: t,
          streams: r,
          ended: n,
          aborted: o,
          unpipeEvent: s,
          controller: a,
        }),
      ]);
    } finally {
      a.abort(), QT(e, -ZT);
    }
    r.size > 0 &&
      r.size === n.size + o.size &&
      (0 === n.size && o.size > 0 ? qT(e) : VT(e));
  },
  GT = async (e, t, { signal: r }) => {
    try {
      await e, r.aborted || qT(t);
    } catch (e) {
      r.aborted || HT(t, e);
    }
  },
  WT = async ({
    passThroughStream: e,
    stream: t,
    streams: r,
    ended: n,
    aborted: o,
    controller: { signal: i },
  }) => {
    try {
      await te(t, { signal: i, cleanup: !0, readable: !0, writable: !1 }),
        r.has(t) && n.add(t);
    } catch (n) {
      if (i.aborted || !r.has(t)) return;
      XT(n) ? o.add(t) : KT(e, n);
    }
  },
  zT = async ({
    stream: e,
    streams: t,
    ended: r,
    aborted: n,
    unpipeEvent: o,
    controller: { signal: i },
  }) => {
    if ((await G(e, o, { signal: i }), !e.readable))
      return G(i, "abort", { signal: i });
    t.delete(e), r.delete(e), n.delete(e);
  },
  VT = e => {
    e.writable && e.end();
  },
  HT = (e, t) => {
    XT(t) ? qT(e) : KT(e, t);
  },
  XT = e => "ERR_STREAM_PREMATURE_CLOSE" === e?.code,
  qT = e => {
    (e.readable || e.writable) && e.destroy();
  },
  KT = (e, t) => {
    e.destroyed || (e.once("error", YT), e.destroy(t));
  },
  YT = () => {},
  QT = (e, t) => {
    const r = e.getMaxListeners();
    0 !== r && r !== Number.POSITIVE_INFINITY && e.setMaxListeners(r + t);
  },
  JT = 2,
  ZT = 1,
  ej = (e, t) => {
    e.pipe(t), tj(e, t), nj(e, t);
  },
  tj = async (e, t) => {
    if (!Dg(e) && !Dg(t)) {
      try {
        await te(e, { cleanup: !0, readable: !0, writable: !1 });
      } catch {}
      rj(t);
    }
  },
  rj = e => {
    e.writable && e.end();
  },
  nj = async (e, t) => {
    if (!Dg(e) && !Dg(t)) {
      try {
        await te(t, { cleanup: !0, readable: !1, writable: !0 });
      } catch {}
      oj(e);
    }
  },
  oj = e => {
    e.readable && e.destroy();
  },
  ij = (e, t, r, n) => {
    "output" === r ? ej(e.stdio[n], t) : ej(t, e.stdio[n]);
    const o = sj[n];
    void 0 !== o && (e[o] = t), (e.stdio[n] = t);
  },
  sj = ["stdin", "stdout", "stderr"],
  aj = ({
    subprocess: e,
    stream: t,
    direction: r,
    fdNumber: n,
    pipeGroups: o,
    controller: i,
  }) => {
    if (void 0 === t) return;
    cj(t, i);
    const [s, a] = "output" === r ? [t, e.stdio[n]] : [e.stdio[n], t],
      c = o.get(s) ?? [];
    o.set(s, [...c, a]);
  },
  cj = (e, { signal: t }) => {
    Dg(e) && Vv(e, lj, t);
  },
  lj = 2,
  uj = [];
uj.push("SIGHUP", "SIGINT", "SIGTERM"),
  "win32" !== process.platform &&
    uj.push(
      "SIGALRM",
      "SIGABRT",
      "SIGVTALRM",
      "SIGXCPU",
      "SIGXFSZ",
      "SIGUSR2",
      "SIGTRAP",
      "SIGSYS",
      "SIGQUIT",
      "SIGIOT"
    ),
  "linux" === process.platform &&
    uj.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
const fj = e =>
    !!e &&
    "object" == typeof e &&
    "function" == typeof e.removeListener &&
    "function" == typeof e.emit &&
    "function" == typeof e.reallyExit &&
    "function" == typeof e.listeners &&
    "function" == typeof e.kill &&
    "number" == typeof e.pid &&
    "function" == typeof e.on,
  pj = Symbol.for("signal-exit emitter"),
  dj = globalThis,
  hj = Object.defineProperty.bind(Object);
class mj {
  emitted = { afterExit: !1, exit: !1 };
  listeners = { afterExit: [], exit: [] };
  count = 0;
  id = Math.random();
  constructor() {
    if (dj[pj]) return dj[pj];
    hj(dj, pj, { value: this, writable: !1, enumerable: !1, configurable: !1 });
  }
  on(e, t) {
    this.listeners[e].push(t);
  }
  removeListener(e, t) {
    const r = this.listeners[e],
      n = r.indexOf(t);
    -1 !== n && (0 === n && 1 === r.length ? (r.length = 0) : r.splice(n, 1));
  }
  emit(e, t, r) {
    if (this.emitted[e]) return !1;
    this.emitted[e] = !0;
    let n = !1;
    for (const o of this.listeners[e]) n = !0 === o(t, r) || n;
    return "exit" === e && (n = this.emit("afterExit", t, r) || n), n;
  }
}
class gj {}
const yj = globalThis.process,
  {
    onExit: bj,
    load: vj,
    unload: wj,
  } = ((Ej = fj(yj)
    ? new (class extends gj {
        #p = "win32" === yj.platform ? "SIGINT" : "SIGHUP";
        #d = new mj();
        #h;
        #m;
        #g;
        #y = {};
        #b = !1;
        constructor(e) {
          super(), (this.#h = e), (this.#y = {});
          for (const t of uj)
            this.#y[t] = () => {
              const r = this.#h.listeners(t);
              let { count: n } = this.#d;
              const o = e;
              if (
                ("object" == typeof o.__signal_exit_emitter__ &&
                  "number" == typeof o.__signal_exit_emitter__.count &&
                  (n += o.__signal_exit_emitter__.count),
                r.length === n)
              ) {
                this.unload();
                const r = this.#d.emit("exit", null, t),
                  n = "SIGHUP" === t ? this.#p : t;
                r || e.kill(e.pid, n);
              }
            };
          (this.#g = e.reallyExit), (this.#m = e.emit);
        }
        onExit(e, t) {
          if (!fj(this.#h)) return () => {};
          !1 === this.#b && this.load();
          const r = t?.alwaysLast ? "afterExit" : "exit";
          return (
            this.#d.on(r, e),
            () => {
              this.#d.removeListener(r, e),
                0 === this.#d.listeners.exit.length &&
                  0 === this.#d.listeners.afterExit.length &&
                  this.unload();
            }
          );
        }
        load() {
          if (!this.#b) {
            (this.#b = !0), (this.#d.count += 1);
            for (const e of uj)
              try {
                const t = this.#y[e];
                t && this.#h.on(e, t);
              } catch (e) {}
            (this.#h.emit = (e, ...t) => this.#v(e, ...t)),
              (this.#h.reallyExit = e => this.#w(e));
          }
        }
        unload() {
          this.#b &&
            ((this.#b = !1),
            uj.forEach(e => {
              const t = this.#y[e];
              if (!t) throw new Error("Listener not defined for signal: " + e);
              try {
                this.#h.removeListener(e, t);
              } catch (e) {}
            }),
            (this.#h.emit = this.#m),
            (this.#h.reallyExit = this.#g),
            (this.#d.count -= 1));
        }
        #w(e) {
          return fj(this.#h)
            ? ((this.#h.exitCode = e || 0),
              this.#d.emit("exit", this.#h.exitCode, null),
              this.#g.call(this.#h, this.#h.exitCode))
            : 0;
        }
        #v(e, ...t) {
          const r = this.#m;
          if ("exit" === e && fj(this.#h)) {
            "number" == typeof t[0] && (this.#h.exitCode = t[0]);
            const n = r.call(this.#h, e, ...t);
            return this.#d.emit("exit", this.#h.exitCode, null), n;
          }
          return r.call(this.#h, e, ...t);
        }
      })(yj)
    : new (class extends gj {
        onExit() {
          return () => {};
        }
        load() {}
        unload() {}
      })()),
  {
    onExit: (e, t) => Ej.onExit(e, t),
    load: () => Ej.load(),
    unload: () => Ej.unload(),
  });
var Ej;
const Sj = (e, t, r) => {
    try {
      const {
        destination: n,
        pipeOptions: { from: o, to: i, unpipeSignal: s } = {},
      } = Oj(e, t, ...r);
      return {
        destination: n,
        destinationStream: Cv(n, i),
        from: o,
        unpipeSignal: s,
      };
    } catch (e) {
      return { destinationError: e };
    }
  },
  Oj = (e, t, r, ...n) => {
    if (Array.isArray(r)) {
      return { destination: t(Ij, e)(r, ...n), pipeOptions: e };
    }
    if ("string" == typeof r || r instanceof URL) {
      if (Object.keys(e).length > 0)
        throw new TypeError(
          'Please use .pipe("file", ..., options) or .pipe(execa("file", ..., options)) instead of .pipe(options)("file", ...).'
        );
      const [o, i, s] = np(r, ...n);
      return { destination: t(Ij)(o, i, s), pipeOptions: s };
    }
    if (Mv.has(r)) {
      if (Object.keys(e).length > 0)
        throw new TypeError(
          "Please use .pipe(options)`command` or .pipe($(options)`command`) instead of .pipe(options)($`command`)."
        );
      return { destination: r, pipeOptions: n[0] };
    }
    throw new TypeError(
      `The first argument must be a template string, an options object, or an Execa subprocess: ${r}`
    );
  },
  Ij = ({ options: e }) => ({
    options: Object.assign(
      Object.assign({}, e),
      {},
      { stdin: "pipe", piped: !0 }
    ),
  }),
  Tj = (e, t) => {
    try {
      return { sourceStream: Pv(e, t) };
    } catch (e) {
      return { sourceError: e };
    }
  },
  jj = ({
    sourceStream: e,
    sourceError: t,
    destinationStream: r,
    destinationError: n,
  }) =>
    void 0 !== t && void 0 !== n
      ? n
      : void 0 !== n
        ? (oj(e), n)
        : void 0 !== t
          ? (rj(r), t)
          : void 0,
  xj = ({ error: e, fileDescriptors: t, sourceOptions: r, startTime: n }) =>
    QE({
      error: e,
      command: Rj,
      escapedCommand: Rj,
      fileDescriptors: t,
      options: r,
      startTime: n,
      isSync: !1,
    }),
  Rj = "source.pipe(destination)",
  Aj = async e => {
    const [
      { status: t, reason: r, value: n = r },
      { status: o, reason: i, value: s = i },
    ] = await e;
    if ((s.pipedFrom.includes(n) || s.pipedFrom.push(n), "rejected" === o))
      throw s;
    if ("rejected" === t) throw n;
    return s;
  },
  Dj = (e, t) => {
    const r = CT([e]);
    return ej(r, t), kj.set(t, r), r;
  },
  Nj = (e, t) => {
    const r = kj.get(t);
    return r.add(e), r;
  },
  Lj = async e => {
    try {
      await te(e, { cleanup: !0, readable: !1, writable: !0 });
    } catch {}
    kj.delete(e);
  },
  kj = new WeakMap(),
  Cj = 2,
  Pj = 1,
  Mj = (e, t) => (void 0 === e ? [] : [_j(e, t)]),
  _j = async (
    e,
    {
      sourceStream: t,
      mergedStream: r,
      fileDescriptors: n,
      sourceOptions: o,
      startTime: i,
    }
  ) => {
    await S(e, t), await r.remove(t);
    const s = new Error("Pipe canceled by `unpipeSignal` option.");
    throw xj({ error: s, fileDescriptors: n, sourceOptions: o, startTime: i });
  },
  $j = ["destination"],
  Bj = (e, ...t) => {
    if (wf(t[0]))
      return Bj.bind(
        void 0,
        Object.assign(
          Object.assign({}, e),
          {},
          {
            boundOptions: Object.assign(
              Object.assign({}, e.boundOptions),
              t[0]
            ),
          }
        )
      );
    const r = ((
        { source: e, sourcePromise: t, boundOptions: r, createNested: n },
        ...o
      ) => {
        const i = $y(),
          {
            destination: s,
            destinationStream: a,
            destinationError: c,
            from: l,
            unpipeSignal: u,
          } = Sj(r, n, o),
          { sourceStream: f, sourceError: p } = Tj(e, l),
          { options: d, fileDescriptors: h } = Mv.get(e);
        return {
          sourcePromise: t,
          sourceStream: f,
          sourceOptions: d,
          sourceError: p,
          destination: s,
          destinationStream: a,
          destinationError: c,
          unpipeSignal: u,
          fileDescriptors: h,
          startTime: i,
        };
      })(e, ...t),
      { destination: n } = r,
      o = Ag(r, $j),
      i = Fj(Object.assign(Object.assign({}, o), {}, { destination: n }));
    return (
      (i.pipe = Bj.bind(
        void 0,
        Object.assign(
          Object.assign({}, e),
          {},
          { source: n, sourcePromise: i, boundOptions: {} }
        )
      )),
      i
    );
  },
  Fj = async ({
    sourcePromise: e,
    sourceStream: t,
    sourceOptions: r,
    sourceError: n,
    destination: o,
    destinationStream: i,
    destinationError: s,
    unpipeSignal: a,
    fileDescriptors: c,
    startTime: l,
  }) => {
    const u = Uj(e, o);
    (({
      sourceStream: e,
      sourceError: t,
      destinationStream: r,
      destinationError: n,
      fileDescriptors: o,
      sourceOptions: i,
      startTime: s,
    }) => {
      const a = jj({
        sourceStream: e,
        sourceError: t,
        destinationStream: r,
        destinationError: n,
      });
      if (void 0 !== a)
        throw xj({
          error: a,
          fileDescriptors: o,
          sourceOptions: i,
          startTime: s,
        });
    })({
      sourceStream: t,
      sourceError: n,
      destinationStream: i,
      destinationError: s,
      fileDescriptors: c,
      sourceOptions: r,
      startTime: l,
    });
    const f = new AbortController();
    try {
      const e = ((e, t, r) => {
        const n = kj.has(t) ? Nj(e, t) : Dj(e, t);
        return Vv(e, Cj, r.signal), Vv(t, Pj, r.signal), Lj(t), n;
      })(t, i, f);
      return await Promise.race([
        Aj(u),
        ...Mj(a, {
          sourceStream: t,
          mergedStream: e,
          sourceOptions: r,
          fileDescriptors: c,
          startTime: l,
        }),
      ]);
    } finally {
      f.abort();
    }
  },
  Uj = (e, t) => Promise.allSettled([e, t]),
  Gj = ({
    subprocessStdout: e,
    subprocess: t,
    binary: r,
    shouldEncode: n,
    encoding: o,
    preserveNewlines: i,
  }) => {
    const s = new AbortController();
    return (
      Wj(t, s),
      Hj({
        stream: e,
        controller: s,
        binary: r,
        shouldEncode: !e.readableObjectMode && n,
        encoding: o,
        shouldSplit: !e.readableObjectMode,
        preserveNewlines: i,
      })
    );
  },
  Wj = async (e, t) => {
    try {
      await e;
    } catch {
    } finally {
      t.abort();
    }
  },
  zj = ({
    stream: e,
    onStreamEnd: t,
    lines: r,
    encoding: n,
    stripFinalNewline: o,
    allMixed: i,
  }) => {
    const s = new AbortController();
    Vj(t, s, e);
    const a = e.readableObjectMode && !i;
    return Hj({
      stream: e,
      controller: s,
      binary: "buffer" === n,
      shouldEncode: !a,
      encoding: n,
      shouldSplit: !a && r,
      preserveNewlines: !o,
    });
  },
  Vj = async (e, t, r) => {
    try {
      await e;
    } catch {
      r.destroy();
    } finally {
      t.abort();
    }
  },
  Hj = ({
    stream: e,
    controller: t,
    binary: r,
    shouldEncode: n,
    encoding: o,
    shouldSplit: i,
    preserveNewlines: s,
  }) => {
    const a = V(e, "data", {
      signal: t.signal,
      highWaterMark: qj,
      highWatermark: qj,
    });
    return Kj({
      onStdoutChunk: a,
      controller: t,
      binary: r,
      shouldEncode: n,
      encoding: o,
      shouldSplit: i,
      preserveNewlines: s,
    });
  },
  Xj = K(!0),
  qj = Xj,
  Kj = async function* ({
    onStdoutChunk: e,
    controller: t,
    binary: r,
    shouldEncode: n,
    encoding: o,
    shouldSplit: i,
    preserveNewlines: s,
  }) {
    const a = Yj({
      binary: r,
      shouldEncode: n,
      encoding: o,
      shouldSplit: i,
      preserveNewlines: s,
    });
    try {
      for await (const [t] of e) yield* DI(t, a, 0);
    } catch (e) {
      if (!t.signal.aborted) throw e;
    } finally {
      yield* NI(a);
    }
  },
  Yj = ({
    binary: e,
    shouldEncode: t,
    encoding: r,
    shouldSplit: n,
    preserveNewlines: o,
  }) => [bI(e, r, !t), eI(e, o, !n, {})].filter(Boolean),
  Qj = async ({
    stream: e,
    onStreamEnd: t,
    fdNumber: r,
    encoding: n,
    buffer: o,
    maxBuffer: i,
    lines: s,
    allMixed: a,
    stripFinalNewline: c,
    verboseInfo: l,
    streamInfo: u,
  }) => {
    const f = Jj({
      stream: e,
      onStreamEnd: t,
      fdNumber: r,
      encoding: n,
      allMixed: a,
      verboseInfo: l,
      streamInfo: u,
    });
    if (!o) return void (await Promise.all([Zj(e), f]));
    const p = ZO(c, r),
      d = zj({
        stream: e,
        onStreamEnd: t,
        lines: s,
        encoding: n,
        stripFinalNewline: p,
        allMixed: a,
      }),
      [h] = await Promise.all([
        ex({
          stream: e,
          iterable: d,
          fdNumber: r,
          encoding: n,
          maxBuffer: i,
          lines: s,
        }),
        f,
      ]);
    return h;
  },
  Jj = async ({
    stream: e,
    onStreamEnd: t,
    fdNumber: r,
    encoding: n,
    allMixed: o,
    verboseInfo: i,
    streamInfo: { fileDescriptors: s },
  }) => {
    if (
      !UI({
        stdioItems: s[r]?.stdioItems,
        encoding: n,
        verboseInfo: i,
        fdNumber: r,
      })
    )
      return;
    const a = zj({
      stream: e,
      onStreamEnd: t,
      lines: !0,
      encoding: n,
      stripFinalNewline: !0,
      allMixed: o,
    });
    await (async (e, t, r, n) => {
      for await (const o of e) zI(t) || VI(o, r, n);
    })(a, e, r, i);
  },
  Zj = async e => {
    await F(), null === e.readableFlowing && e.resume();
  },
  ex = async ({
    stream: e,
    stream: { readableObjectMode: t },
    iterable: r,
    fdNumber: n,
    encoding: o,
    maxBuffer: i,
    lines: s,
  }) => {
    try {
      return t || s
        ? await (async function (e, t) {
            return gE(e, RE, t);
          })(r, { maxBuffer: i })
        : "buffer" === o
          ? new Uint8Array(
              await (async function (e, t) {
                return gE(e, _E, t);
              })(r, { maxBuffer: i })
            )
          : await (async function (e, t) {
              return gE(e, BE, t);
            })(r, { maxBuffer: i });
    } catch (r) {
      return rx(
        (({
          error: e,
          stream: t,
          readableObjectMode: r,
          lines: n,
          encoding: o,
          fdNumber: i,
        }) => {
          if (!(e instanceof SE)) throw e;
          if ("all" === i) return e;
          const s = FE(r, n, o);
          throw ((e.maxBufferInfo = { fdNumber: i, unit: s }), t.destroy(), e);
        })({
          error: r,
          stream: e,
          readableObjectMode: t,
          lines: s,
          encoding: o,
          fdNumber: n,
        })
      );
    }
  },
  tx = async e => {
    try {
      return await e;
    } catch (e) {
      return rx(e);
    }
  },
  rx = ({ bufferedData: e }) => {
    return (
      (t = e), "[object ArrayBuffer]" === ug.call(t) ? new Uint8Array(e) : e
    );
    var t;
  },
  nx = async (e, t, r, { isSameDirection: n, stopOnExit: o = !1 } = {}) => {
    const i = ox(e, r),
      s = new AbortController();
    try {
      await Promise.race([
        ...(o ? [r.exitPromise] : []),
        te(e, { cleanup: !0, signal: s.signal }),
      ]);
    } catch (e) {
      i.stdinCleanedUp || ax(e, t, r, n);
    } finally {
      s.abort();
    }
  },
  ox = (e, { originalStreams: [t], subprocess: r }) => {
    const n = { stdinCleanedUp: !1 };
    return e === t && ix(e, r, n), n;
  },
  ix = (e, t, r) => {
    const { _destroy: n } = e;
    e._destroy = (...o) => {
      sx(t, r), n.call(e, ...o);
    };
  },
  sx = ({ exitCode: e, signalCode: t }, r) => {
    (null === e && null === t) || (r.stdinCleanedUp = !0);
  },
  ax = (e, t, r, n) => {
    if (!cx(e, t, r, n)) throw e;
  },
  cx = (e, t, r, n = !0) =>
    r.propagating
      ? fx(e) || ux(e)
      : ((r.propagating = !0), lx(r, t) === n ? fx(e) : ux(e)),
  lx = ({ fileDescriptors: e }, t) => "all" !== t && "input" === e[t].direction,
  ux = e => "ERR_STREAM_PREMATURE_CLOSE" === e?.code,
  fx = e => "EPIPE" === e?.code,
  px = async ({
    stream: e,
    fdNumber: t,
    encoding: r,
    buffer: n,
    maxBuffer: o,
    lines: i,
    allMixed: s,
    stripFinalNewline: a,
    verboseInfo: c,
    streamInfo: l,
  }) => {
    if (!e) return;
    const u = nx(e, t, l);
    if (lx(l, t)) return void (await u);
    const [f] = await Promise.all([
      Qj({
        stream: e,
        onStreamEnd: u,
        fdNumber: t,
        encoding: r,
        buffer: n,
        maxBuffer: o,
        lines: i,
        allMixed: s,
        stripFinalNewline: a,
        verboseInfo: c,
        streamInfo: l,
      }),
      u,
    ]);
    return f;
  },
  dx = ({ stdout: e, stderr: t, all: r }, [, n, o]) => {
    const i = n || o;
    return i
      ? n
        ? o
          ? { stream: r, buffer: i }
          : { stream: e, buffer: i }
        : { stream: t, buffer: i }
      : { stream: r, buffer: i };
  },
  hx = ({ all: e, stdout: t, stderr: r }) =>
    e && t && r && t.readableObjectMode !== r.readableObjectMode,
  mx = (e, t) => {
    const r = ky(e);
    Ry({ type: "ipc", verboseMessage: r, fdNumber: "ipc", verboseInfo: t });
  },
  gx = async ({
    subprocess: e,
    buffer: t,
    maxBuffer: r,
    ipc: n,
    ipcOutput: o,
    verboseInfo: i,
  }) => {
    if (!n) return o;
    const s = (e => qg(e, "ipc"))(i),
      a = Hg(t, "ipc"),
      c = Hg(r, "ipc");
    for await (const t of vT({
      anyProcess: e,
      channel: e.channel,
      isSubprocess: !1,
      ipc: n,
      shouldAwait: !1,
      reference: !0,
    }))
      a && (UE(0, o, c), o.push(t)), s && mx(t, i);
    return o;
  },
  yx = async (e, t) => (await Promise.allSettled([e]), t),
  bx = async ({
    subprocess: e,
    options: {
      encoding: t,
      buffer: r,
      maxBuffer: n,
      lines: o,
      timeoutDuration: i,
      cancelSignal: s,
      gracefulCancel: a,
      forceKillAfterDelay: c,
      stripFinalNewline: l,
      ipc: u,
      ipcInput: f,
    },
    context: p,
    verboseInfo: d,
    fileDescriptors: h,
    originalStreams: m,
    onInternalError: g,
    controller: y,
  }) => {
    const b = (async (e, t) => {
        const [r, n] = await QI(e);
        return (t.isForcefullyTerminated ??= !1), [r, n];
      })(e, p),
      v = {
        originalStreams: m,
        fileDescriptors: h,
        subprocess: e,
        exitPromise: b,
        propagating: !1,
      },
      w = (({
        subprocess: e,
        encoding: t,
        buffer: r,
        maxBuffer: n,
        lines: o,
        stripFinalNewline: i,
        verboseInfo: s,
        streamInfo: a,
      }) =>
        e.stdio.map((e, c) =>
          px({
            stream: e,
            fdNumber: c,
            encoding: t,
            buffer: r[c],
            maxBuffer: n[c],
            lines: o[c],
            allMixed: !1,
            stripFinalNewline: i,
            verboseInfo: s,
            streamInfo: a,
          })
        ))({
        subprocess: e,
        encoding: t,
        buffer: r,
        maxBuffer: n,
        lines: o,
        stripFinalNewline: l,
        verboseInfo: d,
        streamInfo: v,
      }),
      E = (({
        subprocess: e,
        encoding: t,
        buffer: r,
        maxBuffer: n,
        lines: o,
        stripFinalNewline: i,
        verboseInfo: s,
        streamInfo: a,
      }) =>
        px(
          Object.assign(
            Object.assign({}, dx(e, r)),
            {},
            {
              fdNumber: "all",
              encoding: t,
              maxBuffer: n[1] + n[2],
              lines: o[1] || o[2],
              allMixed: hx(e),
              stripFinalNewline: i,
              verboseInfo: s,
              streamInfo: a,
            }
          )
        ))({
        subprocess: e,
        encoding: t,
        buffer: r,
        maxBuffer: n,
        lines: o,
        stripFinalNewline: l,
        verboseInfo: d,
        streamInfo: v,
      }),
      S = [],
      O = gx({
        subprocess: e,
        buffer: r,
        maxBuffer: n,
        ipc: u,
        ipcOutput: S,
        verboseInfo: d,
      }),
      I = vx(m, e, v),
      T = wx(h, v);
    try {
      return await Promise.race([
        Promise.all([{}, ZI(b), Promise.all(w), E, O, Pw(e, f), ...I, ...T]),
        g,
        Ex(e, y),
        ...Nw(e, i, p, y),
        ...wv({
          subprocess: e,
          cancelSignal: s,
          gracefulCancel: a,
          context: p,
          controller: y,
        }),
        ...Rw({
          subprocess: e,
          cancelSignal: s,
          gracefulCancel: a,
          forceKillAfterDelay: c,
          context: p,
          controller: y,
        }),
      ]);
    } catch (e) {
      return (
        (p.terminationReason ??= "other"),
        Promise.all([
          { error: e },
          b,
          Promise.all(w.map(e => tx(e))),
          tx(E),
          yx(O, S),
          Promise.allSettled(I),
          Promise.allSettled(T),
        ])
      );
    }
  },
  vx = (e, t, r) => e.map((e, n) => (e === t.stdio[n] ? void 0 : nx(e, n, r))),
  wx = (e, t) =>
    e.flatMap(({ stdioItems: e }, r) =>
      e
        .filter(
          ({ value: e, stream: t = e }) => eE(t, { checkOpen: !1 }) && !Dg(t)
        )
        .map(({ type: e, value: n, stream: o = n }) =>
          nx(o, r, t, {
            isSameDirection: LS.has(e),
            stopOnExit: "native" === e,
          })
        )
    ),
  Ex = async (e, { signal: t }) => {
    const [r] = await G(e, "error", { signal: t });
    throw r;
  },
  Sx = (e, t, r) => {
    const n = e[r];
    n.has(t) || n.set(t, []);
    const o = n.get(t),
      i = kv();
    o.push(i);
    return { resolve: i.resolve.bind(i), promises: o };
  },
  Ox = async ({ resolve: e, promises: t }, r) => {
    e();
    const [n] = await Promise.race([
      Promise.allSettled([!0, r]),
      Promise.all([!1, ...t]),
    ]);
    return !n;
  },
  Ix = async e => {
    if (void 0 !== e)
      try {
        await Tx(e);
      } catch {}
  },
  Tx = async e => {
    await te(e, { cleanup: !0, readable: !1, writable: !0 });
  },
  jx = async e => {
    await te(e, { cleanup: !0, readable: !0, writable: !1 });
  },
  xx = async (e, t) => {
    if ((await e, t)) throw t;
  },
  Rx = (e, t, r) => {
    r && !ux(r) ? e.destroy(r) : t && e.destroy();
  },
  Ax = (
    { subprocess: e, concurrentStreams: t, encoding: r },
    { from: n, binary: o = !0, preserveNewlines: i = !0 } = {}
  ) => {
    const s = o || _w.has(r),
      { subprocessStdout: a, waitReadableDestroy: c } = Dx(e, n, t),
      {
        readableEncoding: l,
        readableObjectMode: u,
        readableHighWaterMark: f,
      } = Nx(a, s),
      { read: p, onStdoutDataDone: d } = Lx({
        subprocessStdout: a,
        subprocess: e,
        binary: s,
        encoding: r,
        preserveNewlines: i,
      }),
      h = new Q({
        read: p,
        destroy: E(
          Px.bind(void 0, {
            subprocessStdout: a,
            subprocess: e,
            waitReadableDestroy: c,
          })
        ),
        highWaterMark: f,
        objectMode: u,
        encoding: l,
      });
    return (
      Cx({
        subprocessStdout: a,
        onStdoutDataDone: d,
        readable: h,
        subprocess: e,
      }),
      h
    );
  },
  Dx = (e, t, r) => {
    const n = Pv(e, t);
    return {
      subprocessStdout: n,
      waitReadableDestroy: Sx(r, n, "readableDestroy"),
    };
  },
  Nx = (
    { readableEncoding: e, readableObjectMode: t, readableHighWaterMark: r },
    n
  ) =>
    n
      ? { readableEncoding: e, readableObjectMode: t, readableHighWaterMark: r }
      : {
          readableEncoding: e,
          readableObjectMode: !0,
          readableHighWaterMark: Xj,
        },
  Lx = ({
    subprocessStdout: e,
    subprocess: t,
    binary: r,
    encoding: n,
    preserveNewlines: o,
  }) => {
    const i = kv(),
      s = Gj({
        subprocessStdout: e,
        subprocess: t,
        binary: r,
        shouldEncode: !r,
        encoding: n,
        preserveNewlines: o,
      });
    return {
      read() {
        kx(this, s, i);
      },
      onStdoutDataDone: i,
    };
  },
  kx = async (e, t, r) => {
    try {
      const { value: n, done: o } = await t.next();
      o ? r.resolve() : e.push(n);
    } catch {}
  },
  Cx = async ({
    subprocessStdout: e,
    onStdoutDataDone: t,
    readable: r,
    subprocess: n,
    subprocessStdin: o,
  }) => {
    try {
      await jx(e), await n, await Ix(o), await t, r.readable && r.push(null);
    } catch (e) {
      await Ix(o), Mx(r, e);
    }
  },
  Px = async (
    { subprocessStdout: e, subprocess: t, waitReadableDestroy: r },
    n
  ) => {
    (await Ox(r, t)) && (Mx(e, n), await xx(t, n));
  },
  Mx = (e, t) => {
    Rx(e, e.readable, t);
  },
  _x = ({ subprocess: e, concurrentStreams: t }, { to: r } = {}) => {
    const {
        subprocessStdin: n,
        waitWritableFinal: o,
        waitWritableDestroy: i,
      } = $x(e, r, t),
      s = new J(
        Object.assign(
          Object.assign({}, Bx(n, e, o)),
          {},
          {
            destroy: E(
              Wx.bind(void 0, {
                subprocessStdin: n,
                subprocess: e,
                waitWritableFinal: o,
                waitWritableDestroy: i,
              })
            ),
            highWaterMark: n.writableHighWaterMark,
            objectMode: n.writableObjectMode,
          }
        )
      );
    return Gx(n, s), s;
  },
  $x = (e, t, r) => {
    const n = Cv(e, t);
    return {
      subprocessStdin: n,
      waitWritableFinal: Sx(r, n, "writableFinal"),
      waitWritableDestroy: Sx(r, n, "writableDestroy"),
    };
  },
  Bx = (e, t, r) => ({
    write: Fx.bind(void 0, e),
    final: E(Ux.bind(void 0, e, t, r)),
  }),
  Fx = (e, t, r, n) => {
    e.write(t, r) ? n() : e.once("drain", n);
  },
  Ux = async (e, t, r) => {
    (await Ox(r, t)) && (e.writable && e.end(), await t);
  },
  Gx = async (e, t, r) => {
    try {
      await Tx(e), t.writable && t.end();
    } catch (e) {
      await (async e => {
        if (void 0 !== e)
          try {
            await jx(e);
          } catch {}
      })(r),
        zx(t, e);
    }
  },
  Wx = async (
    {
      subprocessStdin: e,
      subprocess: t,
      waitWritableFinal: r,
      waitWritableDestroy: n,
    },
    o
  ) => {
    await Ox(r, t), (await Ox(n, t)) && (zx(e, o), await xx(t, o));
  },
  zx = (e, t) => {
    Rx(e, e.writable, t);
  },
  Vx = (
    { subprocess: e, concurrentStreams: t, encoding: r },
    { from: n, to: o, binary: i = !0, preserveNewlines: s = !0 } = {}
  ) => {
    const a = i || _w.has(r),
      { subprocessStdout: c, waitReadableDestroy: l } = Dx(e, n, t),
      {
        subprocessStdin: u,
        waitWritableFinal: f,
        waitWritableDestroy: p,
      } = $x(e, o, t),
      {
        readableEncoding: d,
        readableObjectMode: h,
        readableHighWaterMark: m,
      } = Nx(c, a),
      { read: g, onStdoutDataDone: y } = Lx({
        subprocessStdout: c,
        subprocess: e,
        binary: a,
        encoding: r,
        preserveNewlines: s,
      }),
      b = new Z(
        Object.assign(
          Object.assign({ read: g }, Bx(u, e, f)),
          {},
          {
            destroy: E(
              Hx.bind(void 0, {
                subprocessStdout: c,
                subprocessStdin: u,
                subprocess: e,
                waitReadableDestroy: l,
                waitWritableFinal: f,
                waitWritableDestroy: p,
              })
            ),
            readableHighWaterMark: m,
            writableHighWaterMark: u.writableHighWaterMark,
            readableObjectMode: h,
            writableObjectMode: u.writableObjectMode,
            encoding: d,
          }
        )
      );
    return (
      Cx({
        subprocessStdout: c,
        onStdoutDataDone: y,
        readable: b,
        subprocess: e,
        subprocessStdin: u,
      }),
      Gx(u, b, c),
      b
    );
  },
  Hx = async (
    {
      subprocessStdout: e,
      subprocessStdin: t,
      subprocess: r,
      waitReadableDestroy: n,
      waitWritableFinal: o,
      waitWritableDestroy: i,
    },
    s
  ) => {
    await Promise.all([
      Px({ subprocessStdout: e, subprocess: r, waitReadableDestroy: n }, s),
      Wx(
        {
          subprocessStdin: t,
          subprocess: r,
          waitWritableFinal: o,
          waitWritableDestroy: i,
        },
        s
      ),
    ]);
  },
  Xx = (e, t, { from: r, binary: n = !1, preserveNewlines: o = !1 } = {}) => {
    const i = n || _w.has(t),
      s = Pv(e, r),
      a = Gj({
        subprocessStdout: s,
        subprocess: e,
        binary: i,
        shouldEncode: !0,
        encoding: t,
        preserveNewlines: o,
      });
    return qx(a, s, e);
  },
  qx = async function* (e, t, r) {
    try {
      yield* e;
    } finally {
      t.readable && t.destroy(), await r;
    }
  },
  Kx = (e, { encoding: t }) => {
    const r = {
      readableDestroy: new WeakMap(),
      writableFinal: new WeakMap(),
      writableDestroy: new WeakMap(),
    };
    (e.readable = Ax.bind(void 0, {
      subprocess: e,
      concurrentStreams: r,
      encoding: t,
    })),
      (e.writable = _x.bind(void 0, { subprocess: e, concurrentStreams: r })),
      (e.duplex = Vx.bind(void 0, {
        subprocess: e,
        concurrentStreams: r,
        encoding: t,
      })),
      (e.iterable = Xx.bind(void 0, e, t)),
      (e[Symbol.asyncIterator] = Xx.bind(void 0, e, t, {}));
  },
  Yx = (async () => {})().constructor.prototype,
  Qx = ["then", "catch", "finally"].map(e => [
    e,
    Reflect.getOwnPropertyDescriptor(Yx, e),
  ]),
  Jx = ["timeout", "signal"],
  Zx = (e, t, r, n) => {
    const {
        file: o,
        commandArguments: i,
        command: s,
        escapedCommand: a,
        startTime: c,
        verboseInfo: l,
        options: u,
        fileDescriptors: f,
      } = eR(e, t, r),
      { subprocess: p, promise: d } = rR({
        file: o,
        commandArguments: i,
        options: u,
        startTime: c,
        verboseInfo: l,
        command: s,
        escapedCommand: a,
        fileDescriptors: f,
      });
    return (
      (p.pipe = Bj.bind(void 0, {
        source: p,
        sourcePromise: d,
        boundOptions: {},
        createNested: n,
      })),
      ((e, t) => {
        for (const [r, n] of Qx) {
          const o = n.value.bind(t);
          Reflect.defineProperty(
            e,
            r,
            Object.assign(Object.assign({}, n), {}, { value: o })
          );
        }
      })(p, d),
      Mv.set(p, { options: u, fileDescriptors: f }),
      p
    );
  },
  eR = (e, t, r) => {
    const {
        command: n,
        escapedCommand: o,
        startTime: i,
        verboseInfo: s,
      } = Fy(e, t, r),
      { file: a, commandArguments: c, options: l } = zw(e, t, r),
      u = tR(l),
      f = ((e, t) => CO(kT, e, t, !1))(u, s);
    return {
      file: a,
      commandArguments: c,
      command: n,
      escapedCommand: o,
      startTime: i,
      verboseInfo: s,
      options: u,
      fileDescriptors: f,
    };
  },
  tR = e => {
    let { timeout: t, signal: r } = e,
      n = Ag(e, Jx);
    if (void 0 !== r)
      throw new TypeError(
        'The "signal" option has been renamed to "cancelSignal" instead.'
      );
    return Object.assign(Object.assign({}, n), {}, { timeoutDuration: t });
  },
  rR = ({
    file: e,
    commandArguments: t,
    options: r,
    startTime: n,
    verboseInfo: o,
    command: i,
    escapedCommand: s,
    fileDescriptors: a,
  }) => {
    let c;
    try {
      c = m(e, t, r);
    } catch (e) {
      return (({
        error: e,
        command: t,
        escapedCommand: r,
        fileDescriptors: n,
        options: o,
        startTime: i,
        verboseInfo: s,
      }) => {
        HO(n);
        const a = new d();
        TT(a, n), Object.assign(a, { readable: xT, writable: RT, duplex: AT });
        const c = QE({
          error: e,
          command: t,
          escapedCommand: r,
          fileDescriptors: n,
          options: o,
          startTime: i,
          isSync: !1,
        });
        return { subprocess: a, promise: DT(c, s, o) };
      })({
        error: e,
        command: i,
        escapedCommand: s,
        fileDescriptors: a,
        options: r,
        startTime: n,
        verboseInfo: o,
      });
    }
    const l = new AbortController();
    H(Number.POSITIVE_INFINITY, l.signal);
    const u = [...c.stdio];
    ((e, t, r) => {
      const n = new Map();
      for (const [o, { stdioItems: i, direction: s }] of Object.entries(t)) {
        for (const { stream: t } of i.filter(({ type: e }) => LS.has(e)))
          ij(e, t, s, o);
        for (const { stream: t } of i.filter(({ type: e }) => !LS.has(e)))
          aj({
            subprocess: e,
            stream: t,
            direction: s,
            fdNumber: o,
            pipeGroups: n,
            controller: r,
          });
      }
      for (const [e, t] of n.entries()) {
        const r = 1 === t.length ? t[0] : CT(t);
        ej(r, e);
      }
    })(c, a, l),
      ((e, { cleanup: t, detached: r }, { signal: n }) => {
        if (!t || r) return;
        const o = bj(() => {
          e.kill();
        });
        W(n, () => {
          o();
        });
      })(c, r, l);
    const f = {},
      p = kv();
    (c.kill = hv.bind(void 0, {
      kill: c.kill.bind(c),
      options: r,
      onInternalError: p,
      context: f,
      controller: l,
    })),
      (c.all = (({ stdout: e, stderr: t }, { all: r }) =>
        r && (e || t) ? CT([e, t].filter(Boolean)) : void 0)(c, r)),
      Kx(c, r),
      ((e, { ipc: t }) => {
        Object.assign(e, IT(e, !1, t));
      })(c, r);
    return {
      subprocess: c,
      promise: nR({
        subprocess: c,
        options: r,
        startTime: n,
        verboseInfo: o,
        fileDescriptors: a,
        originalStreams: u,
        command: i,
        escapedCommand: s,
        context: f,
        onInternalError: p,
        controller: l,
      }),
    };
  },
  nR = async ({
    subprocess: e,
    options: t,
    startTime: r,
    verboseInfo: n,
    fileDescriptors: o,
    originalStreams: i,
    command: s,
    escapedCommand: a,
    context: c,
    onInternalError: l,
    controller: u,
  }) => {
    const [f, [p, d], h, m, g] = await bx({
      subprocess: e,
      options: t,
      context: c,
      verboseInfo: n,
      fileDescriptors: o,
      originalStreams: i,
      onInternalError: l,
      controller: u,
    });
    u.abort(), l.resolve();
    const y = h.map((e, r) => JO(e, t, r)),
      b = JO(m, t, "all"),
      v = oR({
        errorInfo: f,
        exitCode: p,
        signal: d,
        stdio: y,
        all: b,
        ipcOutput: g,
        context: c,
        options: t,
        command: s,
        escapedCommand: a,
        startTime: r,
      });
    return cS(v, n, t);
  },
  oR = ({
    errorInfo: e,
    exitCode: t,
    signal: r,
    stdio: n,
    all: o,
    ipcOutput: i,
    context: s,
    options: a,
    command: c,
    escapedCommand: l,
    startTime: u,
  }) =>
    "error" in e
      ? JE({
          error: e.error,
          command: c,
          escapedCommand: l,
          timedOut: "timeout" === s.terminationReason,
          isCanceled:
            "cancel" === s.terminationReason ||
            "gracefulCancel" === s.terminationReason,
          isGracefullyCanceled: "gracefulCancel" === s.terminationReason,
          isMaxBuffer: e.error instanceof SE,
          isForcefullyTerminated: s.isForcefullyTerminated,
          exitCode: t,
          signal: r,
          stdio: n,
          all: o,
          ipcOutput: i,
          options: a,
          startTime: u,
          isSync: !1,
        })
      : YE({
          command: c,
          escapedCommand: l,
          stdio: n,
          all: o,
          ipcOutput: i,
          options: a,
          startTime: u,
        }),
  iR = (e, t) => {
    const r = Object.fromEntries(
      Object.entries(t).map(([t, r]) => [t, sR(t, e[t], r)])
    );
    return Object.assign(Object.assign({}, e), r);
  },
  sR = (e, t, r) =>
    aR.has(e) && wf(t) && wf(r) ? Object.assign(Object.assign({}, t), r) : r,
  aR = new Set(["env", ...Vg]),
  cR = (e, t, r, n) => {
    const o = (e, t, n) => cR(e, t, r, n),
      i = (...i) =>
        lR(
          {
            mapArguments: e,
            deepOptions: r,
            boundOptions: t,
            setBoundExeca: n,
            createNested: o,
          },
          ...i
        );
    return void 0 !== n && n(i, o, t), i;
  },
  lR = (
    {
      mapArguments: e,
      deepOptions: t = {},
      boundOptions: r = {},
      setBoundExeca: n,
      createNested: o,
    },
    i,
    ...s
  ) => {
    if (wf(i)) return o(e, iR(r, i), n);
    const {
      file: a,
      commandArguments: c,
      options: l,
      isSync: u,
    } = uR({
      mapArguments: e,
      firstArgument: i,
      nextArguments: s,
      deepOptions: t,
      boundOptions: r,
    });
    return u
      ? ((e, t, r) => {
          const {
              file: n,
              commandArguments: o,
              command: i,
              escapedCommand: s,
              startTime: a,
              verboseInfo: c,
              options: l,
              fileDescriptors: u,
            } = iT(e, t, r),
            f = lT({
              file: n,
              commandArguments: o,
              options: l,
              command: i,
              escapedCommand: s,
              verboseInfo: c,
              fileDescriptors: u,
              startTime: a,
            });
          return cS(f, c, l);
        })(a, c, l)
      : Zx(a, c, l, o);
  },
  uR = ({
    mapArguments: e,
    firstArgument: t,
    nextArguments: r,
    deepOptions: n,
    boundOptions: o,
  }) => {
    const i =
      ((s = t),
      Array.isArray(s) && Array.isArray(s.raw)
        ? ((e, t) => {
            let r = [];
            for (const [n, o] of e.entries())
              r = Sg({
                templates: e,
                expressions: t,
                tokens: r,
                index: n,
                template: o,
              });
            if (0 === r.length)
              throw new TypeError("Template script must not be empty");
            const [n, ...o] = r;
            return [n, o, {}];
          })(t, r)
        : [t, ...r]);
    var s;
    const [a, c, l] = np(...i),
      u = iR(iR(n, o), l),
      {
        file: f = a,
        commandArguments: p = c,
        options: d = u,
        isSync: h = !1,
      } = e({ file: a, commandArguments: c, options: u });
    return { file: f, commandArguments: p, options: d, isSync: h };
  },
  fR = (e, t) => {
    if (t.length > 0)
      throw new TypeError(
        `The command and its arguments must be passed as a single string: ${e} ${t}.`
      );
    const [r, ...n] = pR(e);
    return { file: r, commandArguments: n };
  },
  pR = e => {
    if ("string" != typeof e)
      throw new TypeError(`The command must be a string: ${String(e)}.`);
    const t = e.trim();
    if ("" === t) return [];
    const r = [];
    for (const e of t.split(dR)) {
      const t = r.at(-1);
      t && t.endsWith("\\")
        ? (r[r.length - 1] = `${t.slice(0, -1)} ${e}`)
        : r.push(e);
    }
    return r;
  },
  dR = / +/g,
  hR = ({ options: e }) =>
    Object.assign(Object.assign({}, mR(e)), {}, { isSync: !0 }),
  mR = e => ({ options: Object.assign(Object.assign({}, gR(e)), e) }),
  gR = ({ input: e, inputFile: t, stdio: r }) =>
    void 0 === e && void 0 === t && void 0 === r ? { stdin: "inherit" } : {};
cR(() => ({}));
const yR = cR(() => ({ isSync: !0 }));
cR(({ file: e, commandArguments: t }) => fR(e, t)),
  cR(({ file: e, commandArguments: t }) =>
    Object.assign(Object.assign({}, fR(e, t)), {}, { isSync: !0 })
  ),
  cR(({ options: e }) => {
    if (!1 === e.node)
      throw new TypeError(
        'The "node" option cannot be false with `execaNode()`.'
      );
    return { options: Object.assign(Object.assign({}, e), {}, { node: !0 }) };
  }),
  cR(
    ({ options: e }) => mR(e),
    {},
    { preferLocal: !0 },
    (e, t, r) => {
      (e.sync = t(hR, r)), (e.s = e.sync);
    }
  ),
  (() => {
    const e = O,
      t = void 0 !== O.channel;
    Object.assign(
      Object.assign({}, IT(e, true, t)),
      {},
      {
        getCancelSignal: Ew.bind(void 0, {
          anyProcess: e,
          channel: e.channel,
          isSubprocess: true,
          ipc: t,
        }),
      }
    );
  })();
const bR = global,
  vR = new Proxy(global.target, {
    set: function (e, t, r) {
      return Reflect.set(...arguments);
    },
    get: function (e, t, r) {
      return OR(`make ${t}`), Reflect.get(...arguments);
    },
  }),
  wR = ["packages", "codemods", "eslint"],
  ER = bR.which("yarn").stdout,
  SR = process.execPath;
function OR(...e) {
  console.log.apply(console, e);
}
function IR(e, t, r, n = !0, o = !1) {
  OR(`${e.replaceAll(ER, "yarn").replaceAll(SR, "node")} ${t.join(" ")}`);
  try {
    return yR(e, t, {
      stdio: n ? "inherit" : void 0,
      cwd: r && a.resolve(r),
      env: process.env,
    }).stdout;
  } catch (r) {
    throw (
      (n &&
        0 !== r.exitCode &&
        (console.error(
          new Error(`\ncommand: ${e} ${t.join(" ")}\ncode: ${r.exitCode}`)
        ),
        o || process.exit(r.exitCode)),
      r)
    );
  }
}
function TR(e, t, r, n) {
  return IR(ER, e, t, r, n);
}
function jR(e, t, r) {
  return IR(SR, e, t, r);
}
function xR(e, t) {
  const r = process.env;
  (process.env = Object.assign(Object.assign({}, r), t)),
    e(),
    (process.env = r);
}
function RR(...e) {
  const t = ["--format", "codeframe", ...e.filter(Boolean)],
    r = o("packages").filter(e => i(`packages/${e}/package.json`)),
    n = [];
  for (let e = 0, t = 40; e < r.length; e += t)
    r.length - e == 1
      ? n.push([`packages/${r[e]}/**/*`])
      : n.push([`packages/{${r.slice(e, e + t)}}/**/*`]);
  const s = ["eslint", "codemods", "scripts", "benchmark", "*.{js,cjs,mjs,ts}"];
  if ((n.push(s), process.env.ESLINT_GO_BRRRR))
    xR(() => TR(["eslint", "packages", ...s, ...t]), {
      BABEL_ENV: "test",
      NODE_OPTIONS: "--max-old-space-size=16384",
    });
  else {
    let e = null;
    for (const r of n)
      try {
        xR(() => TR(["eslint", ...r, ...t], void 0, void 0, !0), {
          BABEL_ENV: "test",
        });
      } catch (t) {
        e = t;
      }
    e && process.exit(e.exitCode);
  }
}
function AR(e, t, r) {
  const o = "./build/" + e.toLowerCase();
  bR.rm("-rf", o),
    OR("mkdir -p build"),
    s("build", { recursive: !0 }),
    IR("git", [
      "clone",
      "--filter=blob:none",
      "--sparse",
      "--single-branch",
      "--shallow-since='2 years ago'",
      t,
      o,
    ]),
    IR("git", ["sparse-checkout", "set", ...r], o),
    IR(
      "git",
      [
        "checkout",
        "-q",
        (function (e) {
          const t = n("./Makefile", "utf8").match(
            new RegExp(`${e}_COMMIT = (\\w{40})`)
          )[1];
          if (!t) throw new Error(`Could not find ${e}_COMMIT in Makefile`);
          return t;
        })(e),
      ],
      o
    );
}
function DR() {
  const e = JSON.parse(n("./package.json", "utf8")).version_babel8;
  return (
    wR.forEach(t => {
      o(t).forEach(o => {
        const s = `${t}/${o}/package.json`;
        if (i(s)) {
          const t = JSON.parse(n(s, "utf8"));
          t.peerDependencies?.["@babel/core"] &&
            (t.peerDependencies["@babel/core"] = `^${e}`);
          const i = t.conditions?.BABEL_8_BREAKING[0];
          i?.peerDependencies?.["@babel/core"] &&
            (i.peerDependencies["@babel/core"] = `^${e}`),
            "babel-eslint-plugin" === o &&
              (i.peerDependencies["@babel/eslint-parser"] = `^${e}`),
            r(s, JSON.stringify(t, null, 2) + "\n");
        }
      });
    }),
    xR(() => TR(["install"]), { YARN_ENABLE_IMMUTABLE_INSTALLS: !1 }),
    e
  );
}
(bR.config.verbose = !0),
  (vR["clean-all"] = function () {
    bR.rm("-rf", ["package-lock.json", ".changelog"]),
      wR.forEach(e => {
        bR.rm("-rf", `${e}/*/test/tmp`),
          bR.rm("-rf", `${e}/*/package-lock.json`);
      }),
      vR.clean(),
      vR["clean-lib"](),
      vR["clean-node-modules"]();
  }),
  (vR["clean-node-modules"] = function () {
    bR.rm("-rf", "node_modules"),
      wR.forEach(e => {
        bR.rm("-rf", `${e}/*/node_modules`);
      });
  }),
  (vR.clean = function () {
    vR["test-clean"](),
      bR.rm("-rf", [
        ".npmrc",
        "coverage",
        "packages/*/npm-debug*",
        "node_modules/.cache",
      ]);
  }),
  (vR["test-clean"] = function () {
    wR.forEach(e => {
      bR.rm("-rf", `${e}/*/test/tmp`),
        bR.rm("-rf", `${e}/*/test-fixtures.json`);
    });
  }),
  (vR["clean-lib"] = function () {
    bR.rm(
      "-rf",
      wR.map(e => `${e}/*/lib`)
    ),
      jR(["scripts/set-module-type.js"]);
  }),
  (vR["clean-runtime-helpers"] = function () {
    bR.rm("-rf", [
      "packages/babel-runtime/helpers/**/*.js",
      "packages/babel-runtime-corejs2/helpers/**/*.js",
      "packages/babel-runtime-corejs3/helpers/**/*.js",
      "packages/babel-runtime/helpers/**/*.mjs",
      "packages/babel-runtime-corejs2/helpers/**/*.mjs",
      "packages/babel-runtime-corejs3/helpers/**/*.mjs",
      "packages/babel-runtime-corejs2/core-js",
      "packages/babel-runtime-corejs3/core-js",
      "packages/babel-runtime-corejs3/core-js-stable",
    ]);
  }),
  (vR["use-cjs"] = function () {
    jR(["scripts/set-module-type.js", "commonjs"]), vR.bootstrap();
  }),
  (vR["use-esm"] = function () {
    jR(["scripts/set-module-type.js", "module"]), vR.bootstrap();
  }),
  (vR["bootstrap-only"] = function () {
    vR["clean-all"](), TR(["install"]);
  }),
  (vR.bootstrap = function () {
    vR["bootstrap-only"](), vR["generate-tsconfig"](), vR.build();
  }),
  (vR.build = function () {
    vR["build-no-bundle"](),
      "true" !== process.env.BABEL_COVERAGE && vR["build-standalone"]();
  }),
  (vR["build-standalone"] = function () {
    TR(["gulp", "build-babel-standalone"]);
  }),
  (vR["build-bundle"] = function () {
    vR.clean(),
      vR["clean-lib"](),
      jR(["scripts/set-module-type.js"]),
      TR(["gulp", "build"]),
      vR["build-dist"]();
  }),
  (vR["build-no-bundle"] = function () {
    vR.clean(),
      vR["clean-lib"](),
      jR(["scripts/set-module-type.js"]),
      xR(
        () => {
          TR(["gulp", "build-dev"]);
        },
        { BABEL_ENV: "development" }
      ),
      vR["build-dist"]();
  }),
  (vR["build-flow-typings"] = function () {
    r(
      "packages/babel-types/lib/index.js.flow",
      jR(["packages/babel-types/scripts/generators/flow.js"], void 0, !1)
    );
  }),
  (vR["build-dist"] = function () {
    vR["build-plugin-transform-runtime-dist"]();
  }),
  (vR["build-plugin-transform-runtime-dist"] = function () {
    jR(["scripts/build-dist.js"], "packages/babel-plugin-transform-runtime");
  }),
  (vR.prepublish = function () {
    process.env.BABEL_8_BREAKING
      ? jR(["scripts/set-module-type.js", "module"])
      : jR(["scripts/set-module-type.js", "commonjs"]),
      vR["bootstrap-only"](),
      xR(
        () => {
          vR["prepublish-build"](), vR.test();
        },
        { IS_PUBLISH: "true" }
      ),
      jR(["scripts/set-module-type.js", "clean"]);
  }),
  (vR["prepublish-build"] = function () {
    vR["clean-lib"](),
      vR["clean-runtime-helpers"](),
      jR(["scripts/generators/npm-ignore.js"]),
      xR(
        () => {
          vR["build-bundle"]();
        },
        {
          NODE_ENV: "production",
          BABEL_ENV: "production",
          STRIP_BABEL_8_FLAG: "true",
        }
      ),
      xR(
        () => {
          vR["prepublish-build-standalone"](),
            vR["clone-license"](),
            vR["prepublish-prepare-dts"](),
            vR["build-flow-typings"]();
        },
        { NODE_ENV: "production", STRIP_BABEL_8_FLAG: "true" }
      );
  }),
  (vR["prepublish-build-standalone"] = function () {
    xR(
      () => {
        vR["build-standalone"]();
      },
      { BABEL_ENV: "production", IS_PUBLISH: "true" }
    );
  }),
  (vR["prepublish-prepare-dts"] = function () {
    vR["clean-ts"](), vR.tscheck(), vR["prepublish-prepare-dts-no-clean"]();
  }),
  (vR["prepublish-prepare-dts-no-clean"] = function () {
    TR(["gulp", "bundle-dts"]),
      vR["build-typescript-legacy-typings"](),
      TR(["tsc", "-p", "tsconfig.dts-bundles.json"]);
  }),
  (vR.tscheck = function () {
    vR["generate-tsconfig"](),
      jR(["scripts/parallel-tsc/tsc.js", "."]),
      vR["tscheck-helpers"]();
  }),
  (vR["tscheck-helpers"] = function () {
    TR(["tsc", "-p", "./packages/babel-helpers/src/helpers/tsconfig.json"]);
  }),
  (vR["clean-ts"] = function () {
    bR.rm("-rf", "tsconfig.tsbuildinfo"),
      bR.rm("-rf", "*/*/tsconfig.tsbuildinfo"),
      bR.rm("-rf", "dts");
  }),
  (vR["generate-tsconfig"] = function () {
    jR(["scripts/generators/tsconfig.js"]),
      jR(["scripts/generators/archived-libs-typings.js"]);
  }),
  (vR["generate-type-helpers"] = function () {
    TR(["gulp", "generate-type-helpers"]);
  }),
  (vR["build-typescript-legacy-typings"] = function () {
    r(
      "packages/babel-types/lib/index-legacy.d.ts",
      jR(
        ["packages/babel-types/scripts/generators/typescript-legacy.js"],
        void 0,
        !1
      )
    );
  }),
  (vR["clone-license"] = function () {
    jR(["scripts/clone-license.js"]);
  }),
  (vR.lint = function () {
    xR(() => vR.tscheck(), { TSCHECK_SILENT: "true" }),
      RR(),
      vR["lint-prettier"]();
  }),
  (vR["lint-ci"] = function () {
    vR.tscheck(),
      RR(),
      vR["lint-prettier"](),
      vR["prepublish-prepare-dts-no-clean"]();
  }),
  (vR["lint-prettier"] = function () {
    TR(["prettier", ".", "--check"]);
  }),
  (vR.fix = function () {
    vR["fix-js"](), vR["fix-prettier"]();
  }),
  (vR["fix-js"] = function () {
    xR(() => vR.tscheck(), { TSCHECK_SILENT: "true" }), RR("--fix");
  }),
  (vR["fix-prettier"] = function () {
    TR(["prettier", ".", "--write"]);
  }),
  (vR.watch = function () {
    vR["build-no-bundle"](),
      xR(
        () => {
          TR(["gulp", "watch"]);
        },
        { BABEL_ENV: "development", WATCH_SKIP_BUILD: "true" }
      );
  }),
  (vR.test = function () {
    vR.lint(), vR["test-only"]();
  }),
  (vR["test-only"] = function (e = []) {
    TR(["jest", ...e]);
  }),
  (vR["test-cov"] = function () {
    vR.build(),
      xR(
        () => {
          TR(["c8", "jest"]);
        },
        { BABEL_ENV: "test", BABEL_COVERAGE: "true" }
      );
  }),
  (vR["bootstrap-test262"] = function () {
    AR("TEST262", "https://github.com/tc39/test262.git", ["test", "harness"]);
  }),
  (vR["bootstrap-typescript"] = function () {
    AR("TYPESCRIPT", "https://github.com/microsoft/TypeScript.git", ["tests"]);
  }),
  (vR["bootstrap-flow"] = function () {
    AR("FLOW", "https://github.com/facebook/flow.git", [
      "src/parser/test/flow",
    ]);
  }),
  (vR["new-version-checklist"] = function () {}),
  (vR["new-version"] = function () {
    vR["new-version-checklist"](),
      IR("git", ["pull", "--rebase"]),
      TR(["release-tool", "version", "-f", "@babel/standalone"]);
  }),
  (vR["new-babel-8-version"] = function () {
    IR("git", ["pull", "--rebase"]);
    const e = JSON.parse(n("./package.json", "utf8")),
      t = vf.inc(e.version_babel8, "prerelease");
    return (
      (e.version_babel8 = t),
      r("./package.json", JSON.stringify(e, null, 2) + "\n"),
      IR("git", ["add", "./package.json"]),
      IR("git", ["commit", "-m", "Bump Babel 8 version to " + t]),
      IR("git", ["tag", `v${t}`, "-m", `v${t}`]),
      t
    );
  }),
  (vR["new-babel-8-version-create-commit-ci"] = function () {
    TR([
      "release-tool",
      "version",
      DR(),
      "--all",
      "--tag-version-prefix",
      "tmp.v",
      "--yes",
    ]);
  }),
  (vR["new-babel-8-version-create-commit"] = function () {
    const e = DR();
    IR("git", ["checkout", "-b", `release/temp/v${e}`]),
      TR([
        "release-tool",
        "version",
        e,
        "--all",
        "--tag-version-prefix",
        "tmp.v",
      ]),
      console.log(
        "Run `BABEL_8_BREAKING=true make publish` to finish publishing"
      );
  });
