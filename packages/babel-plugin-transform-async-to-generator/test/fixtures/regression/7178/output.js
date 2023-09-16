var _Contact;
const title = "Neem contact op";
function action() {
  return _action.apply(this, arguments);
}
function _action() {
  _action = babelHelpers.asyncToGenerator(function* () {
    return _Contact || (_Contact = /*#__PURE__*/React.createElement(Contact, {
      title: title
    }));
  });
  return _action.apply(this, arguments);
}
