"use strict";

({
  $$typeof: babelHelpers.typeofReactElement,
  type: Foo,
  key: null,
  ref: null,
  props: babelHelpers.defaultProps(Foo.defaultProps, {
    children: [bar, {
      $$typeof: babelHelpers.typeofReactElement,
      type: Baz,
      key: "baz",
      ref: null,
      props: babelHelpers.defaultProps(Baz.defaultProps, {}),
      _owner: null
    }],
    className: "foo"
  }),
  _owner: null
});