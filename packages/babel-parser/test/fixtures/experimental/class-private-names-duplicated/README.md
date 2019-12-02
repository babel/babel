These tests have been generated using the following script:

```js
var feat = {
  "field": "#x = 0;",
  "method": "#x() {}",
  "get": "get #x() {}",
  "set": "set #x(_) {}",
};
var placement = {
  "static": "static ",
  "instance": ""
}

for (var f1 in feat) for (var f2 in feat) for (var p1 in placement) for (var p2 in placement) {
  var code = `class A {
  ${placement[p1]}${feat[f1]}
  ${placement[p2]}${feat[f2]}
}`;
  var name = `${p1}-${f1}-${p2}-${f2}`;
  var folder = "packages/babel-parser/test/fixtures/experimental/class-private-names-duplicated/" + name;

  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  fs.writeFileSync(folder + "/input.js", code);
}
```