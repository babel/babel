module.exports = {
  buildPreset: function () {
    return {
      plugins: [
        require('../../../../../babel-plugin-syntax-decorators'),
      ]
    };
  }
};
