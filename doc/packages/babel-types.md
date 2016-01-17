# t.appendToMemberExpression

[packages/babel-types/src/index.js:204-209](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L204-L209 "Source code on GitHub")

Append a node to a member expression.

**Parameters**

-   `member` **Object** 
-   `append` **Object** 
-   `computed` **boolean** 

Returns **Object** 

# t.assertNode

[packages/babel-types/src/index.js:434-438](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L434-L438 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node`  

# t.buildChildren

[packages/babel-types/src/react.js:68-86](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/react.js#L68-L86 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node` **Object** 

Returns **Array&lt;Object&gt;** 

# t.buildMatchMemberExpression

[packages/babel-types/src/index.js:288-333](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L288-L333 "Source code on GitHub")

Build a function that when called will return whether or not the
input `node` `MemberExpression` matches the input `match`.

For example, given the match `React.createClass` it would match the
parsed nodes of `React.createClass` and `React["createClass"]`.

**Parameters**

-   `match` **string** 
-   `allowPartial` **boolean** 

Returns **Function** 

# t.clone

[packages/babel-types/src/index.js:239-246](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L239-L246 "Source code on GitHub")

Create a shallow clone of a `node` excluding `_private` properties.

**Parameters**

-   `node` **Object** 

Returns **Object** 

# t.cloneDeep

[packages/babel-types/src/index.js:255-275](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L255-L275 "Source code on GitHub")

Create a deep clone of a `node` and all of it's child nodes
exluding `_private` properties.

**Parameters**

-   `node` **Object** 

Returns **Object** 

# t.createTypeAnnotationBasedOnTypeof

[packages/babel-types/src/flow.js:108-126](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/flow.js#L108-L126 "Source code on GitHub")

Create a type anotation based on typeof expression.

**Parameters**

-   `type` **string** 

# t.createUnionTypeAnnotation

[packages/babel-types/src/flow.js:10-18](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/flow.js#L10-L18 "Source code on GitHub")

Takes an array of `types` and flattens them, removing duplicates and
returns a `UnionTypeAnnotation` node containg them.

**Parameters**

-   `types` **Array&lt;Object&gt;** 

# t.ensureBlock

[packages/babel-types/src/index.js:229-231](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L229-L231 "Source code on GitHub")

Ensure the `key` (defaults to "body") of a `node` is a block.
Casting it to a block if it is not.

**Parameters**

-   `node` **Object** 
-   `key` **[string]**  (optional, default `"body"`)

Returns **Object** 

# t.getBindingIdentifiers

[packages/babel-types/src/retrievers.js:11-64](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/retrievers.js#L11-L64 "Source code on GitHub")

Return a list of binding identifiers associated with the input `node`.

**Parameters**

-   `node` **Object** 
-   `duplicates` **boolean** 
-   `outerOnly` **boolean** 

Returns **Object** 

# t.getOuterBindingIdentifiers

[packages/babel-types/src/retrievers.js:118-123](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/retrievers.js#L118-L123 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node` **Object** 
-   `duplicates` **boolean** 

Returns **Object** 

# t.inheritComments

[packages/babel-types/src/index.js:354-359](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L354-L359 "Source code on GitHub")

Inherit all unique comments from `parent` node to `child` node.

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

Returns **Object** 

# t.inheritInnerComments

[packages/babel-types/src/index.js:387-389](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L387-L389 "Source code on GitHub")

[Needs description]

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

# t.inheritLeadingComments

[packages/babel-types/src/index.js:377-379](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L377-L379 "Source code on GitHub")

[Needs description]

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

# t.inherits

[packages/babel-types/src/index.js:403-426](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L403-L426 "Source code on GitHub")

Inherit all contextual properties from `parent` node to `child` node.

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

Returns **Object** 

# t.inheritTrailingComments

[packages/babel-types/src/index.js:367-369](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L367-L369 "Source code on GitHub")

[Needs description]

**Parameters**

-   `child` **Object** 
-   `parent` **Object** 

# t.is

[packages/babel-types/src/index.js:77-88](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L77-L88 "Source code on GitHub")

Returns whether `node` is of given `type`.

For better performance, use this instead of `is[Type]` when `type` is unknown.
Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.

**Parameters**

-   `type` **string** 
-   `node` **Object** 
-   `opts` **Object** 

Returns **boolean** 

# t.isBinding

[packages/babel-types/src/validators.js:12-27](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/validators.js#L12-L27 "Source code on GitHub")

Check if the input `node` is a binding identifier.

**Parameters**

-   `node` **Object** 
-   `parent` **Object** 

Returns **boolean** 

# t.isBlockScoped

[packages/babel-types/src/validators.js:188-190](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/validators.js#L188-L190 "Source code on GitHub")

Check if the input `node` is block scoped.

**Parameters**

-   `node` **Object** 

Returns **boolean** 

# t.isCompatTag

[packages/babel-types/src/react.js:12-14](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/react.js#L12-L14 "Source code on GitHub")

Is a given string a valid non-component JSX tagName?

**Parameters**

-   `tagName` **string** The string to check

Returns **boolean** 

# t.isImmutable

[packages/babel-types/src/validators.js:233-247](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/validators.js#L233-L247 "Source code on GitHub")

Check if the input `node` is definitely immutable.

**Parameters**

-   `node` **Object** 

Returns **boolean** 

# t.isLet

[packages/babel-types/src/validators.js:178-180](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/validators.js#L178-L180 "Source code on GitHub")

Check if the input `node` is a `let` variable declaration.

**Parameters**

-   `node` **Object** 

Returns **boolean** 

# t.isNode

[packages/babel-types/src/index.js:446-448](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L446-L448 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node`  

Returns **boolean** 

# t.isReferenced

[packages/babel-types/src/validators.js:35-155](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/validators.js#L35-L155 "Source code on GitHub")

Check if the input `node` is a reference to a bound variable.

**Parameters**

-   `node` **Object** 
-   `parent` **Object** 

Returns **boolean** 

# t.isScope

[packages/babel-types/src/validators.js:219-225](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/validators.js#L219-L225 "Source code on GitHub")

Check if the input `node` is a scope.

**Parameters**

-   `node` **Object** 
-   `parent` **Object** 

Returns **boolean** 

# t.isSpecifierDefault

[packages/babel-types/src/validators.js:208-211](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/validators.js#L208-L211 "Source code on GitHub")

Check if the input `specifier` is a `default` import or export.

**Parameters**

-   `specifier` **Object** 

Returns **boolean** 

# t.isType

[packages/babel-types/src/index.js:96-109](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L96-L109 "Source code on GitHub")

Test if a `nodeType` is a `targetType` or if `targetType` is an alias of `nodeType`.

**Parameters**

-   `nodeType` **string** 
-   `targetType` **string** 

Returns **boolean** 

# t.isValidIdentifier

[packages/babel-types/src/validators.js:164-170](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/validators.js#L164-L170 "Source code on GitHub")

Check if the input `name` is a valid identifier name
and isn't a reserved word.

**Parameters**

-   `name` **string** 

Returns **boolean** 

# t.isVar

[packages/babel-types/src/validators.js:198-200](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/validators.js#L198-L200 "Source code on GitHub")

Check if the input `node` is a variable declaration.

**Parameters**

-   `node` **Object** 

Returns **boolean** 

# t.prependToMemberExpression

[packages/babel-types/src/index.js:217-220](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L217-L220 "Source code on GitHub")

Prepend a node to a member expression.

**Parameters**

-   `member` **Object** 
-   `prepend` **Object** 

Returns **Object** 

# t.removeComments

[packages/babel-types/src/index.js:341-346](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L341-L346 "Source code on GitHub")

Remove comment properties from a node.

**Parameters**

-   `node` **Object** 

Returns **Object** 

# t.removeTypeDuplicates

[packages/babel-types/src/flow.js:26-100](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/flow.js#L26-L100 "Source code on GitHub")

Dedupe type annotations.

**Parameters**

-   `nodes` **Array&lt;Object&gt;** 

# t.shallowEqual

[packages/babel-types/src/index.js:186-196](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L186-L196 "Source code on GitHub")

Test if an object is shallowly equal.

**Parameters**

-   `actual` **Object** 
-   `expected` **Object** 

Returns **boolean** 

# t.toBindingIdentifierName

[packages/babel-types/src/converters.js:188-192](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L188-L192 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

Returns **string** 

# t.toBlock

[packages/babel-types/src/converters.js:265-287](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L265-L287 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node`  
-   `parent` **Object** 

Returns **Object** 

# t.toComputedKey

[packages/babel-types/src/converters.js:15-20](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L15-L20 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node` **Object** 
-   `key` **[Object]**  (optional, default `node.key || node.property`)

Returns **Object** 

# t.toExpression

[packages/babel-types/src/converters.js:241-257](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L241-L257 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node` **Object** 

Returns **Object** 

# t.toIdentifier

[packages/babel-types/src/converters.js:161-180](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L161-L180 "Source code on GitHub")

[Needs description]

**Parameters**

-   `name` **string** 

Returns **string** 

# t.toKeyAlias

[packages/babel-types/src/converters.js:115-137](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L115-L137 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node` **Object** 
-   `key` **[Object]**  (optional, default `node.key`)

Returns **string** 

# t.toKeyAlias.increment

[packages/babel-types/src/converters.js:147-153](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L147-L153 "Source code on GitHub")

[Needs description]

# t.toSequenceExpression

[packages/babel-types/src/converters.js:34-107](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L34-L107 "Source code on GitHub")

Turn an array of statement `nodes` into a `SequenceExpression`.

Variable declarations are turned into simple assignments and their
declarations hoisted to the top of the current scope.

Expression statements are just resolved to their expression.

**Parameters**

-   `nodes` **Array&lt;Object&gt;** 
-   `scope` **Scope** 

Returns **[Object]** 

# t.toStatement

[packages/babel-types/src/converters.js:200-233](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L200-L233 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node` **Object** 
-   `ignore` **boolean** 

Returns **Object or boolean** 

# t.validate

[packages/babel-types/src/index.js:167-178](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/index.js#L167-L178 "Source code on GitHub")

[Needs description]

**Parameters**

-   `node` **Object** 
-   `key` **string** 
-   `val` **Any** 

# t.valueToNode

[packages/babel-types/src/converters.js:295-349](https://github.com/thejameskyle/babel/blob/a332eff24472184ec459f6378c78496674d1e739/packages/babel-types/src/converters.js#L295-L349 "Source code on GitHub")

[Needs description]

**Parameters**

-   `value` **Any** 

Returns **Object** 
