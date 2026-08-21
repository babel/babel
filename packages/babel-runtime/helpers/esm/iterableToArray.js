function _iterableToArray(r) {
  var e = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (Array.isArray(r) && (null == e || e === ("undefined" != typeof Symbol && Array.prototype[Symbol.iterator]))) return r;
  if (null != e) {
    for (var t, o = [], a = e.call(r); !(t = a.next()).done;) o.push(t.value);
    return o;
  }
}
export { _iterableToArray as default };