# babel-cli

> Babel command line.
 
Babel comes with a built-in CLI which can be used to compile files from the command line. In addition, various entry point scripts live in the top-level package at `babel-cli/bin`.

There are some shell-executable utility scripts, `babel-external-helpers.js` and `babel-node.js`, and the main Babel cli script, `babel.js`.

## Install

While you _can_ install Babel CLI globally on your machine, it's much better
to install it **locally** project by project.

There are two primary reasons for this.

1. Different projects on the same machine can depend on different versions of
     Babel allowing you to update one at a time.
2. It means you do not have an implicit dependency on the environment you are
     working in. Making your project far more portable and easier to setup.

We can install Babel CLI locally by running:

```sh
npm install --save-dev babel-cli
```

> **Note:** If you do not have a `package.json`, create one before installing. This will ensure proper interaction with the `npx` command.

After that finishes installing, your `package.json` file should include:

```diff
{
  "devDependencies": {
+   "babel-cli": "^6.0.0"
  }
}
```

## Basic Usage 

```sh
babel script.js
```

## babel

> **Note:** These instructions use the excellent [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) command to run the locally installed executables. You can drop it inside of an [npm run script](https://docs.npmjs.com/cli/run-script) or you may instead execute with the relative path instead. `./node_modules/.bin/babel`

### Compile Files

Compile the file `script.js` and **output to stdout**.

```sh
npx babel script.js
# output...
```

If you would like to **output to a file** you may use `--out-file` or `-o`.

```sh
npx babel script.js --out-file script-compiled.js
```

To compile a file **every time that you change it**, use the `--watch` or `-w` option:

```sh
npx babel script.js --watch --out-file script-compiled.js
```

### Compile with Source Maps

If you would then like to add a **source map file** you can use
`--source-maps` or `-s`. [Learn more about source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/).

```sh
npx babel script.js --out-file script-compiled.js --source-maps
```

If you would rather have **inline source maps**, you may use `--source-maps inline`.

```sh
npx babel script.js --out-file script-compiled.js --source-maps inline
```

### Compile Directories

Compile the entire `src` directory and output it to the `lib` directory. You may use `--out-dir` or `-d`. This doesn't overwrite any other files or directories in `lib`.

```sh
npx babel src --out-dir lib
```

Compile the entire `src` directory and output it to the one concatenated file.

```sh
npx babel src --out-file script-compiled.js
```

### Ignore files

Ignore spec and test files

```sh
npx babel src --out-dir lib --ignore spec.js,test.js
```

### Copy files

Copy files that will not be compiled

```sh
npx babel src --out-dir lib --copy-files
```

### Piping Files

Pipe a file in via stdin and output it to `script-compiled.js`

```sh
npx babel --out-file script-compiled.js < script.js
```

### Using Plugins

Use the `--plugins` option to specify plugins to use in compilation

```sh
npx babel script.js --out-file script-compiled.js --plugins=transform-runtime,transform-es2015-modules-amd
```

### Using Presets

Use the `--presets` option to specify plugins to use in compilation

```sh
npx babel script.js --out-file script-compiled.js --presets=es2015,react
```

### Ignoring .babelrc

Ignore the configuration from the projects .babelrc file and use the cli options e.g. for a custom build

```sh
npx babel --no-babelrc script.js --out-file script-compiled.js --presets=es2015,react
```

### Advanced Usage

There are many more options available in the babel CLI, see [options](/docs/usage/api/#options), `babel --help` and other sections for more information.

## babel-node

> #### Not meant for production use
> 
> You should not be using `babel-node` in production. It is unnecessarily heavy, with high memory usage due to the cache being stored in memory. You will also always experience a startup performance penalty as the entire app needs to be compiled on the fly.
> 
> Check out the [example Node.js server with Babel](https://github.com/babel/example-node-server) for an idea of how to use Babel in a production deployment.

> #### ES6-style module-loading may not function as expected
> 
> Due to technical limitations ES6-style module-loading is not fully supported in a `babel-node REPL`.

babel comes with a second CLI which works exactly the same as Node.js's CLI, only
it will compile ES6 code before running it.

Launch a REPL (Read-Eval-Print-Loop).

```sh
npx babel-node
```

Evaluate code.

```sh
npx babel-node -e "class Test { }"
```

Compile and run `test.js`.

```sh
npx babel-node test
```

> **Tip:** Use `rlwrap` to get a REPL with input history
>
> ```sh
> npx rlwrap babel-node
> ```
>
> On some platforms (like OSX), extra arguments may be required for `rlwrap` to function properly, eg:
>
> ```sh
> NODE_NO_READLINE=1 npx rlwrap --always-readline babel-node
> ```

### Usage

```sh
babel-node [options] [ -e script | script.js ] [arguments]
```

When arguments for user script have names conflicting with node options, double dash placed before script name can be used to resolve ambiguities

```sh
npx babel-node --debug --presets es2015 -- script.js --debug
```

### Options

| Option                   | Default              | Description                     |
| ------------------------ | -------------------- | ------------------------------- |
| `-e, --eval [script]`    |                      | Evaluate script                 |
| `-p, --print`            |                      | Evaluate script and print result |
| `-i, --ignore [regex]`   | `node_modules`       | Ignore all files that match this regex when using the require hook |
| `-x, --extensions`       | `".js",".jsx",".es6",".es"` | List of extensions to hook into |
| `--presets`                | `[]`                 | Comma-separated list of [presets](/docs/plugins/#presets) (a set of plugins) to load and use. |
| `--plugins`                | `[]`                 | Comma-separated list of [plugins](/docs/plugins/) to load and use. |
