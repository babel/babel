# babel-eslint

**babel-eslint** allows you to lint **ALL** valid Babel code with the fantastic
[eslint](https://github.com/eslint/eslint).

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

### Run

```sh
$ eslint your-files-here
```
