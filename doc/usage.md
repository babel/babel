# Usage

## CLI

Compile the file `script.js` and output it to stdout.

```sh
$ 6to5 script.js
```

Compile the file `script.js` and output it to `script-compiled.js`.

```sh
$ 6to5 script.js --out-file script-compiled.js
```

Compile the file `script.js` and output it to `script-compiled.js` and save a
source map to `script-compiled.js.map`.

```sh
$ 6to5 script.js --source-maps --out-file script-compiled.js
```

Compile the file `script.js` and output it to `script-compiled.js` with a source
map embedded in a comment at the bottom.

```sh
$ 6to5 script.js --source-maps-inline --out-file script-compiled.js
```

Compile the entire `src` directory and output it to the `lib` directory.

```sh
$ 6to5 src --out-dir lib
```

Compile the entire `src` directory and output it to the one concatenated file.

```sh
$ 6to5 src --out-file script-compiled.js
```

Pipe a file in via stdin and output it to `script-compiled.js`

```sh
$ 6to5 --out-file script-compiled.js < script.js
```

### Node

Launch a repl.

```sh
$ 6to5-node
```

Evaluate code.

```sh
$ 6to5-node -e "class Test { }"
```

Compile and run `test.js`.

```sh
$ 6to5-node test
```

## Node

```javascript
var to5 = require("6to5");
```

### to5.transform(code, [opts]);

```javascript
var result = to5.transform("code();", options);
result.code;
result.map;
result.ast;
```

### to5.transformFileSync(filename, [opts])

```javascript
to5.transformFileSync("filename.js", options).code;
```

### to5.transformFile(filename, [opts], callback)

```javascript
to5.transformFile("filename.js", options, function (err, result) {
  result.code;
});
```

### to5.transform.fromAst(ast, [code], [opts])

```javascript
var result = to5.transform.fromAst(ast, "var a = 2;", opts);
result.code;
result.map;
result.ast;
```

#### Options

```javascript
{
  // Filename for use in errors etc.
  // Default: "unknown"
  filename: "filename",

  // Filename relative to `sourceRoot`
  // Default: `filename` option.
  filenameRelative: "",

  // List of transformers to EXCLUDE.
  // Run `6to5 --help` to see a full list of transformers.
  blacklist: [],

  // List of transformers to ONLY use.
  // Run `6to5 --help` to see a full list of transformers.
  whitelist: [],

  // Module formatter to use
  // Run `6to5 --help` to see a full list of module formatters.
  // Default: "common"
  modules: "common",

  // If truthy, adds a `map` property to returned output.
  // If set to "inline", a comment with a sourceMappingURL directive is added to
  // the bottom of the returned code.
  // Default: false
  sourceMap: true,

  // Set `file` on returned source map.
  // Default: `filenameRelative` option.
  sourceMapName: "filename",

  // Set `sources[0]` on returned source map.
  // Default: `filenameRelative` option.
  sourceFileName: "filename",

  // The root from which all sources are relative
  // Default: `moduleRoot` option.
  sourceRoot: "assets/scripts",

  // Optional prefix for the AMD module formatter that will be prepend to the
  // filename on module definitions
  // Default: `sourceRoot` option.
  moduleRoot: "my-app",

  // If truthy, insert an explicit id for each defined AMD module.
  // By default, AMD modules are anonymous.
  // Default: false
  amdModuleIds: true,

  // Optionally replace all 6to5 helper declarations with a referenece to this
  // variable. If set to `true` then the default namespace is used "to5Runtime".
  // Default: false
  runtime: true,

  // Enable support for experimental ES7 features
  // Default: false
  experimental: true,

  // Set this to `false` if you don't want the transformed AST in the returned
  // result
  // Default: true
  ast: true,

  // Set this to `false` if you don't want the transformed code in the returned
  // result
  // Default: true
  code: true,

  format: {
    // Output comments in generated output
    // Default: true
    comments: true,

    // Do not include superfluous whitespace characters and line terminators
    // Default: false
    compact: false,

    indent: {
      // Preserve parentheses in new expressions that have no arguments
      // Default: true
      parentheses: true,

      // Adjust the indentation of multiline comments to keep asterisks vertically aligned
      // Default: true
      adjustMultilineComment: true,

      // Indent string
      // Default: "  "
      style: "  ",

      // Base indent level
      // Default: 0
      base: 0
    }
  }
}
```

### Require hook

All subsequent files required by node with the extensions `.es6` and `.js` will
be transformed by 6to5. The polyfill specified in [Polyfill](polyfill.md) is
also required; but this is automatically loaded when using:

Source maps are automatically configured so if any errors a thrown then line
number info is mapped and you'll get the correct source location.

```javascript
require("6to5/register");
```

**NOTE:** By default all requires to `node_modules` will be ignored. You can
override this by passing an ignore regex via:

```javascript
require("6to5/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // a regex
  ignore: false
});
```

#### Options

```javascript
require("6to5/register")({
  // Optional ignore regex - if any filenames **do** match this regex then they
  // aren't compiled
  ignore: /regex/,

  // Optional only regex - if any filenames **don't** match this regex then they
  // aren't compiled
  only: /my_es6_folder/,

  // See options above for usage
  whitelist: [],
  blacklist: [],

  // This will remove the currently hooked extensions of .es6 and .js so you'll
  // have to add them back if you want them to be used again.
  extensions: [".js", ".es6"]
});
```
