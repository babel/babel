function f(a = (_x => (_x = x) == null ? void 0 : _x.y)()) {}
function g({
  a,
  b = a == null ? void 0 : a.c
}) {}
function h(a, {
  b = (_a$b => (_a$b = a.b) == null || (_a$b = _a$b.c) == null ? void 0 : _a$b.d.e)()
}) {}
function i(a, {
  b = (_a$b2 => (_a$b2 = a.b) == null || (_a$b2 = _a$b2.c) == null ? void 0 : _a$b2.d)().e
}) {}
function j(a, {
  b = (_a$b3 => a == null || (_a$b3 = a.b) == null ? void 0 : _a$b3.c().d.e)()
}) {}
