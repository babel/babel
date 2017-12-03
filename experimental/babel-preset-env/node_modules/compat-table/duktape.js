/*
 *  Node.js test runner for running data-*.js tests with Duktape 'duk' command.
 *
 *  Reports discrepancies to console; fix them manually in data-*.js files.
 *  Expects a './duk' command in the current directory.  Example:
 *
 *    $ cp /path/to/duk ./duk
 *    $ node duktape.js
 */

var fs = require('fs');
var child_process = require('child_process');

var testCount = 0;
var testSuccess = 0;
var testOutOfDate = 0;

var dukCommand = './duk';

var environments = JSON.parse(fs.readFileSync('environments.json').toString());

// Key for .res (e.g. test.res.duktape2_0), automatic based on Duktape.version.
var dukKey = (function () {
    var stdout = child_process.execFileSync(dukCommand, [ '-e', 'print(Duktape.version)' ], {
        encoding: 'utf-8'
    });
    var dukVersion = Number(stdout);
    console.log('Duktape version is: ' + dukVersion);
    return 'duktape' + (Math.floor(dukVersion / 10000)) + '_' + (Math.floor(dukVersion / 100 % 100));
})();
console.log('Duktape result key is: test.res.' + dukKey);

// List of keys for inheriting results from previous versions.
var dukKeyList = (function () {
    var res = [];
    for (var k in environments) {
        var env = environments[k];
        if (env.family !== 'Duktape') {
            continue;
        }
        res.push(k);
        if (k === dukKey) {
            // Include versions up to 'dukKey' but not newer.
            break;
        }
    }
    return res;
})();
console.log('Duktape key list for inheriting results is:', dukKeyList);

// Run test / subtests, recursively.  Report results, indicate data files
// which are out of date.
function runTest(parents, test, sublevel) {
    var testPath = parents.join(' -> ') + ' -> ' + test.name;

    if (typeof test.exec === 'function') {
        var src = test.exec.toString();
        var m = /^function\s*\w*\s*\(.*?\)\s*\{\s*\/\*([\s\S]*?)\*\/\s*\}$/m.exec(src);
        var evalcode;
        if (m) {
            evalcode = '(function test() {' + m[1] + '})();';
        } else {
            evalcode = '(' + src + ')()';
        }
        //console.log(evalcode);

        var script = 'var evalcode = ' + JSON.stringify(evalcode) + ';\n' +
                     'try {\n' +
                     '    var res = eval(evalcode);\n' +
                     '    if (res !== true && res !== 1) { throw new Error("failed: " + res); }\n' +
                     '    console.log("[SUCCESS]");\n' +
                     '} catch (e) {\n' +
                     '    console.log("[FAILURE]", e);\n' +
                     '    /*throw e;*/\n' +
                     '}\n';

        fs.writeFileSync('duktest.js', script);
        var stdout = child_process.execFileSync(dukCommand, [ 'duktest.js' ], {
            encoding: 'utf-8'
        });
        //console.log(stdout);

        var success = false;
        if (/^\[SUCCESS\]$/gm.test(stdout)) {
            success = true;
            testSuccess++;
        } else {
            //console.log(stdout);
        }
        testCount++;

        if (test.res) {
            // Take expected result from newest Duktape version not newer
            // than current version.
            var expect = void 0;
            dukKeyList.forEach(function (k) {
                if (test.res[k] !== void 0) {
                    expect = test.res[k];
                }
            });

            if (expect === success) {
                // Matches.
            } else if (expect === void 0 && !success) {
                testOutOfDate++;
                console.log(testPath + ': test result missing, res: ' + expect + ', actual: ' + success);
            } else {
                testOutOfDate++;
                console.log(testPath + ': test result out of date, res: ' + expect + ', actual: ' + success);
            }
        } else {
            testOutOfDate++;
            console.log(testPath + ': test.res missing');
        }
    }
    if (test.subtests) {
        var newParents = parents.slice(0);
        newParents.push(test.name);
        test.subtests.forEach(function (v) { runTest(newParents, v, sublevel + 1); });
    }
}

fs.readdirSync('.').forEach(function (filename) {
    var m = /^(data-.*)\.js$/.exec(filename);
    if (!m) {
        return;
    }
    var suitename = m[1];

    console.log('');
    console.log('**** ' + suitename + ' ****');
    console.log('');
    var testsuite = require('./' + suitename);
    testsuite.tests.forEach(function (v) { runTest([ suitename ], v, 0); });
});

console.log(testCount + ' tests executed: ' + testSuccess + ' success, ' + (testCount - testSuccess) + ' fail');
console.log(testOutOfDate + ' tests are out of date (data-*.js file .res)');
