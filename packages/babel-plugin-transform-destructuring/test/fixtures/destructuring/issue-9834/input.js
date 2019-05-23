function testOmitProperties(initialObject, testKey) {
  var {
    [`${testKey}s`]: family,
    ...rest
  } = initialObject;
}
