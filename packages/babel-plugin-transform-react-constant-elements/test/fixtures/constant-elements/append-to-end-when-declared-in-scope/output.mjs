var _div, _div2;
export default class App extends React.Component {
  render() {
    return _div || (_div = <div>
        <p>Parent</p>
        <AppItem />
      </div>);
  }
}
const AppItem = () => {
  return _div2 || (_div2 = <div>child</div>);
};
