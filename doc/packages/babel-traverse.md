# Scope

[Needs description]

**Parameters**

-   `path` **NodePath** 
-   `parentScope` **Scope** 

## constructor

This searches the current "scope" and collects all references/bindings
within.

**Parameters**

-   `path` **NodePath** 
-   `parentScope` **Scope** 

## Scope.prototype.addGlobal

[Needs description]

**Parameters**

-   `node` **Object** 

## Scope.prototype.bindingIdentifierEquals

[Needs description]

**Parameters**

-   `name` **string** 
-   `node` **Object** 

Returns **boolean** 

## Scope.prototype.buildUndefinedNode

[Needs description]

## Scope.prototype.checkBlockScopedCollisions

[Needs description]

**Parameters**

-   `local`  
-   `kind` **string** 
-   `name` **string** 
-   `id` **Object** 

## Scope.prototype.dump

[Needs description]

## Scope.prototype.generateDeclaredUidIdentifier

Generate a unique identifier and add it to the current scope.

**Parameters**

-   `name` **[string]**  (optional, default `"temp"`)

## Scope.prototype.generateUid

Generate a unique `_id1` binding.

**Parameters**

-   `name` **string** 

## Scope.prototype.generateUidIdentifier

Generate a unique identifier.

**Parameters**

-   `name` **string** 

## Scope.prototype.generateUidIdentifierBasedOnNode

Generate a unique identifier based on a node.

**Parameters**

-   `parent` **Object** 
-   `defaultName` **String** 

Returns **Object** 

## Scope.prototype.getAllBindings

Walks the scope tree and gathers **all** bindings.

Returns **Object** 

## Scope.prototype.getAllBindingsOfKind

Walks the scope tree and gathers all declarations of `kind`.

Returns **Object** 

## Scope.prototype.getBinding

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.getBindingIdentifier

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.getBlockParent

Walk up the scope tree until we hit either a BlockStatement/Loop/Program/Function/Switch or reach the
very top and hit Program.

## Scope.prototype.getData

Recursively walk up scope tree looking for the data `key`.

**Parameters**

-   `key`  

## Scope.prototype.getFunctionParent

Walk up the scope tree until we hit either a Function or reach the
very top and hit Program.

## Scope.prototype.getOwnBinding

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.getOwnBindingIdentifier

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.getProgramParent

Walk up to the top of the scope tree and get the `Program`.

## Scope.prototype.hasBinding

[Needs description]

**Parameters**

-   `name` **string** 
-   `noGlobals`  

## Scope.prototype.hasGlobal

[Needs description]

**Parameters**

-   `name` **string** 

Returns **boolean** 

## Scope.prototype.hasOwnBinding

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.hasReference

[Needs description]

**Parameters**

-   `name` **string** 

Returns **boolean** 

## Scope.prototype.hasUid

[Needs description]

**Parameters**

-   `name`  

Returns **boolean** 

## Scope.prototype.isStatic

Determine whether evaluating the specific input `node` is a consequenceless reference. ie.
evaluating it wont result in potentially arbitrary code from being ran. The following are
whitelisted and determined not to cause side effects:

-   `this` expressions
-   `super` expressions
-   Bound identifiers

**Parameters**

-   `node` **Object** 

Returns **boolean** 

## Scope.prototype.maybeGenerateMemoised

Possibly generate a memoised identifier if it is not static and has consequences.

**Parameters**

-   `node` **Object** 
-   `dontPush` **boolean** 

Returns **[Object]** 

## Scope.prototype.moveBindingTo

Move a binding of `name` to another `scope`.

**Parameters**

-   `name`  
-   `scope`  

## Scope.prototype.parentHasBinding

[Needs description]

**Parameters**

-   `name` **string** 
-   `noGlobals`  

## Scope.prototype.registerBinding

[Needs description]

**Parameters**

-   `kind` **string** 
-   `path` **NodePath** 
-   `bindingPath`   (optional, default `path`)

## Scope.prototype.registerConstantViolation

[Needs description]

**Parameters**

-   `path` **NodePath** 

## Scope.prototype.registerDeclaration

[Needs description]

**Parameters**

-   `path` **NodePath** 

## Scope.prototype.removeBinding

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.removeData

Recursively walk up scope tree looking for the data `key` and if it exists,
remove it.

**Parameters**

-   `key`  

## Scope.prototype.removeOwnBinding

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.rename

[Needs description]

**Parameters**

-   `oldName` **string** 
-   `newName` **string** 
-   `block`  

## Scope.prototype.setData

Set some arbitrary data on the current scope.

**Parameters**

-   `key`  
-   `val`  

## Scope.prototype.toArray

[Needs description]

**Parameters**

-   `node` **Object** 
-   `i` **number** 

## Scope.prototype.traverse

Traverse node with current scope and path.

**Parameters**

-   `node` **Object** 
-   `opts` **Object** 
-   `state`  

# Binding

This class is responsible for a binding inside of a scope.

It tracks the following:

-   Node path.
-   Amount of times referenced by other nodes.
-   Paths to nodes that reassign or modify this binding.
-   The kind of binding. (Is it a parameter, declaration etc)

**Parameters**

-   `$0`  
    -   `$0.existing`  
    -   `$0.identifier`  
    -   `$0.scope`  
    -   `$0.path`  
    -   `$0.kind`  

# binding.constant

[Needs description]

# binding.identifier

[Needs description]

# binding.kind

[Needs description]

# binding.path

[Needs description]

# binding.scope

[Needs description]

# traverse.cheap

[Needs description]

**Parameters**

-   `node`  
-   `enter`  

# traverse.clearNode

[Needs description]

**Parameters**

-   `node`  

# traverse.removeProperties

[Needs description]

**Parameters**

-   `tree`  

# nodePath.container

[Needs description]

# nodePath.inList

# nodePath.key

[Needs description]

# nodePath.listKey

[Needs description]

# nodePath.node

Node.

# nodePath.parent

Parent node.

# nodePath.parentKey

[Needs description]

# nodePath.parentPath

Parent path.

# NodePath.prototype.addComment

[Needs description]

**Parameters**

-   `type`  
-   `content`  
-   `line`  

# NodePath.prototype.addComments

Give node `comments` of the specified `type`.

**Parameters**

-   `type` **string** 
-   `comments` **Array** 

# NodePath.prototype.arrowFunctionToShadowed

[Needs description]

# NodePath.prototype.baseTypeStrictlyMatches

[Needs description]

**Parameters**

-   `right` **NodePath** 

# NodePath.prototype.canHaveVariableDeclarationOrExpression

This checks whether or now we're in one of the following positions:

  for (KEY in right);
  for (KEY;;);

This is because these spots allow VariableDeclarations AND normal expressions
so we need to tell the path replacement that it's ok to replace this with an
expression.

# NodePath.prototype.couldBeBaseType

[Needs description]

**Parameters**

-   `name` **string** 

Returns **boolean** 

# NodePath.prototype.ensureBlock

[Needs description]

# NodePath.prototype.equals

Check whether the path node `key` strict equals `value`.

**Parameters**

-   `key`  
-   `value`  

Returns **boolean** 

# NodePath.prototype.evaluate

Walk the input `node` and statically evaluate it.

Returns an object in the form `{ confident, value }`. `confident` indicates
whether or not we had to drop out of evaluating the expression because of
hitting an unknown node that we couldn't confidently find the value of.

Example:

  t.evaluate(parse("5 + 5")) // { confident: true, value: 10 }
  t.evaluate(parse("!true")) // { confident: true, value: false }
  t.evaluate(parse("foo + foo")) // { confident: false, value: undefined }

Returns **Object** 

# NodePath.prototype.evaluateTruthy

Walk the input `node` and statically evaluate if it's truthy.

Returning `true` when we're sure that the expression will evaluate to a
truthy value, `false` if we're sure that it will evaluate to a falsy
value and `undefined` if we aren't sure. Because of this please do not
rely on coercion when using this method and check with === if it's false.

For example do:

  if (t.evaluateTruthy(node) === false) falsyLogic();

**AND NOT**

  if (!t.evaluateTruthy(node)) falsyLogic();

Returns **boolean** 

# NodePath.prototype.find

[Needs description]

**Parameters**

-   `callback`  

# NodePath.prototype.findParent

Call the provided `callback` with the `NodePath`s of all the parents.
When the `callback` returns a truthy value, we return that node path.

**Parameters**

-   `callback`  

# NodePath.prototype.get

[Needs description]

**Parameters**

-   `key` **string** 
-   `context` **boolean or TraversalContext** 

Returns **NodePath** 

# NodePath.prototype.getAncestry

Build an array of node paths containing the entire ancestry of the current node path.

NOTE: The current node path is included in this.

# NodePath.prototype.getBindingIdentifiers

[Needs description]

**Parameters**

-   `duplicates`  

# NodePath.prototype.getCompletionRecords

[Needs description]

Returns **Array** 

# NodePath.prototype.getDeepestCommonAncestorFrom

Get the earliest path in the tree where the provided `paths` intersect.

TODO: Possible optimisation target.

**Parameters**

-   `paths` **Array&lt;NodePath&gt;** 
-   `filter` **Function** 

Returns **NodePath** 

# NodePath.prototype.getEarliestCommonAncestorFrom

Get the deepest common ancestor and then from it, get the earliest relationship path
to that ancestor.

Earliest is defined as being "before" all the other nodes in terms of list container
position and visiting key.

**Parameters**

-   `paths` **Array&lt;NodePath&gt;** 

Returns **NodePath** 

# NodePath.prototype.getFunctionParent

Get the parent function of the current path.

# NodePath.prototype.getOpposite

[Needs description]

# NodePath.prototype.getOuterBindingIdentifiers

[Needs description]

**Parameters**

-   `duplicates`  

# NodePath.prototype.getSibling

[Needs description]

**Parameters**

-   `key`  

# NodePath.prototype.getSource

Get the source code associated with this node.

# NodePath.prototype.getStatementParent

Walk up the tree until we hit a parent node path in a list.

# NodePath.prototype.getStatementParent

[Needs description]

Returns **[NodePath]** 

# NodePath.prototype.getTypeAnnotation

Infer the type of the current `NodePath`.

Returns **Object** 

# NodePath.prototype.has

Check whether we have the input `key`. If the `key` references an array then
we check if the array has any items, otherwise we just check if it's falsy.

**Parameters**

-   `key`  

Returns **boolean** 

# NodePath.prototype.hoist

Hoist the current node to the highest scope possible and return a UID
referencing it.

**Parameters**

-   `scope`   (optional, default `this.scope`)

# NodePath.prototype.insertAfter

Insert the provided nodes after the current one. When inserting nodes after an
expression, ensure that the completion record is correct by pushing the current node.

**Parameters**

-   `nodes`  

# NodePath.prototype.insertBefore

Insert the provided nodes before the current one.

**Parameters**

-   `nodes`  

# NodePath.prototype.inShadow

Check if we're inside a shadowed function.

**Parameters**

-   `key`  

# NodePath.prototype.inType

[Needs description]

# NodePath.prototype.isBaseType

[Needs description]

**Parameters**

-   `baseName` **string** 
-   `soft` **boolean** 

Returns **boolean** 

# NodePath.prototype.isCompletionRecord

Check whether the current path references a completion record

**Parameters**

-   `allowInsideFunction`  

# NodePath.prototype.isGenericType

[Needs description]

**Parameters**

-   `genericName` **string** 

Returns **boolean** 

# NodePath.prototype.isNodeType

Check the type against our stored internal type of the node. This is handy
when a node has been removed yet we still internally know the type and need
it to calculate node replacement.

**Parameters**

-   `type` **string** 

Returns **boolean** 

# NodePath.prototype.isnt

Opposite of `has`.

**Parameters**

-   `key`  

Returns **boolean** 

# NodePath.prototype.isStatementOrBlock

Check whether or not the current `key` allows either a single statement or
block statement so we can explode it if necessary.

# NodePath.prototype.isStatic

[Needs description]

# NodePath.prototype.matchesPattern

Match the current node if it matches the provided `pattern`.

For example, given the match `React.createClass` it would match the
parsed nodes of `React.createClass` and `React["createClass"]`.

**Parameters**

-   `pattern` **string** 
-   `allowPartial` **boolean** 

Returns **boolean** 

# NodePath.prototype.pushContainer

[Needs description]

**Parameters**

-   `listKey`  
-   `nodes`  

# NodePath.prototype.referencesImport

Check if the currently assigned path references the `importName` of
`moduleSource`.

**Parameters**

-   `moduleSource`  
-   `importName`  

# NodePath.prototype.remove

[Needs description]

# NodePath.prototype.replaceExpressionWithStatements

This method takes an array of statements nodes and then explodes it
into expressions. This method retains completion records which is
extremely important to retain original semantics.

**Parameters**

-   `nodes` **Array&lt;Object&gt;** 

# NodePath.prototype.replaceInline

[Needs description]

**Parameters**

-   `nodes` **Object or Array&lt;Object&gt;** 

# NodePath.prototype.replaceWith

Replace the current node with another.

**Parameters**

-   `replacement`  

# NodePath.prototype.replaceWithMultiple

Replace a node with an array of multiple. This method performs the following steps:

-   Inherit the comments of first provided node with that of the current node.
-   Insert the provided nodes after the current node.
-   Remove the current node.

**Parameters**

-   `nodes` **Array&lt;Object&gt;** 

# NodePath.prototype.replaceWithSourceString

Parse a string as an expression and replace the current node with the result.

NOTE: This is typically not a good idea to use. Building source strings when
transforming ASTs is an antipattern and SHOULD NOT be encouraged. Even if it's
easier to use, your transforms will be extremely brittle.

**Parameters**

-   `replacement`  

# NodePath.prototype.resolve

Resolve a "pointer" `NodePath` to it's absolute path.

**Parameters**

-   `dangerous`  
-   `resolved`  

# NodePath.prototype.shareCommentsWithSiblings

Share comments amongst siblings.

# NodePath.prototype.toComputedKey

[Needs description]

Returns **Object** 

# NodePath.prototype.unshiftContainer

[Needs description]

**Parameters**

-   `listKey`  
-   `nodes`  

# NodePath.prototype.updateSiblingKeys

Update all sibling node paths after `fromIndex` by `incrementBy`.

**Parameters**

-   `fromIndex`  
-   `incrementBy`  

# NodePath.prototype.willIMaybeExecuteBefore

[Needs description]

**Parameters**

-   `target`  

# nodePath.removed

Has the node been removed?

# nodePath.scope

Scope.

# traverse.visitors.explode

[Needs description]

**Parameters**

-   `visitor`  

# traverse.visitors.merge

[Needs description]

**Parameters**

-   `visitors` **Array** 
-   `states` **[Array]**  (optional, default `[]`)

# traverse.visitors.verify

[Needs description]

**Parameters**

-   `visitor`  
