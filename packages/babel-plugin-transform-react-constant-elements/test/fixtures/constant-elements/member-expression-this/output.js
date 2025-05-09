var _span;
class Component extends React.Component {
  constructor() {
    var _this$subComponent;
    super(...arguments);
    this.subComponent = () => _span || (_span = <span>Sub Component</span>);
    this.render = () => _this$subComponent || (_this$subComponent = <this.subComponent />);
  }
}
