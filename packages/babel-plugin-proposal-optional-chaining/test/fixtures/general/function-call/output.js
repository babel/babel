var _foo, _foo2, _foo$bar, _foo3, _foo3$bar, _foo4, _foo5, _foo6, _foo$bar2, _foo$bar3, _foo$bar3$call, _foo7, _foo7$bar, _foo8, _foo8$bar, _foo8$bar$call;

(_foo = foo) === null || _foo === void 0 ? void 0 : _foo(foo);
(_foo2 = foo) === null || _foo2 === void 0 ? void 0 : _foo2.bar();
(_foo$bar = foo.bar) === null || _foo$bar === void 0 ? void 0 : _foo$bar.call(foo, foo.bar, false);
(_foo3 = foo) === null || _foo3 === void 0 ? void 0 : (_foo3$bar = _foo3.bar) === null || _foo3$bar === void 0 ? void 0 : _foo3$bar.call(_foo3, foo.bar, true);
(_foo4 = foo) === null || _foo4 === void 0 ? void 0 : _foo4().bar;
(_foo5 = foo) === null || _foo5 === void 0 ? void 0 : (_foo6 = _foo5()) === null || _foo6 === void 0 ? void 0 : _foo6.bar;
(_foo$bar2 = foo.bar) === null || _foo$bar2 === void 0 ? void 0 : _foo$bar2.call(foo).baz;
(_foo$bar3 = foo.bar) === null || _foo$bar3 === void 0 ? void 0 : (_foo$bar3$call = _foo$bar3.call(foo)) === null || _foo$bar3$call === void 0 ? void 0 : _foo$bar3$call.baz;
(_foo7 = foo) === null || _foo7 === void 0 ? void 0 : (_foo7$bar = _foo7.bar) === null || _foo7$bar === void 0 ? void 0 : _foo7$bar.call(_foo7).baz;
(_foo8 = foo) === null || _foo8 === void 0 ? void 0 : (_foo8$bar = _foo8.bar) === null || _foo8$bar === void 0 ? void 0 : (_foo8$bar$call = _foo8$bar.call(_foo8)) === null || _foo8$bar$call === void 0 ? void 0 : _foo8$bar$call.baz;
