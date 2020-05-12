var _foo, _foo2, _foo2$bar, _foo3, _foo3$bar, _foo4, _foo4$bar$baz, _foo4$bar;

((_foo = foo) === null || _foo === void 0 ? void 0 : _foo.bar.bind(_foo))();
(_foo2 = foo) === null || _foo2 === void 0 ? void 0 : (_foo2$bar = _foo2.bar) === null || _foo2$bar === void 0 ? void 0 : _foo2$bar.call(_foo2);
((_foo3 = foo) === null || _foo3 === void 0 ? void 0 : (_foo3$bar = _foo3.bar).baz.bind(_foo3$bar))();
(_foo4 = foo) === null || _foo4 === void 0 ? void 0 : (_foo4$bar$baz = (_foo4$bar = _foo4.bar).baz) === null || _foo4$bar$baz === void 0 ? void 0 : _foo4$bar$baz.call(_foo4$bar);
