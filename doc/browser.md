# Browser

A browser version of 6to5 is available from `browser.js` inside the 6to5
directory in an npm release.

## Scripts

While it's not recommended for serious use, when the browser version is included
all scripts with the type `text/ecmascript-6` and `text/6to5` are automatically
compiled and ran.

For example:

```html
<script src="node_modules/6to5/browser.js"></script>
<script type="text/6to5">
class Test {
  test() {
    return "test";
  }
}

var test = new Test;
test.test();
</script>
```

## Build

You can build a browser version of the compiler by running the following in the
6to5 directory:

    $ make build

This will output the files `dist/6to5.js` and `dist/6to5.min.js`.

## Test

To test 6to5 in your browser run:

    $ make test-browser

And open `test/browser.html` in your browser if it doesn't open automatically.

## API

### to5.transform(code, [opts])

See [options](usage.md#options) for additional documentation.

```javascript
to5.transform("class Test {}").code;
```

### to5.run(code, [opts])

See [options](usage.md#options) for additional documentation.

```javascript
to5.run("class Test {}");
```
