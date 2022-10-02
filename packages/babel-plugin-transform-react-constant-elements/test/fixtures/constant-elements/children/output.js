var _span;
var Foo = React.createClass({
  render: function () {
    return <div className={this.props.className}>
      {_span || (_span = <span />)}
    </div>;
  }
});
