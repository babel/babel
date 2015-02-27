var ITERATOR_COMPLETION = true;
var ITERATOR_HAD_ERROR_KEY = false;
var ITERATOR_ERROR_KEY = undefined;
try {
  for (var ITERATOR_KEY = OBJECT[Symbol.iterator](), STEP_KEY; !(ITERATOR_COMPLETION = (STEP_KEY = ITERATOR_KEY.next()).done); ITERATOR_COMPLETION = true) {

  }
} catch (err) {
  ITERATOR_HAD_ERROR_KEY = true;
  ITERATOR_ERROR_KEY = err;
} finally {
  try {
    if (!ITERATOR_COMPLETION && ITERATOR_KEY.return) {
      ITERATOR_KEY.return();
    }
  } finally {
    if (ITERATOR_HAD_ERROR_KEY) {
      throw ITERATOR_ERROR_KEY;
    }
  }
}
