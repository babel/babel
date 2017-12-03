var assert  = require('assert')
  , mock    = require('../index')
  ;

(function shouldMockAndUnmock() {
  mock('./exported-fn', function() {
    return 'mocked fn';
  });

  mock.stop('./exported-fn');

  var fn = require('./exported-fn');
  assert.equal(fn(), 'exported function');
})();

(function shouldMockRequiredFn() {
  mock('./exported-fn', function() {
    return 'mocked fn';
  });

  var fn = require('./exported-fn');
  assert.equal(fn(), 'mocked fn');

  mock.stop('./exported-fn');

  fn = require('./exported-fn');
  assert.equal(fn(), 'exported function');
})();

(function shouldMockRequiredObj() {
  mock('./exported-obj', {
    mocked: true,
    fn: function() {
      return 'mocked obj';
    }
  });

  var obj = require('./exported-obj');
  assert.equal(obj.fn(), 'mocked obj');
  assert.equal(obj.mocked, true);

  mock.stop('./exported-obj');

  obj = require('./exported-obj');
  assert.equal(obj.fn(), 'exported object');
  assert.equal(obj.mocked, false);
})();

(function shouldMockRootLib() {
  mock('.', { mocked: true });
  assert.equal(require('.').mocked, true);
  mock.stop('.');
})();

(function shouldMockStandardLibs() {
  mock('fs', { mocked: true });

  var fs = require('fs');
  assert.equal(fs.mocked, true);
  mock.stop('fs');
})();

(function shouldMockExternalLibs() {
  mock('caller-id', { mocked: true });

  var callerId = require('caller-id');
  assert.equal(callerId.mocked, true);
  mock.stop('caller-id');
})();

(function shouldRequireMockedLib() {
  mock('fs', 'path');

  assert.equal(require('fs'), require('path'));
  mock.stop('fs');

  mock('./exported-fn', './exported-obj');
  assert.equal(require('./exported-fn'), require('./exported-obj'));
  mock.stop('./exported-fn');
})();

(function shouldReRequireMockedRootLib() {
  assert.equal(mock.reRequire('.'), 'root');
})();

(function mocksShouldCascade() {
  mock('path', { mocked: true });
  mock('fs', 'path');

  var fs = require('fs');
  assert.equal(fs.mocked, true);
  mock.stop('fs');
  mock.stop('path');
})();

(function mocksShouldNeverRequireTheOriginal() {
  mock('./throw-exception', {});
  require('./throw-exception');
  mock.stop('./throw-exception');
})();

(function mocksShouldWorkWhenRequiredFromOtherFile() {
  mock('./throw-exception', {});
  require('./throw-exception-runner');
  mock.stop('./throw-exception');
})();

(function shouldLoadMockedLibOnlyWhenRequired() {
  mock('./throw-exception', './throw-exception-when-required');
  try{
    require('./throw-exception-runner')
  }
  catch (error) {
    assert.equal(e.message, 'this should run when required')
  }
  mock.stopAll();
})();

(function shouldUnregisterAllMocks() {
  mock('fs', {});
  mock('path', {});
  var fsMock = require('fs');
  var pathMock = require('path');

  mock.stopAll();

  assert.notEqual(require('fs'), fsMock);
  assert.notEqual(require('path'), pathMock);
})();

(function shouldRegisterMockForExternalModuleThatIsNotFound() {
  mock('a', {id: 'a'});

  assert.equal(require('a').id, 'a');

  mock.stopAll();
})();

(function shouldRegisterMultipleMocksForExternalModulesThatAreNotFound() {
  mock('a', {id: 'a'});
  mock('b', {id: 'b'});
  mock('c', {id: 'c'});

  assert.equal(require('a').id, 'a');
  assert.equal(require('b').id, 'b');
  assert.equal(require('c').id, 'c');

  mock.stopAll();
})();

(function shouldRegisterMockForLocalModuleThatIsNotFound() {
  mock('./a', {id: 'a'});

  assert.equal(require('./a').id, 'a');

  mock.stopAll();
})();

(function shouldRegisterMockForLocalModuleThatIsNotFound_2() {
  mock('../a', {id: 'a'});

  assert.equal(require('../a').id, 'a');

  mock.stopAll();
})();

(function shouldRegisterMockForLocalModuleThatIsNotFoundAtCorrectPath() {
  mock('./x', {id: 'x'});

  assert.equal(require('./nested/module-c').dependentOn.id, 'x');

  mock.stopAll();
})();

(function shouldRegisterMultipleMocksForLocalModulesThatAreNotFound() {
  mock('./a', {id: 'a'});
  mock('./b', {id: 'b'});
  mock('./c', {id: 'c'});

  assert.equal(require('./a').id, 'a');
  assert.equal(require('./b').id, 'b');
  assert.equal(require('./c').id, 'c');

  mock.stopAll();
})();

(function shouldUnRegisterMockForModuleThatIsNotFound() {
  var moduleName = 'module-that-is-not-installed';

  mock(moduleName, {mocked: true});
  mock.stop(moduleName);

  try{
    require(moduleName)
  } catch (e) {
    assert.equal(e.code, 'MODULE_NOT_FOUND')
  }
})();

(function shouldLoadMockedExternalModuleWhenLocalModuleHasSameName() {
  mock('module-a', {id: 'external-module-a'});

  var b = require('./module-b')

  assert.equal(b.dependentOn.id, 'local-module-a')
  assert.equal(b.dependentOn.dependentOn.id, 'external-module-a')

  mock.stopAll();
})();

(function shouldMockFilesInNodePathByFullPath() {
  mock('in-node-path', {id: 'in-node-path'});

  var b = require('in-node-path')
  var c = require('./node-path/in-node-path');

  assert.equal(b.id, 'in-node-path');
  assert.equal(c.id, 'in-node-path');

  assert.equal(b, c);

  mock.stopAll();
})();

console.log('All tests pass!');
