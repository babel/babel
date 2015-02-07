{
  var ARGUMENTS_ID = arguments,
      THIS_ID = this,
      SHOULD_CONTINUE_ID,
      RESULT_ID;

  do {
    SHOULD_CONTINUE_ID = false;
    RESULT_ID = FUNCTION.apply(THIS_ID, ARGUMENTS_ID);
  } while(SHOULD_CONTINUE_ID);

  return RESULT_ID;
}
