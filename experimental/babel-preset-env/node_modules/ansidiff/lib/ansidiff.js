/*
 * Copyright (c) 2012 Trent Mick. All rights reserved.
 */

var diff = require('diff');


//---- colorer functions

/**
 * Bright coloring of a "diff object"
 */
function bright(obj) {
  if (obj.added) {
    return (
      '\033[' + 7 + 'm'   // inverse
      + '\033[' + 32 + 'm'  // green
      + obj.value
      + '\033[' + 39 + 'm'
      + '\033[' + 27 + 'm'
    );
  } else if (obj.removed) {
    return (
      '\033[' + 7 + 'm'     // inverse
      + '\033[' + 31 + 'm'  // red
      + obj.value
      + '\033[' + 39 + 'm'
      + '\033[' + 27 + 'm'
    );
  } else {
    return obj.value;
  }
}


/**
 * More subtle coloring of a "diff object". Just uses foreground coloring.
 * A downside is that whitespace diffs are not colored.
 */
function subtle(obj) {
  if (obj.added) {
    return (
      '\033[' + 32 + 'm'  // green
      + obj.value
      + '\033[' + 39 + 'm'
    );
  } else if (obj.removed) {
    return (
      '\033[' + 31 + 'm'  // red
      + obj.value
      + '\033[' + 39 + 'm'
    );
  } else {
    return obj.value;
  }
}



//---- diffing functions

/**
 * Return ANSI color coded diff of given texts `a` and `b`, diffing by char.
 */
function chars(a, b, colorer) {
  var objs = diff.diffChars(a, b);
  return objs.map(colorer || bright).join('');
}

/**
 * Return ANSI color coded diff of given texts `a` and `b`, diffing by word.
 */
function words(a, b, colorer) {
  var objs = diff.diffWords(a, b);
  return objs.map(colorer || bright).join('');
}

/**
 * Return ANSI color coded diff of given texts `a` and `b`, diffing by line.
 */
function lines(a, b, colorer) {
  var objs = diff.diffLines(a, b);
  return objs.map(colorer || bright).join('');
}

/**
 * Return ANSI color coded diff of given texts `a` and `b`, diffing by line.
 */
function css(a, b, colorer) {
  var objs = diff.diffCss(a, b);
  return objs.map(colorer || bright).join('');
}



//---- Exports

module.exports = {
  chars: chars,
  words: words,
  lines: lines,
  css: css,

  bright: bright,
  subtle: subtle
}
