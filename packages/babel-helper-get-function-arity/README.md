# @babel/helper-get-function-arity

Function that returns the number of arguments or operands that a function takes.

## Usage

```
import getFunctionArity from "@babel/helper-get-function-arity";

function wrap(state, method, id, scope) {
  ...
  if (!t.isFunction(method)) {
    return false;
  }
  
  const argumentLength = getFunctionArity(method);
  ...
}
```
