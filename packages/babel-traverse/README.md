# babel-traverse
> The Babel Traverse module maintains the overall tree state, and is responsible for replacing, removing, and adding nodes

## Install

```
npm install babel-traverse --save
```

## Usage

```javascript
import * as babylon from "babylon";
import traverse from "babel-traverse";

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

traverse(ast, {
  enter(path) {
    if (
      path.node.type === "Identifier" &&
      path.node.name === "n"
    ) {
      path.node.name = "x";
    }
  }
});

```

The above example uses babel-traverse along with babylon to rename the `n` to `x`.