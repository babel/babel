# babel-core

> Babel compiler core.

```javascript
var babel = require("babel-core");
import { transform } from 'babel-core';
import * as babel from 'babel-core';
```

## babel.transform(code: string, [options?](/docs/usage/options): Object)

Transforms the passed in `code`. Returning an object with the generated code,
source map, and AST.

```js
babel.transform(code, options) // => { code, map, ast }
```

**Example**

```js
var result = babel.transform("code();", options);
result.code;
result.map;
result.ast;
```

## babel.transformFile(filename: string, [options?](/docs/usage/options): Object, callback: Function)

Asynchronously transforms the entire contents of a file.

```js
babel.transformFile(filename, options, callback)
```

**Example**

```js
babel.transformFile("filename.js", options, function (err, result) {
  result; // => { code, map, ast }
});
```

## babel.transformFileSync(filename: string, [options?](/docs/usage/options): Object)

Synchronous version of `babel.transformFile`. Returns the transformed contents of
the `filename`.

```js
babel.transformFileSync(filename, options) // => { code, map, ast }
```

**Example**

```js
babel.transformFileSync("filename.js", options).code;
```

## babel.transformFromAst(ast: Object, code?: string, [options?](/docs/usage/options): Object)

Given, an [AST](https://astexplorer.net/), transform it.

```js
const code = "if (true) return;";
const ast = babylon.parse(code, { allowReturnOutsideFunction: true });
const { code, map, ast } = babel.transformFromAst(ast, code, options);
```
