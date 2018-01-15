const title = "Neem contact op";

function action() {
  return _action.apply(this, arguments);
}

var _ref = React.createElement(Contact, {
  title: title
});

function _action() {
  _action = babelHelpers.asyncToGenerator(function* () {
    return _ref;
  });
  return _action.apply(this, arguments);
}
