---
layout: docs
title: Options
description: Options for 6to5 transpiling.
permalink: /docs/usage/options/
---

## Usage

```js
to5.transform(code, options);
```

```sh
$ 6to5 --name=value
```

## Options

| Option             | Default              | Description                     |
| ------------------ | -------------------- | ------------------------------- |
| `filename`         | `"unknown"`          | Filename for use in errors etc. |
| `fileNameRelative` | `(filename)`         | Filename relative to `sourceRoot`. |
| `blacklist`        | `[]`                 | Array of transformers to **exclude**. Run `6to5 --help` to see a full list of transformers. |
| `whitelist`        | `[]`                 | Array of transformers to **only** use. Run `6to5 --help` to see a full list of transformers. |
| `optional`         | `[]`                 | Array of transformers to [optionally](/docs/usage/transformers#optional-transformers) use. Run `6to5 --help` to see a full list of module formatters. |
| `modules`          | `"common"`           | Which module formatter to use. Run `6to5 --help` to see a full list of module formatters. |
| `sourceMap`        | `false`              | If truthy, adds a `map` property to returned output. If set to `"inline"`, a comment with a sourceMappingURL directive is added to the bottom of the returned code. |
| `sourceMapName`    | `(filenameRelative)` | Set `file` on returned source map. |
| `sourceFileName`   | `(filenameRelative)` | Set `sources[0]` on returned source map. |
| `sourceRoot`       | `(moduleRoot)`       | The root from which all sources are relative. |
| `moduleRoot`       | `(sourceRoot)`       | Optional prefix for the AMD module formatter that will be prepend to the filename on module definitions. |
| `moduleIds`        | `false`              | If truthy, insert an explicit id for modules. By default, all modules are anonymous. (Not available for `common` modules) |
| `runtime`          | `false`              | Optionally replace all 6to5 helper declarations with a referenece to this variable. If set to `true` then the default namespace is used `to5Runtime`. |
| `comments`         | `true`               | Output comments in generated output. |
| `experimental`     | `false`              | Enable support for experimental ES7 features. |
