var _span;
class Component extends React.Component {
  constructor(...args) {
    var _this$subComponent;
    super(...args);
    this.subComponent = () => _span || (_span = <span>Sub Component</span>);
    this.render = () => _this$subComponent || (_this$subComponent = <this.subComponent />);
  }
}
