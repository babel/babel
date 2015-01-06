---
layout: docs
title: Optional Runtime
description: How to use the optional runtime.
permalink: /docs/usage/runtime/
---

## Details

6to5 has a few helper functions that'll be placed at the top of the generated
code if needed so it's not inlined multiple times throughout that file. This may
become an issue if you have multiple files, especially when you're sending them
to the browser. gzip alleviates most of this concern but it's still not ideal.

You can tell 6to5 to not place any declarations at the top of your files and
instead just point them to a reference contained within the runtime.

## Usage

```js
$ 6to5 --runtime
```

```js
to5.transform('code', { runtime: true });
```

### Getting the runtime

```sh
$ 6to5-runtime
```

or

```js
require('6to5').runtime();
```

or from an npm release in `runtime.js` from the 6to5 directory.

### Customising namespace

You can also customise the runtime namespace by passing an optional namespace
argument:

```sh
$ 6to5-runtime myCustomNamespace
```

```js
require("6to5").runtime('myCustomNamespace');
```

See [Options - runtime](../options) for documentation on changing the reference in
generated code.
