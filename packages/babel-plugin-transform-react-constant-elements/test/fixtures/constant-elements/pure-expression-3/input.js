const OFFSET = 3;

var Foo = React.createClass({
  render: function () {
    return (
      <div tabIndex={OFFSET + 1} />
    );
  }
});

