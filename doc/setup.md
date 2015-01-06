---
layout: docs
title: Setup
description: Guides on how to setup 6to5 in whatever environment you might be working in.
permalink: /docs/setup/
redirect_from: /plugins.html
---

<blockquote class="to5-callout to5-callout-info">
  <h4>Find your guide</h4>
  <p>
    It doesn't matter if you're using Node.js or Rails, Gulp or Grunt, there's likely a guide on
    this page to help guide you. Go ahead and <span class="label label-info">&#8984; + F</span>
    whatever you're looking for. If it doesn't happen to be on this page you might want to stop by
    our <a href="https://gitter.im/6to5/6to5">support chat</a>.
  </p>
</blockquote>

## Node.js

### CLI

**Install**

```sh
$ npm install --global 6to5
```

**Usage**

```sh
$ 6to5 script.js
```

<blockquote class="to5-callout to5-callout-info">
  <p>
    For full documentation on the 6to5 CLI see the
    <a href="/docs/usage/cli/">usage docs</a>.
  </p>
</blockquote>

### Require Hook

**Install**

```sh
$ npm install 6to5
```

**Usage**

All subsequent files required by node with the extensions `.es6` and `.js` will
be transformed by 6to5. The polyfill specified in [Polyfill](polyfill.md) is
also required.

```javascript
require('6to5/register');
```

<blockquote class="to5-callout to5-callout-info">
  <p>
    For full documentation on the 6to5 require hook see the
    <a href="/docs/usage/require/">usage docs</a>.
  </p>
</blockquote>

## Rails

### Sprockets

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>sprockets-es6</strong>'s
    <a href="https://github.com/josh/sprockets-es6">repo</a> for more info. If
    you find any bugs please
    <a href="https://github.com/josh/sprockets-es6/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ gem install sprockets-es6
```

**Usage**

```rb
# Gemfile
gem 'sprockets'
gem 'sprockets-es6'
```

```rb
require 'sprockets/es6'
```

## Build Systems

### Brocolli

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>broccoli-6to5-transpiler</strong>'s
    <a href="https://github.com/6to5/broccoli-6to5-transpiler">repo</a> for more
    info. If you find any bugs please
    <a href="https://github.com/6to5/broccoli-6to5-transpiler/issues">report
    them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev broccoli-6to5-transpiler
```

**Usage**

```js
var to5Transpiler = require('broccoli-6to5-transpiler');
var scriptTree = to5Transpiler(inputTree, options);
```

<blockquote class="to5-callout to5-callout-warning">
  <h4>Source maps</h4>
  <p>
    Currently this plugin only support inline source maps. If you need separate
    source map feature, we welcome you to submit a pull request.
  </p>
</blockquote>

### Browserify

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>6to5ify</strong>'s
    <a href="https://github.com/6to5/6to5ify">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/6to5ify/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev 6to5ify
```

**Usage via CLI**

```sh
$ browserify script.js -t 6to5ify --outfile bundle.js
```

**Usage via Node.js**

```js
browserify({ debug: true })
  .transform(to5ify);
```

Or a more complete example:

```js
var fs = require('fs');
var browserify = require('browserify');
var to5ify = require('6to5ify');

browserify({ debug: true })
  .transform(to5ify)
  .require('./script.js', { entry: true })
  .bundle()
  .on('error', function (err) { console.log('Error: ' + err.message); })
  .pipe(fs.createWriteStream("bundle.js"));
```
**Passing Options**

```sh
$ browserify -d -e script.js -t [ 6to5ify --blacklist generators ]
```

```js
browserify().transform(to5ify.configure({
  blacklist: ['generators']
}))
```

<blockquote class="to5-callout to5-callout-info">
  <h4>More info</h4>
  <p>
    For more information see the
    <a href="https://github.com/6to5/6to5ify">6to5ify README</a>
  </p>
</blockquote>

### Brunch

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>6to5-brunch</strong>'s
    <a href="https://github.com/6to5/6to5-brunch">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/6to5-brunch/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev 6to5-brunch
```

**Configuring**

Set 6to5 options in your brunch config (such as `brunch-config.coffee`) except
for `filename` and `sourceMap` which are handled internally.

```coffee
plugins:
  ES6to5:
    whitelist: ['arrowFunctions']
    format:
      semicolons: false
```

### Duo

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>duo-6to5</strong>'s
    <a href="https://github.com/6to5/duo-6to5">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/duo-6to5/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev duo-6to5
```

**Usage via CLI**

```sh
$ duo --use duo-6to5
```

**Usage via Node.js**

```js
Duo(root)
  .entry(entry)
  .use(to5)
  .run(fn);
```

### Gobble

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>gobble-6to5</strong>'s
    <a href="https://github.com/6to5/gobble-6to5">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/gobble-6to5/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev gobble-6to5
```

**Usage**

The `options` argument, if specified, is passed to 6to5.

```
var gobble = require('gobble');
module.exports = gobble('src').transform('6to5', options);
```

**Source maps**

Sourcemaps are created by default (all the relevant information is filled in by
Gobble, you don't need to specify `sourceMapName` options etc). If you don't
want that, pass `sourceMap: false`.

### Grunt

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>grunt-6to5</strong>'s
    <a href="https://github.com/6to5/grunt-6to5">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/grunt-6to5/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev grunt-6to5
```

**Usage**

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
  '6to5': {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'dist/app.js': 'src/app.js'
      }
    }
  }
});

grunt.registerTask('default', ['6to5']);
```

### Gulp

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>gulp-6to5</strong>'s
    <a href="https://github.com/6to5/gulp-6to5">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/gulp-6to5/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev gulp-6to5
```

**Usage**

```js
var gulp = require('gulp');
var to5 = require('gulp-6to5');

gulp.task('default', function () {
  return gulp.src('src/app.js')
    .pipe(to5())
    .pipe(gulp.dest('dist'));
});
```

**Source maps**

Use [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) like this:

```js
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var to5 = require('gulp-6to5');
var concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(to5())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});
```

### Webpack

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>6to5-loader</strong>'s
    <a href="https://github.com/6to5/6to5-loader">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/6to5-loader/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev 6to5-loader
```

**Usage via loader**

```js
import Animal from '6to5!./Animal.js';

class Person extends Animal {
  constructor(arg='default') {
    this.eat = 'Happy Meal';
  }
}

export default Person;
```
```js
var Person = require('6to5!./Person.js').default;
new Person();
```

**Usage via config**

```js
module: {
  loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: '6to5-loader'}
  ]
}
```

and then import normally:

```js
import Person from './Person.js';
```

<blockquote class="to5-callout to5-callout-warning">
  <h4>Troubleshooting</h4>
  <p>
    For additional information on how to troubleshoot **6to5-loader** please
    see the
    <a href="https://github.com/6to5/6to5-loader#troubleshooting">README</a>.
  </p>
</blockquote>

## Misc

### Connect

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>6to5-connect</strong>'s
    <a href="https://github.com/6to5/6to5-connect">repo</a> for more info. If
    you find any bugs please
    <a href="https://github.com/6to5/6to5-connect/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```js
$ npm install 6to5-connect
```

**Usage**

```js
var to5Middleware = require('6to5-connect');

app.use(to5Middleware({
  options: {
    // options to use when transforming files
  },
  src: 'assets',
  dest: 'cache'
}));

app.use(connect.static('cache'));
```

### Jade

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>jade-6to5</strong>'s
    <a href="https://github.com/6to5/jade-6to5">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/jade-6to5/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```js
$ npm install jade-6to5
```

**Usage**

```js
var jade = require('jade');
var to5 = require('jade-6to5');

jade.filters.to5 = to5({});
```

OR

```js
var jade = require('jade');
var to5 = require('jade-6to5');

jade = to5({}, jade);
```

Now you can use ES6 in your jade templates as following.

```jade
script
  :to5
    console.log('Hello World !!!');
    class Person {
      constructor(name) {
        this.name = name;
      }
      sayName(){
        console.log(`Hello, my name is ${this.name}`);
      }
    }
    var person = new Person('Apoxx');
    person.sayName();
```

### Jest

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>6to5-jest</strong>'s
    <a href="https://github.com/6to5/6to5-jest">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/6to5-jest/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev 6to5-jest
```

**Usage**

In your `package.json` file please make the following changes:

```
{
  "dependencies": {
    "6to5-jest": "*",
    "jest": "*"
  },
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "scriptPreprocessor": "<rootDir>/node_modules/6to5-jest",
    "testFileExtensions": ["es6", "js"],
    "moduleFileExtensions": ["js", "json", "es6"]
  }
}
```

### Karma

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>karma-6to5-preprocessor</strong>'s
    <a href="https://github.com/6to5/karma-6to5-preprocessor">repo</a> for more
    info. If you find any bugs please
    <a href="https://github.com/6to5/karma-6to5-preprocessor/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```js
npm install --save-dev karma-6to5-preprocessor
```

**Usage**

See 6to5 options for more details.

Given `options` properties are passed to 6to5 with no change except:

- `filename`
- `sourceMapName`
- `sourceFileName`

Because they should differ from file to file, corresponding configuration
functions are available.

For example, inline sourcemap configuration would look like the following.

```js
module.exports = function(config) {
  config.set({
    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'src/**/*.js': ['6to5'],
      'test/**/*.js': ['6to5']
    },
    '6to5Preprocessor': {
      options: {
        sourceMap: 'inline'
      },
      filename: function(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    }
  });
};
```

### Mocha

<blockquote class="to5-callout to5-callout-info">
  <p>
    See <strong>6to5-mocha</strong>'s
    <a href="https://github.com/6to5/6to5-mocha">repo</a> for more info. If you
    find any bugs please
    <a href="https://github.com/6to5/6to5-mocha/issues">report them</a>.
  </p>
  <p>
    <em>Issues with the output should be reported on the 6to5
    <a href="https://github.com/6to5/6to5/issues">issue tracker</a></em>.
  </p>
</blockquote>

**Install**

```sh
$ npm install --save-dev 6to5
```

**Usage**

```js
{
  "scripts": {
    "test": "mocha --require 6to5/register"
  },
  "devDependencies": {
    "6to5": "*",
    "mocha": "*"
  }
}
```
