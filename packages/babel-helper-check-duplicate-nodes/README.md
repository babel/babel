# @babel/helper-check-duplicate-nodes

Duplicated AST nodes often lead to obscure bugs. This module checks your AST and
throws a helpful error if you include a duplicated node in your output. It's
useful when authoring babel transforms.

This piece of code was originally written by @nicolo-ribaudo and is included in
[@babel/helper-transform-fixture-test-runnner](https://github.com/babel/babel/blob/d383659ca6adec54b6054f77cdaa16da88e8a171/packages/babel-helper-transform-fixture-test-runner/src/index.js#L128).

## API

```js
import checkDuplicateNodes from "@babel/helper-check-duplicate-nodes";
checkDuplicateNodes(ast);
```
