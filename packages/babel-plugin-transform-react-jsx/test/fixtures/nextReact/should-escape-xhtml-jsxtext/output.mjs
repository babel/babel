import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

_jsx("div", {
  children: "wow"
});

_jsx("div", {
  children: "w\xF4w"
});

_jsx("div", {
  children: "w & w"
});

_jsx("div", {
  children: "w & w"
});

_jsx("div", {
  children: "w \xA0 w"
});

_jsx("div", {
  children: "this should not parse as unicode: \\u00a0"
});

_jsx("div", {
  children: "this should parse as nbsp: \xA0 "
});

_jsxs("div", {
  children: ["this should parse as unicode: ", '\u00a0 ']
});

_jsx("div", {
  children: "w < w"
});
