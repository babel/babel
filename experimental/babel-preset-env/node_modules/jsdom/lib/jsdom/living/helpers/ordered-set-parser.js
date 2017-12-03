"use strict";

module.exports = function orderedSetParser(input) {
  return new Set(input.split(/\s+/).filter(Boolean));
};
