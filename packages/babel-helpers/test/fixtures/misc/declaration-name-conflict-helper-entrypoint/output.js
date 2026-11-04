function __set(r, f, o, i) { return __set = "undefined" != typeof Reflect && Reflect.set ? Reflect.set : function (r, f, o, i) { var n, p = _superPropBase(r, f); if (p) { if ((n = Object.getOwnPropertyDescriptor(p, f)).set) return n.set.call(i, o), !0; if (!n.writable) return !1; } if (n = Object.getOwnPropertyDescriptor(i, f)) { if (!n.writable) return !1; n.value = o, Object.defineProperty(i, f, n); } else _defineProperty(i, f, o); return !0; }, __set(r, f, o, i); }
function _set(e, t, r, f, o) { if (!__set(e, t, r, f || e) && o) throw new TypeError("failed to set property"); return r; }
function _defineProperty(r, t, o) { return (t = _toPropertyKey(t)) in r ? Object.defineProperty(r, t, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : r[t] = o, r; }
function _toPropertyKey(r) { var o = _toPrimitive(r, "string"); return "symbol" == typeof o ? o : o + ""; }
function _toPrimitive(t, e) { if ("object" != typeof t || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _superPropBase(o, t) { for (; !{}.hasOwnProperty.call(o, t) && null !== (o = _getPrototypeOf(o));); return o; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
// We'll add the helper `set`. It needs to be renamed to `_set` to avoid
// conflicting with the variable name `set` in this file.
// However, the `set` helper declares a `_set` function itself, which will
// need to be renamed to avoid conflicts.

let set;
