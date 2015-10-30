// Options: --block-binding

function* statementTestGenerator() {
  // all of these statement constructs should be allowed
  // provided that they contain no yield statements
  switch (1) {
  case 2: break;
  default: break;
  }
  try {
  } catch (e) {}
  try {
  } finally {}
  do {} while (false);
  for (;false;) {}

  //TODO(jmesserly): this had to be changed to "var" until we get BlockBindingTransformer
  //for (let x in {}) {}
  //for (let x of simpleGenerator()) {}
  for (var x in {}) {}
  for (var x of simpleGenerator()) {}

  if (false) {} else {}
  //TODO(jmesserly): this had to be changed to "var" until we get BlockBindingTransformer
  //{ let x = 1; }
  { var x = 1; }
  { const y = 2; }

  yield 1;
}


function* simpleGenerator() {
  yield 1;
}

// ----------------------------------------------------------------------------
