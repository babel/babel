"use strict";

({
  $$typeof: babelHelpers.typeofReactElement,
  type: Foo,
  key: null,
  ref: null,
  props: babelHelpers.defaultProps(Foo.defaultProps, {
    className: "foo",
    children: [bar, {
      $$typeof: babelHelpers.typeofReactElement,
      type: Baz,
      key: "baz",
      ref: null,
      props: babelHelpers.defaultProps(Baz.defaultProps, {}),
      _owner: null
    }]
  }),
  _owner: null
});
