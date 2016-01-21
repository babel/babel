export function stringToCode (ch) {
  return String(ch).charCodeAt(0);
};

export function posToLoc (pos, input) {
  var line=1, loopPos=0, linePos = 0;

  while(loopPos < input.length && loopPos !== pos) {
    if (input.charAt(loopPos) === '\n') {
      linePos = 0;
      ++line;
    } else {
      ++linePos;
    }
    ++loopPos;
  }
  return { line, column: linePos };
};

export function isNumber(code) {
  return code > 47 && code < 58;
};
