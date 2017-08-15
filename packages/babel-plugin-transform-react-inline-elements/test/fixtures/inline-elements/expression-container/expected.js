var TestComponent = React.createClass({
  render: function () {
    return babelHelpers.jsx("span", {
      className: this.props.someProp
    });
  }
});
