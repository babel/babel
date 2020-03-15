function test(foo) {
  var _foo$bar, _foo$get, _foo$bar2, _foo$bar3, _foo$bar$baz, _foo$bar$baz2, _foo$bar4, _foo$bar5, _foo$bar6, _foo$bar7;

  foo == null ? void 0 : foo.bar;
  foo == null ? void 0 : (_foo$bar = foo.bar) == null ? void 0 : _foo$bar.baz;
  foo == null ? void 0 : foo(foo);
  foo == null ? void 0 : foo.bar();
  (_foo$get = foo.get(bar)) == null ? void 0 : _foo$get();
  (_foo$bar2 = foo.bar()) == null ? void 0 : _foo$bar2();
  (_foo$bar3 = foo[bar]()) == null ? void 0 : _foo$bar3();
  (_foo$bar$baz = foo.bar().baz) == null ? void 0 : _foo$bar$baz();
  (_foo$bar$baz2 = foo[bar]().baz) == null ? void 0 : _foo$bar$baz2();
  foo.bar == null ? void 0 : foo.bar(foo.bar, false);
  foo == null ? void 0 : foo.bar == null ? void 0 : foo.bar(foo.bar, true);
  (_foo$bar4 = foo.bar) == null ? void 0 : _foo$bar4.baz(foo.bar, false);
  foo == null ? void 0 : (_foo$bar5 = foo.bar) == null ? void 0 : _foo$bar5.baz(foo.bar, true);
  (_foo$bar6 = foo.bar) == null ? void 0 : _foo$bar6.baz == null ? void 0 : _foo$bar6.baz(foo.bar, false);
  foo == null ? void 0 : (_foo$bar7 = foo.bar) == null ? void 0 : _foo$bar7.baz == null ? void 0 : _foo$bar7.baz(foo.bar, true);
}
