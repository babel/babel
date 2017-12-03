# closure-compiler-js

Check, compile, transpile, optimize and compress JavaScript with Closure Compiler in JS.

This repo tracks issues related to the publication to npmjs.org and associated plugins.
Any bugs not related to the plugins themselves should be reported to the [main repository](https://github.com/google/closure-compiler/).

Unlike other packages, this allows Closure Compiler to run entirely in JS.
*Java is not required.*

This is an experimental release - meaning some features are not available and performance may not be on-par with the Java implementation. [Details Here](#transpilation)

## Usage

First, install the latest version:

```bash
npm install --save google-closure-compiler-js
```

The module supports modern web browsers as well as Node v4 LTS, and provides `compile` as a low-level method to compile JavaScript.
By default, this compiles ES6 to ES5 and includes the default set of ECMAScript externs files.
For example:

```js
const compile = require('google-closure-compiler-js').compile;

const flags = {
  jsCode: [{src: 'const x = 1 + 2;'}],
};
const out = compile(flags);
console.info(out.compiledCode);  // will print 'var x = 3;\n'
```

Or to install the command-line version, do:

```bash
npm install -g google-closure-compiler-js
```

You should now be able to run `google-closure-compiler-js` as a command.
The `google-closure-compiler-js` command can read from stdin or from a file.
For example:

```bash
google-closure-compiler-js code.js > minified.js
```

Run `google-closure-compiler-js --help` for full usage information.

## Build Systems

### Webpack

Your `webpack.config.js` should look like this:

```js
const ClosureCompiler = require('google-closure-compiler-js').webpack;
const path = require('path');

module.exports = {
  entry: [
    path.join(__dirname, 'app.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.min.js'
  },
  plugins: [
    new ClosureCompiler({
      options: {
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
      },
    })
  ]
};
```

### Gulp

Your `gulpfile.js` should contain a task like this:

```js
const compiler = require('google-closure-compiler-js').gulp();

gulp.task('script', function() {
  return gulp.src('./path/to/src.js', {base: './'})
      // your other steps here
      .pipe(compiler({
          compilationLevel: 'SIMPLE',
          warningLevel: 'VERBOSE',
          outputWrapper: '(function(){\n%output%\n}).call(this)',
          jsOutputFile: 'output.min.js',  // outputs single file
          createSourceMap: true,
        }))
      .pipe(gulp.dest('./dist'));
});
```

## Flags

| Flag                             | Default | Usage |
|----------------------------------|---------|-------|
| angularPass | false | Generate $inject properties for AngularJS for functions annotated with @ngInject |
| applyInputSourceMaps | true | Compose input source maps into output source map |
| assumeFunctionWrapper | false | Enable additional optimizations based on the assumption that the output will be wrapped with a function wrapper. This flag is used to indicate that "global" declarations will not actually be global but instead isolated to the compilation unit. This enables additional optimizations. |
| checksOnly | false | Don't generate output. Run checks, but no optimization passes. |
| compilationLevel | SIMPLE | Specifies the compilation level to use.<br /> Options: WHITESPACE_ONLY, SIMPLE, ADVANCED |
| dartPass | false | |
| defines | null | Overrides the value of variables annotated with `@define`, an object mapping names to primitive types |
| env | BROWSER | Determines the set of builtin externs to load.<br /> Options: BROWSER, CUSTOM |
| exportLocalPropertyDefinitions | false | |
| generateExports | false | Generates export code for those marked with @export. |
| languageIn | ES6 | Sets what language spec that input sources conform to. |
| languageOut | ES5 | Sets what language spec the output should conform to. |
| newTypeInf | false | Checks for type errors using the new type inference algorithm. |
| outputWrapper | null | Interpolate output into this string, replacing the token `%output%` |
| polymerVersion | null | Specify the Polymer version pass to use. |
| preserveTypeAnnotations | false | |
| processCommonJsModules | false | Process CommonJS modules to a concatenable form, i.e., support `require` statements. |
| renamePrefixNamespace | | Specifies the name of an object that will be used to store all non-extern globals. |
| rewritePolyfills | false | Rewrite ES6 library calls to use polyfills provided by the compiler's runtime. |
| useTypesForOptimization | false | Enable or disable the optimizations based on available type information. Inaccurate type annotations may result in incorrect results. |
| warningLevel | DEFAULT | Specifies the warning level to use.<br /> Options: QUIET, DEFAULT, VERBOSE |
| jsCode | [] | Specifies the source code to compile. |
| externs | [] | Additional externs to use for this compile. |
| createSourceMap | false | Generates a source map mapping the generated source file back to its original sources. |

### Languages

The Closure Compiler supports the following languages:
- `ECMASCRIPT3`, `ECMASCRIPT5` and `ECMASCRIPT5_STRICT` for input and output;
- `ECMASCRIPT6` and `ECMASCRIPT6_STRICT` for input only;
-  `ECMASCRIPT6_TYPED` (experimental) for both.

### Source Code

Unless you're using Gulp's or Webpack's plugins, you'll need to specify code via flags:  
- Both `jsCode` and `externs` accept an array containing objects in the form `{src, path, sourceMap}`.
- Using `path` you can construct a virtual filesystem for use with ES6 or CommonJS imports &mdash; although for CommonJS you'll have to set `processCommonJsModules: true`.

## Transpilation
The JavaScript version of the Closure-Compiler is transpiled by GWT from the Java source.  For more details on the differences in behavior see the [super sourced files](https://github.com/google/closure-compiler/tree/master/src/com/google/javascript/jscomp/gwt/super) in the main repo. 

## Version History

Closure Compiler release notes can be found on the
[main repository wiki](https://github.com/google/closure-compiler/wiki/Binary-Downloads).

## License

Copyright © 2017 The Closure Compiler Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
