"use strict";

({
  type: Foo,
  ref: null,
  props: babelHelpers.defaultProps(Foo.defaultProps, {
    children: [bar, {
      type: Baz,
      ref: null,
      props: babelHelpers.defaultProps(Baz.defaultProps, {}),
      key: "baz"
    }],
    className: "foo"
  }),
  key: null
});
