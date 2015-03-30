"use strict";

({
  type: "div",
  ref: null,
  props: {
    children: [bar, {
      type: Baz,
      ref: null,
      props: babelHelpers.defaultProps(Baz.defaultProps, {}),
      key: "baz"
    }],
    className: "foo"
  },
  key: null
});
