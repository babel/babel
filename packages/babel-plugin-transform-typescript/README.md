# @babel/plugin-transform-typescript

> Transform [TypeScript](https://github.com/Microsoft/TypeScript) into ES.next.

Does not type-check its input. For that, you will need to install and set up TypeScript.

## Caveats

* Does not support [`namespace`][namespace]s. **Workaround**: Move to using [file exports][fm], or migrate to using the `module { }` syntax instead.
* Does not support [`const enum`][const_enum]s because those require type information to compile.
**Workaround**: Remove the `const`, which makes it available at runtime.
* Does not support [`export =`][exin] and [`import =`][exin], because those cannot be compile to ES.next. **Workaround**: Convert to using `export default` and `export const`, and `import x, {y} from "z"`.
* Does not support binding patterns in signature. So `export type T = ({x, y}: any) => void;` does currently not work. See [babel issue #6667](https://github.com/babel/babel/issues/6667) and [babylon issue #768](https://github.com/babel/babylon/issues/768) for details.
* Does not support default export of an interface. So `export default interface A {}` does currently not work. See [babel issue #7118](https://github.com/babel/babel/issues/7118) and [babel issue #7640](https://github.com/babel/babel/issues/7640) for details.

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
## Options

### `jsxPragma`

`string`

Replace the function used when compiling JSX expressions.

This is so that we know that the import is not a type import, and should not be removed

[const_enum]: https://www.typescriptlang.org/docs/handbook/enums.html#const-enums
[namespace]: https://www.typescriptlang.org/docs/handbook/namespaces.html
[exin]: https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
[fm]: https://github.com/Microsoft/dtslint/blob/master/docs/no-single-declare-module.md
