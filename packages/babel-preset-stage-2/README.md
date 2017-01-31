# babel-preset-stage-2

> Babel preset for stage 2 plugins.

You can read more about the stages @ http://www.2ality.com/2015/11/tc39-process.html but the gist of stage 2 is:

> **Stage 2:** draft
> 
> **What is it?** A first version of what will be in the specification. At this point, an eventual inclusion of the feature in the standard is likely.
> 
> **What’s required?** The proposal must now additionally have a formal description of the syntax and semantics of the feature (using the formal language of the ECMAScript specification). The description should be as complete as possible, but can contain todos and placeholders. Two experimental implementations of the feature are needed, but one of them can be in a transpiler such as Babel.
>
> **What’s next?** Only incremental changes are expected from now on.



## Install

```sh
npm install --save-dev babel-preset-stage-2
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["stage-2"]
}
```

### Via CLI

```sh
babel script.js --presets stage-2
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["stage-2"]
});
```
