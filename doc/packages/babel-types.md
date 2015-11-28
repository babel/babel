# t.appendToMemberExpression

Append a node to a member expression.

**Parameters**

-   `member` **Object** 
-   `append` **Object** 
-   `computed` **boolean** 

Returns **Object** 

# t.assertNode

[Needs description]

**Parameters**

-   `node`  

# t.buildChildren

[Needs description]

**Parameters**

-   `node` **Object** 

Returns **Array&lt;Object&gt;** 

# t.buildMatchMemberExpression

Build a function that when called will return whether or not the
input `node` `MemberExpression` matches the input `match`.

For example, given the match `React.createClass` it would match the
parsed nodes of `React.createClass` and `React["createClass"]`.

**Parameters**

-   `match` **string** 
-   `allowPartial` **boolean** 

Returns **Function** 

# t.clone

Create a shallow clone of a `node` excluding `_private` properties.

**Parameters**

-   `node` **Object** 

Returns **Object** 

# t.cloneDeep

Create a deep clone of a `node` and all of it's child nodes
exluding `_private` properties.

**Parameters**

-   `node` **Object** 

Returns **Object** 

# t.createTypeAnnotationBasedOnTypeof

Create a type anotation based on typeof expression.

**Parameters**

-   `type` **string** 

# t.createUnionTypeAnnotation

Takes an array of `types` and flattens them, removing duplicates and
returns a `UnionTypeAnnotation` node containg them.

**Parameters**

-   `types` **Array&lt;Object&gt;** 

# t.ensureBlock

Ensure the `key` (defaults to "body") of a `node` is a block.
Casting it to a block if it is not.

**Parameters**

-   `node` **Object** 
-   `key` **[string]**  (optional, default `"body"`)

Returns **Object** 

# t.getBindingIdentifiers

Return a list of binding identifiers associated with the input `node`.

**Parameters**

-   `node` **Object** 
-   `duplicates` **boolean** 
-   `outerOnly` **boolean** 

Returns **Object** 

# t.getOuterBindingIdentifiers

[Needs description]

**Parameters**

-   `node` **Object** 
-   `duplicates` **boolean** 

Returns **Object** 

# t.inheritComments

Inherit all unique comments from `parent` node to `child` node.

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

Returns **Object** 

# t.inheritInnerComments

[Needs description]

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

# t.inheritLeadingComments

[Needs description]

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

# t.inherits

Inherit all contextual properties from `parent` node to `child` node.

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

Returns **Object** 

# t.inheritTrailingComments

[Needs description]

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

# t.is

Returns whether `node` is of given `type`.

For better performance, use this instead of `is[Type]` when `type` is unknown.
Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.

**Parameters**

-   `type` **string** 
-   `node` **Object** 
-   `opts` **Object** 

Returns **boolean** 

# t.isBinding

Check if the input `node` is a binding identifier.

**Parameters**

-   `node` **Object** 
-   `parent` **Object** 

Returns **boolean** 

# t.isBlockScoped

Check if the input `node` is block scoped.

**Parameters**

-   `node` **Object** 

Returns **boolean** 

# t.isCompatTag

Is a given string a valid non-component JSX tagName?

**Parameters**

-   `tagName` **string** The string to check

Returns **boolean** 

# t.isImmutable

Check if the input `node` is definitely immutable.

**Parameters**

-   `node` **Object** 

Returns **boolean** 

# t.isLet

Check if the input `node` is a `let` variable declaration.

**Parameters**

-   `node` **Object** 

Returns **boolean** 

# t.isNode

[Needs description]

**Parameters**

-   `node`  

Returns **boolean** 

# t.isReferenced

Check if the input `node` is a reference to a bound variable.

**Parameters**

-   `node` **Object** 
-   `parent` **Object** 

Returns **boolean** 

# t.isScope

Check if the input `node` is a scope.

**Parameters**

-   `node` **Object** 
-   `parent` **Object** 

Returns **boolean** 

# t.isSpecifierDefault

Check if the input `specifier` is a `default` import or export.

**Parameters**

-   `specifier` **Object** 

Returns **boolean** 

# t.isType

Test if a `nodeType` is a `targetType` or if `targetType` is an alias of `nodeType`.

**Parameters**

-   `nodeType` **string** 
-   `targetType` **string** 

Returns **boolean** 

# t.isValidIdentifier

Check if the input `name` is a valid identifier name
and isn't a reserved word.

**Parameters**

-   `name` **string** 

Returns **boolean** 

# t.isVar

Check if the input `node` is a variable declaration.

**Parameters**

-   `node` **Object** 

Returns **boolean** 

# t.prependToMemberExpression

Prepend a node to a member expression.

**Parameters**

-   `member` **Object** 
-   `prepend` **Object** 

Returns **Object** 

# t.removeComments

Remove comment properties from a node.

**Parameters**

-   `node` **Object** 

Returns **Object** 

# t.removeTypeDuplicates

Dedupe type annotations.

**Parameters**

-   `nodes` **Array&lt;Object&gt;** 

# t.shallowEqual

Test if an object is shallowly equal.

**Parameters**

-   `actual` **Object** 
-   `expected` **Object** 

Returns **boolean** 

# t.toBindingIdentifierName

[Needs description]

**Parameters**

-   `name` **string** 

Returns **string** 

# t.toBlock

[Needs description]

**Parameters**

-   `node`  
-   `parent` **Object** 

Returns **Object** 

# t.toComputedKey

[Needs description]

**Parameters**

-   `node` **Object** 
-   `key` **[Object]**  (optional, default `node.key || node.property`)

Returns **Object** 

# t.toExpression

[Needs description]

**Parameters**

-   `node` **Object** 

Returns **Object** 

# t.toIdentifier

[Needs description]

**Parameters**

-   `name` **string** 

Returns **string** 

# t.toKeyAlias

[Needs description]

**Parameters**

-   `node` **Object** 
-   `key` **[Object]**  (optional, default `node.key`)

Returns **string** 

# t.toKeyAlias.increment

[Needs description]

# t.toSequenceExpression

Turn an array of statement `nodes` into a `SequenceExpression`.

Variable declarations are turned into simple assignments and their
declarations hoisted to the top of the current scope.

Expression statements are just resolved to their expression.

**Parameters**

-   `nodes` **Array&lt;Object&gt;** 
-   `scope` **Scope** 

Returns **[Object]** 

# t.toStatement

[Needs description]

**Parameters**

-   `node` **Object** 
-   `ignore` **boolean** 

Returns **Object or boolean** 

# t.validate

[Needs description]

**Parameters**

-   `node` **Object** 
-   `key` **string** 
-   `val` **Any** 

# t.valueToNode

[Needs description]

**Parameters**

-   `value` **Any** 

Returns **Object** 
