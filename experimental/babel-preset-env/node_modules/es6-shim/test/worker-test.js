/* globals Worker, location */

describe('Worker', function () {
  var workerErrorEventToError = function (errorEvent) {
    var errorText = 'Error in Worker';
    if (errorEvent.filename !== undefined) {
      errorText += ' ' + errorEvent.filename;
    }
    if (errorEvent.lineno !== undefined) {
      errorText += '(' + errorEvent.lineno + ')';
    }
    if (errorEvent.message !== undefined) {
      errorText += ': ' + errorEvent.message;
    }
    return new Error(errorText);
  };
  var canRunWorkerTestInCurrentContext = function () {
    var workerConstructorExists = typeof Worker !== 'undefined';
    var locationPropertyExists = typeof location !== 'undefined';
    var runningOnFileUriScheme = locationPropertyExists && location.protocol === 'file:';

    // The Worker constructor doesn't exist in some older browsers nor does it exist in non-browser contexts like Node.
    // Additionally some browsers (at least Chrome) don't allow Workers over file URIs.
    // To prevent false negative test failures in the cases where Workers are unavailable for either of those reasons
    // we skip this test.
    return workerConstructorExists && !runningOnFileUriScheme;
  };

  if (canRunWorkerTestInCurrentContext()) {
    it('can import es6-shim', function (done) {
      var worker = new Worker('worker-runner.workerjs');
      worker.addEventListener('error', function (errorEvent) { throw workerErrorEventToError(errorEvent); });
      worker.addEventListener('message', function (messageEvent) {
        expect(messageEvent.data).to.eql('ready');
        done();
      });
    });
  }
});
