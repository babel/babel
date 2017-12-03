# string-at <sup>[![Version Badge][2]][1]</sup>

[![Build Status][3]][4]
[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

[![browser support][9]][10]

A robust & optimized ES3-compatible polyfill for [the `String.prototype.at` proposal for ECMAScript 6/7](http://esdiscuss.org/topic/string-prototype-symbolat-improved-string-prototype-charat).

This code is almost entirely copied from @mathiasbynens's excellent polyfill at https://mths.be/at - I created this one so that it did not automatically modify `String.prototype`, and so that it would fit in more neatly with the `es7-shim`.

Use it as a standalone function, or call its `shim` method to install it as a polyfill.

## Example

```js
var at = require('string-at');
var assert = require('assert');

var surrogatePair = '\uD834\uDF06 abc'; // a surrogate pair
assert(surrogatePair.length === 6);
assert(at(surrogatePair, 0) === '\uD834\uDF06');
assert(at(surrogatePair, 1) === '\uDF06');

var i = 0;
var str = '';
while (str.length < surrogatePair.length) {
	str += at(surrogatePair, str.length);
	i += 1;
}
assert(str === surrogatePair);
assert(i === 4); // 4 code points
assert(str.length === 6); // 6 "characters"

at.shim();
assert(surrogatePair.at(0) === at(surrogatePair, 0));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[1]: https://npmjs.org/package/string-at
[2]: http://vb.teelaun.ch/ljharb/string-at.svg
[3]: https://travis-ci.org/ljharb/string-at.svg
[4]: https://travis-ci.org/ljharb/string-at
[5]: https://david-dm.org/ljharb/string-at.svg
[6]: https://david-dm.org/ljharb/string-at
[7]: https://david-dm.org/ljharb/string-at/dev-status.svg
[8]: https://david-dm.org/ljharb/string-at#info=devDependencies
[9]: https://ci.testling.com/ljharb/string-at.png
[10]: https://ci.testling.com/ljharb/string-at
[11]: https://nodei.co/npm/string-at.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/string-at.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/string-at.svg
[downloads-url]: http://npm-stat.com/charts.html?package=string-at
