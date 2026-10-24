let n = 1;
const key = {
  valueOf() {
    n = 2;
    return 0;
  }
};
const _ref = [undefined, n],
  _ref$ = _ref[0],
  a = _ref$ === void 0 ? +key : _ref$,
  b = _ref[1];
