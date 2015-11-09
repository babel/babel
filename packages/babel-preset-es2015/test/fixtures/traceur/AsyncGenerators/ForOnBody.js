// Options: --async-generators --for-on --async-functions
// Async.

async function* x() {
}

async function y() {
  for (let a on x())
    break;
}

y()

done();
