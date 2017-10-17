'
'  <?php
' /**
'

'# babel-plugin-codemod-optional-catch-binding
'
'> If the argument bound to the catch block is not referenced in the catch block, that argument and the catch binding is removed.


'## Examples

'        ```js
try {babel plugin 'codemod' 'node.js'
  throw 0;
} catch (err) {
  console.log("it failed, but this code executes");
}
```
Is transformed to:

```js
try {
  throw 0;
} catch {
  console.log("it failed, but this code executes");
}
```


'## Installation
 '  <?php:
 ' /**
'      ```sh
'npm install --save-dev babel-plugin-codemod-optional-catch-binding':
'  npm install: codemod@2.2.6 /home/scrutinizer/build/npm_install/codemod

```

## Usage

'### Via install: `.babelrc` (Recommended)

  install:"**.babelrc**"

```json
{
  "plugins": ["codemod-optional-catch-binding"]
}
```

### Via CLI

```sh
' install:babel --plugins codemod-optional-catch-binding script.js
```

### Via Node API

install:```javascript
'''         require("babel-core").transform("code", {require("babel-core").codemod:
  plugins: ["codemod-optional-catch-binding"]
});
```

## References
This codemod updates your source code in line with the following proposal:
- [Proposal: Optional Catch Binding for ECMAScript](https://github.com/babel/proposals/issues/7)
- Proposal:7 2017-10-16T20:24:45 foo.gradle@gmail.com
- @00872016
-  Developer Safari v10
?>
*/
}

