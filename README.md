# Acorn

[acorn]: http://marijnhaverbeke.nl/acorn/
[range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678

A tiny, fast JavaScript parser, written completely in JavaScript.

## Invoking

Acorn can be invoked in several ways.

- From a Node script.
- From the command line.
- From a browser script.

### Node script

To use acorn from a [Node](http://nodejs.org) script, install acorn as a package as usual using npm:

```sh
npm install acorn
```

Alternately, download the source and link to that:

```sh
git clone https://github.com/marijnh/acorn.git
cd acorn
npm link
cd /path/to/project
npm link acorn
```

Now you can `require` acorn in your node scripts. The main entrypoint to acorn is the `parse` function, which returns an object with the AST nodes:

```javascript
var fs = require('fs'),
    acorn = require('acorn');

try
{
    var code = fs.readFileSync(pathToFile, "utf8"),
        ast = acorn.parse(code);
}
catch(e)
{
    console.error(e.message);
    process.exit(1);
}
```

### Command line

To use acorn from the command line, use the `acorn` binary, which is installed when you use npm to install or link the acorn package. Alternately, you can execute `bin/acorn` directly. The syntax is as follows:

```text
acorn [options] file

Parses <file> and outputs the AST in JSON format.

Options:
--ecma3|--ecma5     Sets the ECMAScript version to parse. Default is version 5.
--strictSemicolons  Prevents the parser from doing automatic semicolon insertion.
                    Statements that do not end in semicolons will generate an error.
--locations         Attaches a "loc" object to each node with "start" and "end" subobjects,
                    each of which contains the one-based line and zero-based column numbers
                    in {line, column} form.
--compact           No whitespace is used in the AST output.
--silent            Do not output the AST, just return the exit status.
--help              Print this usage information and quit.
```

### Browser script

To use acorn in the browser, load `acorn.js` with a `<script>` tag:

```
<script src="acorn.js" type="text/javascript"></script>
```

Acorn is compatible with [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD), so you may also use loaders like [require.js](http://www.requirejs.org) to load acorn in the browser.

Once acorn is loaded, you may use acorn within your own scripts by calling `acorn.parse` as illustrated in the Node example above.

## Options

The optional second parameter to the `parse` function is an options object. Acorn supports a number of options that control its behavior and its output.

- **ecmaVersion**: Indicates the ECMAScript version to parse. Must be either 3 or 5. This influences support for strict mode, the set of reserved words, and support for getters and setter. *Default*: 5

- **strictSemicolons**: If `true`, prevents the parser from doing automatic semicolon insertion, and statements that do not end with a semicolon will generate an error. *Default*: `false`

- **allowTrailingCommas**: If `false`, the parser will not allow trailing commas in array and object literals.

- **forbidReserved**: If `true`, using a reserved word will generate an error. *Default*: `false`

- **locations**: When `true`, each node has a "loc" object attached with "start" and "end" subobjects, each of which contains the one-based line and zero-based column numbers in `{line, column}` form. *Default*: `false`

- **onComment**: If a function is passed for this option, whenever a comment is encountered the function will be called with the following parameters:
    - **block**: `true` if the comment is a block comment, false if it is a line comment.
    - **text**: The content of the comment.
    - **start**: Character offset of the start of the comment.
    - **end**: Character offset of the end of the comment.

    When the `locations` options is on, the `{line, column}` locations of the comment’s start and end are passed as two additional parameters. *Default*: `null`

- **ranges**: Nodes have their start and end characters offsets recorded in "start" and "end" properties (directly on the node, rather than the "loc" object, which holds line/column data. To also add a [semi-standardized][range] "range" property holding a `[start, end]` array with the same numbers, set the `ranges` option to `true`. *Default*: `false`

- **program**: It is possible to parse multiple files into a single AST by passing the tree produced by parsing the first file as the `program` option in subsequent parses. This will add the toplevel forms of the parsed file to the "Program" (top) node of an existing parse tree. *Default*: `null`

- **sourceFile**: When the `locations` option is `true`, you can pass this option to add a "sourceFile" attribute in every node’s "loc" object. Note that the contents of this option are not examined or processed in any way; you are free to use whatever format you choose. *Default*: `null`

- **directSourceFile**: Like the `sourceFile` option, but adds a "sourceFile" attribute directly to every node, whether or not `locations` is `true`. *Default*: `null`

## Errors

When an error occurs, acorn throws a `SyntaxError` with the following attributes:

- **message**: A descriptive message of the error. The error message will end with `(line:column)`, where `line` is the one-based line number on which the error occurred, and `column` is the zero-based column within that line.
- **pos**: The zero-based character position at which the error occurred.
- **loc**: An object in the form `{line:N, column:N}`, where `line` is the one-based line number on which the error occurred, and `column` is the zero-based column number within that line.
- **raisedAt**: The zero-based character position the parser had reached at the point where the error occurred.
