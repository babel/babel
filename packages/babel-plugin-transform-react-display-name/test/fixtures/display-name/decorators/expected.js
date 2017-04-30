export default @connect(Component)
class DecoratedComponent extends React.Component {
  render() {
    return <div></div>;
  }
}
DecoratedComponent.displayName = "DecoratedComponent";
