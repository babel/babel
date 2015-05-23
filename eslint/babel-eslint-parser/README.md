# babel-eslint [![Build Status][travis-image]][travis-url]

**babel-eslint** allows you to lint **ALL** valid Babel code with the fantastic
[ESLint](https://github.com/eslint/eslint).

**NOTE:** Please note that this is experimental and may have numerous bugs. It is however
successfuly linting the [babel core](https://github.com/babel/babel/blob/master/.eslintrc).

If there's an issue, check if it can be reproduced with the regular parser and with the latest versions of `eslint` and `babel-eslint`. For issues related to JSX, see if [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) helps!

## How does it work?

ESLint allows custom parsers. This is great but some of the syntax nodes that Babel supports
aren't supported by ESLint. When using this plugin, ESLint is monkeypatched and your code is
transformed into code that ESLint can understand. All location info such as line numbers,
columns is also retained so you can track down errors with ease.

## Usage

### Install

```sh
$ npm install -g eslint babel-eslint
```

### Setup

**.eslintrc**

```json
{
  "parser": "babel-eslint",
  "rules": {
    "strict": 0
  }
}
```

Check out the [ESLint docs](http://eslint.org/docs/rules/) for all possible rules.

### Run

```sh
$ eslint your-files-here
```

[travis-url]: https://travis-ci.org/babel/babel-eslint
[travis-image]: https://travis-ci.org/babel/babel-eslint.svg?branch=master
