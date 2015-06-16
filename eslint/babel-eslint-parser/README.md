# babel-eslint [![Build Status][travis-image]][travis-url]

**babel-eslint** allows you to lint **ALL** valid Babel code with the fantastic
[ESLint](https://github.com/eslint/eslint).

**NOTE:** Please note that this is experimental and may have numerous bugs. It is however
successfuly linting the [babel core](https://github.com/babel/babel/blob/master/.eslintrc).

If there is an issue, first check if it can be reproduced with the regular parser and with the latest versions of `eslint` and `babel-eslint`.

For questions and support please visit the `#linting` [babel slack channel](https://babel-slack.herokuapp.com)!

## Known Issues
> For issues related to JSX (especially `no-unused-vars`), see if [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) helps!
- `generator-star` with async/await functions [#78](https://github.com/babel/babel-eslint/issues/78)
- `object-shorthand` with spread operator [#131](https://github.com/babel/babel-eslint/issues/131)

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
