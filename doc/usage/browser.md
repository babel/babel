---
layout: docs
title: Browser
description: How to transpile in the browser.
permalink: /docs/usage/browser/
redirect_from: /browser.html
---

<p class="lead">
  A browser version of 6to5 is available from `browser.js` inside the 6to5
  directory in an npm release.
</p>

<blockquote class="to5-callout to5-callout-warning">
  <h4>Not intended for serious use</h4>
  <p>
    Compiling in the browser has a fairly limited use case, so if you are
    working on a production site you should be precompiling your scripts
    server-side. See <a href="../setup/#build-systems">setup build systems</a>
    for more information.
  </p>
</blockquote>

## Script tags

When the `browser.js` file is included all scripts with the type
`text/ecmascript-6` and `text/6to5` are automatically compiled and ran.

```html
<script src="node_modules/6to5/browser.js"></script>
<script type="text/6to5">
class Test {
  test() {
    return 'test';
  }
}

var test = new Test;
test.test(); // "test"
</script>
```

## API

Programmatically transpile and execute strings of ES6 code.

See [options](#options) for additional documentation.

### `to5.transform(code, [opts])`

```js
to5.transform('class Test {}').code;
```

### `to5.run(code, [opts])`

````js
to5.run('class Test {}');
````
