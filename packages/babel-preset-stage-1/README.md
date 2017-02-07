# babel-preset-stage-1

> Babel preset for stage 1 plugins.

You can read more about the TC39 process [here](http://www.2ality.com/2015/11/tc39-process.html), but the gist of Stage 1 is:

> **Stage 1**: proposal
>
> **What is it?** A formal proposal for the feature.
>
> **What’s required?** A so-called champion must be identified who is responsible for the proposal. Either the champion or a co-champion must be a member of TC39 (source). The problem solved by the proposal must be described in prose. The solution must be described via examples, an API and a discussion of semantics and algorithms. Lastly, potential obstacles for the proposal must be identified, such as interactions with other features and implementation challenges. Implementation-wise, polyfills and demos are needed.
>
> **What’s next?** By accepting a proposal for stage 1, TC39 declares its willingness to examine, discuss and contribute to the proposal. Going forward, major changes to the proposal are expected

## Install

```sh
npm install --save-dev babel-preset-stage-1
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["stage-1"]
}
```

### Via CLI

```sh
babel script.js --presets stage-1
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-1"]
});
```
