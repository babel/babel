"use strict";

module.exports = new Map();

// async -> regenerator is better than async -> generator -> regenerator
ifIncluded("transform-regenerator")
  // https://github.com/babel/babel/issues/10678
  // .isUnnecessary("transform-async-to-generator");

function ifIncluded(name) {
  const set = new Set();
  module.exports.set(name, set);
  return {
    isUnnecessary(name) { set.add(name); return this; }
  };
}
