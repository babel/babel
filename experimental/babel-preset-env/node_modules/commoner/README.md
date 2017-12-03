Commoner [![Build Status](https://travis-ci.org/benjamn/commoner.png?branch=master)](https://travis-ci.org/benjamn/commoner)
---

Commoner makes it easy to write scripts that flexibly and efficiently
transpile any dialect of JavaScript into a directory structure of
Node-compatible CommonJS module files.

This task is made possible by

  1. a declarative syntax for defining how module source code should be
     found and processed,
  2. the use of [promises](https://github.com/kriskowal/q) to manage an
     asynchronous build pipeline, and
  3. never rebuilding modules that have already been built.

The output files can be required seamlessly by Node, or served by any
static file server, or bundled together using a tool such as
[Browserify](https://github.com/substack/node-browserify),
[WrapUp](https://github.com/kamicane/wrapup), or
[Stitch](https://github.com/sstephenson/stitch) for delivery to a web
browser.

If you pass the `--relativize` option, Commoner also takes care to rewrite
all `require` calls to use [relative module
identifiers](http://wiki.commonjs.org/wiki/Modules/1.1#Module_Identifiers),
so that the output files can be installed into any subdirectory of a
larger project, and external tools do not have to give special treatment
to top-level modules (or even know which modules are top-level and which
are nested).

Commoner was derived from an earlier, more opinionated tool called
[Brigade](https://github.com/benjamn/brigade) that provided additional
support for packaging modules together into multiple non-overlapping
bundles. Commoner grew out of the realization that many tools already
exist for bundling CommonJS modules, but that fewer tools focus on getting
to that point.

Installation
---

From NPM:

    npm install commoner

From GitHub:

    cd path/to/node_modules
    git clone git://github.com/reactjs/commoner.git
    cd commoner
    npm install .

Usage
---

Here's the output of `bin/commonize --help`:
```
Usage: commonize [options] <source directory> <output directory> [<module ID> [<module ID> ...]]

Options:

  -h, --help                               output usage information
  -V, --version                            output the version number
  -c, --config [file]                      JSON configuration file (no file means STDIN)
  -w, --watch                              Continually rebuild
  -x, --extension <js | coffee | ...>      File extension to assume when resolving module identifiers
  --relativize                             Rewrite all module identifiers to be relative
  --follow-requires                        Scan modules for required dependencies
  --cache-dir <directory>                  Alternate directory to use for disk cache
  --no-cache-dir                           Disable the disk cache
  --source-charset <utf8 | win1252 | ...>  Charset of source (default: utf8)
  --output-charset <utf8 | win1252 | ...>  Charset of output (default: utf8)
```

In a single sentence: the `commonize` command finds modules with the given
module identifiers in the source directory and places a processed copy of
each module into the output directory, along with processed copies of all
required modules.

If you do not provide any module identifiers, `commonize` will process all
files that it can find under the source directory that have the preferred
file extension (`.js` by default). If your source files have a file
extension other than `.js`, use the `-x` or `--extension` option to
specify it. For example, `--extension coffee` to find `.coffee` files.

Output
---

Commoner prints various status messages to `STDERR`, so that you can see
what it's doing, or figure out why it's not doing what you thought it
would do.

The only information it prints to `STDOUT` is a JSON array of module
identifiers, which includes the identifiers passed on the command line and
all their dependencies. This array contains no duplicates.

Internally, each module that Commoner generates has a hash computed from
the module's identifier, source code, and processing steps. Since this
hash can be computed before processing takes place, Commoner is able to
avoid processing a module if it has ever previously processed the same
module in the same way.

If you dig into [the
code](https://github.com/reactjs/commoner/blob/5e7f65cab2/lib/context.js#L94),
you'll find that Commoner maintains a cache directory (by default,
`~/.commoner/module-cache/`) containing files with names like
`9ffc5c853aac07bc106da1dc1b2486903ca688bf.js`.  When Commoner is about to
process a module, it checks its hash against the file names in this
directory. If no match is found, processing procedes and the resulting
file is written to the cache directory with a new hash. If the appropriate
hash file is already present in the cache directory, however, Commoner
merely creates a hard link between the hash file and a file with a more
meaningful name in the output directory.

When you pass the `--watch` flag to `bin/commonize`, Commoner avoids
exiting after the first build and instead watches for changes to
previously read files, printing a new JSON array of module identifiers to
`STDOUT` each time rebuilding finishes. Thanks to the caching of processed
modules, the time taken to rebuild is roughly proportional to the number
of modified files.

Customization
---

The `bin/commonize` script is actually quite simple, and you can write
similar scripts yourself. Let's have a look:
```js
#!/usr/bin/env node

require("commoner").resolve(function(id) {
    var context = this;

    return context.getProvidedP().then(function(idToPath) {
        // If a module declares its own identifier using @providesModule
        // then that identifier will be a key in the idToPath object.
        if (idToPath.hasOwnProperty(id))
            return context.readFileP(idToPath[id]);
    });

}, function(id) {
    // Otherwise assume the identifier maps directly to a filesystem path.
    // The readModuleP method simply appends the preferred file extension
    // (usually .js) to the given module identifier and opens that file.
    return this.readModuleP(id);
});
```
The scriptable interface of the `commoner` module abstracts away many of
the annoyances of writing a command-line script. In particular, you don't
have to do any parsing of command-line arguments, and you don't have to
worry about installing any dependencies other than `commoner` in your
`$NODE_PATH`.

What you are responsible for, at a minimum, is telling Commoner how to
find the source of a module given a module identifier, and you do this by
passing callback functions to `require("commoner").resolve`. The script
above uses two strategies that will be tried in sequence: first, it calls
the helper function `this.getProvidedP` to retrieve an object mapping
identifiers to file paths (more about this below); and, if that doesn't
work, it falls back to interpreting the identifier as a path relative to
the source directory.

Now, you might not care about `this.getProvidedP`. It's really just a
proof of concept that Commoner can support modules that declare their own
identifiers using the `// @providesModule <identifier>` syntax, and I
included it by default because it doesn't make a difference unless you
decide to use `@providesModule`. If you don't like it, you could write an
even simpler script:
```js
#!/usr/bin/env node

require("commoner").resolve(function(id) {
    return this.readModuleP(id);
});
```
The point is, it's entirely up to you to define how module identifiers are
interpreted. In fact, the source you return doesn't even have to be valid
JavaScript. It could be [CoffeeScript](http://coffeescript.org/), or
[LESS](http://lesscss.org/), or whatever language you prefer to write by
hand. Commoner doesn't care what your source code looks like, because
Commoner allows you to define arbitrary build steps to turn that source
code into plain old CommonJS.

Let's consider the example of using LESS to write dynamic CSS
modules. First, let's apply what we already know to give special meaning
to `.less` files:
```js
#!/usr/bin/env node

require("commoner").resolve(function(id) {
    if (isLess(id))
        return this.readFileP(id);
}, function(id) {
    return this.readModuleP(id);
});

function isLess(id) {
    return /\.less$/i.test(id);
}
```
All this really accomplishes is to avoid appending the `.js` file
extension to identifiers that already have the `.less` extension.

Now we need to make sure the contents of `.less` files somehow get
transformed into plain old CommonJS, and for that we need
`require("commoner").process`:
```js
require("commoner").resolve(function(id) {
    if (isLess(id))
        return this.readFileP(id);
}, function(id) {
    return this.readModuleP(id);
}).process(function(id, source) {
    if (isLess(id))
        return compileLessToJs(source);
    return source;
});
```
How should `compileLessToJs` be implemented? At a high level, I propose
that we generate a CommonJS module that will append a new `<style>` tag to
the `<head>` the first time the module is required. This suggests to me
that we need to take the CSS generated by LESS and somehow embed it as a
string in a CommonJS module with a small amount of boilerplate JS.

Here's a first attempt:
```js
function compileLessToJs(less) {
    var css = require("less").render(less);
    return 'require("css").add(' + JSON.stringify(css) + ");";
}
```
Implementing a `css` module with an appropriate `add` method is an
exercise that I will leave to the reader (hint: you may find [this
StackOverflow answer](http://stackoverflow.com/a/524721/128454) useful).

This almost works, but there's one problem: `require("less").render` does
not actually return a string! For better or worse, it passes the compiled
CSS to a callback function, which would make our task extremely painful
*if Commoner were not deeply committed to supporting asynchronous
processing*.

Commoner uses promises for asynchronous control flow, so we need to return
a promise if we can't return a string immediately. The easiest way to make
a promise is to call `this.makePromise` in the following style:
```js
#!/usr/bin/env node

require("commoner").resolve(function(id) {
    if (isLess(id))
        return this.readFileP(id);
}, function(id) {
    return this.readModuleP(id);
}).process(function(id, source) {
    if (isLess(id)) {
        return this.makePromise(function(nodeStyleCallback) {
            compileLessToJs(source, nodeStyleCallback);
        });
    }
    return source;
});

function compileLessToJs(less, callback) {
    require("less").render(less, function(err, css) {
        callback(err, 'require("css").add(' + JSON.stringify(css) + ");")
    });
}
```
And we're done! This example was admittedly pretty involved, but if you
followed it to the end you now have all the knowledge you need to write
source files like `sidebar.less` and require them from other modules by
invoking `require("sidebar.less")`. (And, by the way, embedding dynamic
CSS modules in your JavaScript turns out to be an excellent idea.)

Generating multiple files from one source module
---

Commoner is not limited to generating just one output file from each
source module. For example, if you want to follow best practices for
producing source maps, you probably want to create a `.map.json` file
corresponding to every `.js` file that you compile.

Recall that normally your `.process` callback returns a string (or a
promise for a string) whose contents will be written as a `.js` file in
the output directory. To write more than one file, just return an object
whose keys are the file extensions of the files you want to write, and
whose values are either strings or promises for strings representing the
desired contents of those files.

Here's an example of generating two different files for every source
module, one called `<id>.map.json` and the other called `<id>.js`:
```js
require("commoner").resolve(function(id) {
    return this.readModuleP(id);
}).process(function(id, source) {
    var result = compile(source);
    return {
        ".map.json": JSON.stringify(result.sourceMap),
        ".js": [
            result.code,
            "//# sourceMappingURL=" + id + ".map.json"
        ].join("\n")
    };
});
```

Note that
```js
return {
    ".js": source
};
```
would be equivalent to
```js
return source;
```
so you only have to return an object when you want to generate multiple
files. However, the `.js` key is mandatory when returning an object.

For your convenience, if you have a sequence of multiple processing
functions, the values of the object returned from each step will be
resolved before the object is passed along to the next processing
function, so you can be sure all the values are strings (instead of
promises) at the beginning of the next processing function.

Configuration
---

Of course, not all customization requires modifying code. Most of the
time, in fact, configuration has more to do with providing different
dynamic values to the same code.

For that kind of configuration, you don't need to modify your Commoner
script at all, because Commoner scripts accept a flag called `--config`
that can either specify a JSON file or (if `--config` is given without a
file name) read a string of JSON from `STDIN`.

Examples:

    bin/commonize source/ output/ main --config release.json
    bin/commonize source/ output/ main --config debug.json
    echo '{"debug":false}' | bin/commonize source/ output/ main --config
    echo '{"debug":true}' | bin/commonize source/ output/ main --config /dev/stdin

This configuration object is exposed to the `.resolve` and `.process`
callbacks as `this.config`. So, for example, if you wanted to implement
minification as a processing step, you might do it like this:
```js
require("commoner").resolve(function(id) {
    return this.readModule(id);
}).process(function(id, source) {
    if (this.config.debug)
        return source;
    return minify(source);
});
```
Perhaps the coolest thing about the configuration object is that Commoner
generates a recursive hash of all its properties and their values which is
then incorporated into every module hash. This means that two modules with
the same identifier and identical source code and processing steps will
have distinct hashes if built using different configuration objects.

Custom Options
---

You can define custom options for your script by using the `option` function.

```js
require("commoner").resolve(function(id) {
    return this.readModule(id);
}).option(
    '--custom-option',
    'This is a custom option.'
).process(function(id, source) {
    if (this.options.customOption) {
        source = doCustomThing(source);
    }
    return source;
});
```

For more information of the options object available inside the `process` function see [Commander](https://github.com/visionmedia/commander.js).
