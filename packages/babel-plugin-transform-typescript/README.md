# @babel/plugin-transform-typescript

> Transform [TypeScript](https://github.com/Microsoft/TypeScript) into ES.next.

Does not type-check its input. For that, you will need to install and set up TypeScript.

## Caveats

* Does not support [`namespace`][namespace]s. **Workaround**: Move to using [file exports][fm], or migrate to using the `module { }` syntax instead.
* Does not support [`const enum`][const_enum]s because those require type information to compile.
**Workaround**: Remove the `const`, which makes it available at runtime.
* Does not support [`export =`][exin] and [`import =`][exin], because those cannot be compile to ES.next. **Workaround**: Convert to using `export default` and `export const`, and `import x, {y} from "z"`.

## Example

**In**

```javascript
const x: number = 0;
```

**Out**

```javascript
const x = 0;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-typescript
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-typescript"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-typescript script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-typescript"]
});
```

[const_enum]: https://www.typescriptlang.org/docs/handbook/enums.html#const-enums
[namespace]: https://www.typescriptlang.org/docs/handbook/namespaces.html
[exin]: https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
[fm]: https://github.com/Microsoft/dtslint/blob/master/docs/no-single-declare-module.md
