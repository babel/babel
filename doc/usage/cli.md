---
layout: docs
title: CLI
description: How to use the CLI tools.
permalink: /docs/usage/cli/
redirect_from: /usage.html
---

<p class="lead">
  6to5 comes with a built-in CLI which can be used to compile files from the
  command line.
</p>

## Install

Using [npm](https://www.npmjs.com/) you can install 6to5 globally, making it
available from the command line.

```sh
$ npm install --global 6to5
```

## 6to5

#### Compile Files

Compile the file `script.js` and **output to stdout**.

```sh
$ 6to5 script.js
# output...
```

If you would like to **output to a file** you may use `--out-file` or `-o`.

```sh
$ 6to5 script.js --out-file script-compiled.js
```

### Compile with Source Maps

If you would then like to add a **source map file** you can use
`--source-maps` or `-s`. [Learn more about source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/).

```sh
$ 6to5 script.js --out-file script-compiled.js --source-maps
```

If you would rather have **inline source maps**, you may use
`--source-maps-inline` or `-t`.

```sh
$ 6to5 script.js --out-file script-compiled.js --source-maps-inline
```

### Compile Directories

Compile the entire `src` directory and output it to the `lib` directory.

```sh
$ 6to5 src --out-dir lib
```

Compile the entire `src` directory and output it to the one concatenated file.

```sh
$ 6to5 src --out-file script-compiled.js
```

### Piping Files

Pipe a file in via stdin and output it to `script-compiled.js`

```sh
$ 6to5 --out-file script-compiled.js < script.js
```

## 6to5-node

6to5 comes with a second CLI which works exactly the same as Node.js's CLI, only
it will compile ES6 code before running it.

Launch a REPL (Read-Eval-Print-Loop).

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
