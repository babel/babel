var res = transform('', {
  plugins: [
    function (b) {
      return {
        visitor: {
          Program: function(path, state) {
            var file = state.file;
            file.addImport('import-star', '*', 'lib');
            file.addImport('import-default', 'default', 'foo');
            file.addImport('import-alias', 'bar', 'baz');
            file.addImport('import-default-alias', 'quux');
            file.addImport('import-none');
            file.addImport('import-empty', '');
          },
        }
      }
    }
  ]
});

var expected = multiline([
  'import "import-empty";',
  'import "import-none";',
  'import { quux as _quux } from "import-default-alias";',
  'import { bar as _baz } from "import-alias";',
  'import _foo from "import-default";',
  'import * as _lib from "import-star";'
]);

assert.equal(res.code, expected);
