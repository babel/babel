babel-standalone
================

babel-standalone is a standalone build of Babel for use in non-Node.js environments, including browsers. It's bundled with all the standard Babel plugins and presets, and [a build of babili (babel-minify)](http://dl.vc/babili-standalone) is optionally available too.

But why?!
=========

It's true that using Babel through Webpack, Browserify or Gulp should be sufficient for most use cases. However, there are some valid use cases for babel-standalone:

 - Sites like [JSFiddle](https://jsfiddle.net/), [JS Bin](https://jsbin.com/), the [REPL on the Babel site](http://babeljs.io/repl/), etc. These sites compile user-provided JavaScript in real-time.
 - Apps that embed a JavaScript engine such as V8 directly, and want to use Babel for compilation
  - Apps that want to use JavaScript as a scripting language for extending the app itself, including all the goodies that ES2015 provides.
  - Integration of Babel into a non-Node.js environment ([ReactJS.NET](http://reactjs.net/), [ruby-babel-transpiler](https://github.com/babel/ruby-babel-transpiler), [php-babel-transpiler](https://github.com/talyssonoc/php-babel-transpiler), etc).

Installation
============

There are several ways to get a copy of babel-standalone. Pick whichever one you like:

- Use it via UNPKG: https://unpkg.com/babel-standalone@6/babel.min.js. This is a simple way to embed it on a webpage without having to do any other setup.
- Install via Bower: `bower install babel-standalone`
- Install via NPM: `npm install --save babel-standalone`
- Manually grab `babel.js` and/or `babel.min.js` from the [GitHub releases page](https://github.com/Daniel15/babel-standalone/releases). Every release includes these files.
- Install it via Git: You can use the repo at https://github.com/Daniel15/babel-standalone-bower to pull a prebuilt version from Git. Note that this is generally only advised for systems that *must* pull artifacts from Git, such as Bower.

Usage
=====

Load `babel.js` or `babel.min.js` in your environment. This will expose [Babel's API](http://babeljs.io/docs/usage/api/) in a `Babel` object:

```js
var input = 'const getMessage = () => "Hello World";';
var output = Babel.transform(input, { presets: ['es2015'] }).code;
```

When loaded in a browser, babel-standalone will automatically compile and execute all script tags with type `text/babel` or `text/jsx`:
```html
<div id="output"></div>
<!-- Load Babel -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<!-- Your custom script here -->
<script type="text/babel">
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
</script>
```

You can use the `data-plugins` and `data-presets` attributes to specify the Babel plugins/presets to use:
```html
<script type="text/babel" data-presets="es2015,stage-2">
```

Loading external scripts via `src` attribute is supported too:
```html
<script type="text/babel" src="foo.js"></script>
```

Note that `.babelrc` doesn't work in babel-standalone, as no file system access is available. The presets and/or plugins to use **must** be specified in the options passed to `Babel.transform`.

Customisation
=============
Custom plugins and presets can be added using the `registerPlugin` and `registerPreset` methods respectively:

```js
// Simple plugin that converts every identifier to "LOL"
function lolizer() {
  return {
    visitor: {
      Identifier(path) {
        path.node.name = 'LOL';
      }
    }
  }
}
Babel.registerPlugin('lolizer', lolizer);
```

Once registered, just use the name of the plugin:

```js
var output = Babel.transform(
  'function helloWorld() { alert(hello); }',
  {plugins: ['lolizer']}
);
// Returns "function LOL() { LOL(LOL); }"
```

Custom plugins also work for inline `<script>`s:

```html
<script type="text/babel" data-plugins="lolizer">
```
