function test(foo) {
  var _foo$bar, _foo$get, _foo$bar2, _foo$bar3, _foo$bar$baz, _foo$bar4, _foo$bar$baz2, _foo$bar5, _foo$bar6, _foo$bar7, _foo$bar8, _foo$bar9, _foo$bar0, _foo$bar0$baz, _foo$bar1, _foo$bar1$baz;
  foo == null || foo.bar;
  foo == null || (_foo$bar = foo.bar) == null || _foo$bar.baz;
  foo == null || foo(foo);
  foo == null || foo.bar();
  (_foo$get = foo.get(bar)) == null || _foo$get();
  (_foo$bar2 = foo.bar()) == null || _foo$bar2();
  (_foo$bar3 = foo[bar]()) == null || _foo$bar3();
  (_foo$bar$baz = (_foo$bar4 = foo.bar()).baz) == null || _foo$bar$baz.call(_foo$bar4);
  (_foo$bar$baz2 = (_foo$bar5 = foo[bar]()).baz) == null || _foo$bar$baz2.call(_foo$bar5);
  (_foo$bar6 = foo.bar) == null || _foo$bar6.call(foo, foo.bar, false);
  foo == null || (_foo$bar7 = foo.bar) == null || _foo$bar7.call(foo, foo.bar, true);
  (_foo$bar8 = foo.bar) == null || _foo$bar8.baz(foo.bar, false);
  foo == null || (_foo$bar9 = foo.bar) == null || _foo$bar9.baz(foo.bar, true);
  (_foo$bar0 = foo.bar) == null || (_foo$bar0$baz = _foo$bar0.baz) == null || _foo$bar0$baz.call(_foo$bar0, foo.bar, false);
  foo == null || (_foo$bar1 = foo.bar) == null || (_foo$bar1$baz = _foo$bar1.baz) == null || _foo$bar1$baz.call(_foo$bar1, foo.bar, true);
}
