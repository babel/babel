// This mapping represents browsers who have shipped ES Modules Support.
// For more information, checkout the specifications:
// * https://www.ecma-international.org/ecma-262/6.0/#sec-modules
// * https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type

// TODO Before Merging, obtain this information using [caniuse](https://github.com/Fyrd/caniuse)
module.exports = [
  "chrome 61",
  "safari 10.1",
  "ios_saf 10.3",
  "edge 16"
].join(', ');