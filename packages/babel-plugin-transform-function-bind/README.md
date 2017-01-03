# babel-plugin-transform-function-bind

> Compile the new function bind operator `::` to ES5.

## Detail

```js
obj::func
// is equivalent to:
func.bind(obj)

obj::func(val)
// is equivalent to:
func.call(obj, val)

::obj.func(val)
// is equivalent to:
func.call(obj, val)
```

[Try in REPL](http://babeljs.io/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=obj%3A%3Afunc%3B%0A%0Aobj%3A%3Afunc(val)%3B%0A%0A%3A%3Aobj.func(val)%3B)

## Example

### Basic

```js
const box = {
  weight: 2,
  getWeight() { return this.weight; },
};

const { getWeight } = box;

console.log(box.getWeight()); // prints '2'

const bigBox = { weight: 10 };
console.log(bigBox::getWeight()); // prints '10'

// Can be chained:
function add(val) { return this + val; }

console.log(bigBox::getWeight()::add(5)); // prints '15'
```

[Try in REPL](http://babeljs.io/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=const%20box%20%3D%20%7B%0A%20%20weight%3A%202%2C%0A%20%20getWeight()%20%7B%20return%20this.weight%3B%20%7D%2C%0A%7D%3B%0A%0Aconst%20%7B%20getWeight%20%7D%20%3D%20box%3B%0A%0Aconsole.log(box.getWeight())%3B%20%2F%2F%20prints%20'2'%0A%0Aconst%20bigBox%20%3D%20%7B%20weight%3A%2010%20%7D%3B%0Aconsole.log(bigBox%3A%3AgetWeight())%3B%20%2F%2F%20prints%20'10'%0A%2F%2F%20bigBox%3A%3AgetWeight()%20is%20equivalent%20to%20getWeight.call(bigBox)%0A%0A%2F%2F%20Can%20be%20chained%3A%0Afunction%20add(val)%20%7B%20return%20this%20%2B%20val%3B%20%7D%0A%0Aconsole.log(bigBox%3A%3AgetWeight()%3A%3Aadd(5))%3B%20%2F%2F%20prints%20'15')

### Using with `document.querySelectorAll`

It can be very handy when used with `document.querySelectorAll`:

```js
const { map, filter } = Array.prototype;

let sslUrls = document.querySelectorAll('a')
                ::map(node => node.href)
                ::filter(href => href.substring(0, 5) === 'https');

console.log(sslUrls);
```

[Try in REPL](http://babeljs.io/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=%0Aconst%20%7B%20map%2C%20filter%20%7D%20%3D%20Array.prototype%3B%0A%0Alet%20sslUrls%20%3D%20document.querySelectorAll('a')%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%3Amap(node%20%3D%3E%20node.href)%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3A%3Afilter(href%20%3D%3E%20href.substring(0%2C%205)%20%3D%3D%3D%20'https')%3B%0A%0Aconsole.log(sslUrls)%3B%0A)

`document.querySelectorAll` returns a `NodeList` element which is not a plain array, so you normally can't use the `map` function on it, and have to use it this way: `Array.prototype.map.call(document.querySelectorAll(...), node => { ... })`. The above code using the `::` will work because it is equivalent to:

```js
const { map, filter } = Array.prototype;

let sslUrls = document.querySelectorAll('a');
sslUrls = map.call(sslUrls, node => node.href);
sslUrls = filter.call(sslUrls, href => href.substring(0, 5) === 'https');

console.log(sslUrls);
```

### Auto self binding
When nothing is specified before the `::` operator, the function is bound to its object:

```js
$('.some-link').on('click', ::view.reset);
// is equivalent to:
$('.some-link').on('click', view.reset.bind(view));
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-function-bind
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-function-bind"]
}
```

### Via CLI

```sh
babel --plugins transform-function-bind script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-function-bind"]
});
```

## References

* [Proposal](https://github.com/zenparsing/es-function-bind)
* [Babel Blog: Function Bind Syntax](/blog/2015/05/14/function-bind)
