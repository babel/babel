var driver = require("./driver.js");
require("./tests.js");
require("./tests-harmony.js");

var stats, modes = {
  Normal: {
    config: {
      parse: (typeof require === "undefined" ? window.acorn : require("../acorn.js")).parse
    }
  },
  Loose: {
    config: {
      parse: (typeof require === "undefined") ? window.acorn_loose : require("../acorn_loose").parse_dammit,
      loose: true,
      filter: function (test) {
        var ecmaVersion = (test.options || {}).ecmaVersion || 5;
        return ecmaVersion <= 6;
      }
    }
  }
};

function report(state, code, message) {
  if (state != "ok") {++stats.failed; console.log(code, message);}
  ++stats.testsRun;
}

for (var name in modes) {
  var mode = modes[name];
  stats = mode.stats = {testsRun: 0, failed: 0};
  var t0 = +new Date;
  driver.runTests(mode.config, report);
  mode.stats.duration = +new Date - t0;
}

function outputStats(name, stats) {
  console.log(name + ": " + stats.testsRun + " tests run in " + stats.duration + "ms; " +
    (stats.failed ? stats.failed + " failures." : "all passed."));
}

var total = {testsRun: 0, failed: 0, duration: 0};

for (var name in modes) {
  var stats = modes[name].stats;
  outputStats(name + " parser", stats);
  for (var key in stats) total[key] += stats[key];
}

outputStats("Total", total);

if (total.failed) {
  process.stdout.write("", function() {
    process.exit(1);
  });
}
