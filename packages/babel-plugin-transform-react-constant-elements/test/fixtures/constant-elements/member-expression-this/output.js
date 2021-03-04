var _span, _this$subComponent;

class Component extends React.Component {
  constructor(...args) {
    super(...args);

    this.subComponent = () => _span || (_span = <span>Sub Component</span>);

    this.render = () => _this$subComponent || (_this$subComponent = <this.subComponent />);
  }

}
