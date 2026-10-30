// Simulates an older @babel/core version that does not ship the
// processResponse helper.
module.exports = function () {
  return {
    pre(file) {
      file.availableHelper = () => false;
    },
  };
};
