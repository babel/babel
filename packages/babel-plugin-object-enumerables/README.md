# babel-plugin-object-enumerables

Helps obtain an array of keys, values, and key/value pairs (what the spec calls
“entries”) from an object, for the purposes of iteration or serialization.  See
the [proposal](https://github.com/leobalter/object-enumerables) for more details

## Examples

```js
// Given the current variables:
var results;
var iterSuper = {
  foo: 42
};
var iter = Object.create( iterSuper );
iter.bar = 43;
```

### `Object.enumerableKeys( O )`

```js
// Before
results = [];

for ( let x in iter ) {
  results.push( x );
}

results; // [ "foo", "bar" ]

// After
results = Object.enumerableKeys( iter );
results; // [ "foo", "bar" ] (same order as for loop)
```

### `Object.enumerableValues( O )`

```js
// Before
results = [];

for ( let x in iter ) {
  results.push( iter[ x ] );
}

results; // [ 42, 43 ]

// After
results = Object.enumerableValues( iter );
results; // [ 42, 43 ] (same order as for loop)
```

### `Object.enumerableEntries( O )`

```js
// Before
results = [];

for ( let x in iter ) {
  results.push( [ x, iter[ x ] ] );
}

results; // [ [ "foo", 42 ], [ "bar", 43 ] ]

// After
results = Object.enumerableEntries( iter );
results; // [ [ "foo", 42 ], [ "bar", 43 ] ] (same order as for loop)
```

## Installation

```sh
$ npm install babel-plugin-object-enumerables
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["object-enumerables"]
}
```

### Via CLI

```sh
$ babel --plugins object-enumerables script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["object-enumerables"]
});
```
