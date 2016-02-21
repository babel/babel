export function stringToCode (ch) {
  return String(ch).charCodeAt(0);
}

export function posToLoc (pos, input, verbose) {
  let line=1, loopPos=0, linePos = 0, lineStart = 0;

  while (loopPos < input.length && loopPos !== pos) {
    if (input.charAt(loopPos) === "\n") {
      linePos = 0;
      lineStart = loopPos+1;
      ++line;
    } else {
      ++linePos;
    }
    ++loopPos;
  }
  if (!verbose) {
    return { line, column: linePos };
  } else {
    return {
      line,
      curLine: line,
      column: linePos,
      lineStart
    };
  }
}

export function isNumber(code) {
  return code > 47 && code < 58;
}