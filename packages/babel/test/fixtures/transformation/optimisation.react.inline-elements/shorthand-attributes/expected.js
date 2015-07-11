"use strict";

({
  type: Foo,
  ref: null,
  props: babelHelpers.defaultProps(Foo.defaultProps, {
    bar: true
  }),
  key: null
});
