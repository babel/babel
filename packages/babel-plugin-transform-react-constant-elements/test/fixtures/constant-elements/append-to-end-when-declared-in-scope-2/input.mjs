const AppItem = () => {
  return <div>child</div>;
};

export default class App extends React.Component {
  render() {
    return (
      <div>
        <p>Parent</p>
        <AppItem />
      </div>
    );
  }
}
