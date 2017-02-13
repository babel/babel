# babel-plugin-syntax-class-constructor-call (deprecated)

> Proposal Withdrawn: can be solved with decorators.

## Installation

```sh
npm install --save-dev babel-plugin-syntax-class-constructor-call
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-class-constructor-call"]
}
```

### Via CLI

```sh
babel --plugins syntax-class-constructor-call script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-class-constructor-call"]
});
```

## References

* [Inactive Proposals](https://github.com/tc39/proposals/blob/master/inactive-proposals.md)
* [Proposal: Call Constructor](https://github.com/tc39/ecma262/blob/master/workingdocs/callconstructor.md)
* [Blog post: ECMAScript proposal: function-callable classes](http://www.2ality.com/2015/10/call-constructor-esprop.html)
