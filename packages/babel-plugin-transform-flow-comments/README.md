# babel-plugin-transform-flow-comments

> Turn flow type annotations into comments.

You should be able to use this plugin instead of `babel-plugin-flow-strip-types` to preserve the `/* @flow */` directive and still use flow.

[Flow Comments Blog Post](http://flowtype.org/blog/2015/02/20/Flow-Comments.html)

## Example

**In**

```javascript
function foo(bar?) {}
function foo2(bar?: string) {}
function foo(x: number): string {}
type B = {
  name: string;
};
export type GraphQLFormattedError = number;
import type A, { B, C } from './types';
import typeof D, { E, F } from './types';
```

**Out**

```javascript
"use strict";

function foo(bar /*:: ?*/) {}
function foo2(bar /*:: ?: string*/) {}
function foo(x /*: number*/) /*: string*/ {}
/*:: type B = {
  name: string;
};*/
/*:: export type GraphQLFormattedError = number;*/
/*:: import type A, { B, C } from './types';*/
/*:: import typeof D, { E, F } from './types';*/
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-flow-comments
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-flow-comments"]
}
```

### Via CLI

```sh
babel --plugins transform-flow-comments script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-flow-comments"]
});
```
