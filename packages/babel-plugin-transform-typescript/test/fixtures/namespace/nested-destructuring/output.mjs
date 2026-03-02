class C {}
let N;
(function (_N) {
  const {
    a
  } = C;
  _N.a = a;
  const [{
      a: [{
        b: c
      }]
    }] = A,
    {
      a: {
        b: {
          d = 1
        }
      } = {},
      ...e
    } = C;
  _N.e = e, _N.c = c, _N.d = d;
})(N || (N = {}));
