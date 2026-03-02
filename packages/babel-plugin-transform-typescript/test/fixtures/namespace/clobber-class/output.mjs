class A {}
(function (_A) {
  const B = _A.B = 1;
})(A || (A = {}));
