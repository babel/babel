foo == null || foo(foo);
foo == null || foo.bar();
foo.bar == null || foo.bar(foo.bar, false);
foo == null || foo.bar == null ? void 0 : foo.bar(foo.bar, true);
