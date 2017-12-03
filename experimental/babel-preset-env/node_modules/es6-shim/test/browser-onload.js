/* global window, mocha */

if (typeof window !== 'undefined') {
  window.completedTests = 0;
  window.sawFail = false;
  window.onload = function () {
    window.testsPassed = null;
    var handleResults = function (runner) {
      var failedTests = [];
      if (runner.stats.end) {
        window.testsPassed = runner.stats.failures === 0;
      }
      runner.on('pass', function () {
        window.completedTests += 1;
      });
      runner.on('fail', function (test, err) {
        window.sawFail = true;
        var flattenTitles = function (testToFlatten) {
          var titles = [];
          var currentTest = testToFlatten;
          while (currentTest.parent.title) {
            titles.push(currentTest.parent.title);
            currentTest = currentTest.parent;
          }
          return titles.reverse();
        };
        failedTests.push({
          name: test.title,
          result: false,
          message: err.message,
          stack: err.stack,
          titles: flattenTitles(test)
        });
      });
      runner.on('end', function () {
        window.testsPassed = !window.sawFail;
        // for sauce
        window.mochaResults = runner.stats;
        window.mochaResults.reports = failedTests;
      });
      return runner;
    };
    handleResults(mocha.run());
  };
}
