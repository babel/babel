// This only tests the parsing.

function f() {
  return {implements};
}

function f2() {
  return {yield};
}

function* g() {
  'use strict';
  return {yield};
}
