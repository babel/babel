// This is the same as the pure-expression-whitelist test, but 'FormattedMessage' is *not* whitelisted
// so it should not be hoisted.
var Foo = React.createClass({
  render: function () {
    return (
      <FormattedMessage
        id="someMessage.foo"
        defaultMessage={
          "Some text, " +
          "and some more too. {someValue}"
        }
        description="A test message for babel."
        values={{
          someValue: "A value."
        }}
      />
    );
  }
});

