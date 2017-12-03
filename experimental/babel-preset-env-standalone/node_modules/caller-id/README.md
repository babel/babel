# caller-id

A utility for getting information on the caller of a function in node.js

[![Build Status](https://travis-ci.org/pixelsandbytes/caller-id.png?branch=master)](https://travis-ci.org/pixelsandbytes/caller-id)

## Installation
1. Add `caller-id` as a dependency to your project’s `package.json`
2. Run `npm install`

## Usage Examples

### `getData`

`getData()` can be used to get raw data about a function's caller

    var callerId = require('caller-id');

    // 1. Function calling another function
    function foo() {
        bar();
    }
    function bar() {
        var caller = callerId.getData();
        /*
        caller = {
            typeName: 'Object',
            functionName: 'foo',
            filePath: '/path/of/this/file.js',
            lineNumber: 5,
            topLevelFlag: true,
            nativeFlag: false,
            evalFlag: false
        }
        */
    }

    // 2. Method in a class calling a function
    function Lorem() {}
    Lorem.prototype.ipsum = function() {
        baz();
    }
    function baz() {
        var caller = callerId.getData();
        /*
        caller = {
            typeName: 'Lorem',
            functionName: 'Lorem.ipsum',
            methodName: 'ipsum',
            filePath: '/path/of/this/file.js',
            lineNumber: 25,
            topLevelFlag: false,
            nativeFlag: false,
            evalFlag: false
        }
        */
    }

    // 3. Function in an eval calling another function
    function func() {
        var caller = callerId.getData();
        /*
        caller = {
            typeName: 'Object',
            functionName: 'evil',
            lineNumber: 2,
            topLevelFlag: true,
            nativeFlag: false,
            evalFlag: true,
            evalOrigin: 'eval at <anonymous> (/path/of/this/file.js:58:7)'
        }
        */
    }
    eval('(function evil() {' + '\\n' +
        'func();' + '\\n' +
        '})();');

### `getString`

`getString()` returns a brief string representing a function's caller

    var callerId = require('caller-id');

    function myFunction() {
        var callerString = callerId.getString();
    }

Using the same examples as above, `getString()` returns the following:

1.  foo
2.  Lorem.ipsum
3.  (eval)evil

### `getDetailedString`

`getDetailedString()` returns a more detailed string representing a function's caller

    var callerId = require('caller-id');

    function myFunction() {
        var detailedCallerString = callerId.getDetailedString();
    }

Using the same examples as above, `getDetailedString()` returns the following:

1.  foo at /path/of/this/file.js:5
2.  Lorem.ipsum at /path/of/this/file.js:25
3.  eval at <anonymous> (/path/of/this/file.js:58:7)