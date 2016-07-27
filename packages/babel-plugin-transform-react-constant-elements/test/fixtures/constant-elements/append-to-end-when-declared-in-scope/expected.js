var _ref = <p>Parent</p>;

export default class App extends React.Component {
  render() {
    return <div>
        {_ref}
        <AppItem />
      </div>;
  }
}

var _ref2 = <div>child</div>;

const AppItem = () => {
  return _ref2;
};
