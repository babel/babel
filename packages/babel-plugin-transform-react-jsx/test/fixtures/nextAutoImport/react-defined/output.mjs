import { createElement as _createElement } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import * as react from "react";
var y = react.createElement("div", {
  foo: 1
});

var x = _jsxs("div", {
  children: [_jsx("div", {}, "1"), _jsx("div", {
    meow: "wolf"
  }, "2"), _jsx("div", {}, "3"), _createElement("div", { ...props,
    key: "4"
  })]
});
