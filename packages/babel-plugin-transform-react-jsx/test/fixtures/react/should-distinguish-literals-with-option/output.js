/** @jsxLit React.literal */
function f(str) {
  return [React.createElement("a", {
    href: React.literal("javascript:go()", "a[href]"),
    valueless: true
  }, React.literal("Text", "#text")), // TODO: Should we handle these cases?  Is this an idiom for avoiding HTML decoding?
  React.createElement("a", {
    href: "javascript:go() // in brackets"
  }, "Text in brackets"), React.createElement("a", babelHelpers.extends({
    href: str
  }, {
    spreaded: ""
  }), str), React.createElement("a", {
    href: `${str}`
  }, React.literal("Back ticks with an interpolation", "#text"))];
}
