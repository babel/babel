# babel-helpers

> Collection of helper functions used by Babel transforms.

## Install

```js
$ npm install babel-helpers
```

## Usage

```js
import * as helpers from 'babel-helpers';
import * as t from 'babel-types';

const typeofHelper = helpers.get('typeof');

t.isExpressionStatement(typeofHelper);
// true
```
