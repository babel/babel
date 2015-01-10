for (var LOOP_OBJECT = OBJECT,
         IS_ARRAY = Array.isArray(LOOP_OBJECT),
         INDEX = 0,
         LOOP_OBJECT = IS_ARRAY ? LOOP_OBJECT : LOOP_OBJECT[Symbol.iterator]();;) {
  if (IS_ARRAY) {
    if (INDEX >= LOOP_OBJECT.length) break;
    ID = LOOP_OBJECT[INDEX++];
  } else {
    INDEX = LOOP_OBJECT.next();
    if (INDEX.done) break;
    ID = INDEX.value;
  }
}
