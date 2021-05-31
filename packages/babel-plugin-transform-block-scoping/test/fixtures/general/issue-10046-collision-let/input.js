let run = function () {
  return false;
};

if (true) {
  function run() {
    return true;
  }
}

function test() {
  return run();
}
