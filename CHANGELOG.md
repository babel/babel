# Changelog

> **Tags:**
> - [Breaking Change]
> - [Spec Compliancy]
> - [New Feature]
> - [Bug Fix]
> - [Documentation]
> - [Internal]
> - [Polish]

_Note: Gaps between patch versions are faulty, broken or test releases._

See the [Babel Changelog](https://github.com/babel/babel/blob/master/CHANGELOG.md) for the pre-6.8.0 version changelog.

## 6.8.4 (2016-07-06)

### Bug Fixes

- Fix the location of params, when flow and default value used ([#68](https://github.com/babel/babylon/pull/68)) @danez

## 6.8.3 (2016-07-02)

### Bug Fixes

- Fix performance regression introduced in 6.8.2 with conditionals ([#63](https://github.com/babel/babylon/pull/63)) @danez

## 6.8.2 (2016-06-24)

### Bug Fixes

- Fix parse error with yielding jsx elements in generators `function* it() { yield <a></a>; }` ([#31](https://github.com/babel/babylon/pull/31)) @eldereal
- When cloning nodes do not clone its comments ([#24](https://github.com/babel/babylon/pull/24)) @danez
- Fix parse errors when using arrow functions with an spread element and return type `(...props): void => {}` ([#10](https://github.com/babel/babylon/pull/10)) @danez
- Fix leading comments added from previous node ([#23](https://github.com/babel/babylon/pull/23)) @danez
- Fix parse errors with flow's optional arguments `(arg?) => {}` ([#19](https://github.com/babel/babylon/pull/19)) @danez
- Support negative numeric type literals @kittens
- Remove line terminator restriction after await keyword @kittens
- Remove grouped type arrow restriction as it seems flow no longer has it @kittens
- Fix parse error with generic methods that have the name `get` or `set` `class foo { get() {} }` ([#55](https://github.com/babel/babylon/pull/55)) @vkurchatkin
- Fix parse error with arrow functions that have flow type parameter declarations `<T>(x: T): T => x;` ([#54](https://github.com/babel/babylon/pull/54)) @gabelevi

### Documentation

- Document AST differences from ESTree ([#41](https://github.com/babel/babylon/pull/41)) @nene
- Move ast spec from babel/babel ([#46](https://github.com/babel/babylon/pull/46)) @hzoo

### Internal

- Enable skipped tests ([#16](https://github.com/babel/babylon/pull/16)) @danez
- Add script to test latest version of babylon with babel ([#21](https://github.com/babel/babylon/pull/21)) @danez
- Upgrade test runner ava @kittens
- Add missing generate-identifier-regex script @kittens
- Rename parser context types @kittens
- Add node v6 to travis testing @hzoo
- Update to Unicode v9 ([#45](https://github.com/babel/babylon/pull/45)) @mathiasbynens

## 6.8.1 (2016-06-06)

### New Feature

- Parse type parameter declarations with defaults like `type Foo<T = string> = T`

### Bug Fixes
- Type parameter declarations need 1 or more type parameters.
- The existential type `*` is not a valid type parameter.
- The existential type `*` is a primary type

### Spec Compliancy
- The param list for type parameter declarations now consists of `TypeParameter` nodes
- New `TypeParameter` AST Node (replaces using the `Identifier` node before)

```
interface TypeParameter <: Node {
  bound: TypeAnnotation;
  default: TypeAnnotation;
  name: string;
  variance: "plus" | "minus";
}
```

## 6.8.0 (2016-05-02)

#### New Feature

##### Parse Method Parameter Decorators ([#12](https://github.com/babel/babylon/pull/12))

> [Method Parameter Decorators](https://goo.gl/8MmCMG) is now a TC39 [stage 0 proposal](https://github.com/tc39/ecma262/blob/master/stage0.md).

Examples:

```js
class Foo {
  constructor(@foo() x, @bar({ a: 123 }) @baz() y) {}
}

export default function func(@foo() x, @bar({ a: 123 }) @baz() y) {}

var obj = {
  method(@foo() x, @bar({ a: 123 }) @baz() y) {}
};
```

##### Parse for-await statements (w/ `asyncGenerators` plugin) ([#17](https://github.com/babel/babylon/pull/17))

There is also a new node type, `ForAwaitStatement`.

> [Async generators and for-await](https://github.com/tc39/proposal-async-iteration) are now a [stage 2 proposal](https://github.com/tc39/ecma262#current-proposals). 

Example:

```js
async function f() {
  for await (let x of y);
}
```
