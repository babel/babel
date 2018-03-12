# @babel/preset-stage-3

> Babel preset for stage 3 plugins.

The gist of Stage 3 is:

> **Stage 3**: candidate
>
> **What is it?** The proposal is mostly finished and now needs feedback from implementations and users to progress further.

> **What’s required?** The spec text must be complete. Designated reviewers (appointed by TC39, not by the champion) and the ECMAScript spec editor must sign off on the spec text. There must be at least two spec-compliant implementations (which don’t have to be enabled by default).
>
> **What’s next?** Henceforth, changes should only be made in response to critical issues raised by the implementations and their use.

## Install

```sh
npm install --save-dev @babel/preset-stage-3
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/preset-stage-3"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-stage-3
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-stage-3"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

Enable "loose" transformations for any plugins in this preset that allow them.

### `useBuiltIns`

`boolean`, defaults to `false`.

Will use the native built-in instead of trying to polyfill behavior for any plugins that require one.

## References

- Chapter "[The TC39 process for ECMAScript features](http://exploringjs.com/es2016-es2017/ch_tc39-process.html)" in "Exploring ES2016 and ES2017" by Axel Rauschmayer
