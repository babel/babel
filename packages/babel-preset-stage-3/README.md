# babel-preset-stage-3

> Babel preset for stage 3 plugins.

You can read more about the stages @ http://www.2ality.com/2015/11/tc39-process.html but in general stage 3 is:

> **Stage 3**: candidate
>
> **What is it?** The proposal is mostly finished and now needs feedback from implementations and users to progress further.

> **What’s required?** The spec text must be complete. Designated reviewers (appointed by TC39, not by the champion) and the ECMAScript spec editor must sign off on the spec text. There must be at least two spec-compliant implementations (which don’t have to be enabled by default).
>
> **What’s next?** Henceforth, changes should only be made in response to critical issues raised by the implementations and their use.



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
