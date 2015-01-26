"use strict";

module.exports = Node;

var acorn = require("acorn-6to5");

var oldNode = acorn.Node;
acorn.Node = Node;

function Node() {
  oldNode.apply(this);
}
