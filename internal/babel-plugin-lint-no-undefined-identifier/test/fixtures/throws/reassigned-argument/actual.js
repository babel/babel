function func({ types: t }) {
  return {
    visitor: {
      Foo() {
        const foo = "undefined";
        t.identifier(foo);
      },
    },
  };
}
