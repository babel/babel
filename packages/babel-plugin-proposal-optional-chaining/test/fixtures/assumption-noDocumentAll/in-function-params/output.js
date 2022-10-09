function f(a = (() => {
  var _x;
  return (_x = x) == null ? void 0 : _x.y;
})()) {}
function g({
  a,
  b = a == null ? void 0 : a.c
}) {}
function h(a, {
  b = (() => {
    var _a$b, _a$b$c;
    return (_a$b = a.b) == null ? void 0 : (_a$b$c = _a$b.c) == null ? void 0 : _a$b$c.d.e;
  })()
}) {}
function i(a, {
  b = (() => {
    var _a$b2, _a$b2$c;
    return (_a$b2 = a.b) == null ? void 0 : (_a$b2$c = _a$b2.c) == null ? void 0 : _a$b2$c.d;
  })().e
}) {}
function j(a, {
  b = (() => {
    var _a$b3;
    return a == null ? void 0 : (_a$b3 = a.b) == null ? void 0 : _a$b3.c().d.e;
  })()
}) {}
