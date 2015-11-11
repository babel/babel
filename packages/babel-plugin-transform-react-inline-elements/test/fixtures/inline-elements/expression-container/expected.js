var TestComponent = React.createClass({
  render: function () {
    return babelHelpers.createRawReactElement("span", null, {
      className: this.props.someProp
    });
  }
});