function func({ types: t }) {
  return {
    visitor: {
      Foo() {
        const foo = t.identifier;
        const bar = "undefined";
        foo(bar);
      },
    },
  };
}
