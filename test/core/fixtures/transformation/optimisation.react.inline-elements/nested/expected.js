"use strict";

({
  type: "div",
  ref: null,
  children: [bar, {
    type: Baz,
    ref: null,
    props: babelHelpers.defaultProps(Baz.defaultProps, {}),
    key: "baz"
  }],
  props: {
    className: "foo"
  },
  key: null
});