# babel-helper-module-imports

## Usage

### Adding a named impport

```
import { addNamed } from "babel-helper-module-imports";

export default function({ types: t }) {
  return {
    visitor: {
      ReferencedIdentifier(path) {
        let importName = this.importName;
        if (importName) {
          importName = t.cloneDeep(importName);
        } else {
          // require('bluebird').coroutine
          importName = this.importName = addName(path, 'coroutine', 'bluebird');
        }

        path.replaceWith(importName);
      }
    },
  };
}
```
