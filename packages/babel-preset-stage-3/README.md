# babel-preset-stage-3

> Babel preset for stage 3 plugins.

The gist of Stage 3 is:

> **Stage 3**: candidate
>
> **What is it?** The proposal is mostly finished and now needs feedback from implementations and users to progress further.

> **What’s required?** The spec text must be complete. Designated reviewers (appointed by TC39, not by the champion) and the ECMAScript spec editor must sign off on the spec text. There must be at least two spec-compliant implementations (which don’t have to be enabled by default).
>
> **What’s next?** Henceforth, changes should only be made in response to critical issues raised by the implementations and their use.

This preset includes the following plugins:

- [transform-object-rest-spread](https://babeljs.io/docs/en/babel-plugin-transform-object-rest-spread)
- [transform-async-generator-functions](https://babeljs.io/docs/en/babel-plugin-transform-async-generator-functions)

> trailing-commas, async, exponentiation will be removed in the next major since they are stage 4 already

- [syntax-trailing-function-commas](https://babeljs.io/docs/en/babel-plugin-syntax-trailing-function-commas)
- [transform-async-to-generator](https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator)
- [transform-exponentiation-operator](https://babeljs.io/docs/en/babel-plugin-transform-exponentiation-operator)

## Install

```sh
npm install --save-dev babel-preset-stage-3
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["stage-3"]
}
```

### Via CLI

```sh
babel script.js --presets stage-3
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-3"]
});
```

## References

- Chapter "[The TC39 process for ECMAScript features](http://exploringjs.com/es2016-es2017/ch_tc39-process.html)" in "Exploring ES2016 and ES2017" by Axel Rauschmayer
