import { jsx as _jsx } from "react/jsx-runtime";

var x = _jsx("div", {
  /* a multi-line
     comment */
  attr1: "foo",
  children: _jsx("span", {
    // a double-slash comment
    attr2: "bar"
  })
});
