# Scope

[packages/babel-traverse/src/scope/index.js:178-1142](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L178-L1142 "Source code on GitHub")

[Needs description]

**Parameters**

-   `path` **NodePath** 
-   `parentScope` **Scope** 

## constructor

[packages/babel-traverse/src/scope/index.js:185-200](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L185-L200 "Source code on GitHub")

This searches the current "scope" and collects all references/bindings
within.

**Parameters**

-   `path` **NodePath** 
-   `parentScope` **Scope** 

## Scope.prototype.addGlobal

[packages/babel-traverse/src/scope/index.js:622-624](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L622-L624 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node` **Object** 

## Scope.prototype.bindingIdentifierEquals

[packages/babel-traverse/src/scope/index.js:1009-1011](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1009-L1011 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 
-   `node` **Object** 

Returns **boolean** 

## Scope.prototype.buildUndefinedNode

[packages/babel-traverse/src/scope/index.js:550-556](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L550-L556 "Source code on GitHub")

[Needs description]

## Scope.prototype.checkBlockScopedCollisions

[packages/babel-traverse/src/scope/index.js:395-413](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L395-L413 "Source code on GitHub")

[Needs description]

**Parameters**

-   `local`  
-   `kind` **string** 
-   `name` **string** 
-   `id` **Object** 

## Scope.prototype.dump

[packages/babel-traverse/src/scope/index.js:446-463](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L446-L463 "Source code on GitHub")

[Needs description]

## Scope.prototype.generateDeclaredUidIdentifier

[packages/babel-traverse/src/scope/index.js:237-241](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L237-L241 "Source code on GitHub")

Generate a unique identifier and add it to the current scope.

**Parameters**

-   `name` **[string]**  (optional, default `"temp"`)

## Scope.prototype.generateUid

[packages/babel-traverse/src/scope/index.js:259-274](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L259-L274 "Source code on GitHub")

Generate a unique `_id1` binding.

**Parameters**

-   `name` **string** 

## Scope.prototype.generateUidIdentifier

[packages/babel-traverse/src/scope/index.js:249-251](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L249-L251 "Source code on GitHub")

Generate a unique identifier.

**Parameters**

-   `name` **string** 

## Scope.prototype.generateUidIdentifierBasedOnNode

[packages/babel-traverse/src/scope/index.js:293-341](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L293-L341 "Source code on GitHub")

Generate a unique identifier based on a node.

**Parameters**

-   `parent` **Object** 
-   `defaultName` **String** 

Returns **Object** 

## Scope.prototype.getAllBindings

[packages/babel-traverse/src/scope/index.js:968-978](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L968-L978 "Source code on GitHub")

Walks the scope tree and gathers **all** bindings.

Returns **Object** 

## Scope.prototype.getAllBindingsOfKind

[packages/babel-traverse/src/scope/index.js:986-1001](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L986-L1001 "Source code on GitHub")

Walks the scope tree and gathers all declarations of `kind`.

Returns **Object** 

## Scope.prototype.getBinding

[packages/babel-traverse/src/scope/index.js:1019-1026](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1019-L1026 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.getBindingIdentifier

[packages/babel-traverse/src/scope/index.js:1044-1047](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1044-L1047 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.getBlockParent

[packages/babel-traverse/src/scope/index.js:952-960](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L952-L960 "Source code on GitHub")

Walk up the scope tree until we hit either a BlockStatement/Loop/Program/Function/Switch or reach the
very top and hit Program.

## Scope.prototype.getData

[packages/babel-traverse/src/scope/index.js:733-739](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L733-L739 "Source code on GitHub")

Recursively walk up scope tree looking for the data `key`.

**Parameters**

-   `key`  

## Scope.prototype.getFunctionParent

[packages/babel-traverse/src/scope/index.js:935-943](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L935-L943 "Source code on GitHub")

Walk up the scope tree until we hit either a Function or reach the
very top and hit Program.

## Scope.prototype.getOwnBinding

[packages/babel-traverse/src/scope/index.js:1034-1036](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1034-L1036 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.getOwnBindingIdentifier

[packages/babel-traverse/src/scope/index.js:1055-1058](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1055-L1058 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.getProgramParent

[packages/babel-traverse/src/scope/index.js:918-926](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L918-L926 "Source code on GitHub")

Walk up to the top of the scope tree and get the `Program`.

## Scope.prototype.hasBinding

[packages/babel-traverse/src/scope/index.js:1076-1084](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1076-L1084 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 
-   `noGlobals`  

## Scope.prototype.hasGlobal

[packages/babel-traverse/src/scope/index.js:648-656](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L648-L656 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

Returns **boolean** 

## Scope.prototype.hasOwnBinding

[packages/babel-traverse/src/scope/index.js:1066-1068](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1066-L1068 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.hasReference

[packages/babel-traverse/src/scope/index.js:664-672](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L664-L672 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

Returns **boolean** 

## Scope.prototype.hasUid

[packages/babel-traverse/src/scope/index.js:632-640](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L632-L640 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name`  

Returns **boolean** 

## Scope.prototype.isStatic

[packages/babel-traverse/src/scope/index.js:356-371](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L356-L371 "Source code on GitHub")

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

[packages/babel-traverse/src/scope/index.js:379-387](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L379-L387 "Source code on GitHub")

Possibly generate a memoised identifier if it is not static and has consequences.

**Parameters**

-   `node` **Object** 
-   `dontPush` **boolean** 

Returns **[Object]** 

## Scope.prototype.moveBindingTo

[packages/babel-traverse/src/scope/index.js:1102-1109](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1102-L1109 "Source code on GitHub")

Move a binding of `name` to another `scope`.

**Parameters**

-   `name`  
-   `scope`  

## Scope.prototype.parentHasBinding

[packages/babel-traverse/src/scope/index.js:1092-1094](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1092-L1094 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 
-   `noGlobals`  

## Scope.prototype.registerBinding

[packages/babel-traverse/src/scope/index.js:578-614](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L578-L614 "Source code on GitHub")

[Needs description]

**Parameters**

-   `kind` **string** 
-   `path` **NodePath** 
-   `bindingPath`   (optional, default `path`)

## Scope.prototype.registerConstantViolation

[packages/babel-traverse/src/scope/index.js:564-570](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L564-L570 "Source code on GitHub")

[Needs description]

**Parameters**

-   `path` **NodePath** 

## Scope.prototype.registerDeclaration

[packages/babel-traverse/src/scope/index.js:517-542](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L517-L542 "Source code on GitHub")

[Needs description]

**Parameters**

-   `path` **NodePath** 

## Scope.prototype.removeBinding

[packages/babel-traverse/src/scope/index.js:1127-1141](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1127-L1141 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.removeData

[packages/babel-traverse/src/scope/index.js:748-754](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L748-L754 "Source code on GitHub")

Recursively walk up scope tree looking for the data `key` and if it exists,
remove it.

**Parameters**

-   `key`  

## Scope.prototype.removeOwnBinding

[packages/babel-traverse/src/scope/index.js:1117-1119](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L1117-L1119 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

## Scope.prototype.rename

[packages/babel-traverse/src/scope/index.js:421-427](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L421-L427 "Source code on GitHub")

[Needs description]

**Parameters**

-   `oldName` **string** 
-   `newName` **string** 
-   `block`  

## Scope.prototype.setData

[packages/babel-traverse/src/scope/index.js:723-725](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L723-L725 "Source code on GitHub")

Set some arbitrary data on the current scope.

**Parameters**

-   `key`  
-   `val`  

## Scope.prototype.toArray

[packages/babel-traverse/src/scope/index.js:471-509](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L471-L509 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node` **Object** 
-   `i` **number** 

## Scope.prototype.traverse

[packages/babel-traverse/src/scope/index.js:227-229](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/index.js#L227-L229 "Source code on GitHub")

Traverse node with current scope and path.

**Parameters**

-   `node` **Object** 
-   `opts` **Object** 
-   `state`  

# Binding

[packages/babel-traverse/src/scope/binding.js:16-152](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/binding.js#L16-L152 "Source code on GitHub")

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

[packages/babel-traverse/src/scope/binding.js:62-62](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/binding.js#L62-L62 "Source code on GitHub")

[Needs description]

# binding.identifier

[packages/babel-traverse/src/scope/binding.js:26-26](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/binding.js#L26-L26 "Source code on GitHub")

[Needs description]

# binding.kind

[packages/babel-traverse/src/scope/binding.js:53-53](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/binding.js#L53-L53 "Source code on GitHub")

[Needs description]

# binding.path

[packages/babel-traverse/src/scope/binding.js:44-44](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/binding.js#L44-L44 "Source code on GitHub")

[Needs description]

# binding.scope

[packages/babel-traverse/src/scope/binding.js:35-35](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/scope/binding.js#L35-L35 "Source code on GitHub")

[Needs description]

# traverse.cheap

[packages/babel-traverse/src/index.js:47-66](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/index.js#L47-L66 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node`  
-   `enter`  

# traverse.clearNode

[packages/babel-traverse/src/index.js:95-108](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/index.js#L95-L108 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node`  

# traverse.removeProperties

[packages/babel-traverse/src/index.js:116-119](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/index.js#L116-L119 "Source code on GitHub")

[Needs description]

**Parameters**

-   `tree`  

# nodePath.container

[packages/babel-traverse/src/path/index.js:55-55](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L55-L55 "Source code on GitHub")

[Needs description]

# nodePath.inList

[packages/babel-traverse/src/path/index.js:72-72](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L72-L72 "Source code on GitHub")

# nodePath.key

[packages/babel-traverse/src/path/index.js:90-90](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L90-L90 "Source code on GitHub")

[Needs description]

# nodePath.listKey

[packages/babel-traverse/src/path/index.js:64-64](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L64-L64 "Source code on GitHub")

[Needs description]

# nodePath.node

[packages/babel-traverse/src/path/index.js:99-99](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L99-L99 "Source code on GitHub")

Node.

# nodePath.parent

[packages/babel-traverse/src/path/index.js:28-28](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L28-L28 "Source code on GitHub")

Parent node.

# nodePath.parentKey

[packages/babel-traverse/src/path/index.js:81-81](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L81-L81 "Source code on GitHub")

[Needs description]

# nodePath.parentPath

[packages/babel-traverse/src/path/index.js:46-46](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L46-L46 "Source code on GitHub")

Parent path.

# NodePath.prototype.addComment

[packages/babel-traverse/src/path/comments.js:33-38](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/comments.js#L33-L38 "Source code on GitHub")

[Needs description]

**Parameters**

-   `type`  
-   `content`  
-   `line`  

# NodePath.prototype.addComments

[packages/babel-traverse/src/path/comments.js:46-59](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/comments.js#L46-L59 "Source code on GitHub")

Give node `comments` of the specified `type`.

**Parameters**

-   `type` **string** 
-   `comments` **Array** 

# NodePath.prototype.arrowFunctionToShadowed

[packages/babel-traverse/src/path/conversion.js:46-56](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/conversion.js#L46-L56 "Source code on GitHub")

[Needs description]

# NodePath.prototype.baseTypeStrictlyMatches

[packages/babel-traverse/src/path/inference/index.js:128-135](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/inference/index.js#L128-L135 "Source code on GitHub")

[Needs description]

**Parameters**

-   `right` **NodePath** 

# NodePath.prototype.canHaveVariableDeclarationOrExpression

[packages/babel-traverse/src/path/introspection.js:147-149](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L147-L149 "Source code on GitHub")

This checks whether or now we're in one of the following positions:

  for (KEY in right);
  for (KEY;;);

This is because these spots allow VariableDeclarations AND normal expressions
so we need to tell the path replacement that it's ok to replace this with an
expression.

# NodePath.prototype.couldBeBaseType

[packages/babel-traverse/src/path/inference/index.js:106-120](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/inference/index.js#L106-L120 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

Returns **boolean** 

# NodePath.prototype.ensureBlock

[packages/babel-traverse/src/path/conversion.js:36-38](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/conversion.js#L36-L38 "Source code on GitHub")

[Needs description]

# NodePath.prototype.equals

[packages/babel-traverse/src/path/introspection.js:117-119](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L117-L119 "Source code on GitHub")

Check whether the path node `key` strict equals `value`.

**Parameters**

-   `key`  
-   `value`  

Returns **boolean** 

# NodePath.prototype.evaluate

[packages/babel-traverse/src/path/evaluation.js:52-291](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/evaluation.js#L52-L291 "Source code on GitHub")

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

[packages/babel-traverse/src/path/evaluation.js:30-33](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/evaluation.js#L30-L33 "Source code on GitHub")

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

[packages/babel-traverse/src/path/ancestry.js:27-33](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/ancestry.js#L27-L33 "Source code on GitHub")

[Needs description]

**Parameters**

-   `callback`  

# NodePath.prototype.findParent

[packages/babel-traverse/src/path/ancestry.js:13-19](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/ancestry.js#L13-L19 "Source code on GitHub")

Call the provided `callback` with the `NodePath`s of all the parents.
When the `callback` returns a truthy value, we return that node path.

**Parameters**

-   `callback`  

# NodePath.prototype.get

[packages/babel-traverse/src/path/family.js:100-108](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/family.js#L100-L108 "Source code on GitHub")

[Needs description]

**Parameters**

-   `key` **string** 
-   `context` **boolean or TraversalContext** 

Returns **NodePath** 

# NodePath.prototype.getAncestry

[packages/babel-traverse/src/path/ancestry.js:186-193](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/ancestry.js#L186-L193 "Source code on GitHub")

Build an array of node paths containing the entire ancestry of the current node path.

NOTE: The current node path is included in this.

# NodePath.prototype.getBindingIdentifiers

[packages/babel-traverse/src/path/family.js:165-167](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/family.js#L165-L167 "Source code on GitHub")

[Needs description]

**Parameters**

-   `duplicates`  

# NodePath.prototype.getCompletionRecords

[packages/babel-traverse/src/path/family.js:51-76](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/family.js#L51-L76 "Source code on GitHub")

[Needs description]

Returns **Array** 

# NodePath.prototype.getDeepestCommonAncestorFrom

[packages/babel-traverse/src/path/ancestry.js:116-175](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/ancestry.js#L116-L175 "Source code on GitHub")

Get the earliest path in the tree where the provided `paths` intersect.

TODO: Possible optimisation target.

**Parameters**

-   `paths` **Array&lt;NodePath&gt;** 
-   `filter` **Function** 

Returns **NodePath** 

# NodePath.prototype.getEarliestCommonAncestorFrom

[packages/babel-traverse/src/path/ancestry.js:71-105](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/ancestry.js#L71-L105 "Source code on GitHub")

Get the deepest common ancestor and then from it, get the earliest relationship path
to that ancestor.

Earliest is defined as being "before" all the other nodes in terms of list container
position and visiting key.

**Parameters**

-   `paths` **Array&lt;NodePath&gt;** 

Returns **NodePath** 

# NodePath.prototype.getFunctionParent

[packages/babel-traverse/src/path/ancestry.js:41-43](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/ancestry.js#L41-L43 "Source code on GitHub")

Get the parent function of the current path.

# NodePath.prototype.getOpposite

[packages/babel-traverse/src/path/family.js:37-43](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/family.js#L37-L43 "Source code on GitHub")

[Needs description]

# NodePath.prototype.getOuterBindingIdentifiers

[packages/babel-traverse/src/path/family.js:175-177](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/family.js#L175-L177 "Source code on GitHub")

[Needs description]

**Parameters**

-   `duplicates`  

# NodePath.prototype.getSibling

[packages/babel-traverse/src/path/family.js:84-92](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/family.js#L84-L92 "Source code on GitHub")

[Needs description]

**Parameters**

-   `key`  

# NodePath.prototype.getSource

[packages/babel-traverse/src/path/introspection.js:241-248](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L241-L248 "Source code on GitHub")

Get the source code associated with this node.

# NodePath.prototype.getStatementParent

[packages/babel-traverse/src/path/ancestry.js:51-58](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/ancestry.js#L51-L58 "Source code on GitHub")

Walk up the tree until we hit a parent node path in a list.

# NodePath.prototype.getStatementParent

[packages/babel-traverse/src/path/family.js:13-29](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/family.js#L13-L29 "Source code on GitHub")

[Needs description]

Returns **[NodePath]** 

# NodePath.prototype.getTypeAnnotation

[packages/babel-traverse/src/path/inference/index.js:11-17](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/inference/index.js#L11-L17 "Source code on GitHub")

Infer the type of the current `NodePath`.

Returns **Object** 

# NodePath.prototype.has

[packages/babel-traverse/src/path/introspection.js:75-82](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L75-L82 "Source code on GitHub")

Check whether we have the input `key`. If the `key` references an array then
we check if the array has any items, otherwise we just check if it's falsy.

**Parameters**

-   `key`  

Returns **boolean** 

# NodePath.prototype.hoist

[packages/babel-traverse/src/path/modification.js:262-265](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/modification.js#L262-L265 "Source code on GitHub")

Hoist the current node to the highest scope possible and return a UID
referencing it.

**Parameters**

-   `scope`   (optional, default `this.scope`)

# NodePath.prototype.insertAfter

[packages/babel-traverse/src/path/modification.js:122-149](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/modification.js#L122-L149 "Source code on GitHub")

Insert the provided nodes after the current one. When inserting nodes after an
expression, ensure that the completion record is correct by pushing the current node.

**Parameters**

-   `nodes`  

# NodePath.prototype.insertBefore

[packages/babel-traverse/src/path/modification.js:14-37](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/modification.js#L14-L37 "Source code on GitHub")

Insert the provided nodes before the current one.

**Parameters**

-   `nodes`  

# NodePath.prototype.inShadow

[packages/babel-traverse/src/path/ancestry.js:219-242](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/ancestry.js#L219-L242 "Source code on GitHub")

Check if we're inside a shadowed function.

**Parameters**

-   `key`  

# NodePath.prototype.inType

[packages/babel-traverse/src/path/ancestry.js:201-211](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/ancestry.js#L201-L211 "Source code on GitHub")

[Needs description]

# NodePath.prototype.isBaseType

[packages/babel-traverse/src/path/inference/index.js:70-72](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/inference/index.js#L70-L72 "Source code on GitHub")

[Needs description]

**Parameters**

-   `baseName` **string** 
-   `soft` **boolean** 

Returns **boolean** 

# NodePath.prototype.isCompletionRecord

[packages/babel-traverse/src/path/introspection.js:157-179](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L157-L179 "Source code on GitHub")

Check whether the current path references a completion record

**Parameters**

-   `allowInsideFunction`  

# NodePath.prototype.isGenericType

[packages/babel-traverse/src/path/inference/index.js:143-146](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/inference/index.js#L143-L146 "Source code on GitHub")

[Needs description]

**Parameters**

-   `genericName` **string** 

Returns **boolean** 

# NodePath.prototype.isNodeType

[packages/babel-traverse/src/path/introspection.js:129-131](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L129-L131 "Source code on GitHub")

Check the type against our stored internal type of the node. This is handy
when a node has been removed yet we still internally know the type and need
it to calculate node replacement.

**Parameters**

-   `type` **string** 

Returns **boolean** 

# NodePath.prototype.isnt

[packages/babel-traverse/src/path/introspection.js:107-109](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L107-L109 "Source code on GitHub")

Opposite of `has`.

**Parameters**

-   `key`  

Returns **boolean** 

# NodePath.prototype.isStatementOrBlock

[packages/babel-traverse/src/path/introspection.js:188-194](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L188-L194 "Source code on GitHub")

Check whether or not the current `key` allows either a single statement or
block statement so we can explode it if necessary.

# NodePath.prototype.isStatic

[packages/babel-traverse/src/path/introspection.js:90-92](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L90-L92 "Source code on GitHub")

[Needs description]

# NodePath.prototype.matchesPattern

[packages/babel-traverse/src/path/introspection.js:17-66](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L17-L66 "Source code on GitHub")

Match the current node if it matches the provided `pattern`.

For example, given the match `React.createClass` it would match the
parsed nodes of `React.createClass` and `React["createClass"]`.

**Parameters**

-   `pattern` **string** 
-   `allowPartial` **boolean** 

Returns **boolean** 

# NodePath.prototype.pushContainer

[packages/babel-traverse/src/path/modification.js:235-253](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/modification.js#L235-L253 "Source code on GitHub")

[Needs description]

**Parameters**

-   `listKey`  
-   `nodes`  

# NodePath.prototype.referencesImport

[packages/babel-traverse/src/path/introspection.js:203-233](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L203-L233 "Source code on GitHub")

Check if the currently assigned path references the `importName` of
`moduleSource`.

**Parameters**

-   `moduleSource`  
-   `importName`  

# NodePath.prototype.remove

[packages/babel-traverse/src/path/removal.js:11-24](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/removal.js#L11-L24 "Source code on GitHub")

[Needs description]

# NodePath.prototype.replaceExpressionWithStatements

[packages/babel-traverse/src/path/replacement.js:188-237](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/replacement.js#L188-L237 "Source code on GitHub")

This method takes an array of statements nodes and then explodes it
into expressions. This method retains completion records which is
extremely important to retain original semantics.

**Parameters**

-   `nodes` **Array&lt;Object&gt;** 

# NodePath.prototype.replaceInline

[packages/babel-traverse/src/path/replacement.js:245-259](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/replacement.js#L245-L259 "Source code on GitHub")

[Needs description]

**Parameters**

-   `nodes` **Object or Array&lt;Object&gt;** 

# NodePath.prototype.replaceWith

[packages/babel-traverse/src/path/replacement.js:101-157](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/replacement.js#L101-L157 "Source code on GitHub")

Replace the current node with another.

**Parameters**

-   `replacement`  

# NodePath.prototype.replaceWithMultiple

[packages/babel-traverse/src/path/replacement.js:47-61](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/replacement.js#L47-L61 "Source code on GitHub")

Replace a node with an array of multiple. This method performs the following steps:

-   Inherit the comments of first provided node with that of the current node.
-   Insert the provided nodes after the current node.
-   Remove the current node.

**Parameters**

-   `nodes` **Array&lt;Object&gt;** 

# NodePath.prototype.replaceWithSourceString

[packages/babel-traverse/src/path/replacement.js:74-92](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/replacement.js#L74-L92 "Source code on GitHub")

Parse a string as an expression and replace the current node with the result.

NOTE: This is typically not a good idea to use. Building source strings when
transforming ASTs is an antipattern and SHOULD NOT be encouraged. Even if it's
easier to use, your transforms will be extremely brittle.

**Parameters**

-   `replacement`  

# NodePath.prototype.resolve

[packages/babel-traverse/src/path/introspection.js:380-382](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L380-L382 "Source code on GitHub")

Resolve a "pointer" `NodePath` to it's absolute path.

**Parameters**

-   `dangerous`  
-   `resolved`  

# NodePath.prototype.shareCommentsWithSiblings

[packages/babel-traverse/src/path/comments.js:9-25](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/comments.js#L9-L25 "Source code on GitHub")

Share comments amongst siblings.

# NodePath.prototype.toComputedKey

[packages/babel-traverse/src/path/conversion.js:11-28](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/conversion.js#L11-L28 "Source code on GitHub")

[Needs description]

Returns **Object** 

# NodePath.prototype.unshiftContainer

[packages/babel-traverse/src/path/modification.js:211-227](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/modification.js#L211-L227 "Source code on GitHub")

[Needs description]

**Parameters**

-   `listKey`  
-   `nodes`  

# NodePath.prototype.updateSiblingKeys

[packages/babel-traverse/src/path/modification.js:157-167](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/modification.js#L157-L167 "Source code on GitHub")

Update all sibling node paths after `fromIndex` by `incrementBy`.

**Parameters**

-   `fromIndex`  
-   `incrementBy`  

# NodePath.prototype.willIMaybeExecuteBefore

[packages/babel-traverse/src/path/introspection.js:256-258](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/introspection.js#L256-L258 "Source code on GitHub")

[Needs description]

**Parameters**

-   `target`  

# nodePath.removed

[packages/babel-traverse/src/path/index.js:37-37](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L37-L37 "Source code on GitHub")

Has the node been removed?

# nodePath.scope

[packages/babel-traverse/src/path/index.js:108-108](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/path/index.js#L108-L108 "Source code on GitHub")

Scope.

# traverse.visitors.explode

[packages/babel-traverse/src/visitors.js:11-109](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/visitors.js#L11-L109 "Source code on GitHub")

[Needs description]

**Parameters**

-   `visitor`  

# traverse.visitors.merge

[packages/babel-traverse/src/visitors.js:164-185](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/visitors.js#L164-L185 "Source code on GitHub")

[Needs description]

**Parameters**

-   `visitors` **Array** 
-   `states` **[Array]**  (optional, default `[]`)

# traverse.visitors.verify

[packages/babel-traverse/src/visitors.js:116-148](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-traverse/src/visitors.js#L116-L148 "Source code on GitHub")

[Needs description]

**Parameters**

-   `visitor`  
