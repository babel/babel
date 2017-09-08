function func({ types: t }) {
  return {
    visitor: {
      Foo() {
        t.identifier("undefined");
      },
    },
  };
}
