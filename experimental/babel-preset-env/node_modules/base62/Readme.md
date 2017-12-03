# [Base62.js](http://libraries.io/npm/base62)
[![build status](https://secure.travis-ci.org/andrew/base62.js.svg)](http://travis-ci.org/andrew/base62.js)
[![npm version](https://badge.fury.io/js/base62.svg)](http://badge.fury.io/js/base62)
[![devDependency Status](https://david-dm.org/andrew/base62.js/dev-status.svg?theme=shields.io)](https://david-dm.org/andrew/base62.js#info=devDependencies)
[![Gitter chat](http://img.shields.io/badge/gitter-andrew/base62.js-brightgreen.svg)](https://gitter.im/andrew/base62.js)

A javascript Base62 encode/decoder for node.js

## What is Base62 encoding?

From [wikipedia](https://de.wikipedia.org/wiki/Base62):

> Base62 is a priority system to the base 62, which for encoding large numbers using ASCII is character. The digits 0-9 (value 0-9), uppercase letters A-Z (value 10-35) and lowercase letters a-z (value 36-61) are used.

> Due to the high number of base formed shorter strings than with the decimal or hexadecimal system , which mainly offers two advantages:

> - They can be entered by a human being faster and with a smaller risk of error. In this case, a font should be selected in which characters that can be confused, such as small L and large i, or zero, and large O, are distinguishable.
> - Length restrictions, eg when a number is to be used as part of an identifier or file name, can be bypassed. However, it should be noted that the processing system is case-sensitive.

## Install

```bash
npm install base62
```
or for yarn:
```bash
yarn add base62
```


## Usage

### Default Character Set Example

```javascript
Base62 = require('base62')
Base62.encode(999)  // 'g7'
Base62.decode('g7') // 999
```

### Custom Character Set Example

The default character set is `0-9a-zA-Z`. This can be updated to a custom character set. Naturally, it must be 62 characters long.

Instead of the character set `0-9a-zA-Z` you want to use `0-9A-Za-z`, call the `setCharacterSet()` method on the Base62 object passing in the string `"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"`. Note that all characters must be unique.

```javascript
Base62 = require('base62')
Base62.setCharacterSet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
Base62.encode(999)  // 'G7'
Base62.decode('G7') // 999
```

## Development

Source hosted at [GitHub](http://github.com/andrew/base62.js).
Report Issues/Feature requests on [GitHub Issues](http://github.com/andrew/base62.js).

### Note on Patches/Pull Requests

 * Fork the project.
 * Make your feature addition or bug fix.
 * Add tests for it. This is important so I don't break it in a future version unintentionally.
 * Send me a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2016 Andrew Nesbitt. See [LICENSE](https://github.com/andrew/base62.js/blob/master/LICENSE) for details.
