"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = diff;
exports.diffLevel = void 0;
let diffLevel = 0;
exports.diffLevel = diffLevel;
function diff() {
  if (!(exports.diffLevel = --diffLevel)) {
    console.log("hey");
  }
}
