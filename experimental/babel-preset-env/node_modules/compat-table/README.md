ECMAScript compatibility tables
==================================================

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/kangax/compat-table?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/kangax/es5-compat-table/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

Editing the tests
-----------------

Edit the `data-es5.js`, `data-es6.js`, `data-esnext.js`, or `data-non-standard.js` files to adjust the tests and their recorded browser results. Run `node build.js` to build the HTML files from these JavaScript sources.

The ES6 tests themselves should be written in pure ES3, *except* for the sole ES6 feature being tested (as well as any ES5 features strictly required to use the ES6 feature). ES Next tests may use any ES5 features that they wish, and only the ES6 features strictly required to use the ES Next feature.

The test code is placed in multi-line comments (as in [this hack](http://tomasz.janczuk.org/2013/05/multi-line-strings-in-javascript-and.html)), so that Node.js can parse the data scripts without throwing syntax errors when encountering features it does not support. The `build.js` script will wrap the code in an `eval` call inside a `try`, so the tests themselves do not need to catch errors that non-supporting platforms may throw.

Most tests have a `significance` rating, which affects how a platform's total support percentage is calculated. A test rated `"large"` (representing a landmark, transformative feature) is worth 1, one rated `"medium"` (representing a significant feature that's less universally useful, or is primarily connected to another feature) is worth 0.5, and one rated `"small"` (representing a useful but subtle improvement from the previous spec) is worth 0.25. `"tiny"` (0.125) should be reserved for very meager changes (such as changes to an existing function's parameters or side-effects) that nonetheless don't fall under the category of another feature.

In order to test compilers
-----------------

Run `npm install` to install the compilers under test (and remember to `npm update` them frequently).
Then run `node build.js compilers` to create compiler test pages under `es6/compilers`. Currently only the ES6 tests produce compiler test pages.
Open the compilers' HTML files in a browser with close to zero native ES6 support, such as Internet Explorer 9 (although its lack of support for strict mode will cause some tests to fail), Opera 12, or Safari 5.1 (bearing in mind their native support for TypedArrays, `__proto__` and such).

Note that some tests cannot be compiled correctly, as they rely on runtime `eval()` results to ensure that, for instance, certain syntactic constructs are syntax errors. These will fail on the compiler test pages. Support for those features should be divined manually.

In order to test Node.js
-----------------

After installing dependencies using `npm install`, first compile a fresh ES6 HTML file using `node build.js`.

Then, run `node .`, where `node` is the executable you wish to test, along with any desired flags (such as `--es-staging`). The results should be printed in colour in stdout: <span style='background:black;color:forestgreen'>green</span> results indicate correct support, <span style='background:black;color:aqua'>cyan</span> results indicate support that incorrectly requires strict mode, and <span style='background:black;color:crimson'>red</span> indicates no support.

Note that this script is currently hard-coded to only display ES6 results.
