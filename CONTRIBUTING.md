# Contributing

Contributions are always welcome, no matter how large or small. Before contributing, please read the [code of conduct](https://github.com/6to5/6to5/blob/master/CODE_OF_CONDUCT.md).

## Developing

#### Workflow

* Fork the repository
* Clone your fork and change directory to it (`git clone git@github.com:yourUserName/6to5.git && cd 6to5`)
* Install the project dependencies (`make bootstrap`)
* Link your forked clone (`npm link`)
* Develop your changes ensuring you're fetching updates from upstream often
* Ensure the test are passing (`make test`)
* Create new pull request explaining your proposed change or reference an issue in your commit message

#### Code Standards

 * **General**
   * No ES6 syntax features or methods, exclusively ES5.
   * Max of five arguments for functions
   * Max depth of four nested blocks
   * 2-spaced soft tabs
 * **Naming**
   * CamelCase all class names
   * camelBack all variable names
 * **Spacing**
   * Spaces after all keywords
   * Spaces before all left curly braces
 * **Comments**
   * Use JSDoc-style comments for methods
   * Single-line comments for ambiguous code
 * **Quotes**
   * Always use double quotes
   * Only use single quotes when the string contains a double quote
 * **Declaration**
   * No unused variables
   * No pollution of global variables and prototypes

## Testing

    $ make test

## Linting

    $ make lint
