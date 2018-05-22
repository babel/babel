<p align="center">
  <img alt="@babel/parser" src="https://raw.githubusercontent.com/babel/logo/master/babylon.png" width="700">
</p>

<p align="center">
  The Babel parser (previously Babylon) is a JavaScript parser used in <a href="https://github.com/babel/babel">Babel</a>.
</p>

 - The latest ECMAScript version enabled by default (ES2017).
 - Comment attachment.
 - Support for JSX, Flow, Typescript.
 - Support for experimental language proposals (accepting PRs for anything at least [stage-0](https://github.com/tc39/proposals/blob/master/stage-0-proposals.md)).

## Credits

Heavily based on [acorn](https://github.com/marijnh/acorn) and [acorn-jsx](https://github.com/RReverser/acorn-jsx),
thanks to the awesome work of [@RReverser](https://github.com/RReverser) and [@marijnh](https://github.com/marijnh).

## API

### `babelParser.parse(code, [options])`

### `babelParser.parseExpression(code, [options])`

`parse()` parses the provided `code` as an entire ECMAScript program, while
`parseExpression()` tries to parse a single Expression with performance in
mind. When in doubt, use `.parse()`.

### Options

- **allowImportExportEverywhere**: By default, `import` and `export`
  declarations can only appear at a program's top level. Setting this
  option to `true` allows them anywhere where a statement is allowed.

- **allowAwaitOutsideFunction**: By default, `await` use is not allowed
  outside of an async function. Set this to `true` to accept such
  code.

- **allowReturnOutsideFunction**: By default, a return statement at
  the top level raises an error. Set this to `true` to accept such
  code.

- **allowSuperOutsideMethod**: TODO

- **sourceType**: Indicate the mode the code should be parsed in. Can be
  one of `"script"`, `"module"`, or `"unambiguous"`. Defaults to `"script"`. `"unambiguous"` will make @babel/parser attempt to _guess_, based on the presence of ES6 `import` or `export` statements. Files with ES6 `import`s and `export`s are considered `"module"` and are otherwise `"script"`.

- **sourceFilename**: Correlate output AST nodes with their source filename.  Useful when generating code and source maps from the ASTs of multiple input files.

- **startLine**: By default, the first line of code parsed is treated as line 1. You can provide a line number to alternatively start with. Useful for integration with other source tools.

- **plugins**: Array containing the plugins that you want to enable.

- **strictMode**: TODO

- **ranges**: Adds a `ranges` property to each node: `[node.start, node.end]`

- **tokens**: Adds all parsed tokens to a `tokens` property on the `File` node

### Output

The Babel parser generates AST according to [Babel AST format][].
It is based on [ESTree spec][] with the following deviations:

> There is now an `estree` plugin which reverts these deviations

- [Literal][] token is replaced with [StringLiteral][], [NumericLiteral][], [BooleanLiteral][], [NullLiteral][], [RegExpLiteral][]
- [Property][] token is replaced with [ObjectProperty][] and [ObjectMethod][]
- [MethodDefinition][] is replaced with [ClassMethod][]
- [Program][] and [BlockStatement][] contain additional `directives` field with [Directive][] and [DirectiveLiteral][]
- [ClassMethod][], [ObjectProperty][], and [ObjectMethod][] value property's properties in [FunctionExpression][] is coerced/brought into the main method node.

AST for JSX code is based on [Facebook JSX AST][].

[Babel AST format]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md
[ESTree spec]: https://github.com/estree/estree

[Literal]: https://github.com/estree/estree/blob/master/es5.md#literal
[Property]: https://github.com/estree/estree/blob/master/es5.md#property
[MethodDefinition]: https://github.com/estree/estree/blob/master/es2015.md#methoddefinition

[StringLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#stringliteral
[NumericLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#numericliteral
[BooleanLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#booleanliteral
[NullLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#nullliteral
[RegExpLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#regexpliteral
[ObjectProperty]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#objectproperty
[ObjectMethod]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#objectmethod
[ClassMethod]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#classmethod
[Program]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#programs
[BlockStatement]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#blockstatement
[Directive]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#directive
[DirectiveLiteral]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#directiveliteral
[FunctionExpression]: https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md#functionexpression

[Facebook JSX AST]: https://github.com/facebook/jsx/blob/master/AST.md

### Semver

The Babel Parser follows semver in most situations. The only thing to note is that some spec-compliancy bug fixes may be released under patch versions.

For example: We push a fix to early error on something like [#107](https://github.com/babel/babylon/pull/107) - multiple default exports per file. That would be considered a bug fix even though it would cause a build to fail.

### Example

```javascript
require("@babel/parser").parse("code", {
  // parse in strict mode and allow module declarations
  sourceType: "module",

  plugins: [
    // enable jsx and flow syntax
    "jsx",
    "flow"
  ]
});
```

### Plugins

| Name | Code Example |
|------|--------------|
| `estree` ([repo](https://github.com/estree/estree)) | n/a |
| `jsx` ([repo](https://facebook.github.io/jsx/)) | `<a attr="b">{s}</a>` |
| `flow` ([repo](https://github.com/facebook/flow)) | `var a: string = "";` |
| `flowComments` ([docs](https://flow.org/en/docs/types/comments/)) | `/*:: type Foo = {...}; */` |
| `typescript` ([repo](https://github.com/Microsoft/TypeScript)) | `var a: string = "";` |
| `doExpressions` | `var a = do { if (true) { 'hi'; } };` |
| `objectRestSpread` ([proposal](https://github.com/tc39/proposal-object-rest-spread)) | `var a = { b, ...c };` |
| `decorators` (Stage 1) and `decorators2` (Stage 2 [proposal](https://github.com/tc39/proposal-decorators)) | `@a class A {}` |
| `classProperties` ([proposal](https://github.com/tc39/proposal-class-public-fields)) | `class A { b = 1; }` |
| `classPrivateProperties` ([proposal](https://github.com/tc39/proposal-private-fields)) | `class A { #b = 1; }` |
| `classPrivateMethods` ([proposal](https://github.com/tc39/proposal-private-methods)) | `class A { #c() {} }` |
| `exportDefaultFrom` ([proposal](https://github.com/leebyron/ecmascript-export-default-from)) | `export v from "mod"` |
| `exportNamespaceFrom` ([proposal](https://github.com/leebyron/ecmascript-export-ns-from)) | `export * as ns from "mod"` |
| `asyncGenerators` ([proposal](https://github.com/tc39/proposal-async-iteration)) | `async function*() {}`, `for await (let a of b) {}` |
| `functionBind` ([proposal](https://github.com/zenparsing/es-function-bind)) | `a::b`, `::console.log` |
| `functionSent` | `function.sent` |
| `dynamicImport` ([proposal](https://github.com/tc39/proposal-dynamic-import)) | `import('./guy').then(a)` |
| `numericSeparator` ([proposal](https://github.com/samuelgoto/proposal-numeric-separator)) | `1_000_000` |
| `optionalChaining` ([proposal](https://github.com/tc39/proposal-optional-chaining)) | `a?.b` |
| `importMeta` ([proposal](https://github.com/tc39/proposal-import-meta)) | `import.meta.url` |
| `bigInt` ([proposal](https://github.com/tc39/proposal-bigint)) | `100n` |
| `optionalCatchBinding` ([proposal](https://github.com/babel/proposals/issues/7)) | `try {throw 0;} catch{do();}` |
| `throwExpressions` ([proposal](https://github.com/babel/proposals/issues/23)) | `() => throw new Error("")` |
| `pipelineOperator` ([proposal](https://github.com/babel/proposals/issues/29)) | `a \|> b` |
| `nullishCoalescingOperator` ([proposal](https://github.com/babel/proposals/issues/14)) | `a ?? b` |

### FAQ

#### Will the Babel parser support a plugin system?

Previous issues: [#1351](https://github.com/babel/babel/issues/1351), [#6694](https://github.com/babel/babel/issues/6694).

We currently aren't willing to commit to supporting the API for plugins or the resulting ecosystem (there is already enough work maintaining Babel's own plugin system). It's not clear how to make that API effective, and it would limit our ability to refactor and optimize the codebase.

Our current recommendation for those that want to create their own custom syntax is for users to fork the parser.

To consume your custom parser, you can add to your `.babelrc` via its npm package name or require it if using JavaScript,

```json
{
  "parserOpts": {
    "parser": "custom-fork-of-babel-parser-on-npm-here"
  }
}
```
