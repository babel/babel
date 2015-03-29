"use strict";

({
  type: Foo,
  ref: null,
  children: [bar, {
    type: Baz,
    ref: null,
    props: babelHelpers.defaultProps(Baz.defaultProps, {}),
    key: "baz"
  }],
  props: babelHelpers.defaultProps(Foo.defaultProps, {
    className: "foo"
  }),
  key: null
});
