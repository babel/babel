var _foo, _foo2, _foo$bar, _foo3, _foo4, _foo4$bar, _foo5, _foo6, _foo7, _foo8, _foo$bar2, _foo9, _foo$bar3, _foo10, _foo$bar3$call, _foo11, _foo11$bar, _foo12, _foo13, _foo13$bar, _foo14, _foo13$bar$call;

(_foo = foo) === null || _foo === void 0 ? void 0 : _foo(foo);
(_foo2 = foo) === null || _foo2 === void 0 ? void 0 : _foo2.bar();
(_foo$bar = (_foo3 = foo).bar) === null || _foo$bar === void 0 ? void 0 : _foo$bar.call(_foo3, foo.bar, false);
(_foo4 = foo) === null || _foo4 === void 0 ? void 0 : (_foo4$bar = (_foo5 = _foo4).bar) === null || _foo4$bar === void 0 ? void 0 : _foo4$bar.call(_foo5, foo.bar, true);
(_foo6 = foo) === null || _foo6 === void 0 ? void 0 : _foo6().bar;
(_foo7 = foo) === null || _foo7 === void 0 ? void 0 : (_foo8 = _foo7()) === null || _foo8 === void 0 ? void 0 : _foo8.bar;
(_foo$bar2 = (_foo9 = foo).bar) === null || _foo$bar2 === void 0 ? void 0 : _foo$bar2.call(_foo9).baz;
(_foo$bar3 = (_foo10 = foo).bar) === null || _foo$bar3 === void 0 ? void 0 : (_foo$bar3$call = _foo$bar3.call(_foo10)) === null || _foo$bar3$call === void 0 ? void 0 : _foo$bar3$call.baz;
(_foo11 = foo) === null || _foo11 === void 0 ? void 0 : (_foo11$bar = (_foo12 = _foo11).bar) === null || _foo11$bar === void 0 ? void 0 : _foo11$bar.call(_foo12).baz;
(_foo13 = foo) === null || _foo13 === void 0 ? void 0 : (_foo13$bar = (_foo14 = _foo13).bar) === null || _foo13$bar === void 0 ? void 0 : (_foo13$bar$call = _foo13$bar.call(_foo14)) === null || _foo13$bar$call === void 0 ? void 0 : _foo13$bar$call.baz;
