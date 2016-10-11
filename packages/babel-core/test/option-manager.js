var assert = require("assert");
var OptionManager = require("../lib/transformation/file/options/option-manager");
var Logger = require("../lib/transformation/file/logger");
var path = require("path");

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

  suite("mergeOptions", function () {
    test("throws for removed babel 5 options", function() {
      return assert.throws(
        function () {
          var opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            'randomOption': true
          });
        },
        /Unknown option: base.randomOption/
      );
    });

    test("throws for removed babel 5 options", function() {
      return assert.throws(
        function () {
          var opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            'auxiliaryComment': true,
            'blacklist': true
          });
        },
        /Using removed Babel 5 option: base.auxiliaryComment - Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`/
      );
    });

    test("throws for resolved but erroring preset", function() {
      return assert.throws(
        function () {
          var opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            'presets': [path.join(__dirname, "fixtures/option-manager/not-a-preset")]
          });
        },
        /While processing preset: .*option-manager(?:\/|\\\\)not-a-preset\.js/
      );
    });

    test("throws for invalid preset configuration", function() {
      return assert.throws(
        function () {
          var opt = new OptionManager(new Logger(null, "unknown"));
          opt.init({
            'presets': [{ option: "value" }]
          });
        },
        /Unknown option: foreign.option\.(?:.|\n)+A common cause of this error is the presence of a configuration options object without the corresponding preset name/
      );
    });
  });

  suite("presets", function () {
    function presetTest(name) {
      test(name, function () {
        var opt = new OptionManager(new Logger(null, "unknown"));
        var options = opt.init({
          'presets': [path.join(__dirname, "fixtures/option-manager/presets", name)]
        });

        assert.equal(true, Array.isArray(options.plugins));
        assert.equal(1, options.plugins.length);
      });
    }

    presetTest('es5');
    presetTest('es5_function');
    presetTest('es2015_default');
    presetTest('es2015_default_function');
    presetTest('es2015_default_object_function');
    presetTest('es2015_function');
    presetTest('es2015_function_fallback');
    presetTest('es2015_named');

  });
});
