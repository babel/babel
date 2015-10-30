# babel-core

> Babel compiler core.

## Install

```
$ npm install babel-core
```

## Usage

```js
import babel from 'babel-core';

const code = `class Example {}`;
const result = babel.transform(code, { /* options */ });

result.code; // Generated code
result.map; // Sourcemap
result.ast; // AST
```

For more in depth documentation see: http://babeljs.io/docs/usage/api/
