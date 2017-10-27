# @babel/helper-annotate-as-pure

## API

```js
declare export default annotateAsPure(nodeOrPath: Node | NodePath);
```

## Usage

```js
import traverse from "@babel/traverse";
import annotateAsPure from "@babel/helper-annotate-as-pure";

// ...

traverse(file, {
  CallExpression(path) {
    annotateAsPure(path);
  },
});
```

## Caveat with UglifyJS pre v3.1.0

`@babel/helper-annotate-as-pure` will append any existing leading comments to the `#__PURE__` annotation. Versions of UglifyJS prior to v3.1.0 will **ignore** these annotations, as they only check the _last_ leading comment for the annotation.

For example, using the `Usage` snippet above:

**In**

```js
const four = /* foo */ add(2, 2);
```

**Out**

```js
const four = /* #__PURE__ */ /* foo */ add(2, 2);
```
