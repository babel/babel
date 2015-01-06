---
layout: docs
title: API
description: How to use the Node.js API.
permalink: /docs/usage/api/
---


```javascript
var to5 = require('6to5');
```

## to5.transform

Transforms the passed in `code`.

```
to5.transform(code, [options])
```

**Example**

```js
var result = to5.transform('code();', options);
result.code;
result.map;
result.ast;
```

## to5.transformFile

Asynchronously transforms the entire contents of a file.

```js
to5.transformFile(filename, [options], callback)
```

**Example**

```js
to5.transformFile('filename.js', options, function (err, result) {
  result.code;
});
```

## to5.transformFileSync

Synchronous version of `to5.transformFile`. Returns the transformed contents of
the `filename`.

```js
to5.transformFileSync(filename, [options])
```

**Example**

```js
to5.transformFileSync('filename.js', options).code;
```
