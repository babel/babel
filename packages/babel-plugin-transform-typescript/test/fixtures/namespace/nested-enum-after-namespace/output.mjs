let Outer;
(function (_Outer) {
  let N;
  (function (_N) {
    const a = _N.a = 2;
  })(N || (N = _Outer.N || (_Outer.N = {})));
  N = /*#__PURE__*/function (N) {
    N[N["A"] = 1] = "A";
    return N;
  }(N || {});
  _Outer.N = N;
})(Outer || (Outer = {}));
