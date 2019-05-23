function testOmitProperties(initialObject, testKey) {
  var family = initialObject[`${testKey}s`],
      rest = babelHelpers.objectWithoutProperties(initialObject, [`${testKey}s`]);
}
