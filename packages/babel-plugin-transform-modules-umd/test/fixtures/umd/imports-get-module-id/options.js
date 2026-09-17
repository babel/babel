
var reSourceRoot = /^umd\/imports-get-module-id\//;

module.exports = {
  "plugins": [
    "external-helpers",
    [
      "transform-modules-umd",
      {
        "globals": {
          "foo-bar": "fooBAR",
          "fizzbuzz": "fizz.buzz",
          "umd/imports-get-module-id/input.mjs": "customModuleId.input",
          "umd/imports-get-module-id/mylib/foo-bar": "customModuleId.mylib.fooBar",
          "umd/imports-get-module-id/file.mjs": "customModuleId.file",
        },
        "exactGlobals": true,
        "importFileExt": ".js"
      }
    ]
  ],
  moduleIds: true,
  getModuleId(name) {
    if (reSourceRoot.test(name)) {
      return 'custom-module-id/'+name.replace(reSourceRoot, '');
    }
  }
};
