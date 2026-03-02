/* eslint-disable no-restricted-globals */

module.exports = function () {
  return {
    plugins: [require("@babel/plugin-proposal-private-property-in-object")],
  };
};
