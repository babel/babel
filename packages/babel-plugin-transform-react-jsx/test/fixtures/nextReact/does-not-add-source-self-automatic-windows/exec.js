var actual = transform(
  `var x = (
    <>
    <div>
        <div key="1" />
        <div key="2" meow="wolf" />
        <div key="3" />
        <div {...props} key="4" />
    </div>
    </>
  );`,
  Object.assign({}, opts, { filename: 'C:\\fake\\path\\mock.js' })
).code;

var expected = 
`import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var _jsxFileName = "C:\\\\fake\\\\path\\\\mock.js";

var x = _jsx(_Fragment, {
  children: _jsxs("div", {
    children: [_jsx("div", {}, "1"), _jsx("div", {
      meow: "wolf"
    }, "2"), _jsx("div", {}, "3"), _createElement("div", { ...props,
      key: "4"
    })]
  })
});`;

expect(actual).toBe(expected);
