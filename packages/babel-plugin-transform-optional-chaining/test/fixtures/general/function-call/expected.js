var _foo, _foo2, _foo$bar, _foo3, _foo$bar2, _foo4, _foo5;

(_foo = foo) == null ? void 0 : _foo(foo);

(_foo2 = foo) == null ? void 0 : _foo2.bar();

(_foo$bar = (_foo3 = foo).bar) == null ? void 0 : _foo$bar.call(_foo3, foo.bar, false);

(_foo5 = _foo4 = foo) == null ? void 0 : (_foo$bar2 = _foo5.bar) == null ? void 0 : _foo$bar2.call(_foo4, foo.bar, true);