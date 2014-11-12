# Optional runtime

6to5 has a few helper functions that'll be placed at the top of the generated
code if needed so it's not inlined multiple times throughout that file. This may
become an issue if you have multiple files, especially when you're sending them
to the browser. gzip alleviates most of this concern but it's still not ideal.

You can tell 6to5 to not place any declarations at the top of your files and
instead just point them to a reference contained within the runtime.

Simply use the following option if you're using the [Node API](usage.md#node):

```javascript
{
  runtime: true
}
```

or the following flag if you're using the [CLI](usage.md#cli):

    $ 6to5 --runtime

Then just include the runtime before your generated code.

## Getting the runtime

You can get the runtime via either:

    $ 6to5-runtime

or

```javascript
require("6to5").runtime();
```

or from an npm release in `runtime.js` from the 6to5 directory.

## Customising namespace

You can also customise the runtime namespace by passing an optional namespace
argument:

```javascript
require("6to5").runtime("myCustomNamespace");
```

    $ 6to5-runtime myCustomNamespace

See [Options - runtime](usage.md#options) for documentation on changing the
reference in generated code.
