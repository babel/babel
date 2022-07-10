const m = module { export const foo = "foo" };
module {
  foo;
  bar;
};
foo(module {});
