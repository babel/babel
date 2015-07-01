# Properties of nodes
These are properties babel stores in AST node objects for internal use, as opposed to properties that are part of the AST spec ([ESTree](https://github.com/estree/estree) at the time of this writing).

## `_blockHoist`
`node._blockHoist != null` triggers the [block-hoist transformer](/src/babel/transformation/transformers/internal/block-hoist.js). Value should be `true` or an integer in the range `0..3`. `true` is equivalent to `2`. The value indicates whether the node should be hoisted and to what degree. See the source code for more detailed information.

## `_paths`
Stores a representation of a node's position in the tree and relationship to other nodes.

## `shadow`
A truthy value on a function node triggers the [shadow-functions transformer](/src/babel/transformation/transformers/internal/shadow-functions.js), which transforms the node so that it references (or inherits) `arguments` and the `this` context from the parent scope. It is invoked for arrow functions, for example.
