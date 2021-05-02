var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(<HelloMessage name={
  <span>
    Sebastian
  </span>
} />, mountNode);
