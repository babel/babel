# babel-eslint

**babel-eslint** allows you to lint **ALL** valid Babel code with the fantastic
[ESLint](https://github.com/eslint/eslint).

**NOTE:** Please note that this is experimental and may have numerous bugs. It is however
successfuly linting the [babel core](https://github.com/babel/babel/blob/master/.eslintrc).

## Usage

### Install

```sh
$ npm install eslint babel-eslint
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
