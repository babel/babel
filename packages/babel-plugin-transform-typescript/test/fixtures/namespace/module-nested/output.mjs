let src;
(function (_src) {
  let ns1;
  (function (_ns) {
    class foo {
      F1 = "";
    }
    _ns.foo = foo;
  })(ns1 || (ns1 = _src.ns1 || (_src.ns1 = {})));
  let ns2;
  (function (_ns2) {
    class foo {
      F1 = "";
    }
    _ns2.foo = foo;
  })(ns2 || (ns2 = _src.ns2 || (_src.ns2 = {})));
})(src || (src = {}));
