import Intl from 'react-intl';

var _ref =
/*#__PURE__*/
<Intl.FormattedMessage id="someMessage.foo" defaultMessage={"Some text, " + "and some more too. {someValue}"} description="A test message for babel." values={{
  someValue: "A value."
}} />;

var Foo = React.createClass({
  render: function () {
    return _ref;
  }
});
