assert.throws(() => {
  var object = {
    "notNamedField"() {
      return notNamedField;
    }
  };
  object.notNamedField();
}, ReferenceError);
