/**
 * @fileoverview Enforces a choice between semicolons and commas in Flow object and class types.
 * @author Nat Mote
 */
"use strict";

var SEMICOLON = {
  char: ';',
  name: 'semicolon',
}

var COMMA = {
  char: ',',
  name: 'comma',
};

module.exports = function(context) {
  var GOOD;
  var BAD;
  if (context.options[0] === undefined || context.options[0] === SEMICOLON.name) {
    GOOD = SEMICOLON;
    BAD = COMMA;
  } else {
    GOOD = COMMA;
    BAD = SEMICOLON;
  }
  function requireProperPunctuation(node) {
    var tokens = context.getSourceCode().getTokens(node);
    var lastToken = tokens[tokens.length - 1];
    if (lastToken.type === 'Punctuator') {
      if (lastToken.value === BAD.char) {
        context.report({
          message: 'Prefer ' + GOOD.name + 's to ' + BAD.name + 's in object and class types',
          node: lastToken,
          fix: function(fixer) {
            return fixer.replaceText(lastToken, GOOD.char);
          },
        });
      }
    }
  }

  return {
    ObjectTypeProperty: requireProperPunctuation,
  };
};

module.exports.schema = [
  {
    'enum': ['semicolon', 'comma'],
  }
];
