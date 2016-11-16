# Changelog

> **Tags:**
> - :boom:       [Breaking Change]
> - :eyeglasses: [Spec Compliancy]
> - :rocket:     [New Feature]
> - :bug:        [Bug Fix]
> - :memo:       [Documentation]
> - :house:      [Internal]
> - :nail_care:  [Polish]

> Semver Policy: https://github.com/babel/babylon#semver

_Note: Gaps between patch versions are faulty, broken or test releases._

See the [Babel Changelog](https://github.com/babel/babel/blob/master/CHANGELOG.md) for the pre-6.8.0 version Changelog.

## 6.14.0 (2016-11-13)

### :eyeglasses: Spec Compliancy

Throw error for reserved words `enum` and `await` ([#195](https://github.com/babel/babylon/pull/195)) (Kai Cataldo)

[11.6.2.2 Future Reserved Words](http://www.ecma-international.org/ecma-262/6.0/#sec-future-reserved-words)

Babylon will throw for more reserved words such as `enum` or `await` (in strict mode).

```
class enum {} // throws
class await {} // throws in strict mode (module)
```

Optional names for function types and object type indexers ([#197](https://github.com/babel/babylon/pull/197)) (Gabe Levi)

So where you used to have to write

```js
type A = (x: string, y: boolean) => number;
type B = (z: string) => number;
type C = { [key: string]: number };
```

you can now write (with flow 0.34.0)

```js
type A = (string, boolean) => number;
type B = string => number;
type C = { [string]: number };
```

Parse flow nested array type annotations like `number[][]` ([#219](https://github.com/babel/babylon/pull/219)) (Bernhard Häussner)
 
Supports these form now of specifying array types:

```js
var a: number[][][][];
var b: string[][];
```
 
### :bug: Bug Fix

Correctly eat semicolon at the end of `DelcareModuleExports` ([#223](https://github.com/babel/babylon/pull/223))  (Daniel Tschinder)

```
declare module "foo" { declare module.exports: number } 
declare module "foo" { declare module.exports: number; }  // also allowed now
```

### :house: Internal

 * Count Babel tests towards Babylon code coverage ([#182](https://github.com/babel/babylon/pull/182)) (Moti Zilberman)
 * Fix strange line endings ([#214](https://github.com/babel/babylon/pull/214)) (Thomas Grainger)
 * Add node 7 (Daniel Tschinder)
 * chore(package): update flow-bin to version 0.34.0 ([#204](https://github.com/babel/babylon/pull/204)) (Greenkeeper)

## v6.13.1 (2016-10-26)

### :nail_care: Polish

- Use rollup for bundling to speed up startup time ([#190](https://github.com/babel/babylon/pull/190)) ([@drewml](https://github.com/DrewML))

```js
const babylon = require('babylon');
const ast = babylon.parse('var foo = "lol";');
```

With that test case, there was a ~95ms savings by removing the need for node to build/traverse the dependency graph.

**Without bundling**
![image](https://cloud.githubusercontent.com/assets/5233399/19420264/3133497e-93ad-11e6-9a6a-2da59c4f5c13.png)

**With bundling**
![image](https://cloud.githubusercontent.com/assets/5233399/19420267/388f556e-93ad-11e6-813e-7c5c396be322.png)

- add clean command [skip ci] ([#201](https://github.com/babel/babylon/pull/201)) (Henry Zhu)
- add ForAwaitStatement (async generator already added) [skip ci] ([#196](https://github.com/babel/babylon/pull/196)) (Henry Zhu)

## v6.13.0 (2016-10-21)

### :eyeglasses: Spec Compliancy

Property variance type annotations for Flow plugin ([#161](https://github.com/babel/babylon/pull/161)) (Sam Goldman)

> See https://flowtype.org/docs/variance.html for more information

```js
type T = { +p: T };
interface T { -p: T };
declare class T { +[k:K]: V };
class T { -[k:K]: V };
class C2 { +p: T = e };
```

Raise error on duplicate definition of __proto__ ([#183](https://github.com/babel/babylon/pull/183)) (Moti Zilberman)

```js
({ __proto__: 1, __proto__: 2 }) // Throws an error now
```

### :bug: Bug Fix

Flow: Allow class properties to be named `static` ([#184](https://github.com/babel/babylon/pull/184)) (Moti Zilberman)

```js
declare class A {
  static: T;
}
```

Allow "async" as identifier for object literal property shorthand ([#187](https://github.com/babel/babylon/pull/187)) (Andrew Levine)

```js
var foo = { async, bar };
```

### :nail_care: Polish

Fix flowtype and add inType to state ([#189](https://github.com/babel/babylon/pull/189)) (Daniel Tschinder)

> This improves the performance slightly (because of hidden classes)

### :house: Internal

Fix .gitattributes line ending setting ([#191](https://github.com/babel/babylon/pull/191)) (Moti Zilberman)

Increase test coverage ([#175](https://github.com/babel/babylon/pull/175) (Moti Zilberman)

Readd missin .eslinignore for IDEs (Daniel Tschinder)

Error on missing expected.json fixture in CI ([#188](https://github.com/babel/babylon/pull/188)) (Moti Zilberman)

Add .gitattributes and .editorconfig for LF line endings ([#179](https://github.com/babel/babylon/pull/179)) (Moti Zilberman)
 
Fixes two tests that are failing after the merge of #172 ([#177](https://github.com/babel/babylon/pull/177)) (Moti Zilberman)

## v6.12.0 (2016-10-14)

### :eyeglasses: Spec Compliancy

Implement import() syntax ([#163](https://github.com/babel/babylon/pull/163)) (Jordan Gensler)

#### Dynamic Import

- Proposal Repo: https://github.com/domenic/proposal-dynamic-import
- Championed by [@domenic](https://github.com/domenic)
- stage-2
- [sept-28 tc39 notes](https://github.com/rwaldron/tc39-notes/blob/master/es7/2016-09/sept-28.md#113a-import)

> This repository contains a proposal for adding a "function-like" import() module loading syntactic form to JavaScript

```js
import(`./section-modules/${link.dataset.entryModule}.js`)
.then(module => {
  module.loadPageInto(main);
})
```

Add EmptyTypeAnnotation ([#171](https://github.com/babel/babylon/pull/171)) (Sam Goldman)

#### EmptyTypeAnnotation

Just wasn't covered before.

```js
type T = empty;
```

### :bug: Bug Fix

Fix crash when exporting with destructuring and sparse array ([#170](https://github.com/babel/babylon/pull/170)) (Jeroen Engels)

```js
// was failing due to sparse array
export const { foo: [ ,, qux7 ] } = bar;
```

Allow keyword in Flow object declaration property names with type parameters ([#146](https://github.com/babel/babylon/pull/146)) (Dan Harper)

```js
declare class X {
  foobar<T>(): void;
  static foobar<T>(): void;
}
```

Allow keyword in object/class property names with Flow type parameters ([#145](https://github.com/babel/babylon/pull/145)) (Dan Harper)

```js
class Foo {
  delete<T>(item: T): T {
    return item;
  }
}
```

Allow typeAnnotations for yield expressions ([#174](https://github.com/babel/babylon/pull/174))) (Daniel Tschinder)

```js
function *foo() {
  const x = (yield 5: any);
}
```

### :nail_care: Polish

Annotate more errors with expected token ([#172](https://github.com/babel/babylon/pull/172))) (Moti Zilberman)

```js
// Unexpected token, expected ; (1:6)
{ set 1 }
```

### :house: Internal

Remove kcheck ([#173](https://github.com/babel/babylon/pull/173)))  (Daniel Tschinder)

Also run flow, linting, babel tests on seperate instances (add back node 0.10)

## v6.11.6 (2016-10-12)

### :bug: Bug Fix/Regression

Fix crash when exporting with destructuring and sparse array ([#170](https://github.com/babel/babylon/pull/170)) (Jeroen Engels)

```js
// was failing with `Cannot read property 'type' of null` because of null identifiers
export const { foo: [ ,, qux7 ] } = bar;
```

## v6.11.5 (2016-10-12)

### :eyeglasses: Spec Compliancy

Fix: Check for duplicate named exports in exported destructuring assignments ([#144](https://github.com/babel/babylon/pull/144)) (Kai Cataldo)

```js
// `foo` has already been exported. Exported identifiers must be unique. (2:20)
export function foo() {};
export const { a: [{foo}] } = bar;
```

Fix: Check for duplicate named exports in exported rest elements/properties ([#164](https://github.com/babel/babylon/pull/164)) (Kai Cataldo)

```js
// `foo` has already been exported. Exported identifiers must be unique. (2:22)
export const foo = 1;
export const [bar, ...foo] = baz;
```

### :bug: Bug Fix

Fix: Allow identifier `async` for default param in arrow expression ([#165](https://github.com/babel/babylon/pull/165)) (Kai Cataldo)

```js
// this is ok now
const test = ({async = true}) => {};
```

### :nail_care: Polish

Babylon will now print out the token it's expecting if there's a `SyntaxError` ([#150](https://github.com/babel/babylon/pull/150)) (Daniel Tschinder)

```bash
# So in the case of a missing ending curly (`}`)
Module build failed: SyntaxError: Unexpected token, expected } (30:0)
  28 |   }
  29 |
> 30 |
     | ^
```

## v6.11.4 (2016-10-03)

Temporary rollback for erroring on trailing comma with spread (#154) (Henry Zhu)

## v6.11.3 (2016-10-01)

### :eyeglasses: Spec Compliancy

Add static errors for object rest (#149) ([@danez](https://github.com/danez))

> https://github.com/sebmarkbage/ecmascript-rest-spread

Object rest copies the *rest* of properties from the right hand side `obj` starting from the left to right.

```js
let { x, y, ...z } =  { x: 1, y: 2, z: 3 };
// x = 1
// y = 2
// z = { z: 3 }
```

#### New Syntax Errors:

**SyntaxError**: The rest element has to be the last element when destructuring (1:10)
```bash
> 1 | let { ...x, y, z } = { x: 1, y: 2, z: 3};
    |           ^
# Previous behavior:
# x = { x: 1, y: 2, z: 3 }
# y = 2
# z = 3
```

Before, this was just a more verbose way of shallow copying `obj` since it doesn't actually do what you think.

**SyntaxError**: Cannot have multiple rest elements when destructuring (1:13)

```bash
> 1 | let { x, ...y, ...z } = { x: 1, y: 2, z: 3};
    |              ^
# Previous behavior:
# x = 1
# y = { y: 2, z: 3 }
# z = { y: 2, z: 3 }
```

Before y and z would just be the same value anyway so there is no reason to need to have both.

**SyntaxError**: A trailing comma is not permitted after the rest element (1:16)

```js
let { x, y, ...z, } = obj;
```

The rationale for this is that the use case for trailing comma is that you can add something at the end without affecting the line above. Since a RestProperty always has to be the last property it doesn't make sense.

---

get / set are valid property names in default assignment (#142) ([@jezell](https://github.com/jezell))

```js
// valid
function something({ set = null, get = null }) {}
```

## v6.11.2 (2016-09-23)

### Bug Fix

- [#139](https://github.com/babel/babylon/issues/139) Don't do the duplicate check if not an identifier (#140) @hzoo

```js
// regression with duplicate export check
SyntaxError: ./typography.js: `undefined` has already been exported. Exported identifiers must be unique. (22:13)
  20 | 
  21 | export const { rhythm } = typography;
> 22 | export const { TypographyStyle } = typography
```

Bail out for now, and make a change to account for destructuring in the next release.

## 6.11.1 (2016-09-22)

### Bug Fix
- [#137](https://github.com/babel/babylon/pull/137) - Fix a regression with duplicate exports - it was erroring on all keys in `Object.prototype`. @danez

```javascript
export toString from './toString';
```

```bash
`toString` has already been exported. Exported identifiers must be unique. (1:7)
> 1 | export toString from './toString';
    |        ^
  2 |
```

## 6.11.0 (2016-09-22)

### Spec Compliancy (will break CI)

- Disallow duplicate named exports ([#107](https://github.com/babel/babylon/pull/107)) @kaicataldo

```js
// Only one default export allowed per module. (2:9)
export default function() {};
export { foo as default };

// Only one default export allowed per module. (2:0)
export default {};
export default function() {};

// `Foo` has already been exported. Exported identifiers must be unique. (2:0)
export { Foo };
export class Foo {};
```

### New Feature (Syntax)

- Add support for computed class property names ([#121](https://github.com/babel/babylon/pull/121)) @motiz88

```js
// AST
interface ClassProperty <: Node {
  type: "ClassProperty";
  key: Identifier;
  value: Expression;
  computed: boolean; // added
}
```

```js
// with "plugins": ["classProperties"]
class Foo {
  [x]
  ['y']
}

class Bar {
  [p]
  [m] () {}
}
 ```

### Bug Fix

- Fix `static` property falling through in the declare class Flow AST ([#135](https://github.com/babel/babylon/pull/135)) @danharper

```js
declare class X {
    a: number;
    static b: number; // static
    c: number; // this was being marked as static in the AST as well
}
```

### Polish

- Rephrase "assigning/binding to rvalue" errors to include context ([#119](https://github.com/babel/babylon/pull/119)) @motiz88

```js
// Used to error with:
// SyntaxError: Assigning to rvalue (1:0)

// Now:
// Invalid left-hand side in assignment expression (1:0)
3 = 4

// Invalid left-hand side in for-in statement (1:5)
for (+i in {});
```

### Internal

- Fix call to `this.parseMaybeAssign` with correct arguments ([#133](https://github.com/babel/babylon/pull/133)) @danez
- Add semver note to changelog ([#131](https://github.com/babel/babylon/pull/131)) @hzoo

## 6.10.0 (2016-09-19)

> We plan to include some spec compliancy bugs in patch versions. An example was the multiple default exports issue.

### Spec Compliancy

* Implement ES2016 check for simple parameter list in strict mode ([#106](https://github.com/babel/babylon/pull/106)) (Timothy Gu)

> It is a Syntax Error if ContainsUseStrict of FunctionBody is true and IsSimpleParameterList of FormalParameters is false. https://tc39.github.io/ecma262/2016/#sec-function-definitions-static-semantics-early-errors

More Context: [tc39-notes](https://github.com/rwaldron/tc39-notes/blob/master/es7/2015-07/july-29.md#611-the-scope-of-use-strict-with-respect-to-destructuring-in-parameter-lists)

For example:

```js
// this errors because it uses destructuring and default parameters
// in a function with a "use strict" directive
function a([ option1, option2 ] = []) {
  "use strict";
}
 ```

The solution would be to use a top level "use strict" or to remove the destructuring or default parameters when using a function + "use strict" or to.

### New Feature

* Exact object type annotations for Flow plugin ([#104](https://github.com/babel/babylon/pull/104)) (Basil Hosmer)

Added to flow in https://github.com/facebook/flow/commit/c710c40aa2a115435098d6c0dfeaadb023cd39b8

Looks like:

```js
var a : {| x: number, y: string |} = { x: 0, y: 'foo' };
```

### Bug Fixes

* Include `typeParameter` location in `ArrowFunctionExpression` ([#126](https://github.com/babel/babylon/pull/126)) (Daniel Tschinder)
* Error on invalid flow type annotation with default assignment ([#122](https://github.com/babel/babylon/pull/122)) (Dan Harper)
* Fix Flow return types on arrow functions ([#124](https://github.com/babel/babylon/pull/124)) (Dan Harper)

### Misc

* Add tests for export extensions ([#127](https://github.com/babel/babylon/pull/127)) (Daniel Tschinder)
* Fix Contributing guidelines [skip ci] (Daniel Tschinder)

## 6.9.2 (2016-09-09)

The only change is to remove the `babel-runtime` dependency by compiling with Babel's ES2015 loose mode. So using babylon standalone should be smaller.

## 6.9.1 (2016-08-23)

This release contains mainly small bugfixes but also updates babylons default mode to es2017. The features for `exponentiationOperator`, `asyncFunctions` and `trailingFunctionCommas` which previously needed to be activated via plugin are now enabled by default and the plugins are now no-ops.

### Bug Fixes

- Fix issues with default object params in async functions ([#96](https://github.com/babel/babylon/pull/96)) @danez
- Fix issues with flow-types and async function ([#95](https://github.com/babel/babylon/pull/95)) @danez
- Fix arrow functions with destructuring, types & default value ([#94](https://github.com/babel/babylon/pull/94)) @danharper
- Fix declare class with qualified type identifier ([#97](https://github.com/babel/babylon/pull/97)) @danez
- Remove exponentiationOperator, asyncFunctions, trailingFunctionCommas plugins and enable them by default ([#98](https://github.com/babel/babylon/pull/98)) @danez

## 6.9.0 (2016-08-16)

### New syntax support

- Add JSX spread children ([#42](https://github.com/babel/babylon/pull/42)) @calebmer

(Be aware that React is not going to support this syntax)

```js
<div>
  {...todos.map(todo => <Todo key={todo.id} todo={todo}/>)}
</div>
```

- Add support for declare module.exports ([#72](https://github.com/babel/babylon/pull/72)) @danez

```js
declare module "foo" {
  declare module.exports: {}
}
```

### New Features

- If supplied, attach filename property to comment node loc. ([#80](https://github.com/babel/babylon/pull/80)) @divmain
- Add identifier name to node loc field ([#90](https://github.com/babel/babylon/pull/90)) @kittens

### Bug Fixes

- Fix exponential operator to behave according to spec ([#75](https://github.com/babel/babylon/pull/75)) @danez
- Fix lookahead to not add comments to arrays which are not cloned ([#76](https://github.com/babel/babylon/pull/76)) @danez
- Fix accidental fall-through in Flow type parsing. ([#82](https://github.com/babel/babylon/pull/82)) @xiemaisi
- Only allow declares inside declare module ([#73](https://github.com/babel/babylon/pull/73)) @danez
- Small fix for parsing type parameter declarations ([#83](https://github.com/babel/babylon/pull/83)) @gabelevi
- Fix arrow param locations with flow types ([#57](https://github.com/babel/babylon/pull/57)) @danez
- Fixes SyntaxError position with flow optional type ([#65](https://github.com/babel/babylon/pull/65)) @danez

### Internal

- Add codecoverage to tests @danez
- Fix tests to not save expected output if we expect the test to fail @danez
- Make a shallow clone of babel for testing @danez
- chore(package): update cross-env to version 2.0.0 ([#77](https://github.com/babel/babylon/pull/77)) @greenkeeperio-bot
- chore(package): update ava to version 0.16.0 ([#86](https://github.com/babel/babylon/pull/86)) @greenkeeperio-bot
- chore(package): update babel-plugin-istanbul to version 2.0.0 ([#89](https://github.com/babel/babylon/pull/89)) @greenkeeperio-bot
- chore(package): update nyc to version 8.0.0 ([#88](https://github.com/babel/babylon/pull/88)) @greenkeeperio-bot

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
