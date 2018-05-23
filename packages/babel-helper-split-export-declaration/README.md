# @babel/helper-split-export-declaration

## API

```js
declare export default splitExportDeclaration(path: NodePath);
```

## Usage

```js
import traverse from "@babel/traverse";
import splitExportDeclaration from "@babel/helper-split-export-declaration";

// ...

traverse(file, {
  ExportDefaultDeclaration(path) {
    if (!path.get("declaration").isClassDeclaration()) return;
    splitExportDeclaration(path);
  },
});
```
