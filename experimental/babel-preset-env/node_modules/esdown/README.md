## Overview ##

**esdown** is an ES6+ to ES5 compiler, written in ES6.  It will allow you to
write programs using next-generation Javascript features without having to
wait for Node or browsers to fully implement them.

**esdown** can also be used as a runtime environment for executing ES6+ programs
on top of Node.

You can demo **esdown** by using the [browser REPL](http://zenparsing.github.io/esdown/repl/).

For more information:

- The [Feature Guide](docs/features.md) describes the ES6+ features that you can use with
**esdown**.
- The [Module Guide](docs/modules.md) describes the ES6 module system implemented in
**esdown**.
- [Limitations](docs/limitations.md) describes some limitations and caveats regarding code
produced by **esdown**.

## Instructions ##

Install globally with NPM (you may need to `sudo` this):

    npm install -g esdown

Start a REPL by running it without any arguments:

    esdown

Execute a module by adding a path:

    esdown main.js

Translate a module by using a hyphen:

    esdown - src/main.js build/esdown.js -b -r

    --input, -i  (1)    The file to translate.
    --output, -o (2)    The file to write to. If not set, then the output
                        will be written to the console.
    --bundle, -b        If present, module dependencies will be bundled
                        together in the output.
    --global, -g        If specified, the name of the global variable to
                        dump this module's exports into, if the resulting
                        script is not executed within any module system.

## API ##

**esdown** can also be used as a library.  First, install locally with NPM:

    npm install esdown

### translate(input, options = {}) ###

Translates ES6+ code to ES5.  The following options are defined:

- **module**: (Boolean) If `true`, parse the input as a module.  Otherwise, parse the input
  as a script.  The default is `false`.
- **global**:  (String) If specified, the name of the global variable which will be used to
  expose the module if it is loaded as a plain script in the browser.

Example:

```js
var esdown = require("esdown");

var output = esdown.translate("class C { foo() {} }", {
    module: true
});
```
