import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

/*#__PURE__*/
_jsx("div", {
  children: "wow"
});

/*#__PURE__*/
_jsx("div", {
  children: "w\xF4w"
});

/*#__PURE__*/
_jsx("div", {
  children: "w & w"
});

/*#__PURE__*/
_jsx("div", {
  children: "w & w"
});

/*#__PURE__*/
_jsx("div", {
  children: "w \xA0 w"
});

/*#__PURE__*/
_jsx("div", {
  children: "this should not parse as unicode: \\u00a0"
});

/*#__PURE__*/
_jsx("div", {
  children: "this should parse as nbsp: \xA0 "
});

/*#__PURE__*/
_jsxs("div", {
  children: ["this should parse as unicode: ", '\u00a0 ']
});

/*#__PURE__*/
_jsx("div", {
  children: "w < w"
});
