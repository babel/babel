// We keep this in a separate file so that in older node versions, where
// import() isn't supported, we can try/catch around the require() call
// when loading this file.

module.exports = function import_(filepath) {
  return import(filepath);
};
