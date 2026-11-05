const m = module { export const foo = "foo" };
const m2 = module {
  foo;
  bar;
};
foo(module {});
