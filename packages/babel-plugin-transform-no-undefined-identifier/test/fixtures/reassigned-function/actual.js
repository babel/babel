function func({ types: t }) {
  return {
    visitor: {
      Foo() {
        const foo = t.identifier;
        foo("undefined");
      },
    },
  };
}
