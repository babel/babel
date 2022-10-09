export default {
  function(name) {
    return babelHelpers.asyncToGenerator(function* () {
      const uppercasedName = name.upperCase();

      // awaits depending on uppercasedName go here

      return <Foo name={uppercasedName} />;
    })();
  }
};
