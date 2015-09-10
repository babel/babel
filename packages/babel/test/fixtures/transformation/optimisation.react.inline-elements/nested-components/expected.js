"use strict";

({
  $$typeof: babelHelpers.typeofReactElement,
  type: Foo,
  ref: null,
  props: babelHelpers.defaultProps(Foo.defaultProps, {
    children: [bar, {
      $$typeof: babelHelpers.typeofReactElement,
      type: Baz,
      ref: null,
      props: babelHelpers.defaultProps(Baz.defaultProps, {}),
      key: "baz"
    }],
    className: "foo"
  }),
  key: null
});