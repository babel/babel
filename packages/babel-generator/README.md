# babel-generator

> Turns an AST into code.

## Install

```sh
$ npm install babel-generator
```

## Usage

```js
import {parse} from 'babylon';
import generate from 'babel-generator';

const code = 'class Example {}';
const ast = parse(code);

const output = generate(ast, { /* options */ }, code);
```

## Options

Options for formatting output:

name                   | type     | default         | description
-----------------------|----------|-----------------|--------------------------------------------------------------------------
auxiliaryCommentBefore | string   |                 | Optional string to add as a block comment at the start of the output file
auxiliaryCommentAfter  | string   |                 | Optional string to add as a block comment at the end of the output file
shouldPrintComment     | function | `opts.comments` | Function that takes a comment (as a string) and returns `true` if the comment should be included in the output.  By default, comments are included if `opts.comments` is `true` or if `opts.minifed` is `false` and the comment contains `@preserve` or `@license`
retainLines            | boolean  | `false`         | Attempt to use the same line numbers in the output code as in the source code (helps preserve stack traces)
comments               | boolean  | `true`          | Should comments be included in output
compact                | boolean or `'auto'` | `opts.minified` | Set to `true` to avoid adding whitespace for formatting
minified               | boolean  | `false`         | Should the output be minified
concise                | boolean  | `false`         | Set to `true` to reduce whitespace (but not as much as `opts.compact`)
quotes                 | `'single'` or `'double'` | autodetect based on `ast.tokens` | The type of quote to use in the output
filename               | string   |                 | Used in warning messages

Options for source maps:

name                   | type     | default         | description
-----------------------|----------|-----------------|--------------------------------------------------------------------------
sourceMaps             | boolean  | `false`         | Enable generating source maps
sourceMapTarget        | string   |                 | The filename of the generated code that the source map will be associated with
sourceRoot             | string   |                 | A root for all relative URLs in the source map
sourceFileName         | string   |                 | The filename for the source code (i.e. the code in the `code` argument)
