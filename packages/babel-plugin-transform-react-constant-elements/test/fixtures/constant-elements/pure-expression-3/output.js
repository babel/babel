var _div;
const OFFSET = 3;
var Foo = React.createClass({
  render: function () {
    return _div || (_div = <div tabIndex={OFFSET + 1} />);
  }
});
