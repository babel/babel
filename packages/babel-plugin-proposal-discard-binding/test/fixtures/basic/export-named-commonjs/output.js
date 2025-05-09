"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldNotSplit = void 0;
exports.shouldNotTransform = shouldNotTransform;
exports.shouldSplit = void 0;
var _;
const [, {
  p: _2,
  ...shouldSplit
}] = [0, {
  p: 1,
  q: 2,
  r: 3
}];
exports.shouldSplit = shouldSplit;
let q;
const shouldNotSplit = exports.shouldNotSplit = [, {
  p: _,
  ...q
}] = [0, {
  p: 1,
  q: 2,
  r: 3
}];
function shouldNotTransform() {}
