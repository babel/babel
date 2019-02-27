# @babel/plugin-proposal-switch-expressions

> Add a Switch Expression Syntax

## Example

```javascript
  const cageSize = switch (animal) {
    case "cat" => 2;
    case "dog" => 3;
    case "bear", "panda" => 6;
    case "lion", "tiger" => 9,
    default => { throw new Error(`Unknown animal ${animal}`); };
  }
```

## Install

Using npm:

```sh
npm install --save-dev @babel/plugin-proposal-switch-expressions
```

or using yarn:

```sh
yarn add @babel/plugin-proposal-switch-expressions --dev
```
