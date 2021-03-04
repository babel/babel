var _div;

var Foo = React.createClass({
  render: function render() {
    return _div || (_div = <div foo={notDeclared}></div>);
  }
});
