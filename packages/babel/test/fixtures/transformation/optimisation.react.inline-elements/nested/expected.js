"use strict";

({
  $$typeof: babelHelpers.typeofReactElement,
  type: "div",
  key: null,
  ref: null,
  props: {
    className: "foo",
    children: [bar, {
      $$typeof: babelHelpers.typeofReactElement,
      type: Baz,
      key: "baz",
      ref: null,
      props: babelHelpers.defaultProps(Baz.defaultProps, {}),
      _owner: null
    }]
  },
  _owner: null
});
