var TestComponent = React.createClass({
  render: function () {
    return {
      $$typeof: babelHelpers.typeofReactElement,
      type: "span",
      key: null,
      ref: null,
      props: {
        className: this.props.someProp
      },
      _owner: null
    };
  }
});
