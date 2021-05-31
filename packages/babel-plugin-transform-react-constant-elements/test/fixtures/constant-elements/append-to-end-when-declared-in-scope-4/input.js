(function () {
  const AppItem = () => {
    return <div>child</div>;
  };

  class App extends React.Component {
    render() {
      return (
        <div>
          <p>Parent</p>
          <AppItem />
        </div>
      );
    }
  }
});
