var assert = require("assert");
var OptionManager = require("../lib/transformation/file/options/option-manager");

suite("option-manager", function () {
  suite("memoisePluginContainer", function () {
    test("throws for babel 5 plugin", function() {
      return assert.throws(
        function () {
          OptionManager.memoisePluginContainer(
            function (ref) {
              var Plugin = ref.Plugin;
              return new Plugin("object-assign", {});
            }
          );
        },
        /Babel 5 plugin is being run with Babel 6/
      );
    })
  });
});
