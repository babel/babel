# babel-helper-annotate-as-pure

## API

```js
declare export default annotateAsPure(nodeOrPath: Node | NodePath);
```

## Usage

```js
import traverse from "babel-traverse";
import annotateAsPure from "babel-helper-annotate-as-pure";

// ...

traverse(file, {
  CallExpression(path) {
    annotateAsPure(path);
  },
});
```

## Caveat with UglifyJS pre v3.1.0

`babel-helper-annotate-as-pure` concatenates existing leading comments to the `#__PURE__` annotation, but versions of UglifyJS before v3.1.0 checks only the last leading comment for the annotation.

So for the example input when annotating all CallExpressions:
```js
const four = /* foo */ add(2, 2);
```
it produces:
```js
const four = /* #__PURE__ */ /* foo */ add(2, 2);
```
and such generated annotation will be ignored in those previous versions of the UglifyJS.
