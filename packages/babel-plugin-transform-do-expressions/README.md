# babel-plugin-transform-do-expressions

> Compile `do` expressions to ES5

## Detail

> The `do { .. }` expression executes a block (with one or many statements in it), and the final statement completion value inside the block becomes the completion value of the do expression.

from [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch5.md#statement-completion-values)

It can be seen as a complex version of the [ternary operator](http://mdn.io/ternary):

```js
let a = do {
  if(x > 10) {
    'big';
  } else {
    'small';
  }
};
// is equivalent to:
let a = x > 10 ? 'big' : 'small';
```


This example is not the best usage because it is too simple and using a ternary operator is a better option but you can have a much more complex condition in the `do { ... }` expression with several `if ... else` chains:

```js
let x = 100;
let y = 20;

let a = do {
  if(x > 10) {
    if(y > 20) {
      'big x, big y';
    } else {
      'big x, small y';
    }
  } else {
    if(y > 10) {
      'small x, big y';
    } else {
      'small x, small y';
    }
  }
};
```

## Example

### In JSX
One of the most useful usage of the `do` expression is inside JSX. If we want to conditionally display a component we usually have to call another function which would implement the condition and return the correct value, for example:

```js
const getColoredComponent = color => {
  if(color === 'blue') { return <BlueComponent/>; }
  if(color === 'red') { return <RedComponent/>; }
  if(color === 'green') { return <GreenComponent/>; }
}

const Component = props =>
  <div className='myComponent'>
    {getColoredComponent()}
  </div>
;
```

Using a do expression you can add logic inside JSX:

```js
const Component = props =>
  <div className='myComponent'>
    {do {
      if(color === 'blue') { <BlueComponent/>; }
      else if(color === 'red') { <RedComponent/>; }
      else if(color === 'green') { <GreenComponent/>; }
    }}
  </div>
;
```


## Installation

```sh
npm install --save-dev @babel/plugin-transform-do-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-do-expressions"]
}
```

### Via CLI

```sh
babel --plugins transform-do-expressions script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-do-expressions"]
});
```

## References
- [Proposal](http://wiki.ecmascript.org/doku.php?id=strawman:do_expressions)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch5.md#statement-completion-values)
- Very handy for conditions inside JSX: [reactjs/react-future#35](https://github.com/reactjs/react-future/issues/35#issuecomment-120009203)
