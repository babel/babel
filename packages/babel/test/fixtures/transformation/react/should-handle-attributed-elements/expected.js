var HelloMessage = React.createClass({
  displayName: "HelloMessage",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
  }
});

React.render(React.createElement(HelloMessage, { name: React.createElement(
    "span",
    null,
    "Sebastian"
  ) }), mountNode);
