var Foo = React.createClass({
  render: function render() {
    return <div foo={notDeclared}></div>;
  }
});
