var _a3, _a3$b, _a4, _a4$b, _a5, _a5$b;

if (a && a.b && a.b.c) {
  var _a, _a$b;

  console.log((_a = a) == null ? void 0 : (_a$b = _a.b) == null ? void 0 : _a$b.c);
} else if (a && a.b.c && a.b.c.d && a.b.c.d.e.f) {
  var _a2, _a2$b$c, _a2$b$c$d;

  console.log((_a2 = a) == null ? void 0 : (_a2$b$c = _a2.b.c) == null ? void 0 : (_a2$b$c$d = _a2$b$c.d) == null ? void 0 : _a2$b$c$d.e.f);
}

if (((_a3 = a) == null ? void 0 : (_a3$b = _a3.b) == null ? void 0 : _a3$b.c) === 'foobar') {}

if ((_a4 = a) == null ? void 0 : (_a4$b = _a4.b()) == null ? void 0 : _a4$b.c) {}

if ((_a5 = a) == null ? void 0 : _a5.b == null ? void 0 : (_a5$b = _a5.b()) == null ? void 0 : _a5$b.c) {}
