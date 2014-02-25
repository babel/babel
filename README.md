# Acorn

A tiny, fast JavaScript parser, written completely in JavaScript.

## Installation

The easiest way to install acorn is with [`npm`][npm].

[npm]: http://npmjs.org

```sh
npm install acorn
```

Alternately, download the source.

```sh
git clone https://github.com/marijnh/acorn.git
```

## Components

When run in a CommonJS (node.js) or AMD environment, exported values
appear in the interfaces exposed by the individual files, as usual.
When loaded in the browser without any kind of module management, a
single global object `acorn` will be defined, and all the exported
properties will be added to that.

### acorn.js

This file contains the actual parser (and is what you get when you
`require("acorn")` in node.js).

**parse**`(input, options)` is used to parse a JavaScript program.
The `input` parameter is a string, `options` can be undefined or an
object setting some of the options listed below. The return value will
be an abstract syntax tree object as specified by the
[Mozilla Parser API][mozapi].

When  encountering   a  syntax   error,  the   parser  will   raise  a
`SyntaxError` object with a meaningful  message. The error object will
have a `pos` property that indicates the character offset at which the
error occurred,  and a `loc`  object that contains a  `{line, column}`
object referring to that same position.

[mozapi]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

- **ecmaVersion**: Indicates the ECMAScript version to parse. Must be
  either 3 or 5. This influences support for strict mode, the set of
  reserved words, and support for getters and setter. Default is 5.

- **strictSemicolons**: If `true`, prevents the parser from doing
  automatic semicolon insertion, and statements that do not end with
  a semicolon will generate an error. Defaults to `false`.

- **allowTrailingCommas**: If `false`, the parser will not allow
  trailing commas in array and object literals. Default is `true`.

- **forbidReserved**: If `true`, using a reserved word will generate
  an error. Defaults to `false`. When given the value `"everywhere"`,
  reserved words and keywords can also not be used as property names
  (as in Internet Explorer's old parser).
  
- **allowReturnOutsideFunction**: By default, a return statement at
  the top level raises an error. Set this to `true` to accept such
  code.

- **locations**: When `true`, each node has a `loc` object attached
  with `start` and `end` subobjects, each of which contains the
  one-based line and zero-based column numbers in `{line, column}`
  form. Default is `false`.

- **onComment**: If a function is passed for this option, whenever a
  comment is encountered the function will be called with the
  following parameters:

  - `block`: `true` if the comment is a block comment, false if it
    is a line comment.
  - `text`: The content of the comment.
  - `start`: Character offset of the start of the comment.
  - `end`: Character offset of the end of the comment.

  When the `locations` options is on, the `{line, column}` locations
  of the comment’s start and end are passed as two additional
  parameters.

  Note that you are not allowed to call the parser from the
  callback—that will corrupt its internal state.

- **ranges**: Nodes have their start and end characters offsets
  recorded in `start` and `end` properties (directly on the node,
  rather than the `loc` object, which holds line/column data. To also
  add a [semi-standardized][range] "range" property holding a
  `[start, end]` array with the same numbers, set the `ranges` option
  to `true`.

- **program**: It is possible to parse multiple files into a single
  AST by passing the tree produced by parsing the first file as the
  `program` option in subsequent parses. This will add the toplevel
  forms of the parsed file to the "Program" (top) node of an existing
  parse tree.

- **sourceFile**: When the `locations` option is `true`, you can pass
  this option to add a `sourceFile` attribute in every node’s `loc`
  object. Note that the contents of this option are not examined or
  processed in any way; you are free to use whatever format you
  choose.

- **directSourceFile**: Like `sourceFile`, but the property will be
  added directly to the nodes, rather than to a `loc` object.

[range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678

**getLineInfo**`(input, offset)` can be used to get a `{line,
column}` object for a given program string and character offset.

**tokenize**`(input, options)` exports a primitive interface to
Acorn's tokenizer. The function takes an input string and options
similar to `parse` (though only some options are meaningful here), and
returns a function that can be called repeatedly to read a single
token, and returns a `{start, end, type, value}` object (with added
`startLoc` and `endLoc` properties when the `locations` option is
enabled). This object will be reused (updated) for each token, so you
can't count on it staying stable.

**tokTypes** holds an object mapping names to the token type objects
that end up in the `type` properties of tokens.

### acorn_loose.js ###

This file implements an error-tolerant parser. It exposes a single
function.

**parse_dammit**`(input, options)` takes the same arguments and
returns the same syntax tree as the `parse` function in `acorn.js`,
but never raises an error, and will do its best to parse syntactically
invalid code in as meaningful a way as it can. It'll insert identifier
nodes with name `"✖"` as placeholders in places where it can't make
sense of the input. Depends on `acorn.js`, because it uses the same
tokenizer.

### util/walk.js ###

Implements an abstract syntax tree walker. Will store its interface in
`acorn.walk` when used without a module system.

**simple**`(node, visitors, base, state)` does a 'simple' walk over
a tree. `node` should be the AST node to walk, and `visitors` an
object with properties whose names correspond to node types in the
[Mozilla Parser API][mozapi]. The properties should contain functions
that will be called with the node object and, if applicable the state
at that point. The last two arguments are optional. `base` is a walker
algorithm, and `state` is a start state. The default walker will
simply visit all statements and expressions and not produce a
meaningful state. (An example of a use of state it to track scope at
each point in the tree.)

**ancestor**`(node, visitors, base, state)` does a 'simple' walk over
a tree, building up an array of ancestor nodes (including the current node)
and passing the array to callbacks in the `state` parameter.

**recursive**`(node, state, functions, base)` does a 'recursive'
walk, where the walker functions are responsible for continuing the
walk on the child nodes of their target node. `state` is the start
state, and `functions` should contain an object that maps node types
to walker functions. Such functions are called with `(node, state, c)`
arguments, and can cause the walk to continue on a sub-node by calling
the `c` argument on it with `(node, state)` arguments. The optional
`base` argument provides the fallback walker functions for node types
that aren't handled in the `functions` object. If not given, the
default walkers will be used.

**make**`(functions, base)` builds a new walker object by using the
walker functions in `functions` and filling in the missing ones by
taking defaults from `base`.

**findNodeAt**`(node, start, end, test, base, state)` tries to
locate a node in a tree at the given start and/or end offsets, which
satisfies the predicate `test`. `start` end `end` can be either `null`
(as wildcard) or a number. `test` may be a string (indicating a node
type) or a function that takes `(nodeType, node)` arguments and
returns a boolean indicating whether this node is interesting. `base`
and `state` are optional, and can be used to specify a custom walker.
Nodes are tested from inner to outer, so if two nodes match the
boundaries, the inner one will be preferred.

**findNodeAround**`(node, pos, test, base, state)` is a lot like
`findNodeAt`, but will match any node that exists 'around' (spanning)
the given position.

**findNodeAfter**`(node, pos, test, base, state)` is similar to
`findNodeAround`, but will match all nodes *after* the given position
(testing outer nodes before inner nodes).

## Command line interface

The `bin/acorn` utility can be used to parse a file from the command
line. It accepts as arguments its input file and the following
options:

- `--ecma3|--ecma5`: Sets the ECMAScript version to parse. Default is
  version 5.

- `--strictSemicolons`: Prevents the parser from doing automatic
  semicolon insertion. Statements that do not end in semicolons will
  generate an error.

- `--locations`: Attaches a "loc" object to each node with "start" and
  "end" subobjects, each of which contains the one-based line and
  zero-based column numbers in `{line, column}` form.

- `--compact`: No whitespace is used in the AST output.

- `--silent`: Do not output the AST, just return the exit status.

- `--help`: Print the usage information and quit.

The utility spits out the syntax tree as JSON data.
