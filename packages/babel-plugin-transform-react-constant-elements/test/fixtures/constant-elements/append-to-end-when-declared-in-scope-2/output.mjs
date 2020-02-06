var _ref =
/*#__PURE__*/
(() => <div>child</div>)();

const AppItem = () => {
  return _ref;
};

var _ref3 =
/*#__PURE__*/
(() => <p>Parent</p>)();

var _ref4 =
/*#__PURE__*/
(() => <AppItem />)();

var _ref2 =
/*#__PURE__*/
(() => <div>
        {_ref3}
        {_ref4}
      </div>)();

export default class App extends React.Component {
  render() {
    return _ref2;
  }

}
