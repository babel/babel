var _ref = <p>Parent</p>;

var _ref2 = <div>child</div>;

(function () {
  class App extends React.Component {
    render() {
      return <div>
          {_ref}
          <AppItem />
        </div>;
    }
  }

  const AppItem = () => {
    return _ref2;
  };
});
