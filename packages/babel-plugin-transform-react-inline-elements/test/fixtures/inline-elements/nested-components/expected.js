babelHelpers.createRawReactElement(Foo, null, babelHelpers.defaultProps(Foo.defaultProps, {
  className: "foo",
  children: [bar, babelHelpers.createRawReactElement(Baz, "baz", Baz.defaultProps)]
}));