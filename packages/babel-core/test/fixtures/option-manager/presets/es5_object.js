module.exports = function() {
  return {
    plugins: [
      [
        require('../../../../../babel-plugin-syntax-decorators'),
        { legacy: true }
      ],
    ]
  };
};
