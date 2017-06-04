function test(foo) {
  var _foo$bar, _foo$bar2, _foo, _foo$bar3, _foo2, _foo$bar4, _foo$bar5, _foo$bar6, _foo$bar6$baz, _foo$bar7, _foo$bar8, _foo$bar8$baz, _foo$bar9;

  foo == null ? void 0 : foo.bar;

  foo == null ? void 0 : (_foo$bar = foo.bar) == null ? void 0 : _foo$bar.baz;

  foo == null ? void 0 : foo(foo);

  foo == null ? void 0 : foo.bar();

  (_foo$bar2 = (_foo = foo).bar) == null ? void 0 : _foo$bar2.call(_foo, foo.bar, false);

  foo == null ? void 0 : (_foo$bar3 = (_foo2 = foo).bar) == null ? void 0 : _foo$bar3.call(_foo2, foo.bar, true);

  (_foo$bar4 = foo.bar) == null ? void 0 : _foo$bar4.baz(foo.bar, false);

  foo == null ? void 0 : (_foo$bar5 = foo.bar) == null ? void 0 : _foo$bar5.baz(foo.bar, true);

  (_foo$bar6 = foo.bar) == null ? void 0 : (_foo$bar6$baz = (_foo$bar7 = _foo$bar6).baz) == null ? void 0 : _foo$bar6$baz.call(_foo$bar7, foo.bar, false);

  foo == null ? void 0 : (_foo$bar8 = foo.bar) == null ? void 0 : (_foo$bar8$baz = (_foo$bar9 = _foo$bar8).baz) == null ? void 0 : _foo$bar8$baz.call(_foo$bar9, foo.bar, true);
}