export default class App extends React.Component {
  render() {
    return _ref;
  }

}

var _ref2 =
/*#__PURE__*/
(() => <div>child</div>)();

var _ref3 =
/*#__PURE__*/
(() => <p>Parent</p>)();

const AppItem = () => {
  return _ref2;
},
      _ref4 =
/*#__PURE__*/
(() => <AppItem />)(),
      _ref =
/*#__PURE__*/
(() => <div>
        {_ref3}
        {_ref4}
      </div>)();
