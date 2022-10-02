var _div, _p;
(function () {
  var _div2;
  const AppItem = () => {
    return _div || (_div = <div>child</div>);
  };
  class App extends React.Component {
    render() {
      return _div2 || (_div2 = <div>
          {_p || (_p = <p>Parent</p>)}
          <AppItem />
        </div>);
    }
  }
});
