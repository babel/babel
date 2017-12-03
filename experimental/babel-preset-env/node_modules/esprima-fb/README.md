**Esprima** ([esprima.org](http://esprima.org), BSD license) is a high performance,
standard-compliant [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
parser written in ECMAScript (also popularly known as
[JavaScript](http://en.wikipedia.org/wiki/JavaScript>JavaScript)).
Esprima is created and maintained by [Ariya Hidayat](http://twitter.com/ariyahidayat),
with the help of [many contributors](https://github.com/ariya/esprima/contributors).

**Esprima-FB** is a fork of the [Harmony branch](https://github.com/ariya/esprima/tree/harmony) of Esprima that implements [JSX specification](https://github.com/facebook/jsx) on top of ECMAScript syntax.

### Features

- Full support for ECMAScript 5.1 ([ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm))
- Experimental support for ES6/Harmony (module, class, destructuring, ...)
- Full support for [JSX syntax extensions](https://github.com/facebook/jsx).
- Sensible [syntax tree format](https://github.com/facebook/jsx/blob/master/AST.md) compatible with Mozilla
[Parser AST](https://developer.mozilla.org/en/SpiderMonkey/Parser_API)
- Optional tracking of syntax node location (index-based and line-column)
- Heavily tested (> 650 [unit tests](http://esprima.org/test/) with [full code coverage](http://esprima.org/test/coverage.html))
- Ongoing support for ES6/Harmony (module, class, destructuring, ...)

### Versioning rules

In order to follow semver rules and keep reference to original Esprima versions at the same time, we left 3 digits of each version part to refer to upstream harmony branch. We then take the most significant digit.

**Example:** 4001.3001.0000-dev-harmony-fb aligns with 1.1.0-dev-harmony (aka 001.001.000-dev-harmony) in upstream, with our own changes on top.

Esprima-FB serves as a **building block** for JSX language tools and transpiler implementations (such as [React](https://github.com/facebook/react) or [JSXDOM](https://github.com/vjeux/jsxdom)).

Esprima-FB runs on many popular web browsers, as well as other ECMAScript platforms such as
[Rhino](http://www.mozilla.org/rhino) and [Node.js](https://npmjs.org/package/esprima).

For more information on original Esprima, check the web site [esprima.org](http://esprima.org).
